import { NextResponse } from 'next/server';

const BIN_ID = process.env.JSONBIN_BIN_ID;
const API_KEY = process.env.JSONBIN_API_KEY;

export async function GET() {
  if (!BIN_ID || !API_KEY) {
    return NextResponse.json(
      { error: 'JSONBin credentials not configured in environment.' },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
      headers: {
        'X-Access-Key': API_KEY,
      },
      // Avoid caching so we always get the latest data when editing
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch from JSONBin: ${res.statusText}`);
    }

    const data = await res.json();
    const record = data.record;
    // Strip admin credentials before sending to the client
    if (record && record.admin) {
      delete record.admin;
    }
    return NextResponse.json(record);
  } catch (error: any) {
    console.error('Error fetching portfolio data:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch data' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  if (!BIN_ID || !API_KEY) {
    return NextResponse.json(
      { error: 'JSONBin credentials not configured in environment.' },
      { status: 500 }
    );
  }

  const adminPassword = request.headers.get('x-admin-password');

  try {
    // 1. Fetch current data to get admin credentials
    const currentRes = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
      headers: { 'X-Access-Key': API_KEY },
      cache: 'no-store',
    });
    
    if (!currentRes.ok) {
      throw new Error(`Failed to fetch current data for authentication.`);
    }

    const currentData = await currentRes.json();
    const currentAdmin = currentData.record?.admin;

    // Fallback to env password if admin block doesn't exist yet (during migration)
    const validPassword = currentAdmin ? currentAdmin.password : process.env.ADMIN_PASSWORD;

    if (adminPassword !== validPassword) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const updatedData = await request.json();

    // 2. Merge admin credentials back into the updated data
    if (currentAdmin) {
      updatedData.admin = currentAdmin;
    }

    // 3. Save to JSONBin
    const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Key': API_KEY,
      },
      body: JSON.stringify(updatedData),
    });

    if (!res.ok) {
      throw new Error(`Failed to update JSONBin: ${res.statusText}`);
    }

    const data = await res.json();
    const record = data.record;
    if (record && record.admin) {
      delete record.admin;
    }
    return NextResponse.json(record);
  } catch (error: any) {
    console.error('Error updating portfolio data:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update data' },
      { status: 500 }
    );
  }
}
