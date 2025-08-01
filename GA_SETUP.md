# Google Analytics Setup Guide

## 🎯 Quick Setup Instructions

### 1. Get Your Measurement ID
1. Go to [analytics.google.com](https://analytics.google.com)
2. Sign in with your Google account
3. Create a new property for "App Icon Resizer"
4. Set up a web data stream
5. Copy your Measurement ID (format: G-XXXXXXXXXX)

### 2. Update Your Application

Once you have your Measurement ID, replace `G-XXXXXXXXXX` in these files:

#### File 1: `index.html` (Line ~85)
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR_MEASUREMENT_ID', {
    page_title: 'App Icon Resizer',
    page_location: window.location.href,
    custom_map: {
      'custom_parameter_1': 'user_type',
      'custom_parameter_2': 'platform_selected'
    }
  });
</script>
```

#### File 2: `src/App.tsx` (Line ~15)
```tsx
<GoogleAnalytics measurementId="YOUR_MEASUREMENT_ID" />
```

#### File 3: `src/components/GoogleAnalytics.tsx` (Line ~75)
```tsx
window.gtag('config', 'YOUR_MEASUREMENT_ID', {
  page_title: page,
  page_location: window.location.href + '#' + page
});
```

### 3. Test Your Setup

1. Deploy the changes
2. Visit your website
3. Check Google Analytics Real-Time reports
4. Verify events are being tracked

## 📊 What's Being Tracked

### Page Views
- Homepage visits
- Section navigation (#features, #upload-section)

### User Interactions
- File uploads (with file type and size)
- Platform selection (iOS/Android)
- Export completions (format and quality)
- Download events (file count)
- Error occurrences

### Performance Metrics
- Core Web Vitals (LCP, FID, CLS)
- Page load times
- User engagement

## 🔍 Verification Steps

1. **Real-Time Reports**: Check if your visits appear in real-time
2. **Events**: Verify custom events are firing
3. **Page Views**: Confirm page tracking is working
4. **Performance**: Monitor Core Web Vitals

## 🚀 Next Steps

After setup, you can:
- Set up conversion goals
- Create custom dashboards
- Set up email reports
- Configure audience segments
- Enable enhanced ecommerce (if needed)

---

**Need Help?** Replace `YOUR_MEASUREMENT_ID` with your actual GA4 measurement ID in all three files above. 