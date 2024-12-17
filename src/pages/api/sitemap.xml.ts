import { NextApiRequest, NextApiResponse } from 'next';

const SITE_URL = 'https://tapswapcode.net';
const LANGUAGES = ['en', 'fa', 'zh', 'ko', 'ru'];

function generateSiteMap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:xhtml="http://www.w3.org/1999/xhtml">
      ${LANGUAGES.map(lang => `
        <url>
          <loc>${SITE_URL}/${lang}</loc>
          ${LANGUAGES.map(alternateLang => `
            <xhtml:link 
              rel="alternate" 
              hreflang="${alternateLang}"
              href="${SITE_URL}/${alternateLang}"
            />`).join('')}
          <changefreq>daily</changefreq>
          <priority>1.0</priority>
        </url>
      `).join('')}
    </urlset>`;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Content-Type', 'text/xml');
  res.write(generateSiteMap());
  res.end();
} 