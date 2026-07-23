# Google AdSense Integration Guide

## ✅ AdSense Already Configured!

Your Google AdSense publisher ID (`ca-pub-5554704158829427`) has been integrated into the website.

## 📍 Where AdSense is Added

### 1. Global Script (src/app/layout.tsx)
The AdSense script is loaded in the `<head>` section of every page:
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5554704158829427" crossorigin="anonymous"></script>
```

### 2. Ad Placements (src/components/ad-unit.tsx)
Ad placeholders are strategically placed throughout the site:
- **Banner ads** - Top of tool pages
- **Sidebar ads** - Right sidebar on tool pages
- **Inline ads** - Between content sections

### 3. Metadata Verification
Added AdSense verification meta tag for Google to recognize ownership.

## 🎯 Ad Placement Locations

| Page | Ad Locations |
|------|-------------|
| Home Page | Banner after hero section |
| Tool Pages | Banner, Sidebar, Inline between sections |
| Blog Posts | In-article ads, sidebar |
| About/Contact | Inline ads |

##  Next Steps for AdSense Approval

### 1. Deploy the Website
```bash
# Push to GitHub
git add .
git commit -m "Add AdSense integration"
git push

# Deploy to Vercel
vercel --prod
```

### 2. Submit for AdSense Review
1. Go to [Google AdSense](https://adsense.google.com)
2. Add your website URL
3. Verify ownership (via meta tag or DNS)
4. Submit for review

### 3. Create Ad Units (After Approval)
1. Log into AdSense dashboard
2. Go to **Ads > Overview**
3. Click **By ad unit**
4. Create new ad units:
   - **Display Ad** (Responsive)
   - **In-article Ad**
   - **In-feed Ad**

### 4. Update Ad Slot IDs
Replace placeholder slot IDs in `src/components/ad-unit.tsx`:

```typescript
const configs = {
  banner: { slot: 'YOUR_BANNER_SLOT_ID', format: 'auto' as const, className: 'my-8' },
  sidebar: { slot: 'YOUR_SIDEBAR_SLOT_ID', format: 'auto' as const, className: 'sticky top-20' },
  inline: { slot: 'YOUR_INLINE_SLOT_ID', format: 'auto' as const, className: 'my-6' },
};
```

## 💡 AdSense Best Practices

### ✅ Do's
- Place ads where they're visible but not intrusive
- Use responsive ad units for mobile compatibility
- Maintain good content-to-ad ratio
- Ensure fast page load times
- Create valuable, original content

### ❌ Don'ts
- Don't place ads too close to clickable elements
- Don't use misleading labels
- Don't exceed 3 ad units per page (for display ads)
- Don't click your own ads
- Don't place ads on pop-ups

## 📊 Monitoring Performance

### AdSense Dashboard
Track these metrics:
- **Page RPM** - Revenue per thousand impressions
- **CTR** - Click-through rate
- **Page views** - Total traffic
- **Top earning pages** - Which tools generate most revenue

### Google Search Console
- Monitor search performance
- Fix crawl errors
- Submit sitemap

### Google Analytics (Optional)
Add GA tracking by setting `NEXT_PUBLIC_GA_ID` environment variable.

## 🔧 Troubleshooting

### Ads Not Showing?
1. **Check AdSense approval** - Site must be approved first
2. **Verify script loading** - Check browser console for errors
3. **Ad blockers** - Disable ad blockers for testing
4. **Wait for propagation** - New ad units can take 15-30 minutes

### "Ad limit reached" Error?
- You've hit the ad unit limit
- Remove some ad placements or use fewer ad units

### Low RPM?
- Improve content quality
- Target high-value keywords
- Increase traffic from tier-1 countries
- Optimize ad placements

## 📈 Optimization Tips

### 1. Ad Placement
- Above the fold (visible without scrolling)
- Between content sections
- In sidebars on desktop
- Between tool input and output sections

### 2. Ad Formats
- **Responsive ads** - Auto-adjust to screen size
- **In-article ads** - Blend with content
- **In-feed ads** - Match site design

### 3. Content Strategy
- Add more tools regularly
- Write blog posts for SEO
- Update existing content
- Target long-tail keywords

##  Changing Publisher ID

If you need to change the AdSense publisher ID, update these files:

1. **src/app/layout.tsx** - Script source URL
2. **src/components/ad-unit.tsx** - data-ad-client attribute
3. **src/app/layout.tsx** - Metadata verification tag

Search for `ca-pub-5554704158829427` and replace with your new ID.

## 📞 Support

For AdSense-specific questions:
- [AdSense Help Center](https://support.google.com/adsense)
- [AdSense Community](https://support.google.com/adsense/community)

---

**Note:** It typically takes 1-2 weeks for AdSense review. Ensure your site has:
- ✅ Original, valuable content
- ✅ Clear navigation
- ✅ Privacy policy and legal pages
- ✅ Contact information
- ✅ No policy violations

Good luck with your AdSense application! 🚀
