# Accessibility Testing Quick Start Guide
**Dana Manciagli Website - Manual Testing Instructions**

**Live Site**: https://mindstimulated.github.io/dana-manciagli/

---

## 🚀 Quick 5-Minute Tests

### Test 1: Keyboard Navigation (2 minutes)
```
1. Open the live site
2. Press Tab repeatedly to navigate
3. Verify you see gold outline on each element
4. Navigate through entire page
5. Press Escape when mobile menu is open (mobile view)

✅ PASS: All elements have visible focus, Escape closes menu
❌ FAIL: Missing focus indicators or keyboard trap
```

### Test 2: Mobile Menu (1 minute)
```
1. Resize browser to mobile width (< 768px)
2. Click hamburger menu icon (top right)
3. Menu should slide in from right
4. Press Escape key
5. Menu should close

✅ PASS: Menu opens, closes on Escape, focus returns to button
❌ FAIL: Escape doesn't work or focus lost
```

### Test 3: Form Validation (2 minutes)
```
1. Scroll to Contact section
2. Click "Send Message" without filling form
3. Error messages should appear in red box
4. Fill in Name and Email only
5. Click "Send Message" again
6. Error should mention "Inquiry Type" and "Message"

✅ PASS: Specific errors shown, first invalid field focused
❌ FAIL: Generic errors or no focus management
```

---

## 📱 Mobile Device Testing (10 minutes)

### iPhone (Safari)
```
1. Open: https://mindstimulated.github.io/dana-manciagli/
2. Test these features:
   ☐ Page loads without horizontal scroll
   ☐ All text readable without zooming
   ☐ Hamburger menu opens smoothly
   ☐ All buttons tap-able (no accidental mis-taps)
   ☐ Form fields open keyboard properly
   ☐ Images scale correctly
   ☐ Smooth scrolling to sections works
```

### Android (Chrome)
```
Same tests as iPhone:
   ☐ No horizontal scroll
   ☐ Readable text
   ☐ Menu functionality
   ☐ Touch targets adequate
   ☐ Form works
   ☐ Images display
   ☐ Smooth scroll
```

---

## 🎯 Lighthouse Audit (5 minutes)

### Steps
```
1. Open site in Chrome
2. Right-click → Inspect (or press F12)
3. Click "Lighthouse" tab (top bar)
4. Settings:
   ☑ Performance
   ☑ Accessibility
   ☑ Best Practices
   ☑ SEO
   Device: Desktop or Mobile
5. Click "Generate report"
6. Wait 30 seconds for results
```

### Expected Scores
- **Performance**: 90+ (Excellent)
- **Accessibility**: 95+ (Excellent)
- **Best Practices**: 95+ (Excellent)
- **SEO**: 95+ (Excellent)

### Screenshot
Take screenshot of scores for documentation.

---

## 🔊 Screen Reader Testing (15 minutes)

### macOS (VoiceOver)
```
1. Press Command+F5 to enable VoiceOver
2. Navigate with these keys:
   - VO+Right Arrow: Next item
   - VO+Left Arrow: Previous item
   - VO+Space: Activate button/link
   - Control: Stop speaking

3. Test these elements:
   ☐ Page title announced
   ☐ "Skip to main content" link found
   ☐ Navigation links announced correctly
   ☐ Image alt text read aloud
   ☐ Form labels associated with fields
   ☐ Error messages announced (submit empty form)
   ☐ Success message announced (after form submission)

4. Press Command+F5 to disable when done
```

### Windows (NVDA - Free)
```
1. Download: https://www.nvaccess.org/download/
2. Install and launch NVDA
3. Press Control+Alt+N to start

Navigate with:
   - Down Arrow: Next item
   - Up Arrow: Previous item
   - Enter: Activate link/button
   - Tab: Next form field

Test same elements as macOS list above

4. Insert+Q to quit NVDA
```

---

## 🌐 Browser Extensions (Quick Tests)

### WAVE (2 minutes)
```
1. Install: https://wave.webaim.org/extension/
2. Visit: https://mindstimulated.github.io/dana-manciagli/
3. Click WAVE icon in browser
4. Review summary:
   - Errors: Should be 0
   - Alerts: Review any warnings
   - Features: Shows accessibility features
   - Structure: Verify heading hierarchy

Take screenshot if any errors found
```

