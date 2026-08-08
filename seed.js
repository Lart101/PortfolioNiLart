const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const BIN_ID = process.env.JSONBIN_BIN_ID;
// We need to un-escape the string since dotenv might read literal slashes, or we can just read it properly
const API_KEY = process.env.JSONBIN_API_KEY.replace(/\\/g, '');

if (!BIN_ID || !API_KEY) {
  console.error("Missing BIN_ID or API_KEY");
  process.exit(1);
}

const dataPath = path.join(__dirname, 'lib', 'portfolio.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'X-Access-Key': API_KEY,
  },
  body: JSON.stringify(data),
})
  .then((res) => res.json())
  .then((json) => {
    console.log("Successfully seeded JSONBin:", json.record?.admin ? "Admin credentials initialized" : "Warning: No admin credentials found in pushed data");
  })
  .catch((err) => {
    console.error("Failed to seed JSONBin:", err);
  });
