import contentful from 'contentful';

export const contentfulClient = contentful.createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.CONTENTFUL_ACCESS_TOKEN,
});

// ─── Type Definitions ────────────────────────────────────────────────────────

export interface ServiceEntry {
  title: string;
  slug: string;
  description: string;
  icon: string; // emoji or icon name
  price?: string;
  featured: boolean;
}

export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  body: any; // Contentful rich text document
  publishedDate: string;
  coverImage?: {
    url: string;
    description: string;
  };
  tags: string[];
}

export interface SiteSettings {
  companyName: string;
  phone: string;
  email: string;
  address: string;
  heroHeadline: string;
  heroSubheadline: string;
  emergencyText: string;
}

// ─── Fetch Functions ─────────────────────────────────────────────────────────

export async function getServices(): Promise<ServiceEntry[]> {
  const entries = await contentfulClient.getEntries<any>({
    content_type: 'service',
    order: ['-fields.featured', 'fields.title'],
  });

  return entries.items.map((item: any) => ({
    title: item.fields.title,
    slug: item.fields.slug,
    description: item.fields.description,
    icon: item.fields.icon ?? '🔧',
    price: item.fields.price,
    featured: item.fields.featured ?? false,
  }));
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const entries = await contentfulClient.getEntries<any>({
    content_type: 'blogPost',
    order: ['-fields.publishedDate'],
  });

  return entries.items.map((item: any) => ({
    title: item.fields.title,
    slug: item.fields.slug,
    excerpt: item.fields.excerpt,
    body: item.fields.body,
    publishedDate: item.fields.publishedDate,
    coverImage: item.fields.coverImage
      ? {
          url: 'https:' + item.fields.coverImage.fields.file.url,
          description: item.fields.coverImage.fields.description ?? '',
        }
      : undefined,
    tags: item.fields.tags ?? [],
  }));
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const entries = await contentfulClient.getEntries<any>({
    content_type: 'blogPost',
    'fields.slug': slug,
    limit: 1,
  });

  if (!entries.items.length) return null;

  const item = entries.items[0];
  return {
    title: item.fields.title,
    slug: item.fields.slug,
    excerpt: item.fields.excerpt,
    body: item.fields.body,
    publishedDate: item.fields.publishedDate,
    coverImage: item.fields.coverImage
      ? {
          url: 'https:' + item.fields.coverImage.fields.file.url,
          description: item.fields.coverImage.fields.description ?? '',
        }
      : undefined,
    tags: item.fields.tags ?? [],
  };
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const entries = await contentfulClient.getEntries<any>({
    content_type: 'siteSettings',
    limit: 1,
  });

  if (!entries.items.length) return null;

  const item = entries.items[0];
  return {
    companyName: item.fields.companyName,
    phone: item.fields.phone,
    email: item.fields.email,
    address: item.fields.address,
    heroHeadline: item.fields.heroHeadline,
    heroSubheadline: item.fields.heroSubheadline,
    emergencyText: item.fields.emergencyText,
  };
}
