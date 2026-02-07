# Image Optimization Pipeline

## Overview
Automated image optimization reduces the 4.6 MB asset bundle by converting images to WebP format with 80% quality, significantly improving page load times and Core Web Vitals.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Optimize images manually:**
   ```bash
   npm run optimize:images
   ```

3. **Build (auto-optimizes):**
   ```bash
   npm run build
   ```

## What's Optimized

- All PNG/JPG images in `app/assets/` are converted to WebP
- Output saved to `public/optimized/` (gitignored)
- Next.js Image component provides automatic lazy loading
- Priority loading for hero image (LCP optimization)

## Results

- **Before:** ~4.6 MB (resonate_app.png: 2.71 MB)
- **After:** ~70-80% reduction in file size
- Improved LCP and page load times
- Better mobile/slow network performance
