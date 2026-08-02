module.exports = {
  trailingSlash: `always`,
  siteMetadata: {
    title: `Hüseyin Karacif | Solution Expert`,
    description: `Hüseyin Karacif - Çözüm Uzmanı (Solution Expert) & Kıdemli Yazılım Geliştirici. Hassasiyetle hazırlanmış yüksek kaliteli dijital ürünler, yazılım mimarisi ve teknoloji çözümleri üretiyorum. AI ve modern mühendislik pratikleri odaklı çalışmalar.`,
    author: `Hüseyin Karacif`,
    siteUrl: `https://huseyinkaracif.com`,
    keywords: `Hüseyin Karacif, Solution Expert, Senior Software Developer, Yazılım Geliştirici, Çözüm Uzmanı, Yazılım Mimarisi, AI, Yapay Zeka, Web Geliştirme`,
    image: `/images/hero.jpg`,
  },
  plugins: [
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        excludes: [`/admin/`, `/admin/**`],
      },
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: 'https://huseyinkaracif.com',
        sitemap: 'https://huseyinkaracif.com/sitemap-index.xml',
        policy: [
          { userAgent: 'GPTBot', allow: '/' },
          { userAgent: 'ClaudeBot', allow: '/' },
          { userAgent: 'Claude-Web', allow: '/' },
          { userAgent: 'anthropic-ai', allow: '/' },
          { userAgent: 'PerplexityBot', allow: '/' },
          { userAgent: 'Google-Extended', allow: '/' },
          { userAgent: 'Applebot-Extended', allow: '/' },
          { userAgent: 'CCBot', allow: '/' },
          { userAgent: '*', allow: '/', disallow: ['/admin/'] },
        ],
      },
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
        icon: `src/images/icon.svg`,
      },
    },
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: `language-`,
              noInlineHighlight: true,
            },
          },
        ],
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
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) =>
              allMarkdownRemark.nodes.map((node) => ({
                title: node.frontmatter.title,
                description: node.frontmatter.excerpt,
                date: node.frontmatter.date,
                url: site.siteMetadata.siteUrl + node.fields.slug,
                guid: site.siteMetadata.siteUrl + node.fields.slug,
                categories: [node.frontmatter.category],
              })),
            query: `
              {
                allMarkdownRemark(
                  filter: { fields: { lang: { eq: "tr" } } }
                  sort: { frontmatter: { date: DESC } }
                ) {
                  nodes {
                    fields { slug }
                    frontmatter { title excerpt date category }
                  }
                }
              }
            `,
            output: `/rss.xml`,
            title: `Hüseyin Karacif — Yazılar`,
            description: `Yazılım, yapay zeka ve mühendislik üzerine yazılar.`,
            site_url: `https://huseyinkaracif.com`,
            feed_url: `https://huseyinkaracif.com/rss.xml`,
          },
          {
            serialize: ({ query: { site, allMarkdownRemark } }) =>
              allMarkdownRemark.nodes.map((node) => ({
                title: node.frontmatter.title,
                description: node.frontmatter.excerpt,
                date: node.frontmatter.date,
                url: site.siteMetadata.siteUrl + node.fields.slug,
                guid: site.siteMetadata.siteUrl + node.fields.slug,
                categories: [node.frontmatter.category],
              })),
            query: `
              {
                allMarkdownRemark(
                  filter: { fields: { lang: { eq: "en" } } }
                  sort: { frontmatter: { date: DESC } }
                ) {
                  nodes {
                    fields { slug }
                    frontmatter { title excerpt date category }
                  }
                }
              }
            `,
            output: `/rss-en.xml`,
            title: `Hüseyin Karacif — Writing`,
            description: `Writing on software, AI and engineering practice.`,
            site_url: `https://huseyinkaracif.com/en/`,
            feed_url: `https://huseyinkaracif.com/rss-en.xml`,
          },
        ],
      },
    },
  ],
}
