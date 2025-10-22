# Mobile & Accessibility Testing Checklist
## Dana Manciagli Website

**Purpose**: Ensure website is fully optimized for mobile devices and meets WCAG 2.1 AA accessibility standards.
**Live Website**: https://mindstimulated.github.io/dana-manciagli/
**Last Updated**: October 19, 2025

---

## 📱 MOBILE OPTIMIZATION CHECKLIST

### Screen Size Testing
- [ ] **320px** - iPhone SE (smallest common phone)
- [ ] **375px** - iPhone 12/13 (most common)
- [ ] **390px** - iPhone 14 Pro
- [ ] **414px** - iPhone Pro Max
- [ ] **360px** - Samsung Galaxy (most common Android)
- [ ] **412px** - Google Pixel
- [ ] **768px** - iPad Mini/Portrait tablets
- [ ] **1024px** - iPad/Landscape tablets

### Device Testing (Physical Devices)
- [ ] iPhone (Latest iOS - Safari)
- [ ] iPhone (iOS 15+ - Safari)
- [ ] Android Phone (Latest - Chrome)
- [ ] Android Phone (Android 10+ - Chrome)
- [ ] iPad (Safari)
- [ ] Android Tablet (Chrome)

### Browser Testing (Mobile)
- [ ] Safari (iOS) - Latest version
- [ ] Chrome (iOS) - Latest version
- [ ] Chrome (Android) - Latest version
- [ ] Samsung Internet (Android)
- [ ] Firefox (iOS/Android)

---

## 🎯 MOBILE USABILITY CHECKLIST

### Navigation & Menu
- [ ] Hamburger menu icon clearly visible (24px minimum)
- [ ] Menu opens smoothly without lag
- [ ] Menu closes when clicking outside or on link
- [ ] All menu items easily tappable (44x44px minimum)
- [ ] Menu doesn't overlap important content
- [ ] Scroll position maintained when menu opens/closes
- [ ] Logo clickable and returns to top

### Touch Targets (Apple/Android Guidelines)
- [ ] All buttons minimum 44×44px
- [ ] All links minimum 44×44px (or adequate padding)
- [ ] Form inputs minimum 44px height
- [ ] Sufficient spacing between touch targets (8px minimum)
- [ ] No accidental taps due to proximity
- [ ] Swipe gestures don't interfere with browser navigation

### Typography & Readability
- [ ] Body text minimum 16px (readable without zoom)
- [ ] Sufficient line height (1.5-1.7 for body text)
- [ ] Text doesn't require horizontal scrolling
- [ ] Headings clearly distinguishable
- [ ] Sufficient contrast for readability in sunlight
- [ ] No text truncation or cut-off

### Layout & Spacing
- [ ] No horizontal scrolling at any breakpoint
- [ ] Content stacks vertically in logical order
- [ ] Adequate whitespace between sections
- [ ] Images don't exceed container width
- [ ] No layout shifts or jumpy content
- [ ] Consistent padding/margins throughout

### Forms (Critical)
- [ ] All form fields easy to tap and focus
- [ ] Labels clearly associated with inputs
- [ ] Dropdown menus work on mobile
- [ ] Form submits successfully on mobile
- [ ] Error messages visible and clear
- [ ] Success messages visible
- [ ] Keyboard doesn't obscure form fields
- [ ] Appropriate keyboard types (email, tel, number)
- [ ] Form validation works correctly

### Images & Media
- [ ] All images load and scale properly
- [ ] No broken images
- [ ] Images optimized for mobile (file size)
- [ ] Professional headshot displays correctly
- [ ] Images maintain aspect ratio
- [ ] No slow-loading images
- [ ] Book cover placeholder displays correctly

### Interactive Elements
- [ ] All buttons respond to touch
- [ ] Hover effects replaced with touch-appropriate feedback
- [ ] Links clearly distinguishable as clickable
- [ ] Smooth scroll works on mobile
- [ ] Animations perform smoothly (60fps)
- [ ] No janky scrolling or lag
- [ ] Contact form interactive elements work

### Performance (Mobile Network)
- [ ] Page loads under 3 seconds on 4G
- [ ] Page loads under 5 seconds on 3G
- [ ] No render-blocking resources
- [ ] Images lazy-load appropriately
- [ ] Smooth scrolling performance
- [ ] No layout shift during load

---

## ♿ ACCESSIBILITY CHECKLIST (WCAG 2.1 AA)

### Perceivable
#### Text Alternatives (1.1)
- [ ] All images have descriptive alt text
- [ ] Alt text is meaningful (not just "image" or filename)
- [ ] Decorative images have empty alt="" attribute
- [ ] Icons have accessible labels or text
- [ ] Logo has appropriate alt text

#### Adaptable (1.3)
- [ ] Semantic HTML used throughout (header, nav, main, section, footer)
- [ ] Heading hierarchy correct (H1→H2→H3, no skips)
- [ ] Lists properly marked up (ul, ol, li)
- [ ] Forms use fieldset/legend where appropriate
- [ ] Content order makes sense when CSS disabled
- [ ] Tables have proper headers (if any tables used)

