# Content Customization Guide

This guide helps you find and update specific content sections in the website.

## 📝 Content Location Map

All content is in `index.html`. Here's where to find each section:

### 🏆 Hero Section (Lines 39-93)

**Main Headline** (Line 52):
```html
<h1 class="hero__title">
    Dana Manciagli: <span class="hero__title-accent">Fortune 500 Career Expert</span>
    & Trusted Voice in Job Search Strategy
</h1>
```

**Subheadline** (Lines 55-58):
```html
<p class="hero__subtitle">
    Three decades of hiring experience from Microsoft, IBM, and Kodak.
    Author, speaker, and career strategist who's helped thousands navigate their career journey.
</p>
```

**Badge Text** (Line 50):
```html
<span>Top 10 Job Search Coach in the Nation</span>
```

---

### 👤 About Section (Lines 96-192)

**Main Biography** (Lines 108-134):
- Lead paragraph: Lines 108-112
- Career details: Lines 113-117
- Publications: Lines 118-123
- Education: Lines 124-129

**Career Timeline** (Lines 139-189):
Update these to reflect actual career milestones:
- Microsoft: Lines 144-151
- IBM/Kodak/Avery: Lines 154-161
- Startup: Lines 164-171
- Current: Lines 174-181

---

### 📊 Impact Section (Lines 195-320)

**Statistics** (Lines 215-234):
Update these numbers with actual metrics:
```html
<div class="stat__number">30+</div>
<div class="stat__label">Years Fortune 500 Experience</div>
```

Current stats:
- **30+** Years Fortune 500 Experience
- **1,200+** Presentations Delivered
- **175,000+** Audience Members Reached
- **Thousands** Professionals Coached

**Testimonials** (Lines 272-314):
Replace with actual client testimonials. Each testimonial has:
- Quote text
- Author title
- Context/industry

---

### 💼 Expertise Section (Lines 323-398)

**8 Areas of Expertise**:
Each card has:
- Icon (emoji)
- Title
- Description

To modify, find the expertise item and update:
```html
<div class="expertise__item">
    <div class="expertise__icon">💼</div>
    <h3 class="expertise__title">Your Title</h3>
    <p class="expertise__description">Your description</p>
</div>
```

---

### 🎤 Services Section (Lines 401-475)

**Three Service Categories**:

1. **Keynote Speaking** (Lines 411-429)
2. **Webinars & Workshops** (Lines 431-447)
3. **Private Consultation** (Lines 449-466)

Each has:
- Icon
- Title
- Description
- List of topics

**Service Note** (Lines 471-473):
```html
<p class="services__cta-text">
    Interested in working together?
</p>
```

---

### 🏅 Featured Section (Lines 478-534)

**Credentials Logos** (Lines 487-494):
Replace text with actual logo images or keep as text:
```html
<div class="featured__logo">Forbes Coaches Council</div>
<div class="featured__logo">Business Journals</div>
```

**Achievement Badges** (Lines 497-528):
Four highlighted achievements with icons and text.

---

### 📚 Resources Section (Lines 537-594)

**Book Information** (Lines 550-586):
- Book title: Line 571
- Subtitle: Line 572
- Description: Lines 573-577
- Features: Lines 578-590
- CTA button: Line 591

**Additional Resources** (Lines 589-594):
- Career Mojo Column
- Free Networking Guide

---

### 📧 Contact Section (Lines 597-664)

**Contact Form Fields**:
- Name (required)
- Organization
- Email (required)
- Phone
- Inquiry Type (dropdown)
- Message (required)

**Contact Information** (Lines 609-632):
```html
<a href="mailto:dana@example.com">dana@example.com</a>
<a href="https://www.linkedin.com/in/danamanciagli/">Connect on LinkedIn</a>
```

**Form Note** (Lines 656-658):
```html
<p class="form__note">
    * Due to volume, Dana responds to inquiries on a selective basis.
    Please allow 5-7 business days for a response.
</p>
```

---

## 🎨 Style Customization

### Change Colors

In `styles/main.css` (Lines 10-26):

```css
:root {
  /* Primary Colors */
  --color-primary: #1a2947;        /* Deep navy - main brand color */
  --color-primary-light: #2a3f5f;
  --color-primary-dark: #0f1829;

  /* Accent Colors */
  --color-accent: #c9a961;         /* Elegant gold - highlights */
  --color-accent-light: #dac18a;
  --color-accent-dark: #a88b3f;

  /* Text Colors */
  --color-text: #2c3e50;           /* Charcoal - body text */
  --color-text-light: #5a6c7d;
  --color-text-muted: #8795a8;
}
```

