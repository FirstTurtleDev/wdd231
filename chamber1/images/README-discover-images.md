# Images Needed for Discover Page

You need to add 8 WebP images to the `images` directory. Each image should be approximately **300px wide by 200px tall**.

## Required Images:

1. **plaza.webp** - Historic Downtown Plaza
2. **museum.webp** - Coastal Marine Museum
3. **lighthouse.webp** - Lighthouse Point Park
4. **market.webp** - Artisan's Market
5. **business-district.webp** - Riverside Business District
6. **festival-grounds.webp** - Heritage Festival Grounds
7. **tech-center.webp** - Innovation Technology Center
8. **boardwalk.webp** - Waterfront Boardwalk

## How to Create WebP Images:

### Option 1: Using Online Converter
1. Find or take photos of your local attractions
2. Resize them to approximately 300x200px
3. Convert to WebP format using: https://cloudconvert.com/jpg-to-webp

### Option 2: Using Command Line (if you have ImageMagick or similar)
```bash
convert input.jpg -resize 300x200^ -gravity center -extent 300x200 output.webp
```

### Option 3: Using Photoshop or GIMP
1. Resize image to 300x200px
2. Export as WebP format

## Temporary Solution:

For now, the page will show broken image placeholders. The functionality will still work - you just won't see the images until you add the actual files.

You can also use placeholder images from services like:
- https://placehold.co/300x200/webp
- https://picsum.photos/300/200.webp

## After Adding Images:

Make sure all 8 images are in the `images` directory with the exact filenames listed above, then refresh the discover.html page in your browser.