#### Distinguishable (1.4)
- [ ] **Color contrast meets minimum ratios**:
  - [ ] Body text (16px): 4.5:1 minimum
  - [ ] Large text (24px+): 3.0:1 minimum
  - [ ] Buttons and UI elements: 3.0:1 minimum
- [ ] Color not sole means of conveying information
- [ ] Text resizable to 200% without loss of content
- [ ] Text over images has sufficient contrast
- [ ] Focus indicators visible (outline/border on keyboard focus)

### Operable
#### Keyboard Accessible (2.1)
- [ ] All functionality available via keyboard
- [ ] Tab order logical and predictable
- [ ] No keyboard traps (can tab in AND out)
- [ ] Skip to main content link present (recommended)
- [ ] Modal/menu can be closed with Escape key
- [ ] Focus visible on all interactive elements
- [ ] Custom components keyboard accessible

#### Enough Time (2.2)
- [ ] No time limits on reading/interacting
- [ ] Auto-advancing content can be paused (if any)
- [ ] Session timeouts have warnings (N/A for static site)

#### Seizures & Physical Reactions (2.3)
- [ ] No content flashes more than 3 times per second
- [ ] Animations can be stopped/disabled (if problematic)
- [ ] Parallax effects not excessive
- [ ] No motion-triggered actions without alternative

#### Navigable (2.4)
- [ ] Page has descriptive title (`<title>`)
- [ ] Links have clear purpose from link text alone
- [ ] Multiple ways to find pages (nav, footer, search - N/A for single page)
- [ ] Headings and labels descriptive
- [ ] Focus order logical
- [ ] Link purpose clear from context

### Understandable
#### Readable (3.1)
- [ ] Page language set (`<html lang="en">`)
- [ ] Language of parts specified if content changes language
- [ ] Clear, plain language used (appropriate for audience)

#### Predictable (3.2)
- [ ] Navigation consistent across pages (N/A - single page)
- [ ] Components behave consistently
- [ ] No automatic context changes on focus
- [ ] No automatic context changes on input
- [ ] Forms don't submit automatically

#### Input Assistance (3.3)
- [ ] Form errors identified clearly
- [ ] Form labels or instructions provided
- [ ] Error suggestions provided when possible
- [ ] Form validation prevents critical errors
- [ ] Success confirmation provided
- [ ] Required fields clearly marked

### Robust
#### Compatible (4.1)
- [ ] Valid HTML (no major parsing errors)
- [ ] Name, role, value set for all UI components
- [ ] Status messages announced to screen readers
- [ ] ARIA used correctly (if used at all)
- [ ] No duplicate IDs

---

## 🧪 TESTING TOOLS & METHODS

### Automated Testing
- [ ] **Lighthouse Audit** (Chrome DevTools)
  - Performance score: Target 90+
  - Accessibility score: Target 95+
  - Best Practices score: Target 95+
  - SEO score: Target 95+
- [ ] **WAVE** (WebAIM) - Accessibility checker
- [ ] **axe DevTools** - Accessibility testing
- [ ] **Color Contrast Analyzer** - WCAG color compliance

### Manual Testing
- [ ] **Keyboard Only Navigation** - Unplug mouse, use only keyboard
- [ ] **Screen Reader Testing**:
  - [ ] VoiceOver (Mac/iOS): Cmd+F5 to enable
  - [ ] NVDA (Windows): Free download
  - [ ] JAWS (Windows): Industry standard (paid)
  - [ ] TalkBack (Android): Built-in
- [ ] **Mobile Device Testing** - Real devices, not just emulation
- [ ] **Zoom Testing** - Zoom browser to 200%, verify no loss of content

### Browser Extensions
- [ ] **WAVE** - Quick accessibility overview
- [ ] **axe DevTools** - Detailed accessibility reports
- [ ] **Lighthouse** - Built into Chrome DevTools
- [ ] **HeadingsMap** - Verify heading structure
- [ ] **Color Contrast Analyzer** - Check contrast ratios

---

## 📋 CURRENT STATUS (Based on Code Review)