### Change Fonts

In `index.html` (Lines 17-19):
```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
```

In `styles/main.css` (Lines 28-29):
```css
--font-serif: 'Playfair Display', Georgia, serif;    /* Headings */
--font-sans: 'Inter', -apple-system, sans-serif;     /* Body text */
```

---

## 🔗 External Links to Update

Before launch, replace all placeholder `#` links:

### Required Updates:
- [ ] **Line 510**: Career Mojo column archive URL
- [ ] **Line 502**: Book purchase link (Amazon, publisher, etc.)
- [ ] **Line 518**: Free download link (PDF, Google Drive, etc.)
- [ ] **All email addresses**: Replace `dana@example.com` with real email
- [ ] **Line 685**: Privacy Policy URL (if applicable)
- [ ] **Line 686**: Terms of Use URL (if applicable)

### Quick Find & Replace:
```
Find: href="#"
Replace with actual URLs one by one
```

---

## 📸 Image Guidelines

### Professional Headshot
- **Location**: `assets/images/dana-professional.jpg`
- **Dimensions**: 800px width × 1000px height (4:5 ratio)
- **Format**: JPG or PNG
- **Quality**: High resolution, professional business attire
- **Background**: Solid or subtly blurred
- **Expression**: Confident, approachable, professional

### Book Cover
- **Location**: `assets/images/book-cover.jpg`
- **Dimensions**: 600px width × 900px height (2:3 ratio)
- **Format**: JPG or PNG
- **Quality**: High resolution, clear text
- **Orientation**: Portrait (vertical)

### Optional Additional Images
Add more images in `assets/images/` and reference them in HTML:
```html
<img src="assets/images/your-image.jpg" alt="Description">
```

---

## ✏️ Writing Style Guidelines

Based on your requirements, content should be:

### Tone
- **Accomplished**: Showcase expertise without bragging
- **Selective**: Position Dana as choosing engagements
- **Legacy-Focused**: Culmination of decades of expertise
- **Authoritative**: Fortune 500 credibility
- **Generous**: Still offering wisdom despite winding down

### Language to Use
✅ "Three decades of insider perspective"
✅ "Trusted advisor to Fortune 500 leaders"
✅ "Available for select speaking engagements"
✅ "Legacy of impact"
✅ "Proven track record"
✅ "Limited consulting opportunities"

### Language to Avoid
❌ "Buy now" or urgent CTAs
❌ Course pricing or package details
❌ Anything suggesting she's building a business
❌ Overly casual or salesy tone
❌ Superlatives without substance

---

## 🎯 SEO Content Tips

### Page Title (Line 22)
Keep it descriptive and keyword-rich:
```html
<title>Dana Manciagli - Fortune 500 Career Expert & Trusted Voice in Job Search Strategy</title>
```

### Meta Description (Line 7)
```html
<meta name="description" content="Dana Manciagli - Fortune 500 Career Expert & Trusted Voice in Job Search Strategy. Three decades of hiring experience from Microsoft, IBM, and Kodak.">
```

### Heading Hierarchy
- **H1**: Used once in hero (main page title)
- **H2**: Section titles (About, Impact, Services, etc.)
- **H3**: Subsection titles
- **H4+**: Minor headings

---

## 📱 Testing Your Changes

After making content updates:

1. **Save** your changes
2. **Refresh** browser (Cmd/Ctrl + Shift + R to clear cache)
3. **Test** on:
   - Desktop (Chrome, Firefox, Safari)
   - Tablet view (responsive mode)
   - Mobile view (responsive mode)
4. **Check**:
   - All text is readable
   - Links work correctly
   - Images display properly
   - Contact form still works
   - Layout isn't broken

---

## 🚀 Content Update Workflow

### Quarterly Updates
1. Add new testimonials
2. Update speaking engagement highlights
3. Refresh statistics if needed
4. Review and update credentials

### Annual Updates
1. Update professional photo
2. Review all content for relevance
3. Update career timeline if major milestones
4. Refresh external links

---

## 💡 Content Tips

### Testimonials
- Use real names and titles (with permission)
- Include specific results when possible
- Mix different career levels (mid-career, executive)
- Keep them conversational and authentic

### Statistics
- Update with real numbers when available
- Use ranges if exact numbers change (e.g., "1,200+" allows growth)
- Back up claims with evidence
- Keep "Thousands" for ongoing counts

### Services Description
- Focus on outcomes, not features
- Use action-oriented language
- Be specific about what clients get
- Maintain selective positioning

---

**Need to find something specific?** Use your code editor's search function (Cmd/Ctrl + F) to find text quickly in `index.html`.