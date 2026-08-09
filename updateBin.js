const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

const BIN_ID = process.env.JSONBIN_BIN_ID;
const API_KEY = process.env.JSONBIN_API_KEY;

const data = JSON.parse(fs.readFileSync('lib/portfolio.json', 'utf8'));

fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'X-Access-Key': API_KEY,
  },
  body: JSON.stringify(data),
}).then(res => res.json())
  .then(res => console.log('Successfully updated JSONBin:', res.metadata))
  .catch(err => console.error('Error:', err));
