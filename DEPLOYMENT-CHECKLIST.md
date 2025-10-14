# Deployment Checklist

Use this checklist to ensure everything is ready before launching the site.

## ☐ Pre-Launch Checklist

### 1. Content & Images
- [ ] Professional headshot added to `assets/images/dana-professional.jpg`
- [ ] Book cover added to `assets/images/book-cover.jpg`
- [ ] All placeholder text reviewed and approved
- [ ] Testimonials verified (permissions obtained)
- [ ] Statistics and numbers confirmed accurate
- [ ] Bio content proofread and approved

### 2. Contact Information
- [ ] Email address updated (search for `dana@example.com`)
- [ ] LinkedIn URL verified (`https://www.linkedin.com/in/danamanciagli/`)
- [ ] Contact form connects to backend service
- [ ] Test email received successfully

### 3. External Links
- [ ] Career Mojo column URL added (line ~510)
- [ ] Book purchase link added (line ~502)
- [ ] Free download link added (line ~518)
- [ ] All social media links verified
- [ ] Privacy policy link (if applicable)
- [ ] Terms of use link (if applicable)

### 4. Technical Setup
- [ ] Hosting platform selected
- [ ] Custom domain purchased (optional)
- [ ] DNS configured (if custom domain)
- [ ] SSL/HTTPS enabled
- [ ] Contact form backend configured
- [ ] Google Analytics added (optional)

### 5. Testing - Desktop
- [ ] Test in Chrome (latest version)
- [ ] Test in Firefox (latest version)
- [ ] Test in Safari (latest version)
- [ ] Test in Edge (latest version)
- [ ] All navigation links work
- [ ] Smooth scrolling functions
- [ ] Images display correctly
- [ ] Animations work smoothly
- [ ] Contact form submits successfully

### 6. Testing - Mobile
- [ ] Test on iPhone (Safari)
- [ ] Test on Android (Chrome)
- [ ] Mobile menu opens/closes
- [ ] All content readable
- [ ] Form usable on mobile
- [ ] Images scale correctly
- [ ] Touch targets adequate size

### 7. Testing - Tablet
- [ ] Test on iPad (or browser tablet view)
- [ ] Layout adapts correctly
- [ ] Navigation functional
- [ ] Form works properly

### 8. Performance
- [ ] Page loads in < 3 seconds on 3G
- [ ] Images optimized for web
- [ ] No console errors
- [ ] Lighthouse score checked (optional)
- [ ] All assets loading correctly

### 9. Accessibility
- [ ] Tab navigation works
- [ ] Alt text added to images
- [ ] Color contrast sufficient
- [ ] Screen reader tested (optional)
- [ ] Form labels properly associated

### 10. SEO
- [ ] Page title optimized
- [ ] Meta description added
- [ ] Open Graph tags in place
- [ ] Image alt text descriptive
- [ ] Heading hierarchy correct (H1→H2→H3)

## ☐ Launch Day Checklist

### Deploy
- [ ] Files uploaded to hosting
- [ ] Site accessible at URL
- [ ] HTTPS working (secure connection)
- [ ] No broken links
- [ ] Images loading on live site

### Post-Launch
- [ ] Submit to Google Search Console
- [ ] Test contact form on live site
- [ ] Share URL with Dana for approval
- [ ] Create backup of all files
- [ ] Document admin credentials

## ☐ Week 1 Post-Launch

- [ ] Monitor contact form submissions
- [ ] Check for any error reports
- [ ] Review analytics (if installed)
- [ ] Fix any minor issues discovered
- [ ] Make any requested adjustments

## ☐ Month 1 Post-Launch

- [ ] Review visitor statistics
- [ ] Analyze form submission rate
- [ ] Check search engine indexing
- [ ] Gather user feedback
- [ ] Plan first content update

---

## 🚀 Quick Deploy Options

