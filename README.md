# ProFlow Plumbing — Astro + Contentful Website

A modern, high-performance plumbing business website built with **Astro** and **Contentful** CMS.

## Tech Stack

- 🚀 [Astro](https://astro.build) — Static site generator with zero JS by default
- 📝 [Contentful](https://contentful.com) — Headless CMS for managing content
- 🎨 Custom CSS — Industrial copper + navy aesthetic, no UI framework needed

## Features

- ✅ **Homepage** — Hero with quote form, services, testimonials, contact
- ✅ **Services page** — Full service catalog from Contentful, process steps, CTA
- ✅ **Blog** — Post listing with featured post, dynamic `[slug]` pages
- ✅ **Rich Text** — Contentful rich text rendered as HTML
- ✅ **SEO-ready** — Canonical URLs, Open Graph, sitemap via `@astrojs/sitemap`
- ✅ **Responsive** — Mobile-first, works on all screen sizes
- ✅ **Sticky header** with mobile nav + emergency phone number
- ✅ **Fallback content** — Site works without Contentful configured (great for development)
- ✅ **Performance** — Static output, images lazy-loaded, no heavy JS bundles

---

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Contentful

1. Create a free account at [contentful.com](https://contentful.com)
2. Create a new **Space**
3. Go to **Settings → API Keys** and create a new key
4. Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

5. Fill in your credentials:

```env
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_delivery_api_token
CONTENTFUL_PREVIEW_TOKEN=your_preview_api_token
```

### 3. Create Contentful Content Types

In your Contentful space, create the following content types (see `contentful-content-model.json` for all field details):

#### `siteSettings`
| Field | Type |
|-------|------|
| companyName | Short text |
| phone | Short text |
| email | Short text |
| address | Short text |
| heroHeadline | Short text |
| heroSubheadline | Long text |
| emergencyText | Short text |

#### `service`
| Field | Type |
|-------|------|
| title | Short text |
| slug | Short text (unique) |
| description | Long text |
| icon | Short text (emoji) |
| price | Short text |
| featured | Boolean |

#### `blogPost`
| Field | Type |
|-------|------|
| title | Short text |
| slug | Short text (unique) |
| excerpt | Long text |
| body | Rich Text |
| publishedDate | Date |
| coverImage | Media (image) |
| tags | Short text list |

### 4. Start development

```bash
npm run dev
```

Visit `http://localhost:4321`

### 5. Build for production

```bash
npm run build
npm run preview
```

---

## Customization

### Branding
- **Colors**: Edit CSS variables in `src/styles/global.css`
- **Company name / phone**: Update in `src/components/Header.astro`, `Footer.astro`, and pages
- **Fonts**: Change the Google Fonts import in `global.css`

### Content
All real content is managed through Contentful. The site displays fallback content when Contentful is not configured, so development is always possible.

### Deployment
Deploy to any static hosting:

- **Vercel**: `vercel deploy`
- **Netlify**: Connect your Git repo
- **Cloudflare Pages**: Connect your Git repo

Remember to add your environment variables in the hosting dashboard.

---

## Project Structure

```
plumbing-site/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   └── ServiceCard.astro
│   ├── layouts/
│   │   └── Layout.astro
│   ├── lib/
│   │   └── contentful.ts       ← All Contentful API calls
│   ├── pages/
│   │   ├── index.astro         ← Homepage
│   │   ├── services.astro      ← Services page
│   │   └── blog/
│   │       ├── index.astro     ← Blog listing
│   │       └── [slug].astro    ← Individual blog posts
│   └── styles/
│       └── global.css
├── .env.example
├── astro.config.mjs
├── contentful-content-model.json
└── package.json
```

---

## License

MIT — use freely for your plumbing business.
