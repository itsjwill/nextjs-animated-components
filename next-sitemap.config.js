/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://motion-primitives.dev',
  generateRobotsTxt: true,
  generateIndexSitemap: false,

  // Sitemap options
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 7000,

  // Exclude certain paths
  exclude: [
    '/api/*',
    '/admin/*',
    '/_next/*',
    '/404',
    '/500',
  ],

  // robots.txt options
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      // Add additional sitemaps if you have them
      // 'https://motion-primitives.dev/server-sitemap.xml',
    ],
  },

  // Transform function to modify sitemap entries
  transform: async (config, path) => {
    // Custom priority for specific pages
    const priorityMap = {
      '/': 1.0,
      '/docs': 0.9,
      '/components': 0.9,
      '/examples': 0.8,
    };

    // Custom changefreq for specific pages
    const changefreqMap = {
      '/': 'daily',
      '/docs': 'weekly',
      '/blog': 'daily',
    };

    return {
      loc: path,
      changefreq: changefreqMap[path] || config.changefreq,
      priority: priorityMap[path] || config.priority,
      lastmod: new Date().toISOString(),
      alternateRefs: config.alternateRefs ?? [],
    };
  },
};
