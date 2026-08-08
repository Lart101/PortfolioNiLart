import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const BIN_ID = process.env.JSONBIN_BIN_ID;
    const API_KEY = process.env.JSONBIN_API_KEY;

    if (!BIN_ID || !API_KEY) {
      return NextResponse.json(
        { error: 'JSONBin credentials not configured in environment.' },
        { status: 500 }
      );
    }

    const currentRes = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
      headers: { 'X-Access-Key': API_KEY },
      cache: 'no-store',
    });
    
    if (!currentRes.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch current data for authentication.' },
        { status: 500 }
      );
    }

    const currentData = await currentRes.json();
    const currentAdmin = currentData.record?.admin;

    // Fallback to env password if admin block doesn't exist yet (during migration)
    const validUsername = currentAdmin ? currentAdmin.username : process.env.ADMIN_USERNAME;
    const validPassword = currentAdmin ? currentAdmin.password : process.env.ADMIN_PASSWORD;

    if (username === validUsername && password === validPassword) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Bad request' },
      { status: 400 }
    );
  }
}
