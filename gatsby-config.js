module.exports = {
  siteMetadata: {
    title: `Hüseyin Karacif | Solution Expert`,
    description: `Hüseyin Karacif - Çözüm Uzmanı (Solution Expert) & Kıdemli Yazılım Geliştirici. Hassasiyetle hazırlanmış yüksek kaliteli dijital ürünler, yazılım mimarisi ve teknoloji çözümleri üretiyorum. AI ve modern mühendislik pratikleri odaklı çalışmalar.`,
    author: `Hüseyin Karacif`,
    siteUrl: `https://karacif.dev`, // Eğer belirli bir adresiniz varsa değiştirebilirsiniz.
    keywords: `Hüseyin Karacif, Solution Expert, Senior Software Developer, Yazılım Geliştirici, Çözüm Uzmanı, Yazılım Mimarisi, AI, Yapay Zeka, Web Geliştirme`,
    image: `/social-image.jpg` // Eğer paylaşım görseliniz varsa buraya yönlendirebilirsiniz
  },
  plugins: [
    `gatsby-plugin-postcss`,
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
