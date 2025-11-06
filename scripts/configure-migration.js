#!/usr/bin/env node

/**
 * WordPress Migration Configuration Helper
 *
 * This interactive script helps you configure the WordPress migration
 * by asking a few simple questions.
 */

const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Store configuration
const config = {
  wordpressUrl: '',
  postsPerPage: 50
};

console.log('\n🔧 WordPress Migration Configuration\n');
console.log('='.repeat(50));
console.log('\nThis wizard will help you configure your blog migration.\n');

// Ask questions
function askWordPressUrl() {
  return new Promise((resolve) => {
    rl.question('What is your WordPress site URL? (e.g., https://example.com): ', (answer) => {
      config.wordpressUrl = answer.trim().replace(/\/$/, ''); // Remove trailing slash
      resolve();
    });
  });
}

function askPostCount() {
  return new Promise((resolve) => {
    rl.question('How many posts do you want to migrate? (default: 50, max: 100): ', (answer) => {
      const count = parseInt(answer) || 50;
      config.postsPerPage = Math.min(Math.max(1, count), 100);
      resolve();
    });
  });
}

function testWordPressConnection() {
  return new Promise((resolve) => {
    const https = require('https');
    const http = require('http');

    console.log('\n🔍 Testing WordPress connection...');
    const testUrl = `${config.wordpressUrl}/wp-json/wp/v2/posts?per_page=1`;
    console.log(`   Trying: ${testUrl}`);

    const protocol = testUrl.startsWith('https') ? https : http;

    protocol.get(testUrl, (res) => {
      if (res.statusCode === 200) {
        console.log('   ✅ Connection successful!\n');
        resolve(true);
      } else {
        console.log(`   ⚠️  Warning: Received HTTP ${res.statusCode}`);
        console.log('   The REST API might not be accessible.\n');
        resolve(false);
      }
    }).on('error', (err) => {
      console.log(`   ❌ Connection failed: ${err.message}`);
      console.log('   Please check your WordPress URL.\n');
      resolve(false);
    });
  });
}

function updateMigrationScript() {
  console.log('\n📝 Updating migration script...');

  const scriptPath = path.join(__dirname, 'wordpress-migration-seo.js');
  let scriptContent = fs.readFileSync(scriptPath, 'utf8');

  // Update WordPress URL
  scriptContent = scriptContent.replace(
    /wordpressUrl:\s*['"][^'"]*['"]/,
    `wordpressUrl: '${config.wordpressUrl}'`
  );

  // Update posts per page
  scriptContent = scriptContent.replace(
    /postsPerPage:\s*\d+/,
    `postsPerPage: ${config.postsPerPage}`
  );

  fs.writeFileSync(scriptPath, scriptContent);
  console.log('   ✅ Configuration saved!\n');
}

function displaySummary() {
  console.log('='.repeat(50));
  console.log('\n📋 Configuration Summary:\n');
  console.log(`   WordPress URL: ${config.wordpressUrl}`);
  console.log(`   Posts to migrate: ${config.postsPerPage}`);
  console.log(`   API Endpoint: ${config.wordpressUrl}/wp-json/wp/v2/posts`);
  console.log('\n='.repeat(50));
}

function askRunNow() {
  return new Promise((resolve) => {
    rl.question('\nDo you want to run the migration now? (y/n): ', (answer) => {
      resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes');
    });
  });
}

async function main() {
  try {
    // Ask configuration questions
    await askWordPressUrl();
    await askPostCount();

    // Test connection
    const connectionOk = await testWordPressConnection();

    // Update script
    updateMigrationScript();

    // Display summary
    displaySummary();

    if (!connectionOk) {
      console.log('\n⚠️  Warning: Could not verify WordPress connection.');
      console.log('You may need to check your WordPress settings or URL.\n');
    }

    // Ask if they want to run now
    const runNow = await askRunNow();

    rl.close();

    if (runNow) {
      console.log('\n🚀 Starting SEO-enhanced migration...\n');
      require('./wordpress-migration-seo.js');
    } else {
      console.log('\n✅ Configuration complete!');
      console.log('\nTo run the SEO-enhanced migration later, use:');
      console.log('   node scripts/wordpress-migration-seo.js\n');
    }

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    rl.close();
    process.exit(1);
  }
}

// Run configuration
main();
