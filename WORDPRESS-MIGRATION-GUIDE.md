# WordPress Migration Guide

This guide will help you migrate your blog posts from WordPress to your new static website.

## 📋 Overview

The migration script will:
- Fetch the last 50 blog posts from your WordPress site via REST API
- Download all featured images to `assets/images/blog/`
- Convert WordPress content to clean HTML matching your current design
- Generate individual blog post pages (blog-post-1.html, blog-post-2.html, etc.)
- Update the blog listing page (blog.html)
- Create a metadata file (blog-metadata.json) with all post information

## 🚀 Quick Start

### Step 1: Update the WordPress URL

Open `scripts/wordpress-migration.js` and update line 20 with your WordPress site URL:

```javascript
wordpressUrl: 'https://your-wordpress-site.com',
```

Replace `'https://your-wordpress-site.com'` with your actual WordPress site URL.

### Step 2: Run the Migration

```bash
cd /Users/shoetieai/Documents/dana-manciagli
node scripts/wordpress-migration.js
```

### Step 3: Review the Results

The script will:
1. Show progress as it downloads each post
2. Display a summary when complete
3. Generate all necessary files

## 📁 Output Files

After migration, you'll have:

```
dana-manciagli/
├── blog-post-1.html              # First blog post
├── blog-post-2.html              # Second blog post
├── ...                           # Up to 50 posts
├── blog.html                     # Updated blog listing page
├── blog-metadata.json            # All post data in JSON format
└── assets/images/blog/
    ├── first-post-title.jpg      # Featured images
    ├── second-post-title.jpg
    └── ...
```

## 🔧 Configuration Options

You can customize the migration by editing `scripts/wordpress-migration.js`:

### Change Number of Posts

```javascript
postsPerPage: 50,  // Change to any number (max 100 per WordPress)
```

### Change Image Directory

```javascript
imagesDir: path.join(__dirname, '..', 'assets', 'images', 'blog'),
```

### Change Author Information

```javascript
author: {
  name: 'Dana Manciagli',
  initials: 'DM',
  email: 'Dana@Danamanciagli.com'
}
```

## 📊 What Gets Migrated

Each blog post includes:
- ✅ Title
- ✅ Publication date
- ✅ Category/categories
- ✅ Featured image
- ✅ Excerpt
- ✅ Full content (cleaned and formatted)
- ✅ All HTML formatting (headings, lists, paragraphs)
- ✅ SEO metadata

## 🎨 Design Preservation

The migration script preserves your current blog design:
- Same navigation header
- Same footer
- Same card layout on blog listing page
- Same post layout on individual pages
- All CSS classes maintained

## ⚠️ Important Notes

### WordPress REST API Requirements

