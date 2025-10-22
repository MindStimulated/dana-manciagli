# New Claude Code Session - Briefing Document

**Copy this prompt to start your new Claude Code session:**

---

## 🎯 Project Context

I'm working on the **Dana Manciagli Professional Legacy Website** - a single-page professional portfolio site for a Fortune 500 career expert and author.

**Current Status**:
- ✅ **LIVE & DEPLOYED**: https://mindstimulated.github.io/dana-manciagli/
- ✅ **Repository**: https://github.com/MindStimulated/dana-manciagli
- ✅ **95% Complete** - Deployed October 16, 2025
- ⚠️ **Awaiting client feedback** for final 5%

**Project Location**: `/Users/shoetieai/Documents/dana-manciagli/`

---

## 📁 Project Structure

```
dana-manciagli/
├── index.html                    (612 lines - main website)
├── styles/main.css               (1,485 lines - all styling)
├── scripts/main.js               (412 lines - interactive features)
├── assets/images/
│   ├── dana-manciagli-photo.png  (✅ professional headshot - ADDED)
│   ├── forbes-coaches-council-badge.png (✅ badge image)
│   └── veterans-job-search.jpeg  (✅ bonus image)
└── [9 documentation files - see below]
```

---

## 📚 Key Documentation Files

**Read these first to understand the project**:

1. **CLIENT-CONTENT-REVIEW.md** ⭐ - Complete content breakdown for client approval
2. **IMPLEMENTATION-REVIEW.md** - Technical status, gaps, and action items
3. **MOBILE-ACCESSIBILITY-CHECKLIST.md** - Testing requirements
4. **PROJECT-SUMMARY.md** - Project overview and deliverables
5. **DEPLOYMENT-CHECKLIST.md** - Pre-launch checklist
6. **CONTENT-GUIDE.md** - Where to find/edit content
7. **README.md** - Setup and deployment instructions
8. **DESIGN-OVERVIEW.md** - Visual design specifications
9. **QUICK-START.md** - Fast deployment guide

---

## 🎨 Design Specifications

**Color Palette**:
- Primary Navy: `#1a2947`
- Accent Gold: `#c9a961`
- Text Charcoal: `#2c3e50`

**Typography**:
- Headings: Playfair Display (serif)
- Body: Inter (sans-serif)

**Aesthetic**: Sophisticated editorial (Forbes/Harvard Business Review inspired)

---

## 📋 Current To-Do List

### HIGH PRIORITY - Client Feedback Needed
1. ⚠️ **Update email address** (currently `dana@example.com` - appears 3 times)
2. ⚠️ **Add 3 external links**:
   - Book purchase URL (line 454 in index.html)
   - Career Mojo column archive (line 466)
   - Free networking guide download (line 474)
3. ⚠️ **Add book cover image** (currently placeholder at line 428-432)
4. ⚠️ **Connect contact form backend** (FormSpree or Netlify Forms)

### MEDIUM PRIORITY - Testing & Optimization
5. ⚠️ **Add alt text to all images** (3 images need descriptive alt text)
6. ⚠️ **Test mobile responsiveness** on real devices
7. ⚠️ **Run accessibility audit** (WCAG 2.1 AA compliance)
8. ⚠️ **Test keyboard navigation** throughout site
9. ⚠️ **Verify color contrast** ratios meet standards
10. ⚠️ **Test with screen reader** (VoiceOver/NVDA)

---

## 🎯 What I Need You To Do

I'm receiving client feedback and need to implement content changes. Please:

### 1. **Review the Documentation First**
Start by reading `CLIENT-CONTENT-REVIEW.md` to understand all current content and where it lives in the codebase.

### 2. **Be Ready to Make These Types of Edits**:
- Update text content (headlines, descriptions, testimonials)
- Replace placeholder email and links
- Add/replace images (with alt text)
- Modify statistics or credentials
- Adjust service offerings or positioning
- Update contact information

### 3. **Follow These Guidelines**:
- **Preserve the design** - Don't change colors, fonts, or layout
- **Maintain responsive behavior** - Test that changes work on mobile
- **Add proper alt text** - All images need descriptive, meaningful alt text
- **Use exact line references** - I'll provide from `CONTENT-GUIDE.md`
- **Test after changes** - Verify nothing breaks
- **Update git** - Commit changes with clear messages

