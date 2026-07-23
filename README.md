# Life Toolkit AI - Free Online Tools

A comprehensive collection of 40+ free online tools for everyday use. Built with Next.js 16, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Environment Variables

Create a `.env` file in the root directory:

```bash
# Optional - Database (only needed for database features)
DATABASE_URL=postgresql://user:password@host:port/database
```

**Note:** The application works perfectly without a database! All tools run client-side.

## 📦 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy! (No environment variables required)

The application is configured to work without a database by default.

### Other Platforms

The app can be deployed on any platform that supports Next.js:
- Netlify
- Railway
- Render
- AWS Amplify
- Cloudflare Pages

## ️ Features

### 40+ Tools Included

**Calculators:**
- Age Calculator
- Date Difference Calculator
- Percentage Calculator
- BMI Calculator
- EMI/Loan Calculator
- Mortgage Calculator
- Tip Calculator
- Calorie Calculator
- Fuel Cost Calculator
- Tax Calculator

**Converters:**
- Time Zone Converter
- Unit Converter
- Currency Converter
- Color Converter
- Base64 Encode/Decode
- URL Encoder/Decoder

**Generators:**
- Password Generator
- Password Strength Checker
- QR Code Generator
- QR Code Scanner
- Barcode Generator
- UUID Generator
- Random Number Generator
- Random Name Picker
- Hash Generator

**Text Tools:**
- Text Counter
- Word Counter
- Character Counter
- Reading Time Calculator
- Case Converter
- Remove Duplicate Lines
- JSON Formatter

**Image Tools:**
- Image Compressor
- Image Resizer
- Image Format Converter

**PDF Tools:**
- PDF Merge
- PDF Split
- PDF Compress
- PDF to Image
- Image to PDF

### Additional Features

- ✅ Dark/Light mode
- ✅ Fully responsive
- ✅ PWA support
- ✅ SEO optimized
- ✅ Blog with educational content
- ✅ AdSense ready
- ✅ Privacy-focused (no data storage)
- ✅ Fast loading
- ✅ Accessible

##  Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── tools/[slug]/      # Dynamic tool pages
│   ├── blog/[slug]/       # Blog posts
│   └── ...                # Other pages
├── components/
│   ├── tools/             # All tool components
│   ├── header.tsx         # Navigation header
│   ├── footer.tsx         # Site footer
│   └── theme-toggle.tsx   # Dark mode toggle
├── lib/
│   ├── tools-registry.ts  # Tool definitions
│   ├── tool-content.ts    # SEO content
│   └── utils.ts           # Utility functions
└── types/
    ── index.ts           # TypeScript types
```

## 🎨 Customization

### Adding New Tools

1. Add tool definition to `src/lib/tools-registry.ts`
2. Create component in `src/components/tools/`
3. Add content to `src/lib/tool-content.ts`
4. Export from `src/components/tools/index.tsx`

### Styling

The app uses Tailwind CSS. Customize in:
- `src/app/globals.css` - Global styles
- `tailwind.config.ts` - Theme configuration

### SEO

Update metadata in:
- `src/app/layout.tsx` - Global metadata
- Individual page files - Page-specific metadata

## 📈 Monetization

The app is AdSense-ready with:
- Clean ad placements
- High-quality original content
- Fast loading times
- Mobile-friendly design
- No policy violations

To add AdSense:
1. Get approved for Google AdSense
2. Add your publisher ID to `.env`
3. Update `src/components/ad-unit.tsx` with your slots

## 📝 License

MIT License - feel free to use for personal or commercial projects.

## 🤝 Support

For questions or issues, please contact support@lifetoolkit.ai

---

Built with ❤️ using Next.js and TypeScript
