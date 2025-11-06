/**
 * WordPress to Static Site Migration Script (SEO Enhanced)
 *
 * This script fetches blog posts from WordPress REST API and converts them
 * to static HTML files with comprehensive SEO metadata and search indexing.
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

// Configuration
const config = {
  // WordPress site URL (update this with your WordPress site)
  wordpressUrl: 'https://www.danamanciagli.com',

  // Number of posts to fetch
  postsPerPage: 50,

  // Output directories
  outputDir: path.join(__dirname, '..'),
  imagesDir: path.join(__dirname, '..', 'assets', 'images', 'blog'),

  // Site info for SEO
  site: {
    name: 'Dana Manciagli',
    url: 'https://www.danamanciagli.com',
    description: 'Fortune 500 insider insights on job search, career advancement, and professional development',
    twitter: '@danamanciagli',
    linkedIn: 'https://www.linkedin.com/in/danamanciagli/'
  },

  // Author info
  author: {
    name: 'Dana',
    initials: 'DM',
    email: 'Dana@Danamanciagli.com',
    url: 'https://www.danamanciagli.com',
    description: 'Career strategist, Fortune 500 executive, and author with 30+ years of corporate experience at Microsoft, IBM, and Kodak.'
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
      if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
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
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, '-')
    .replace(/&#8212;/g, '—')
    .replace(/\s+/g, ' ')
    .trim();
}

// Escape HTML for attributes
function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Convert WordPress content to clean HTML
function convertContent(wpContent) {
  let content = wpContent
    .replace(/\[.*?\]/g, '') // Remove shortcodes
    .replace(/<p>&nbsp;<\/p>/g, '') // Remove empty paragraphs
    .replace(/<p>\s*<\/p>/g, '') // Remove empty paragraphs
    .trim();

  return content;
}

// Calculate reading time
function calculateReadingTime(content) {
  const wordsPerMinute = 200;
  const text = stripHtml(content);
  const wordCount = text.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return minutes;
}

// Extract keywords from content
function extractKeywords(title, content, category, limit = 10) {
  const text = `${title} ${stripHtml(content)}`.toLowerCase();

  // Common stop words to exclude
  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
    'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'should',
    'can', 'could', 'may', 'might', 'must', 'shall', 'this', 'that',
    'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they',
    'what', 'which', 'who', 'when', 'where', 'why', 'how', 'all', 'each',
    'every', 'both', 'few', 'more', 'most', 'other', 'some', 'such'
  ]);

  // Extract words
  const words = text.match(/\b[a-z]{4,}\b/g) || [];
  const wordFreq = {};

  words.forEach(word => {
    if (!stopWords.has(word)) {
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    }
  });

  // Sort by frequency and get top keywords
  const keywords = Object.entries(wordFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([word]) => word);

  // Add category as a keyword
  if (category) {
    keywords.unshift(category.toLowerCase());
  }

  return keywords;
}

// Format date
function formatDate(dateString) {
  const date = new Date(dateString);
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
                  'July', 'August', 'September', 'October', 'November', 'December'];

  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

// Format date for schema.org (ISO 8601)
function formatISODate(dateString) {
  return new Date(dateString).toISOString();
}

// Fetch WordPress posts with SEO data
async function fetchWordPressPosts() {
  try {
    console.log('\n📥 Fetching posts from WordPress...');

    // Try to fetch with Yoast SEO data
    const apiUrl = `${config.wordpressUrl}/wp-json/wp/v2/posts?per_page=${config.postsPerPage}&_embed`;
    console.log(`   URL: ${apiUrl}`);

    const response = await makeRequest(apiUrl);
    const posts = JSON.parse(response);

    console.log(`✓ Found ${posts.length} posts`);

    // Try to fetch Yoast SEO data if available
    try {
      const yoastUrl = `${config.wordpressUrl}/wp-json/yoast/v1/get_head?url=${config.wordpressUrl}`;
      await makeRequest(yoastUrl);
      console.log('✓ Yoast SEO plugin detected\n');
    } catch (error) {
      console.log('ℹ Yoast SEO plugin not detected (will use default meta tags)\n');
    }

    return posts;
  } catch (error) {
    console.error('❌ Error fetching posts:', error.message);
    throw error;
  }
}

// Process featured image
async function processFeaturedImage(post, postIndex) {
  try {
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

    const extension = path.extname(new URL(imageUrl).pathname) || '.jpg';
    const filename = `${sanitizeFilename(post.title.rendered)}${extension}`;
    const filepath = path.join(config.imagesDir, filename);

    await downloadImage(imageUrl, filepath);

    return {
      local: `assets/images/blog/${filename}`,
      absolute: `${config.site.url}/assets/images/blog/${filename}`,
      alt: media.alt_text || stripHtml(post.title.rendered),
      width: media.media_details?.width || 1200,
      height: media.media_details?.height || 630
    };
  } catch (error) {
    console.log(`  ⚠ Error downloading image: ${error.message}`);
    return null;
  }
}

// Get category name and slug
function getCategoryInfo(post) {
  if (post._embedded && post._embedded['wp:term'] && post._embedded['wp:term'][0]) {
    const categories = post._embedded['wp:term'][0];
    if (categories.length > 0) {
      return {
        name: categories[0].name,
        slug: categories[0].slug,
        all: categories.map(cat => ({ name: cat.name, slug: cat.slug }))
      };
    }
  }
  return {
    name: 'Career Advice',
    slug: 'career-advice',
    all: [{ name: 'Career Advice', slug: 'career-advice' }]
  };
}

// Get tags
function getTags(post) {
  if (post._embedded && post._embedded['wp:term'] && post._embedded['wp:term'][1]) {
    const tags = post._embedded['wp:term'][1];
    return tags.map(tag => ({ name: tag.name, slug: tag.slug }));
  }
  return [];
}

// Extract SEO data from Yoast or WordPress
function extractSEOData(post, imageData, postUrl) {
  const title = stripHtml(post.title.rendered);
  const excerpt = stripHtml(post.excerpt.rendered);
  const content = stripHtml(post.content.rendered);

  // Try to get Yoast SEO data if available
  const yoastTitle = post.yoast_head_json?.title || post.yoast_meta?.yoast_wpseo_title;
  const yoastDescription = post.yoast_head_json?.description || post.yoast_meta?.yoast_wpseo_metadesc;
  const yoastKeywords = post.yoast_head_json?.keywords || post.yoast_meta?.yoast_wpseo_focuskw;

  return {
    title: yoastTitle || `${title} - ${config.author.name}`,
    metaDescription: yoastDescription || excerpt.substring(0, 160),
    keywords: yoastKeywords || extractKeywords(title, content, getCategoryInfo(post).name),
    ogTitle: yoastTitle || title,
    ogDescription: yoastDescription || excerpt.substring(0, 200),
    ogImage: imageData?.absolute || `${config.site.url}/assets/images/default-blog.jpg`,
    ogUrl: postUrl,
    twitterTitle: yoastTitle || title,
    twitterDescription: yoastDescription || excerpt.substring(0, 200),
    twitterImage: imageData?.absolute || `${config.site.url}/assets/images/default-blog.jpg`,
    canonicalUrl: postUrl
  };
}

// Generate structured data (Schema.org JSON-LD)
function generateStructuredData(post, imageData, postUrl, category) {
  const title = stripHtml(post.title.rendered);
  const excerpt = stripHtml(post.excerpt.rendered);
  const content = stripHtml(post.content.rendered);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": excerpt,
    "image": imageData?.absolute || `${config.site.url}/assets/images/default-blog.jpg`,
    "datePublished": formatISODate(post.date),
    "dateModified": formatISODate(post.modified),
    "author": {
      "@type": "Person",
      "name": config.author.name,
      "url": config.author.url,
      "description": config.author.description,
      "email": config.author.email
    },
    "publisher": {
      "@type": "Organization",
      "name": config.site.name,
      "url": config.site.url,
      "logo": {
        "@type": "ImageObject",
        "url": `${config.site.url}/assets/images/logo.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": postUrl
    },
    "articleSection": category.name,
    "keywords": extractKeywords(title, content, category.name).join(', '),
    "wordCount": content.split(/\s+/).length,
    "inLanguage": "en-US"
  };
}

// Generate blog post HTML with full SEO
function generateBlogPostHtml(post, imageData, postNumber, seoData, structuredData) {
  const title = stripHtml(post.title.rendered);
  const excerpt = stripHtml(post.excerpt.rendered);
  const content = convertContent(post.content.rendered);
  const date = formatDate(post.date);
  const category = getCategoryInfo(post);
  const tags = getTags(post);
  const readingTime = calculateReadingTime(post.content.rendered);

  const imageTag = imageData
    ? `<img src="${imageData.local}" alt="${escapeHtml(imageData.alt)}" width="${imageData.width}" height="${imageData.height}" />`
    : `<div class="placeholder-image">No Image Available</div>`;

  const keywordsArray = Array.isArray(seoData.keywords) ? seoData.keywords : seoData.keywords.split(',').map(k => k.trim());

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Security Headers -->
    <meta http-equiv="X-Content-Type-Options" content="nosniff">
    <meta http-equiv="X-Frame-Options" content="SAMEORIGIN">
    <meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin">

    <!-- Primary SEO Meta Tags -->
    <title>${escapeHtml(seoData.title)}</title>
    <meta name="title" content="${escapeHtml(seoData.title)}">
    <meta name="description" content="${escapeHtml(seoData.metaDescription)}">
    <meta name="keywords" content="${escapeHtml(keywordsArray.join(', '))}">
    <meta name="author" content="${config.author.name}">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="${seoData.canonicalUrl}">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="article">
    <meta property="og:url" content="${seoData.ogUrl}">
    <meta property="og:title" content="${escapeHtml(seoData.ogTitle)}">
    <meta property="og:description" content="${escapeHtml(seoData.ogDescription)}">
    <meta property="og:image" content="${seoData.ogImage}">
    <meta property="og:site_name" content="${config.site.name}">
    <meta property="article:published_time" content="${formatISODate(post.date)}">
    <meta property="article:modified_time" content="${formatISODate(post.modified)}">
    <meta property="article:author" content="${config.author.name}">
    <meta property="article:section" content="${category.name}">
${tags.map(tag => `    <meta property="article:tag" content="${tag.name}">`).join('\n')}

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="${seoData.ogUrl}">
    <meta property="twitter:title" content="${escapeHtml(seoData.twitterTitle)}">
    <meta property="twitter:description" content="${escapeHtml(seoData.twitterDescription)}">
    <meta property="twitter:image" content="${seoData.twitterImage}">
    <meta name="twitter:creator" content="${config.site.twitter}">
    <meta name="twitter:site" content="${config.site.twitter}">

    <!-- Structured Data (JSON-LD) -->
    <script type="application/ld+json">
${JSON.stringify(structuredData, null, 4)}
    </script>

    <!-- Breadcrumb Structured Data -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "${config.site.url}"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Blog",
                "item": "${config.site.url}/blog.html"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": "${escapeHtml(title)}",
                "item": "${seoData.canonicalUrl}"
            }
        ]
    }
    </script>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

    <!-- Styles -->
    <link rel="stylesheet" href="styles/main.css">
    <link rel="stylesheet" href="styles/blog-post.css">
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
        <article class="blog-post" itemscope itemtype="https://schema.org/BlogPosting" data-post-id="${postNumber}" data-category="${category.slug}">
            <div class="blog-post__container">
                <nav class="breadcrumb" aria-label="Breadcrumb">
                    <a href="index.html" class="breadcrumb__link">Home</a>
                    <span class="breadcrumb__separator">/</span>
                    <a href="blog.html" class="breadcrumb__link">Blog</a>
                    <span class="breadcrumb__separator">/</span>
                    <span class="breadcrumb__current">${title}</span>
                </nav>
                <a href="blog.html" class="back-button">← Back to Blog</a>
                <div class="blog-post__featured-image" itemprop="image">
                    ${imageTag}
                </div>
                <header class="blog-post__header">
                    <div class="blog-post__meta">
                        <time class="blog-post__date" datetime="${formatISODate(post.date)}" itemprop="datePublished">${date}</time>
                        <span class="blog-post__category" itemprop="articleSection">${category.name}</span>
                        <span class="blog-post__reading-time">${readingTime} min read</span>
                    </div>
                    <h1 class="blog-post__title" itemprop="headline">${title}</h1>
                    <p class="blog-post__excerpt" itemprop="description">${excerpt}</p>
                    <meta itemprop="author" content="${config.author.name}">
                    <meta itemprop="dateModified" content="${formatISODate(post.modified)}">
                </header>
                <div class="blog-post__content" itemprop="articleBody">
                    ${content}
                </div>
${tags.length > 0 ? `
                <!-- Tags Section -->
                <div class="blog-post__tags">
                    <h3>Tags</h3>
                    <ul class="tag-list">
${tags.map(tag => `                        <li><a href="blog.html?tag=${tag.slug}" class="tag">${tag.name}</a></li>`).join('\n')}
                    </ul>
                </div>
` : ''}
                <!-- Related Posts Section -->
                <div class="blog-post__related" id="related-posts">
                    <h3>Related Posts</h3>
                    <div class="related-posts-grid" id="related-posts-grid">
                        <!-- Related posts will be loaded dynamically -->
                    </div>
                </div>

                <!-- Bottom Back Button -->
                <div class="blog-post__back-bottom">
                    <a href="blog.html" class="back-button-bottom">← Back to All Posts</a>
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
                    <a href="accessibility.html" class="footer__legal-link">Accessibility</a>
                </div>
            </div>
        </div>
    </footer>

    <!-- Scripts -->
    <script src="scripts/main.js"></script>
    <script src="scripts/blog-related-posts.js"></script>
</body>
</html>
`;
}

// Generate blog card HTML for listing page
function generateBlogCardHtml(post, imageData, postNumber) {
  const title = stripHtml(post.title.rendered);
  const excerpt = stripHtml(post.excerpt.rendered).substring(0, 150) + '...';
  const date = formatDate(post.date);
  const category = getCategoryInfo(post);
  const tags = getTags(post);
  const readingTime = calculateReadingTime(post.content.rendered);
  const filename = `blog-post-${postNumber}.html`;

  const imageTag = imageData
    ? `<img src="${imageData.local}" alt="${escapeHtml(imageData.alt)}" loading="lazy" />`
    : `<div class="placeholder-image">No Image Available</div>`;

  return `                    <!-- Blog Post ${postNumber} -->
                    <article class="blog-card" data-category="${category.slug}" data-tags="${tags.map(t => t.slug).join(',')}">
                        <div class="blog-card__image">
                            ${imageTag}
                            <span class="blog-card__category-badge">${category.name}</span>
                        </div>
                        <div class="blog-card__content">
                            <div class="blog-card__meta">
                                <span class="blog-card__date">${date}</span>
                                <span class="blog-card__reading-time">${readingTime} min read</span>
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

// Create search index
function createSearchIndex(posts, imagePaths) {
  console.log('\n🔍 Creating search index...');

  const searchIndex = posts.map((post, index) => {
    const title = stripHtml(post.title.rendered);
    const content = stripHtml(post.content.rendered);
    const excerpt = stripHtml(post.excerpt.rendered);
    const category = getCategoryInfo(post);
    const tags = getTags(post);
    const keywords = extractKeywords(title, content, category.name, 15);

    return {
      id: index + 1,
      title: title,
      excerpt: excerpt,
      content: content.substring(0, 500), // First 500 chars for preview
      url: `blog-post-${index + 1}.html`,
      date: post.date,
      formattedDate: formatDate(post.date),
      category: category.name,
      categorySlug: category.slug,
      tags: tags.map(t => t.name),
      tagSlugs: tags.map(t => t.slug),
      keywords: keywords,
      image: imagePaths[index]?.local || null,
      readingTime: calculateReadingTime(post.content.rendered)
    };
  });

  const indexPath = path.join(config.outputDir, 'blog-search-index.json');
  fs.writeFileSync(indexPath, JSON.stringify(searchIndex, null, 2));
  console.log('✓ Search index created: blog-search-index.json');

  return searchIndex;
}

// Save comprehensive metadata
function savePostMetadata(posts, imagePaths, seoDataArray) {
  const metadata = posts.map((post, index) => {
    const category = getCategoryInfo(post);
    const tags = getTags(post);

    return {
      id: post.id,
      title: stripHtml(post.title.rendered),
      slug: post.slug,
      date: post.date,
      modified: post.modified,
      formattedDate: formatDate(post.date),
      category: category.name,
      categorySlug: category.slug,
      allCategories: category.all,
      tags: tags,
      excerpt: stripHtml(post.excerpt.rendered),
      imagePath: imagePaths[index]?.local || null,
      imageAlt: imagePaths[index]?.alt || null,
      filename: `blog-post-${index + 1}.html`,
      url: `${config.site.url}/blog-post-${index + 1}.html`,
      wordpressUrl: post.link,
      readingTime: calculateReadingTime(post.content.rendered),
      seo: seoDataArray[index],
      keywords: extractKeywords(
        stripHtml(post.title.rendered),
        stripHtml(post.content.rendered),
        category.name
      )
    };
  });

  const filepath = path.join(config.outputDir, 'blog-metadata.json');
  fs.writeFileSync(filepath, JSON.stringify(metadata, null, 2));
  console.log('✓ Comprehensive metadata saved: blog-metadata.json');
}

// Generate blog listing page with SEO
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

    <!-- Primary SEO Meta Tags -->
    <title>Career Advice Blog - Fortune 500 Insights | Dana Manciagli</title>
    <meta name="title" content="Career Advice Blog - Fortune 500 Insights | Dana Manciagli">
    <meta name="description" content="Expert career advice from a Fortune 500 insider. Get practical strategies for job search, interviews, networking, salary negotiation, and career advancement.">
    <meta name="keywords" content="career advice, job search, fortune 500, resume tips, interview tips, networking, salary negotiation, career growth, professional development">
    <meta name="author" content="Dana Manciagli">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="${config.site.url}/blog.html">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="${config.site.url}/blog.html">
    <meta property="og:title" content="Career Advice Blog | Dana Manciagli">
    <meta property="og:description" content="Expert career advice from a Fortune 500 insider with 30+ years of experience at Microsoft, IBM, and Kodak.">
    <meta property="og:image" content="${config.site.url}/assets/images/blog-cover.jpg">
    <meta property="og:site_name" content="${config.site.name}">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="${config.site.url}/blog.html">
    <meta property="twitter:title" content="Career Advice Blog | Dana Manciagli">
    <meta property="twitter:description" content="Expert career advice from a Fortune 500 insider with 30+ years of experience.">
    <meta property="twitter:image" content="${config.site.url}/assets/images/blog-cover.jpg">
    <meta name="twitter:creator" content="${config.site.twitter}">

    <!-- Structured Data -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "Dana Manciagli Career Advice Blog",
        "description": "${config.site.description}",
        "url": "${config.site.url}/blog.html",
        "author": {
            "@type": "Person",
            "name": "${config.author.name}",
            "url": "${config.author.url}",
            "description": "${config.author.description}"
        },
        "publisher": {
            "@type": "Organization",
            "name": "${config.site.name}",
            "url": "${config.site.url}",
            "logo": {
                "@type": "ImageObject",
                "url": "${config.site.url}/assets/images/logo.png"
            }
        }
    }
    </script>

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

                <!-- Search Bar (placeholder for future implementation) -->
                <div class="blog-search">
                    <input type="search" id="blog-search-input" class="blog-search__input" placeholder="Search blog posts..." aria-label="Search blog posts">
                    <button type="button" class="blog-search__button" aria-label="Search">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.35-4.35"></path>
                        </svg>
                    </button>
                </div>

                <div class="blog-grid" id="blog-grid">
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
                            <a href="${config.site.linkedIn}" target="_blank" rel="noopener noreferrer" class="footer__link footer__link--linkedin">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="vertical-align: middle; margin-right: 8px;">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                </svg>
                                LinkedIn
                            </a>
                        </li>
                        <li><a href="mailto:${config.author.email}" class="footer__link">Email</a></li>
                    </ul>
                </div>
            </div>

            <div class="footer__bottom">
                <p class="footer__copyright">
                    Copyright &copy; 2025 DM Consult, LLC. All Rights Reserved.
                </p>
                <div class="footer__legal">
                    <a href="privacy.html" class="footer__legal-link">Privacy Policy</a>
                    <a href="accessibility.html" class="footer__legal-link">Accessibility</a>
                </div>
            </div>
        </div>
    </footer>

    <!-- Scripts -->
    <script src="scripts/main.js"></script>
    <script>
        // Load search index
        fetch('blog-search-index.json')
            .then(response => response.json())
            .then(searchIndex => {
                window.blogSearchIndex = searchIndex;
                console.log('Search index loaded:', searchIndex.length, 'posts');
            })
            .catch(error => console.error('Error loading search index:', error));
    </script>
</body>
</html>
`;
}

// Main migration function
async function migrateBlog() {
  console.log('🚀 WordPress to Static Site Migration (SEO Enhanced)\n');
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
    const seoDataArray = [];

    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      const postNumber = i + 1;
      const postUrl = `${config.site.url}/blog-post-${postNumber}.html`;

      console.log(`\n📝 Processing post ${postNumber}/${posts.length}: ${stripHtml(post.title.rendered)}`);

      // Download featured image
      const imageData = await processFeaturedImage(post, postNumber);
      imagePaths.push(imageData);

      // Extract SEO data
      const seoData = extractSEOData(post, imageData, postUrl);
      seoDataArray.push(seoData);

      // Generate structured data
      const category = getCategoryInfo(post);
      const structuredData = generateStructuredData(post, imageData, postUrl, category);

      // Generate blog post HTML
      const postHtml = generateBlogPostHtml(post, imageData, postNumber, seoData, structuredData);
      const postFilename = `blog-post-${postNumber}.html`;
      const postFilepath = path.join(config.outputDir, postFilename);
      fs.writeFileSync(postFilepath, postHtml);
      console.log(`  ✓ Generated: ${postFilename} (with full SEO)`);

      // Generate blog card for listing page
      const cardHtml = generateBlogCardHtml(post, imageData, postNumber);
      blogCards.push(cardHtml);
    }

    // Create search index
    const searchIndex = createSearchIndex(posts, imagePaths);

    // Save comprehensive metadata
    savePostMetadata(posts, imagePaths, seoDataArray);

    // Generate updated blog listing page
    console.log('\n📄 Generating blog listing page...');
    const blogListingHtml = generateBlogListingPage(blogCards);
    const blogListingPath = path.join(config.outputDir, 'blog.html');
    fs.writeFileSync(blogListingPath, blogListingHtml);
    console.log('✓ Generated: blog.html (with SEO and search placeholder)');

    console.log('\n' + '='.repeat(50));
    console.log('✅ SEO-Enhanced Migration Complete!');
    console.log(`\n📊 Summary:`);
    console.log(`   • Posts migrated: ${posts.length}`);
    console.log(`   • Images downloaded: ${imagePaths.filter(p => p).length}`);
    console.log(`   • Files generated: ${posts.length + 3}`);
    console.log(`   • SEO meta tags: ✓ Complete (Title, Description, Keywords)`);
    console.log(`   • Open Graph tags: ✓ Complete`);
    console.log(`   • Twitter Card tags: ✓ Complete`);
    console.log(`   • Structured Data: ✓ Complete (Schema.org JSON-LD)`);
    console.log(`   • Search index: ✓ Complete (blog-search-index.json)`);
    console.log(`\n💡 Next steps:`);
    console.log(`   1. Review the migrated posts in your browser`);
    console.log(`   2. Check blog-search-index.json for search functionality`);
    console.log(`   3. Verify SEO tags with browser dev tools`);
    console.log(`   4. Test social media sharing (Open Graph/Twitter)`);
    console.log(`   5. Validate structured data: https://search.google.com/test/rich-results`);

  } catch (error) {
    console.error('\n❌ Migration failed:', error.message);
    console.error('\n💡 Troubleshooting:');
    console.error('   • Verify your WordPress URL is correct');
    console.error('   • Ensure WordPress REST API is accessible');
    console.error('   • Check your internet connection');
    throw error;
  }
}

// Run migration
if (require.main === module) {
  migrateBlog().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = { migrateBlog, config };
