/**
 * WordPress Migration Test Script
 *
 * Tests the migration with only 3 posts to verify setup before full migration
 */

// Import the main migration module
const migrationModule = require('./wordpress-migration-seo.js');

// Override config for testing
migrationModule.config.postsPerPage = 3;

console.log('🧪 TEST MODE: Fetching only 3 posts to verify setup\n');
console.log('WordPress URL:', migrationModule.config.wordpressUrl);
console.log('New Site URL:', migrationModule.config.site.url);
console.log('\n');

// Run migration
migrationModule.migrateBlog();
