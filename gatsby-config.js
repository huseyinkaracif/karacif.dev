module.exports = {
  siteMetadata: {
    title: `Hüseyin Karacif | Solution Expert`,
    description: `Hüseyin Karacif - Çözüm Uzmanı (Solution Expert) & Kıdemli Yazılım Geliştirici. Hassasiyetle hazırlanmış yüksek kaliteli dijital ürünler, yazılım mimarisi ve teknoloji çözümleri üretiyorum. AI ve modern mühendislik pratikleri odaklı çalışmalar.`,
    author: `Hüseyin Karacif`,
    siteUrl: `https://huseyinkaracif.com`,
    keywords: `Hüseyin Karacif, Solution Expert, Senior Software Developer, Yazılım Geliştirici, Çözüm Uzmanı, Yazılım Mimarisi, AI, Yapay Zeka, Web Geliştirme`,
    image: `/social-image.jpg` // Eğer paylaşım görseliniz varsa buraya yönlendirebilirsiniz
  },
  plugins: [
    `gatsby-plugin-postcss`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: 'https://huseyinkaracif.com',
        sitemap: 'https://huseyinkaracif.com/sitemap/sitemap-index.xml',
        policy: [{ userAgent: '*', allow: '/' }]
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Hüseyin Karacif | Solution Expert`,
        short_name: `Karacif.dev`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#FFD700`,
        display: `minimal-ui`,
        icon: `src/images/icon.svg`, // Buraya daha sonra kendi logonuzu ekleyebilirsiniz
      },
    },
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/src/content/blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data`,
      },
    },
  ],
}