### ✅ Already Implemented
- [x] Semantic HTML5 structure
- [x] Responsive CSS (mobile-first approach)
- [x] Mobile menu functionality
- [x] Touch-friendly button sizes (CSS uses adequate padding)
- [x] Smooth scrolling
- [x] Color contrast (Navy #1a2947 on white passes WCAG AA)
- [x] Form validation
- [x] Keyboard navigation support
- [x] Focus states on interactive elements

### ⚠️ Needs Verification
- [ ] Alt text on professional photo (`dana-manciagli-photo.png`)
- [ ] Alt text on Forbes badge (`forbes-coaches-council-badge.png`)
- [ ] Alt text on veterans image (`veterans-job-search.jpeg`)
- [ ] Screen reader testing not yet performed
- [ ] Real mobile device testing not yet performed
- [ ] Color contrast on gold accent (#c9a961) - needs verification
- [ ] Touch target sizes on actual devices

### 🔧 Recommended Improvements
- [ ] Add skip to main content link
- [ ] Add ARIA labels to icon-only buttons
- [ ] Test form accessibility thoroughly
- [ ] Verify book cover placeholder accessibility when image added
- [ ] Add aria-label to mobile menu toggle
- [ ] Verify timeline component accessibility

---

## 🎯 PRIORITY TESTING SEQUENCE

### Phase 1: Quick Wins (30 minutes)
1. Add alt text to all 3 images
2. Test keyboard navigation (Tab through entire site)
3. Run Lighthouse audit in Chrome DevTools
4. Fix any critical accessibility issues found

### Phase 2: Manual Testing (1-2 hours)
1. Test on iPhone (Safari) - borrowed or personal device
2. Test on Android phone (Chrome) - borrowed or personal device
3. Test mobile menu functionality
4. Test form on mobile
5. Verify touch targets feel right

### Phase 3: Comprehensive Testing (2-3 hours)
1. Screen reader testing (VoiceOver or NVDA)
2. Test across multiple devices and screen sizes
3. Run automated accessibility tools (WAVE, axe)
4. Document any issues found
5. Create remediation plan for issues

---

## 🐛 COMMON ISSUES TO CHECK

### Mobile Issues
- [ ] Menu doesn't close when clicking links
- [ ] Text too small to read
- [ ] Buttons too small to tap accurately
- [ ] Form fields don't get keyboard focus
- [ ] Horizontal scrolling on small screens
- [ ] Images don't scale or are too large
- [ ] Slow loading on mobile networks
- [ ] Janky scrolling or animations

### Accessibility Issues
- [ ] Missing alt text on images
- [ ] Poor color contrast
- [ ] Keyboard traps in modals or menus
- [ ] Focus not visible
- [ ] Heading hierarchy skips levels
- [ ] Forms without labels
- [ ] Links with vague text ("click here")
- [ ] Content only conveyed by color
- [ ] Screen reader can't navigate properly

---

## 📊 SUCCESS CRITERIA

### Mobile
- ✅ Site usable on all devices 320px and up
- ✅ All content readable without zooming
- ✅ All interactive elements easily tappable
- ✅ Page loads under 3 seconds on 4G
- ✅ No horizontal scrolling at any size
- ✅ Mobile menu works smoothly
- ✅ Forms fully functional on mobile

### Accessibility
- ✅ WCAG 2.1 AA compliant (minimum)
- ✅ Lighthouse accessibility score 95+
- ✅ Keyboard navigation 100% functional
- ✅ Screen reader compatible
- ✅ Color contrast ratios meet minimums
- ✅ All images have descriptive alt text
- ✅ Semantic HTML throughout
- ✅ No accessibility errors in automated tools

---

## 🔗 USEFUL RESOURCES

### Testing Tools
- **Lighthouse**: Built into Chrome DevTools (F12 → Lighthouse tab)
- **WAVE**: https://wave.webaim.org/extension/
- **axe DevTools**: https://www.deque.com/axe/devtools/
- **Color Contrast Checker**: https://webaim.org/resources/contrastchecker/

### Guidelines & Standards
- **WCAG 2.1 AA**: https://www.w3.org/WAI/WCAG21/quickref/?currentsidebar=%23col_overview&levels=aa
- **Apple HIG (Touch Targets)**: https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/adaptivity-and-layout/
- **Android Material Design**: https://material.io/design/usability/accessibility.html
- **WebAIM**: https://webaim.org/ (Excellent accessibility resources)

### Screen Readers
- **VoiceOver (Mac/iOS)**: Built-in, Cmd+F5 to enable
- **NVDA (Windows)**: https://www.nvaccess.org/download/ (Free)
- **JAWS (Windows)**: https://www.freedomscientific.com/products/software/jaws/ (Paid, industry standard)
- **TalkBack (Android)**: Built-in to Android devices

---

## 📝 TESTING LOG TEMPLATE

```
Date: [Date]
Tester: [Name]
Device/Browser: [Device and browser info]

Issue Found:
- Location: [Page/Section]
- Description: [What's wrong]
- Severity: Critical / High / Medium / Low
- WCAG Guideline: [If accessibility issue]
- Recommended Fix: [How to fix it]

Status: Open / In Progress / Fixed / Won't Fix
```

---

## ✅ SIGN-OFF

Once all items are checked:

**Mobile Optimization**: ☐ Complete
**Accessibility Compliance**: ☐ Complete
**Tested By**: ___________________________
**Date**: ___________________________
**Lighthouse Score**: Performance ___ / Accessibility ___ / Best Practices ___ / SEO ___

**Notes**:
___________________________________________
___________________________________________
___________________________________________

---

**This checklist ensures the Dana Manciagli website provides an excellent experience for ALL users, regardless of device or ability.**
