# Security Setup Guide for iqhelp.cz

This document explains how to fix the "site not safe" warning and properly secure your website.

## Files Created

1. **`_headers`** - Security headers configuration for GitHub Pages
2. **`SECURITY_SETUP.md`** - This setup guide

## Required Actions

### 1. Enable HTTPS in GitHub Pages (CRITICAL)

**Steps:**
1. Go to your GitHub repository: `https://github.com/ullp/iqhelp`
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under "Custom domain", verify `iqhelp.cz` is entered
4. **Check the box: "Enforce HTTPS"** ← THIS IS CRITICAL
5. Wait 24-48 hours for SSL certificate to provision

**Note:** If "Enforce HTTPS" is greyed out, wait for the SSL certificate to be issued first.

### 2. Verify DNS Configuration

At your domain registrar (where you bought iqhelp.cz), ensure these DNS records exist:

```
# A Records (for root domain)
Type: A
Name: @ (or leave blank)
Value: 185.199.108.153
TTL: 3600

Type: A
Name: @ (or leave blank)
Value: 185.199.109.153
TTL: 3600

Type: A
Name: @ (or leave blank)
Value: 185.199.110.153
TTL: 3600

Type: A
Name: @ (or leave blank)
Value: 185.199.111.153
TTL: 3600

# CNAME Record (for www subdomain)
Type: CNAME
Name: www
Value: ullp.github.io
TTL: 3600
```

**Alternative (if using CNAME for root):**
```
Type: CNAME
Name: @ (or @.iqhelp.cz)
Value: ullp.github.io
TTL: 3600
```

### 3. Verify HTTPS is Working

After DNS propagation (24-48 hours):

```bash
# Test HTTPS connection
curl -I https://iqhelp.cz

# Expected output should include:
# HTTP/2 200
# strict-transport-security: max-age=31536000; ...
```

**Manual verification:**
1. Visit `https://iqhelp.cz` (note the https://)
2. Check for padlock icon in browser address bar
3. Click padlock → "Connection is secure"

### 4. Test Security Headers

After deploying the `_headers` file:

```bash
# Check security headers
curl -I https://iqhelp.cz

# Should include these headers:
# X-Frame-Options: DENY
# X-Content-Type-Options: nosniff
# X-XSS-Protection: 1; mode=block
# Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

**Online tools:**
- [SecurityHeaders.com](https://securityheaders.com/?q=iqhelp.cz)
- [SSL Labs SSL Test](https://www.ssllabs.com/ssltest/analyze.html?d=iqhelp.cz)
- [Mozilla Observatory](https://observatory.mozilla.org/)

### 5. Update Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property: `https://iqhelp.cz` (preferred)
3. Also add: `https://www.iqhelp.cz`
4. Submit sitemap if available: `https://iqhelp.cz/sitemap.xml`
5. Request re-indexing after security fixes

### 6. Common Issues and Solutions

**Issue: "Enforce HTTPS" is not available**
- **Cause:** SSL certificate not yet issued
- **Solution:** Wait 24-48 hours after adding custom domain to GitHub Pages

**Issue: Certificate errors persist**
- **Cause:** DNS not fully propagated
- **Solution:** Wait longer (up to 48 hours) or check DNS records

**Issue: Mixed content warnings**
- **Cause:** Some resources loaded over HTTP
- **Solution:** All resources in this site use HTTPS ✓

**Issue: "Not Secure" still shows**
- **Cause:** HTTPS not enforced or certificate issues
- **Solution:** Enable "Enforce HTTPS" in GitHub Pages settings

### 7. Deployment Checklist

- [ ] `_headers` file committed to repository
- [ ] GitHub Pages "Enforce HTTPS" enabled
- [ ] DNS records correctly configured at registrar
- [ ] Wait 24-48 hours for propagation
- [ ] Verify `https://iqhelp.cz` loads with padlock icon
- [ ] Test with SSL Labs: https://www.ssllabs.com/ssltest/
- [ ] Test security headers: https://securityheaders.com/
- [ ] Update Google Search Console with HTTPS version

## Security Headers Explained

The `_headers` file includes these protections:

- **X-Frame-Options: DENY** - Prevents clickjacking attacks
- **X-Content-Type-Options: nosniff** - Prevents MIME type sniffing
- **X-XSS-Protection: 1; mode=block** - Enables browser XSS filter
- **Strict-Transport-Security** - Forces HTTPS for 1 year
- **Content-Security-Policy** - Controls which resources can load
- **Referrer-Policy** - Controls referrer information sent with requests
- **Permissions-Policy** - Disables unnecessary browser features

## Additional Recommendations

1. **Monitor SSL certificate expiration** (GitHub Pages auto-renews)
2. **Regular security scans** using the tools mentioned above
3. **Keep dependencies updated** (Font Awesome, Google Fonts)
4. **Consider adding a privacy policy** if collecting user data
5. **Add `sitemap.xml`** for better SEO

## Support

If issues persist after following this guide:
1. Check GitHub Pages status: https://www.githubstatus.com/
2. Review GitHub Pages documentation: https://docs.github.com/en/pages
3. Contact your domain registrar for DNS issues