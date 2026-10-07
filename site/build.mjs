// Builds the GitHub Pages site into _site/: a pre-rendered index.html (so
// crawlers read the whole page without running JS), a small hydration
// bundle, the system's own stylesheet, and the SEO files.
//   node site/build.mjs
import { build } from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, '_site');
const tmp = path.join(out, '.tmp');
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(tmp, { recursive: true });

const shared = { bundle: true, jsx: 'automatic', loader: { '.css': 'empty' }, logLevel: 'warning' };

// 1. Render the page to HTML in Node.
await build({ ...shared, entryPoints: [path.join(root, 'site/render.jsx')], outfile: path.join(tmp, 'render.mjs'), platform: 'node', format: 'esm', packages: 'external' });
const { html: appHtml, SITE, OWNER, REPO } = await import(pathToFileURL(path.join(tmp, 'render.mjs')).href);

// 2. The browser bundle that hydrates it.
await build({ ...shared, entryPoints: [path.join(root, 'site/client.jsx')], outfile: path.join(out, 'acta.js'), platform: 'browser', format: 'iife', minify: true, define: { 'process.env.NODE_ENV': '"production"' } });

// 3. The design system's own CSS, as published.
fs.copyFileSync(path.join(root, 'styles.css'), path.join(out, 'styles.css'));
fs.cpSync(path.join(root, 'tokens'), path.join(out, 'tokens'), { recursive: true, filter: (f) => !f.includes(':Zone.Identifier') });
fs.cpSync(path.join(root, 'site/static'), out, { recursive: true });
fs.mkdirSync(path.join(out, 'assets'), { recursive: true });
fs.copyFileSync(path.join(root, '.github/images/og.png'), path.join(out, 'assets', 'og.png'));
for (const f of ['burj-view.jpg', 'desert-dusk.jpg', 'worldskills-lyon-2024.jpg']) {
  fs.copyFileSync(path.join(root, '.design-sync/previews/assets', f), path.join(out, 'assets', f));
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${OWNER.url}#person`,
      name: OWNER.name,
      alternateName: OWNER.alternateName,
      url: OWNER.url,
      image: OWNER.image,
      jobTitle: OWNER.jobTitle,
      sameAs: [...OWNER.sameAs, SITE.url],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE.url}#website`,
      url: SITE.url,
      name: 'Acta design system',
      inLanguage: 'en-GB',
      author: { '@id': `${OWNER.url}#person` },
      publisher: { '@id': `${OWNER.url}#person` },
    },
    {
      '@type': 'SoftwareSourceCode',
      '@id': `${SITE.url}#acta`,
      name: 'Acta',
      alternateName: 'acta-design-system',
      description: SITE.description,
      url: SITE.url,
      codeRepository: REPO.url,
      programmingLanguage: ['JavaScript', 'React', 'CSS'],
      runtimePlatform: 'React 18',
      version: '1.0.0',
      image: SITE.image,
      author: { '@id': `${OWNER.url}#person` },
      creator: { '@id': `${OWNER.url}#person` },
      isPartOf: { '@type': 'WebSite', name: 'Mikkaiser', url: OWNER.url },
      mainEntityOfPage: { '@id': `${SITE.url}#website` },
    },
  ],
};

const head = `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(SITE.title)}</title>
<meta name="description" content="${esc(SITE.description)}">
<link rel="canonical" href="${SITE.url}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="author" content="${esc(OWNER.name)}">
<meta name="creator" content="${esc(OWNER.name)}">
<meta name="publisher" content="${esc(OWNER.name)}">
<meta name="application-name" content="Acta">
<meta name="keywords" content="Acta design system,Mikkaiser,Mikael Ribeiro Simoes,mikkaiser.com,React design system,design tokens,Bricolage Grotesque">
<link rel="author" href="${OWNER.url}">
<link rel="me" href="${OWNER.url}">
<link rel="me" href="https://github.com/Mikkaiser">
<meta name="theme-color" content="#0A0A0A" media="(prefers-color-scheme: dark)">
<meta name="theme-color" content="#FFFFFF" media="(prefers-color-scheme: light)">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Mikkaiser">
<meta property="og:locale" content="en_GB">
<meta property="og:url" content="${SITE.url}">
<meta property="og:title" content="${esc(SITE.title)}">
<meta property="og:description" content="${esc(SITE.description)}">
<meta property="og:image" content="${SITE.image}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(SITE.imageAlt)}">
<meta property="article:author" content="${OWNER.url}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(SITE.title)}">
<meta name="twitter:description" content="${esc(SITE.description)}">
<meta name="twitter:image" content="${SITE.image}">
<meta name="twitter:image:alt" content="${esc(SITE.imageAlt)}">
<link rel="icon" href="icon.png" type="image/png" sizes="512x512">
<link rel="apple-touch-icon" href="apple-icon.png" sizes="180x180">
<script>try{if(localStorage.getItem('acta-theme')==='light')document.documentElement.setAttribute('data-theme','light')}catch(e){}</script>
<link rel="stylesheet" href="styles.css">
<link rel="stylesheet" href="site.css">
<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>
<script src="acta.js" defer></script>`;

fs.writeFileSync(path.join(out, 'index.html'), `<!doctype html>\n<html lang="en-GB">\n<head>\n${head}\n</head>\n<body>\n<a class="skip" href="#main">Skip to content</a>\n<div id="app">${appHtml}</div>\n</body>\n</html>\n`);

const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(path.join(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${SITE.url}</loc><lastmod>${today}</lastmod></url>\n</urlset>\n`);
fs.writeFileSync(path.join(out, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}sitemap.xml\n`);
fs.writeFileSync(path.join(out, '.nojekyll'), '');
fs.rmSync(tmp, { recursive: true, force: true });
console.log('built _site/ for ' + SITE.url);
