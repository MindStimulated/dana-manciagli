# WordPress Migration - Quick Start Guide

## 🚀 Three Simple Steps

### Step 1: Configure

Run the configuration wizard:

```bash
cd /Users/shoetieai/Documents/dana-manciagli
node scripts/configure-migration.js
```

The wizard will ask:
1. Your WordPress site URL
2. How many posts to migrate (default: 50)
3. Test the connection
4. Ask if you want to run the migration immediately

### Step 2: Run Migration (if not run automatically)

```bash
node scripts/wordpress-migration.js
```

### Step 3: Review Results

Open in your browser:
- `blog.html` - View the blog listing page
- `blog-post-1.html` - View the first migrated post
- Check `blog-metadata.json` for all post data

## 📊 What Happens During Migration

```
🚀 Starting Migration...
   ↓
📥 Fetching posts from WordPress REST API
   ↓
📝 For each post:
   • Download featured image
   • Convert content to HTML
   • Generate blog post page
   • Add to listing page
   ↓
💾 Save metadata.json
   ↓
✅ Complete!
```

## 📁 Files Created

```
✅ blog-post-1.html, blog-post-2.html, ... (up to 50)
✅ blog.html (updated listing page)
✅ blog-metadata.json (all post data)
✅ assets/images/blog/*.jpg (downloaded images)
```

## 🔧 Manual Configuration (Alternative)

If you prefer to configure manually:

1. Open `scripts/wordpress-migration.js`
2. Find line 20
3. Replace `'https://your-wordpress-site.com'` with your WordPress URL
4. Run: `node scripts/wordpress-migration.js`

## ⚡ Expected Time

- 10 posts: ~30 seconds
- 50 posts: ~2-3 minutes
- 100 posts: ~5-6 minutes

## ✅ Success Indicators

You'll know it worked when:
- ✅ Console shows "Migration complete!"
- ✅ `blog-metadata.json` exists with post data
- ✅ New `blog-post-*.html` files exist
- ✅ Images are in `assets/images/blog/`
- ✅ Opening `blog.html` in browser shows all posts

## ⚠️ Common Issues

### Issue: "Error fetching posts"
**Solution**: Check your WordPress URL is correct and accessible

### Issue: "No featured image found"
**Solution**: Normal - not all posts have featured images. Posts will still be created.

### Issue: "Connection timeout"
**Solution**: Check your internet connection and try again

## 💡 Tips

1. **Test First**: Run with 5-10 posts first to verify everything works
2. **Backup**: Backup existing files before running
3. **Review**: Check a few posts manually after migration
4. **Customize**: Edit generated HTML if needed

## 📞 Need More Help?

See the full documentation:
- `WORDPRESS-MIGRATION-GUIDE.md` - Complete guide with troubleshooting
- `scripts/wordpress-migration.js` - View/edit the migration script

## 🎯 Next Steps After Migration

1. ✅ Review migrated posts in browser
2. ✅ Check image quality and formatting
3. ✅ Test responsive design on mobile
4. ✅ Update any links or references
5. ✅ Deploy to your hosting platform

---

**Ready?** Run `node scripts/configure-migration.js` to get started! 🚀
