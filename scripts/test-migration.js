/**
 * Test Migration - Fetch only 3 posts to verify setup
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Load the main migration script module
const mainScript = fs.readFileSync(path.join(__dirname, 'wordpress-migration-seo.js'), 'utf8');

// Modify to fetch only 3 posts
const testScript = mainScript.replace(/postsPerPage:\s*50/, 'postsPerPage: 3');

// Write to temp file
const tempFile = path.join(__dirname, 'temp-test-migration.js');
fs.writeFileSync(tempFile, testScript);

console.log('🧪 TEST MODE: Running migration with only 3 posts\n');
console.log('This will help verify everything is working before the full migration.\n');

// Run the modified script
require(tempFile);

// Cleanup temp file after execution
process.on('exit', () => {
  if (fs.existsSync(tempFile)) {
    fs.unlinkSync(tempFile);
  }
});
