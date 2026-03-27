module.exports = {
  siteMetadata: {
    title: `Karacif.dev`,
    description: `Hüseyin Karacif — Senior Software Developer Portfolio`,
    author: `Hüseyin Karacif`,
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
