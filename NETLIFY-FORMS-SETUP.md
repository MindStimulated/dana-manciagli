# Netlify Forms Setup Guide

## Overview

Your contact form is now configured to work with Netlify Forms. This guide explains how to verify the setup and access form submissions.

## What Was Configured

### 1. HTML Form Attributes
The contact form in `index.html` now includes:
- `name="contact"` - Identifies the form to Netlify
- `method="POST"` - HTTP method for submission
- `data-netlify="true"` - Enables Netlify Forms
- `netlify-honeypot="bot-field"` - Spam protection

### 2. Spam Protection (Honeypot)
- Hidden `bot-field` input that bots will fill but humans won't see
- Submissions with this field filled are automatically rejected as spam
- Hidden `form-name` field required for AJAX submissions

### 3. JavaScript Integration
The `scripts/main.js` file now includes:
- AJAX form submission to Netlify
- Client-side validation before submission
- Loading state ("Sending..." button text)
- Success message display without page reload
- Error handling with user-friendly messages

### 4. Thank You Page
- Custom `thank-you.html` page created
- Can be used as redirect target (optional)
- Currently using inline success message (better UX)

## Verifying Netlify Forms Setup

### Step 1: Deploy to Netlify
After pushing these changes:
```bash
git add .
git commit -m "Configure Netlify Forms for contact form"
git push origin main
```

Netlify will automatically detect the form during the next build.

### Step 2: Check Forms Detection
1. Go to your Netlify dashboard
2. Navigate to **Site settings** → **Forms**
3. You should see "contact" form listed
4. Status should show "Active"

### Step 3: Test Form Submission
1. Visit your live site
2. Fill out the contact form
3. Click "Send Message"
4. You should see a success message without page reload

### Step 4: Access Form Submissions
1. In Netlify dashboard, go to **Forms** tab
2. Click on "contact" form
3. View all submissions with details:
   - Name, Email, Phone
   - Organization, Title
   - Inquiry Type
   - Message
   - Timestamp
   - Spam detection status

## Email Notifications

### Enable Email Notifications:
1. In Netlify dashboard → **Site settings** → **Forms**
2. Click **Form notifications**
3. Add **Email notification**
4. Enter Dana's email: `Dana@Danamanciagli.com`
5. Select "contact" form
6. Save settings

Now Dana will receive an email for each form submission!

## Spam Protection Features

### Built-in Spam Filtering:
- ✅ Honeypot field (bot-field)
- ✅ Netlify's Akismet integration (automatic)
- ✅ reCAPTCHA (can be added if needed)

### Add reCAPTCHA (Optional):
1. Get reCAPTCHA v2 site key from Google
2. Add to form in `index.html`:
   ```html
   <div data-netlify-recaptcha="true"></div>
   ```
3. Netlify handles the rest automatically!

## Form Field Mapping

Current form fields sent to Netlify:
- `name` - Contact's full name (required)
- `email` - Contact's email address (required)
- `title` - Job title (optional)
- `organization` - Company/organization (optional)
- `phone` - Phone number (optional)
- `inquiry-type` - Type of inquiry (required)
  - speaking
  - webinar
  - media
  - other
- `other-inquiry` - Custom inquiry type (conditional)
- `message` - Message content (required)

## Downloading Form Data

### Export Submissions:
1. Netlify dashboard → **Forms** → "contact"
2. Click **Export as CSV**
3. Choose date range
4. Download CSV file with all submissions

## Webhook Integration (Advanced)

### Connect to External Services:
1. **Site settings** → **Forms** → **Form notifications**
2. Add **Outgoing webhook**
3. Enter webhook URL (e.g., Zapier, Make.com)
4. Select events: "Form submission"
5. Can integrate with:
   - CRM systems (HubSpot, Salesforce)
   - Email marketing (Mailchimp, ConvertKit)
   - Slack notifications
   - Google Sheets
   - Any service with webhook support

## Troubleshooting

### Form Not Appearing in Netlify
**Solution**: Deploy a new version after adding form attributes
- Netlify detects forms during build process
- Must see `data-netlify="true"` in HTML

### Submissions Not Received
**Check**:
1. Form name matches in HTML and Netlify dashboard
2. `form-name` hidden field has correct value
3. JavaScript console for errors
4. Netlify deploy logs for build errors

### Spam Submissions
**Actions**:
1. Enable reCAPTCHA (see above)
2. Check spam folder in Netlify Forms
3. Add custom spam filtering rules
4. Block specific email domains/IPs

### Email Notifications Not Working
**Verify**:
1. Email notification is enabled in settings
2. Correct email address configured
3. Check spam folder
4. Test with a form submission

## Testing in Development

### Local Testing:
The form will work locally but won't submit to Netlify:
- Validation works
- UI/UX works
- Actual submission requires Netlify environment

### Netlify Dev (Optional):
```bash
npm install -g netlify-cli
netlify dev
```
This runs a local Netlify environment with forms support.

## Best Practices

### 1. Response Time
- Check forms daily or enable email notifications
- Set expectations: "Responds within 3-5 business days"

### 2. Data Privacy
- Form data stored securely by Netlify
- Download and delete old submissions regularly
- Consider GDPR compliance for EU visitors

### 3. Spam Management
- Review spam folder weekly
- Mark false positives as "not spam"
- Netlify learns from your spam classifications

### 4. Backup
- Export CSV monthly for records
- Consider webhook to auto-backup to Google Sheets

## Form Limits

### Netlify Free Tier:
- 100 submissions/month
- Unlimited forms
- Basic spam filtering

### Pro Tier:
- 1,000 submissions/month
- Advanced spam filtering
- File uploads support
- Priority support

## Monitoring

### Check Form Health:
1. Test form monthly
2. Review submission rates
3. Monitor spam ratio
4. Verify email notifications working
5. Check CSV exports periodically

## Support Resources

- [Netlify Forms Docs](https://docs.netlify.com/forms/setup/)
- [Spam Filtering](https://docs.netlify.com/forms/spam-filters/)
- [Form Notifications](https://docs.netlify.com/forms/notifications/)
- [Netlify Support](https://www.netlify.com/support/)

## Summary

Your contact form is fully configured and ready to receive submissions once deployed to Netlify. The setup includes:

✅ Netlify Forms integration
✅ Spam protection (honeypot)
✅ AJAX submission (no page reload)
✅ Client-side validation
✅ Success/error messages
✅ Thank you page (optional redirect)
✅ Mobile-optimized
✅ Accessible (WCAG 2.1 AA)

**Next Steps:**
1. Push changes to GitHub
2. Netlify auto-deploys
3. Verify form appears in dashboard
4. Enable email notifications
5. Test submission
6. Monitor regularly