### Option A: Netlify (Recommended - Easiest)
1. [ ] Go to [netlify.com](https://www.netlify.com)
2. [ ] Create free account
3. [ ] Drag `dana-manciagli` folder to Netlify
4. [ ] Site deploys automatically
5. [ ] Configure custom domain (optional)
6. [ ] Enable Netlify Forms for contact

**Time**: ~5 minutes

### Option B: Vercel
1. [ ] Go to [vercel.com](https://vercel.com)
2. [ ] Create free account
3. [ ] Import project or drag folder
4. [ ] Automatic deployment
5. [ ] Configure custom domain (optional)

**Time**: ~5 minutes

### Option C: GitHub Pages (Free)
1. [ ] Create GitHub account
2. [ ] Create new repository
3. [ ] Upload files to repository
4. [ ] Enable GitHub Pages in settings
5. [ ] Access at `username.github.io/dana-manciagli`

**Time**: ~10 minutes

### Option D: Traditional Hosting
1. [ ] Purchase hosting plan
2. [ ] Access cPanel or FTP
3. [ ] Upload files to `public_html`
4. [ ] Configure domain
5. [ ] Enable SSL certificate

**Time**: ~30 minutes

---

## 📋 Contact Form Setup

### Option A: FormSpree (Easiest)
1. [ ] Sign up at [formspree.io](https://formspree.io)
2. [ ] Create new form
3. [ ] Copy form ID
4. [ ] Add to `index.html` form action:
   ```html
   <form action="https://formspree.io/f/YOUR_ID" method="POST">
   ```
5. [ ] Test form submission

**Time**: ~5 minutes | **Cost**: Free tier available

### Option B: Netlify Forms
1. [ ] Deploy to Netlify first
2. [ ] Add `netlify` attribute to form tag:
   ```html
   <form netlify name="contact">
   ```
3. [ ] Redeploy site
4. [ ] Check Netlify dashboard for submissions

**Time**: ~2 minutes | **Cost**: Free

### Option C: Custom Backend
1. [ ] Set up server endpoint
2. [ ] Modify `handleFormSubmission()` in `scripts/main.js`
3. [ ] Add CORS headers
4. [ ] Test thoroughly

**Time**: 1-2 hours | **Cost**: Varies

---

## 🐛 Pre-Launch Testing Scenarios

### Navigation Testing
- [ ] Click every menu item
- [ ] Click footer links
- [ ] Click CTA buttons
- [ ] Test smooth scroll
- [ ] Test mobile menu toggle

### Form Testing
- [ ] Submit with all fields filled
- [ ] Submit with required fields only
- [ ] Try to submit empty form (should error)
- [ ] Try invalid email format (should error)
- [ ] Verify success message appears
- [ ] Check email is received

### Responsive Testing
- [ ] Resize browser from 320px to 1920px
- [ ] Check all breakpoints (768px, 1024px, 1280px)
- [ ] Verify no horizontal scrolling on mobile
- [ ] Check mobile menu at < 768px
- [ ] Test on actual devices

### Image Testing
- [ ] Verify hero image displays
- [ ] Verify book cover displays
- [ ] Check image quality
- [ ] Ensure no broken image icons
- [ ] Verify images are optimized (< 500KB each)

---

## 🔍 Common Issues & Fixes

### Images Not Showing
**Problem**: Broken image icons appear
**Fix**:
- Check file paths are correct
- Ensure images are in `assets/images/`
- Verify file extensions match (case-sensitive)

### Contact Form Not Working
**Problem**: Form doesn't submit
**Fix**:
- Check JavaScript console for errors
- Verify form action URL is correct
- Test FormSpree/Netlify Forms setup
- Check network tab for failed requests

### Mobile Menu Won't Open
**Problem**: Hamburger menu doesn't work
**Fix**:
- Verify JavaScript is loading
- Check browser console for errors
- Test in different browser
- Clear cache and retry

### Styling Looks Broken
**Problem**: Layout appears wrong
**Fix**:
- Clear browser cache (Cmd/Ctrl + Shift + R)
- Check CSS file is loading
- Verify no syntax errors in CSS
- Test in incognito/private mode

---

## 📊 Success Metrics to Track

### Week 1
- Total visitors
- Pages per session
- Contact form submissions
- Bounce rate

### Month 1
- Organic search traffic
- Referral sources
- Mobile vs desktop split
- Speaking inquiry conversion rate

### Ongoing
- Monthly visitor trend
- Form submission rate
- Popular sections (scroll depth)
- Geographic distribution

---

## ✅ Final Approval

Before announcing the launch:

- [ ] Dana has reviewed and approved the site
- [ ] All content is accurate and current
- [ ] Contact form has been tested and works
- [ ] Site looks professional on all devices
- [ ] Load time is acceptable (< 3 seconds)
- [ ] All links work correctly
- [ ] Backup of site files created
- [ ] Deployment credentials documented

---

## 🎉 You're Ready to Launch!

Once all items are checked off, you're ready to share the site with the world.

**Congratulations on launching Dana's professional legacy site!** 🚀

---

## 📞 Post-Launch Support

### Regular Maintenance
- Check weekly for form submissions
- Review monthly for needed updates
- Quarterly content refresh
- Annual design review

### Emergency Contacts
- Hosting provider support
- Domain registrar support
- FormSpree/contact form service
- Web developer (if needed)

### Backup Strategy
- Keep local copy of all files
- Export form submissions monthly
- Document any customizations
- Version control recommended (Git)

---

**Use this checklist each time you make major updates or redeploy the site.**