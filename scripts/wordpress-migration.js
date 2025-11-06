/**
 * WordPress to Static Site Migration Script
 *
 * This script fetches blog posts from WordPress REST API and converts them
 * to static HTML files matching the current blog design.
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

// Configuration
const config = {
  // WordPress site URL (update this with your WordPress site)
  wordpressUrl: 'https://your-wordpress-site.com',

  // Number of posts to fetch
  postsPerPage: 50,

  // Output directories
  outputDir: path.join(__dirname, '..'),
  imagesDir: path.join(__dirname, '..', 'assets', 'images', 'blog'),

  // Author info
  author: {
    name: 'Dana Manciagli',
    initials: 'DM',
    email: 'Dana@Danamanciagli.com'
  }
};

// Ensure directories exist
function ensureDirectoryExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✓ Created directory: ${dir}`);
  }
}

// Make HTTP/HTTPS request
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;

    protocol.get(url, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(data);
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    }).on('error', reject);
  });
}

// Download image from URL
async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(filepath);

    protocol.get(url, (response) => {
      if (response.statusCode >= 200 && response.statusCode < 300) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`  ✓ Downloaded: ${path.basename(filepath)}`);
          resolve(filepath);
        });
      } else if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        // Handle redirects
        file.close();
        fs.unlinkSync(filepath);
        downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
      } else {
        file.close();
        fs.unlinkSync(filepath);
        reject(new Error(`HTTP ${response.statusCode}`));
      }
    }).on('error', (err) => {
      file.close();
      fs.unlinkSync(filepath);
      reject(err);
    });
  });
}

// Sanitize filename
function sanitizeFilename(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .substring(0, 100);
}

// Strip HTML tags and decode entities
function stripHtml(html) {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

// Convert WordPress content to clean HTML
function convertContent(wpContent) {
  // Remove WordPress-specific shortcodes and formatting
  let content = wpContent
    .replace(/\[.*?\]/g, '') // Remove shortcodes
    .replace(/<p>&nbsp;<\/p>/g, '') // Remove empty paragraphs
    .replace(/<p>\s*<\/p>/g, '') // Remove empty paragraphs
    .trim();

  return content;
}

// Format date
function formatDate(dateString) {
  const date = new Date(dateString);
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
                  'July', 'August', 'September', 'October', 'November', 'December'];

  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

// Fetch WordPress posts
async function fetchWordPressPosts() {
  try {
    console.log('\n📥 Fetching posts from WordPress...');

    const apiUrl = `${config.wordpressUrl}/wp-json/wp/v2/posts?per_page=${config.postsPerPage}&_embed`;
    console.log(`   URL: ${apiUrl}`);

    const response = await makeRequest(apiUrl);
    const posts = JSON.parse(response);

    console.log(`✓ Found ${posts.length} posts\n`);

    return posts;
  } catch (error) {
    console.error('❌ Error fetching posts:', error.message);
    throw error;
  }
}

// Process featured image
async function processFeaturedImage(post, postIndex) {
  try {
    // Check if post has featured media
    if (!post._embedded || !post._embedded['wp:featuredmedia']) {
      console.log('  ⚠ No featured image found');
      return null;
    }

    const media = post._embedded['wp:featuredmedia'][0];
    const imageUrl = media.source_url;

    if (!imageUrl) {
      console.log('  ⚠ No image URL found');
      return null;
    }

    // Create filename from post title
    const extension = path.extname(new URL(imageUrl).pathname) || '.jpg';
    const filename = `${sanitizeFilename(post.title.rendered)}${extension}`;
    const filepath = path.join(config.imagesDir, filename);

    // Download image
    await downloadImage(imageUrl, filepath);

    // Return relative path for HTML
    return `assets/images/blog/${filename}`;
  } catch (error) {
    console.log(`  ⚠ Error downloading image: ${error.message}`);
    return null;
  }
}

// Get category name
function getCategoryName(post) {
  if (post._embedded && post._embedded['wp:term'] && post._embedded['wp:term'][0]) {
    const categories = post._embedded['wp:term'][0];
    if (categories.length > 0) {
      return categories[0].name;
    }
  }
  return 'Career Advice';
}

// Generate blog post HTML
function generateBlogPostHtml(post, imagePath, postNumber) {
  const title = stripHtml(post.title.rendered);
  const excerpt = stripHtml(post.excerpt.rendered);
  const content = convertContent(post.content.rendered);
  const date = formatDate(post.date);
  const category = getCategoryName(post);

  const imageTag = imagePath
    ? `<img src="${imagePath}" alt="${title}" />`
    : `<div class="placeholder-image">No Image Available</div>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-Content-Type-Options" content="nosniff">
    <meta http-equiv="X-Frame-Options" content="SAMEORIGIN">
    <title>${title} - Dana Manciagli</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles/main.css">
</head>
<body>
    <a href="#main-content" class="skip-to-main">Skip to main content</a>
    <nav class="nav" id="navbar" role="navigation">
        <div class="nav__container">
            <a href="index.html" class="nav__logo">Dana Manciagli</a>
            <ul class="nav__menu" id="nav-menu">
                <li class="nav__item"><a href="index.html#about" class="nav__link">About</a></li>
                <li class="nav__item"><a href="index.html#impact" class="nav__link">Impact</a></li>
                <li class="nav__item"><a href="index.html#services" class="nav__link">Services</a></li>
                <li class="nav__item"><a href="index.html#resources" class="nav__link">Resources</a></li>
                <li class="nav__item"><a href="blog.html" class="nav__link">Blog</a></li>
                <li class="nav__item"><a href="index.html#contact" class="nav__link nav__link--cta">Get In Touch</a></li>
            </ul>
            <button class="nav__toggle" id="nav-toggle" aria-label="Toggle navigation menu">
                <span class="nav__toggle-icon"></span>
            </button>
        </div>
    </nav>
    <main role="main" id="main-content">
        <article class="blog-post">
            <div class="blog-post__container">
                <nav class="breadcrumb" aria-label="Breadcrumb">
                    <a href="index.html" class="breadcrumb__link">Home</a>
                    <span class="breadcrumb__separator">/</span>
                    <a href="blog.html" class="breadcrumb__link">Blog</a>
                    <span class="breadcrumb__separator">/</span>
                    <span class="breadcrumb__current">${title}</span>
                </nav>
                <a href="blog.html" class="back-button">← Back to Blog</a>
                <div class="blog-post__featured-image">
                    ${imageTag}
                </div>
                <header class="blog-post__header">
                    <div class="blog-post__meta">
                        <span class="blog-post__date">${date}</span>
                        <span class="blog-post__category">${category}</span>
                    </div>
                    <h1 class="blog-post__title">${title}</h1>
                    <p class="blog-post__excerpt">${excerpt}</p>
                </header>
                <div class="blog-post__content">
                    ${content}
                </div>
            </div>
        </article>
    </main>

    <!-- Footer -->
    <footer class="footer" role="contentinfo" aria-label="Site footer">
        <div class="footer__container">
            <div class="footer__content">
                <div class="footer__brand">
                    <h3 class="footer__title">Dana Manciagli</h3>
                    <p class="footer__tagline">Fortune 500 Insider. Career Strategist. Trusted Voice.</p>
                </div>

                <div class="footer__section">
                    <h4 class="footer__section-title">Quick Links</h4>
                    <ul class="footer__list">
                        <li><a href="index.html#about" class="footer__link">About</a></li>
                        <li><a href="index.html#impact" class="footer__link">Impact</a></li>
                        <li><a href="index.html#services" class="footer__link">Services</a></li>
                        <li><a href="index.html#resources" class="footer__link">Resources</a></li>
                        <li><a href="index.html#contact" class="footer__link">Contact</a></li>
                    </ul>
                </div>

                <div class="footer__section">
                    <h4 class="footer__section-title">Resources</h4>
                    <ul class="footer__list">
                        <li><a href="index.html#resources" class="footer__link">Book</a></li>
                        <li><a href="blog.html" class="footer__link">Blog</a></li>
                        <li><a href="index.html#resources" class="footer__link">Free Downloads</a></li>
                    </ul>
                </div>

                <div class="footer__section">
                    <h4 class="footer__section-title">Connect</h4>
                    <ul class="footer__list">
                        <li>
                            <a href="https://www.linkedin.com/in/danamanciagli/" target="_blank" rel="noopener noreferrer" class="footer__link footer__link--linkedin">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="vertical-align: middle; margin-right: 8px;">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                </svg>
                                LinkedIn
                            </a>
                        </li>
                        <li><a href="mailto:Dana@Danamanciagli.com" class="footer__link">Email</a></li>
                    </ul>
                </div>
            </div>

            <div class="footer__bottom">
                <p class="footer__copyright">
                    Copyright &copy; 2025 DM Consult, LLC. All Rights Reserved.
                </p>
                <div class="footer__legal">
                    <a href="privacy.html" class="footer__legal-link">Privacy Policy</a>
                    <a href="terms.html" class="footer__legal-link">Terms & Conditions</a>
                    <a href="accessibility.html" class="footer__legal-link">Accessibility</a>
                </div>
            </div>
        </div>
    </footer>

    <!-- Scripts -->
    <script src="scripts/main.js"></script>
</body>
</html>
`;
}

// Generate blog card HTML for listing page
function generateBlogCardHtml(post, imagePath, postNumber) {
  const title = stripHtml(post.title.rendered);
  const excerpt = stripHtml(post.excerpt.rendered).substring(0, 150) + '...';
  const date = formatDate(post.date);
  const category = getCategoryName(post);
  const filename = `blog-post-${postNumber}.html`;

  const imageTag = imagePath
    ? `<img src="${imagePath}" alt="${title}" />`
    : `<div class="placeholder-image">No Image Available</div>`;

  return `                    <!-- Blog Post ${postNumber} -->
                    <article class="blog-card">
                        <div class="blog-card__image">
                            ${imageTag}
                            <span class="blog-card__category-badge">${category}</span>
                        </div>
                        <div class="blog-card__content">
                            <div class="blog-card__meta">
                                <span class="blog-card__date">${date}</span>
                                <span class="blog-card__reading-time">5 min read</span>
                            </div>
                            <h2 class="blog-card__title">
                                <a href="${filename}">${title}</a>
                            </h2>
                            <p class="blog-card__excerpt">
                                ${excerpt}
                            </p>
                            <div class="blog-card__footer">
                                <div class="blog-card__author">
                                    <div class="blog-card__author-avatar">${config.author.initials}</div>
                                    <span>${config.author.name}</span>
                                </div>
                                <a href="${filename}" class="blog-card__link">Read →</a>
                            </div>
                        </div>
                    </article>
`;
}

// Save post metadata to JSON
function savePostMetadata(posts, imagePaths) {
  const metadata = posts.map((post, index) => ({
    id: post.id,
    title: stripHtml(post.title.rendered),
    slug: post.slug,
    date: post.date,
    formattedDate: formatDate(post.date),
    category: getCategoryName(post),
    excerpt: stripHtml(post.excerpt.rendered),
    imagePath: imagePaths[index],
    filename: `blog-post-${index + 1}.html`,
    wordpressUrl: post.link
  }));

  const filepath = path.join(config.outputDir, 'blog-metadata.json');
  fs.writeFileSync(filepath, JSON.stringify(metadata, null, 2));
  console.log(`\n✓ Saved metadata to blog-metadata.json`);
}

// Main migration function
async function migrateBlog() {
  console.log('🚀 WordPress to Static Site Migration\n');
  console.log('='.repeat(50));

  try {
    // Ensure directories exist
    ensureDirectoryExists(config.imagesDir);

    // Fetch posts from WordPress
    const posts = await fetchWordPressPosts();

    if (posts.length === 0) {
      console.log('⚠ No posts found. Please check your WordPress URL.');
      return;
    }

    // Process each post
    const imagePaths = [];
    const blogCards = [];

    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      const postNumber = i + 1;

      console.log(`\n📝 Processing post ${postNumber}/${posts.length}: ${stripHtml(post.title.rendered)}`);

      // Download featured image
      const imagePath = await processFeaturedImage(post, postNumber);
      imagePaths.push(imagePath);

      // Generate blog post HTML
      const postHtml = generateBlogPostHtml(post, imagePath, postNumber);
      const postFilename = `blog-post-${postNumber}.html`;
      const postFilepath = path.join(config.outputDir, postFilename);
      fs.writeFileSync(postFilepath, postHtml);
      console.log(`  ✓ Generated: ${postFilename}`);

      // Generate blog card for listing page
      const cardHtml = generateBlogCardHtml(post, imagePath, postNumber);
      blogCards.push(cardHtml);
    }

    // Save metadata
    savePostMetadata(posts, imagePaths);

    // Generate updated blog listing page
    console.log('\n📄 Generating blog listing page...');
    const blogListingHtml = generateBlogListingPage(blogCards);
    const blogListingPath = path.join(config.outputDir, 'blog.html');
    fs.writeFileSync(blogListingPath, blogListingHtml);
    console.log('✓ Generated: blog.html');

    console.log('\n' + '='.repeat(50));
    console.log('✅ Migration complete!');
    console.log(`\n📊 Summary:`);
    console.log(`   • Posts migrated: ${posts.length}`);
    console.log(`   • Images downloaded: ${imagePaths.filter(p => p).length}`);
    console.log(`   • Files generated: ${posts.length + 2} (posts + blog.html + metadata.json)`);
    console.log(`\n💡 Next steps:`);
    console.log(`   1. Review the migrated posts in your browser`);
    console.log(`   2. Check blog-metadata.json for all post data`);
    console.log(`   3. Adjust any formatting or content as needed`);

  } catch (error) {
    console.error('\n❌ Migration failed:', error.message);
    console.error('\n💡 Troubleshooting:');
    console.error('   • Verify your WordPress URL is correct');
    console.error('   • Ensure WordPress REST API is accessible');
    console.error('   • Check your internet connection');
    throw error;
  }
}

// Generate blog listing page
function generateBlogListingPage(blogCards) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Security Headers -->
    <meta http-equiv="X-Content-Type-Options" content="nosniff">
    <meta http-equiv="X-Frame-Options" content="SAMEORIGIN">
    <meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin">
    <meta http-equiv="Permissions-Policy" content="geolocation=(), microphone=(), camera=()">

    <meta name="description" content="Career advice blog by Dana Manciagli - Fortune 500 insider insights on job search, career advancement, and professional development">
    <meta name="author" content="Dana Manciagli">

    <title>Career Advice Blog - Dana Manciagli</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

    <!-- Styles -->
    <link rel="stylesheet" href="styles/main.css">
</head>
<body>
    <!-- Skip to main content link for keyboard users -->
    <a href="#main-content" class="skip-to-main">Skip to main content</a>

    <!-- Navigation -->
    <nav class="nav" id="navbar" role="navigation" aria-label="Main navigation">
        <div class="nav__container">
            <a href="index.html" class="nav__logo" aria-label="Dana Manciagli - Home">Dana Manciagli</a>
            <ul class="nav__menu" id="nav-menu" role="menubar" aria-label="Site sections">
                <li class="nav__item" role="none"><a href="index.html#about" class="nav__link" role="menuitem">About</a></li>
                <li class="nav__item" role="none"><a href="index.html#impact" class="nav__link" role="menuitem">Impact</a></li>
                <li class="nav__item" role="none"><a href="index.html#services" class="nav__link" role="menuitem">Services</a></li>
                <li class="nav__item" role="none"><a href="index.html#resources" class="nav__link" role="menuitem">Resources</a></li>
                <li class="nav__item" role="none"><a href="blog.html" class="nav__link" role="menuitem">Blog</a></li>
                <li class="nav__item" role="none"><a href="index.html#contact" class="nav__link nav__link--cta" role="menuitem">Get In Touch</a></li>
            </ul>
            <button class="nav__toggle" id="nav-toggle" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="nav-menu">
                <span class="nav__toggle-icon" aria-hidden="true"></span>
            </button>
        </div>
    </nav>

    <!-- Main Content -->
    <main role="main" aria-label="Main content" id="main-content">
        <section class="blog-page">
            <div class="blog-page__container">
                <div class="blog-page__header">
                    <h1 class="blog-page__title">Career Advice Blog</h1>
                    <p class="blog-page__subtitle">Fortune 500 insider insights on job search, career advancement, and professional development</p>
                </div>

                <div class="blog-grid">
${blogCards.join('\n')}
                </div>
            </div>
        </section>
    </main>

    <!-- Footer -->
    <footer class="footer" role="contentinfo" aria-label="Site footer">
        <div class="footer__container">
            <div class="footer__content">
                <div class="footer__brand">
                    <h3 class="footer__title">Dana Manciagli</h3>
                    <p class="footer__tagline">Fortune 500 Insider. Career Strategist. Trusted Voice.</p>
                </div>

                <div class="footer__section">
                    <h4 class="footer__section-title">Quick Links</h4>
                    <ul class="footer__list">
                        <li><a href="index.html#about" class="footer__link">About</a></li>
                        <li><a href="index.html#impact" class="footer__link">Impact</a></li>
                        <li><a href="index.html#services" class="footer__link">Services</a></li>
                        <li><a href="index.html#resources" class="footer__link">Resources</a></li>
                        <li><a href="index.html#contact" class="footer__link">Contact</a></li>
                    </ul>
                </div>

                <div class="footer__section">
                    <h4 class="footer__section-title">Resources</h4>
                    <ul class="footer__list">
                        <li><a href="index.html#resources" class="footer__link">Book</a></li>
                        <li><a href="blog.html" class="footer__link">Blog</a></li>
                        <li><a href="index.html#resources" class="footer__link">Free Downloads</a></li>
                    </ul>
                </div>

                <div class="footer__section">
                    <h4 class="footer__section-title">Connect</h4>
                    <ul class="footer__list">
                        <li>
                            <a href="https://www.linkedin.com/in/danamanciagli/" target="_blank" rel="noopener noreferrer" class="footer__link footer__link--linkedin">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="vertical-align: middle; margin-right: 8px;">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                </svg>
                                LinkedIn
                            </a>
                        </li>
                        <li><a href="mailto:Dana@Danamanciagli.com" class="footer__link">Email</a></li>
                    </ul>
                </div>
            </div>

            <div class="footer__bottom">
                <p class="footer__copyright">
                    Copyright &copy; 2025 DM Consult, LLC. All Rights Reserved.
                </p>
                <div class="footer__legal">
                    <a href="privacy.html" class="footer__legal-link">Privacy Policy</a>
                    <a href="terms.html" class="footer__legal-link">Terms & Conditions</a>
                    <a href="accessibility.html" class="footer__legal-link">Accessibility</a>
                </div>
            </div>
        </div>
    </footer>

    <!-- Scripts -->
    <script src="scripts/main.js"></script>
</body>
</html>
`;
}

// Run migration
if (require.main === module) {
  migrateBlog().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = { migrateBlog, config };
