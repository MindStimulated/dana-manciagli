# Quick Start Guide - Dana Manciagli Website

Get your professional legacy site up and running in 5 simple steps.

## ⚡ 5-Minute Setup

### Step 1: Add Your Photos (2 minutes)

1. **Professional Headshot**:
   - Save as: `assets/images/dana-professional.jpg`
   - Recommended size: 800x1000px (portrait orientation)
   - High quality, professional business attire

2. **Book Cover**:
   - Save as: `assets/images/book-cover.jpg`
   - Recommended size: 600x900px (2:3 aspect ratio)
   - Cover image of "Cut the Crap, Get a Job!"

### Step 2: Update Contact Information (1 minute)

Open `index.html` and find/replace:

```
Find: dana@example.com
Replace: your-actual-email@domain.com
```

### Step 3: Update External Links (1 minute)

In `index.html`, update these placeholder links (search for `href="#"`):

- **Line 510**: Career Mojo column archive URL
- **Line 502**: Book purchase link (Amazon, etc.)
- **Line 518**: Free networking guide download link

### Step 4: Test Locally (30 seconds)

```bash
# Option 1: Double-click index.html
# Option 2: Use Python
cd dana-manciagli
python3 -m http.server 8000
# Open: http://localhost:8000
```

### Step 5: Deploy (30 seconds)

**Easiest Option - Netlify:**
1. Go to [netlify.com](https://www.netlify.com)
2. Sign up (free)
3. Drag the entire `dana-manciagli` folder to Netlify
4. Done! You get a free URL with HTTPS

## 🎯 Essential Customizations

### Change Colors (Optional)

In `styles/main.css` (lines 11-13):

```css
--color-primary: #1a2947;      /* Navy: Change to your brand color */
--color-accent: #c9a961;       /* Gold: Change to your accent color */
```

### Setup Contact Form

**Option A - FormSpree (Recommended):**
1. Sign up at [formspree.io](https://formspree.io)
2. Create new form, copy your form ID
3. In `index.html`, find the `<form>` tag (line 612) and add:

```html
<form class="contact__form" id="contact-form"
      action="https://formspree.io/f/YOUR_FORM_ID"
      method="POST">
```

**Option B - Netlify Forms:**
1. Deploy to Netlify first
2. Add `netlify` to form tag:

```html
<form class="contact__form" id="contact-form"
      netlify
      name="contact">
```

## 📱 Testing Checklist

Before going live:

- [ ] View on your phone (or use browser's mobile view)
- [ ] Click all navigation links
- [ ] Submit test contact form
- [ ] Check photos display correctly
- [ ] Test on Chrome, Firefox, and Safari

## 🚀 Going Live

### Connect Custom Domain

**On Netlify:**
1. Go to Domain Settings
2. Click "Add custom domain"
3. Follow DNS setup instructions
4. Automatic HTTPS included

**On Other Hosts:**
1. Upload files via FTP/cPanel
2. Point domain to hosting
3. Enable SSL certificate

## 🆘 Common Issues

**Photos not showing?**
- Check file names match exactly (case-sensitive!)
- Make sure they're in `assets/images/` folder

**Contact form not working?**
- Did you set up FormSpree or Netlify Forms?
- Check browser console for errors (F12)

**Layout looks broken?**
- Clear browser cache (Cmd/Ctrl + Shift + R)
- Check `styles/main.css` loaded correctly

**Mobile menu won't open?**
- Check `scripts/main.js` loaded
- Try different browser

## 💡 Pro Tips

1. **Keep it Simple**: Don't over-customize. The design is intentionally clean and professional.

2. **Update Regularly**: Add new testimonials and speaking engagements quarterly.

3. **Monitor Form**: Check form submissions weekly when you first launch.

4. **Analytics**: Add Google Analytics to track visitors (optional but recommended).

5. **Backup**: Keep a copy of your files in a safe place.

## 📞 Need Help?

- **Can't find a file?** All files are in the `dana-manciagli` folder
- **Deployment issues?** Check your hosting service's documentation
- **Design questions?** Refer to `README.md` for detailed customization

---

**You're ready to launch! 🎉**

The site is designed to be low-maintenance. Once live, you can focus on your work while the site maintains your professional presence.