### 4. **Know These Code Locations**:
All content is in `index.html`. Key sections:
- **Hero**: Lines 44-94
- **About**: Lines 96-158
- **Impact**: Lines 160-248 (stats, highlights, testimonials)
- **Expertise**: Lines 250-304 (8 areas)
- **Services**: Lines 306-377 (3 service types)
- **Featured**: Lines 379-415 (credentials, badges)
- **Resources**: Lines 417-478 (book, Career Mojo, free guide)
- **Contact**: Lines 480-558 (form, email, LinkedIn)
- **Footer**: Lines 560-607

### 5. **Be Prepared for Common Requests**:
- "Change the headline to..."
- "Update this testimonial..."
- "Replace the email address everywhere..."
- "Add this URL for the book link..."
- "Update statistics to reflect new numbers..."
- "Add alt text to the professional photo..."

---

## ⚡ Quick Reference

### Replace Email Address Globally
```bash
# Search for: dana@example.com
# Found in: Lines 497, 592, and potentially footer
# Replace with: [client's actual email]
```

### Add Alt Text to Images
```html
<!-- Current (line 82-84): -->
<img src="assets/images/dana-manciagli-photo.png"
     alt="Dana Manciagli - Professional Photo"
     style="width: 100%; height: 100%; object-fit: cover;">

<!-- Needs descriptive alt like: -->
alt="Dana Manciagli, professional headshot in business attire with navy background"
```

### Update External Links
```html
<!-- Book link (line 454): -->
<a href="#" class="btn btn--secondary">Learn More</a>
<!-- Change # to actual Amazon/publisher URL -->

<!-- Career Mojo (line 466): -->
<a href="#" class="resource__link">Read the Archive →</a>
<!-- Change # to column archive URL -->

<!-- Free Guide (line 474): -->
<a href="#" class="resource__link">Download Free Guide →</a>
<!-- Change # to PDF/landing page URL -->
```

### Connect Contact Form (FormSpree)
```html
<!-- Add to form tag at line 511: -->
<form class="contact__form" id="contact-form"
      action="https://formspree.io/f/YOUR_FORM_ID"
      method="POST">
```

---

## 🚨 Important Constraints

### DO:
✅ Make content changes as requested
✅ Update links and email addresses
✅ Add descriptive alt text to images
✅ Test changes in browser before committing
✅ Maintain existing design and layout
✅ Commit changes with clear messages
✅ Ask clarifying questions if instructions unclear

### DON'T:
❌ Change colors or typography without explicit request
❌ Modify the responsive layout/breakpoints
❌ Remove or restructure sections without approval
❌ Change the design aesthetic
❌ Auto-deploy without confirmation
❌ Skip testing mobile responsiveness
❌ Forget to update git after changes

---

## 📊 Success Criteria

After implementing client feedback, the site should:
- ✅ Have real contact email (not placeholder)
- ✅ Have all external links working
- ✅ Have book cover image (if provided)
- ✅ Have contact form connected and working
- ✅ Have descriptive alt text on all images
- ✅ Pass accessibility audit (WCAG 2.1 AA)
- ✅ Work perfectly on mobile devices
- ✅ Be ready for final client approval

---

## 🔄 Git Workflow

After making changes:

```bash
cd /Users/shoetieai/Documents/dana-manciagli
git add .
git commit -m "Update: [describe changes - e.g., 'Replace email address and add book purchase link']"
git push origin main
```

GitHub Pages will auto-deploy changes within 1-2 minutes.

---

## 📞 Communication Style

When I provide client feedback, I may say things like:
- "Client wants to change the headline to..."
- "Update the email to..."
- "Add this link for the book..."
- "Here's the new book cover image..."
- "Client approved all content except..."

Please:
1. Confirm you understand the request
2. Show me the specific changes you'll make
3. Make the changes
4. Confirm completion with line numbers
5. Remind me to test on the live site

---

## 🎯 First Action

Please start by:
1. Reading `CLIENT-CONTENT-REVIEW.md` to understand all current content
2. Confirming you understand the project structure
3. Letting me know you're ready to implement client feedback

Then I'll share the specific client requests, and we can work through them systematically.

---

**Ready to implement client feedback and get this site to 100% completion!** 🚀
