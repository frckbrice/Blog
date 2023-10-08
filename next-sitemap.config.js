/** @type {import ('next-sitemap').IConfig} */

///* we need to config this file when add next-sitemap package

module.exports = {
  siteUrl: process.env.SITE_URL || 'http://localhost:3000',
  generateRobotsTxt: true,
  generateIndexSitemap: false  // false to create only a sitemap for one page. when setting this to true it is for a larger site with numerous pages.
}