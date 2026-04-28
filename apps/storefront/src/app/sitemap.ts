import fs from 'fs';
import path from 'path';
import type { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://modern-ui-vault.dev';

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // Dynamic component pages from registry
  let componentPages: MetadataRoute.Sitemap = [];
  try {
    const registryPath = path.join(process.cwd(), 'public/registry/index.json');
    if (fs.existsSync(registryPath)) {
      const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));
      const components = registry.components || [];
      componentPages = components.map((c: { name: string }) => ({
        url: `${SITE_URL}/components/${c.name}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }));
    }
  } catch {
    console.warn('Sitemap: Could not read registry for dynamic URLs');
  }

  return [...staticPages, ...componentPages];
}