### axe DevTools (3 minutes)
```
1. Install: https://www.deque.com/axe/devtools/
2. Open site and press F12
3. Click "axe DevTools" tab
4. Click "Scan ALL of my page"
5. Review results:
   - Critical: Should be 0
   - Serious: Should be 0
   - Moderate: Review warnings
   - Minor: Optional fixes

Take screenshot for documentation
```

---

## 📊 What to Look For

### ✅ GOOD SIGNS
- Gold focus outline visible on Tab navigation
- All images display with descriptive descriptions
- Form shows specific error messages
- Mobile menu closes with Escape key
- No horizontal scrolling on mobile
- Text readable without zooming
- All buttons large enough to tap easily

### ❌ RED FLAGS
- Elements can't be reached with keyboard
- Focus indicator not visible
- Form errors generic ("Invalid form")
- Keyboard trap (can't tab out of element)
- Horizontal scroll on mobile
- Text too small to read
- Buttons too small to tap accurately

---

## 📝 Test Results Template

Copy this template for your test report:

```
# Accessibility Test Results
**Date**: [Today's date]
**Tested by**: [Your name]
**Browser**: [Chrome/Safari/Firefox]
**Device**: [Desktop/iPhone/Android]

## Keyboard Navigation
- Tab navigation: ✅ / ❌
- Escape key closes menu: ✅ / ❌
- Focus visible: ✅ / ❌
- Notes:

## Mobile Testing
- No horizontal scroll: ✅ / ❌
- Touch targets adequate: ✅ / ❌
- Menu functional: ✅ / ❌
- Notes:

## Form Testing
- Error messages clear: ✅ / ❌
- Success message shows: ✅ / ❌
- Fields properly labeled: ✅ / ❌
- Notes:

## Lighthouse Scores
- Performance: __/100
- Accessibility: __/100
- Best Practices: __/100
- SEO: __/100

## Screen Reader (Optional)
- Page title announced: ✅ / ❌
- Images have alt text: ✅ / ❌
- Form labels work: ✅ / ❌
- Error messages announced: ✅ / ❌
- Notes:

## Overall Assessment
Pass: ✅ / Fail: ❌
Issues found: [List any problems]
Recommendations: [Suggested fixes]
```

---

## 🎯 Priority Test Order

**If you only have 10 minutes**:
1. Lighthouse audit (5 min)
2. Keyboard navigation test (2 min)
3. Mobile menu test (1 min)
4. Form validation test (2 min)

**If you have 30 minutes**:
1. All of the above (10 min)
2. Real iPhone test (5 min)
3. Real Android test (5 min)
4. WAVE extension scan (2 min)
5. Screen reader spot check (8 min)

**If you have 1 hour**:
1. All of the above (30 min)
2. Comprehensive screen reader test (15 min)
3. axe DevTools detailed scan (5 min)
4. Cross-browser testing (10 min)

---

## 🆘 Common Issues & Solutions

### Issue: Focus outline not visible
**Solution**: Check if browser zoom is affecting visibility, try 100% zoom

### Issue: Keyboard trap in menu
**Solution**: Should not happen - press Escape to close menu

### Issue: Form doesn't submit
**Expected**: Form backend not connected (client-side validation only)

### Issue: Screen reader not announcing
**Solution**: Make sure ARIA live regions are enabled (already implemented)

---

## ✅ Success Criteria

Your site passes if:
- ✅ Lighthouse Accessibility: 95+
- ✅ WAVE: 0 errors
- ✅ Keyboard navigation: All elements accessible
- ✅ Screen reader: All content announced properly
- ✅ Mobile: No horizontal scroll, readable text
- ✅ Form: Clear error messages
- ✅ Focus: Visible on all interactive elements

---

## 📞 Questions?

If you find any accessibility issues:
1. Take a screenshot
2. Note the browser/device
3. Describe the problem
4. Note the specific element affected

**Reference**: See full `ACCESSIBILITY-TEST-REPORT.md` for detailed analysis.

---

**Quick Start Version**: 1.0
**Last Updated**: October 23, 2025