Your WordPress site must have the REST API enabled (it's enabled by default on most WordPress sites). The script uses this endpoint:

```
https://your-site.com/wp-json/wp/v2/posts
```

### Image Downloads

- Images are downloaded to `assets/images/blog/`
- Filenames are sanitized (lowercase, hyphens instead of spaces)
- If an image download fails, the post will still be created with a placeholder

### Content Cleaning

The script automatically:
- Removes WordPress shortcodes `[shortcode]`
- Strips empty paragraphs
- Decodes HTML entities
- Preserves formatting (headings, lists, bold, italic)

## 🔍 Troubleshooting

### "Error fetching posts"

**Problem**: Can't connect to WordPress site

**Solutions**:
1. Verify your WordPress URL is correct
2. Check that the REST API is accessible by visiting: `https://your-site.com/wp-json/wp/v2/posts`
3. Ensure your WordPress site is publicly accessible

### "No featured image found"

**Problem**: Post doesn't have a featured image

**Solution**: This is normal. The script will create posts without images. You can add them manually later.

### "HTTP 403" or "HTTP 401"

**Problem**: WordPress site requires authentication

**Solution**: Your WordPress site may have REST API restrictions. You'll need to:
1. Disable REST API authentication temporarily
2. Or modify the script to include authentication headers

### "Posts have wrong formatting"

**Problem**: HTML content looks incorrect

**Solution**:
1. Check `blog-metadata.json` for the raw content
2. You may need to adjust the `convertContent()` function in the script
3. Some WordPress plugins add custom HTML that may need manual cleanup

## 📝 Post-Migration Checklist

After running the migration:

- [ ] Review `blog-metadata.json` to verify all posts were captured
- [ ] Open `blog.html` in a browser to check the listing page
- [ ] Click through several blog posts to verify formatting
- [ ] Check that all images loaded correctly
- [ ] Verify dates and categories are correct
- [ ] Test responsive design on mobile devices
- [ ] Check navigation and footer links work
- [ ] Verify SEO metadata in page titles

## 🔄 Re-running the Migration

If you need to re-run the migration:

1. **Backup your current files** (if you've made manual edits)
2. The script will overwrite existing files
3. Delete old blog posts before re-running: `rm blog-post-*.html`

## 📤 Migrating More Than 50 Posts

WordPress REST API limits responses to 100 posts maximum. To migrate more:

### Option 1: Multiple Runs (Recommended)

```javascript
// First run - posts 1-50
postsPerPage: 50,
offset: 0  // Add this line

// Second run - posts 51-100
postsPerPage: 50,
offset: 50  // Add this line
```

### Option 2: Pagination Script

For very large blogs (100+ posts), consider modifying the script to:
1. Fetch posts in batches
2. Use WordPress pagination
3. Combine results

## 🛠️ Advanced Customization

### Custom Post Types

To migrate custom post types instead of standard posts:

```javascript
const apiUrl = `${config.wordpressUrl}/wp-json/wp/v2/your-post-type?per_page=${config.postsPerPage}&_embed`;
```

### Custom Fields

To include custom fields, modify the `generateBlogPostHtml()` function:

```javascript
// Access custom fields from post.acf or post.meta
const customField = post.acf?.field_name || '';
```

### Related Posts

The current template doesn't include related posts. To add them:

1. Modify `generateBlogPostHtml()`
2. Add logic to find related posts by category
3. Include related posts HTML at the end

## 💾 Backup Strategy

Before running migration:

```bash
# Backup existing blog files
mkdir backup-$(date +%Y%m%d)
cp blog*.html backup-$(date +%Y%m%d)/
cp -r assets/images backup-$(date +%Y%m%d)/
```

## 🎯 Success Indicators

You'll know the migration was successful when:

✅ Script completes without errors
✅ `blog-metadata.json` contains all expected posts
✅ All blog post HTML files are created
✅ Featured images are in `assets/images/blog/`
✅ `blog.html` displays all posts correctly
✅ Individual post pages load and display properly
✅ Navigation and footer work on all pages

## 📞 Need Help?

If you encounter issues:

1. Check the console output for specific error messages
2. Verify your WordPress REST API is accessible
3. Review the troubleshooting section above
4. Check `blog-metadata.json` for what was successfully fetched
5. Review individual post HTML files for formatting issues

## 🔐 Security Considerations

- The script uses Node.js built-in `https` module (no external dependencies needed)
- All HTML content is processed but not sanitized (WordPress output is trusted)
- Image downloads are direct file writes
- No sensitive data is stored

## 📈 Performance

Migration performance depends on:
- Number of posts
- Image sizes
- Network speed
- WordPress server response time

Typical migration times:
- 10 posts: ~30 seconds
- 50 posts: ~2-3 minutes
- 100 posts: ~5-6 minutes

## ✨ Next Steps After Migration

1. **Review Content**: Check a few posts to ensure formatting is correct
2. **Update Navigation**: Ensure blog is linked from main navigation
3. **SEO Check**: Verify meta descriptions and titles
4. **Test Mobile**: Check responsive design on various devices
5. **Add to Git**: Commit your new blog posts
6. **Deploy**: Push to your hosting platform
7. **Redirects**: Set up 301 redirects from old WordPress URLs to new URLs

## 📚 Additional Resources

- [WordPress REST API Documentation](https://developer.wordpress.org/rest-api/)
- [Node.js https Module](https://nodejs.org/api/https.html)
- [Blog Design Guide](DESIGN-OVERVIEW.md)

---

**Ready to migrate?** Run the script and watch your WordPress blog transform into a modern static website! 🚀
