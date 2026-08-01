const path = require(`path`)
const fs = require(`fs`)
const { ROUTES, SITE_URL } = require(`./src/i18n/routes`)

exports.onPreBootstrap = async () => {
  const heroSrc = path.join(__dirname, `src/images/hero.jpg`)
  const heroDest = path.join(__dirname, `static/images/hero.jpg`)
  if (!fs.existsSync(heroSrc)) return
  fs.mkdirSync(path.dirname(heroDest), { recursive: true })
  const sharp = require(`sharp`)
  const buffer = await sharp(heroSrc)
    .rotate()
    .resize({ width: 1000, withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true })
    .toBuffer()
  if (!fs.existsSync(heroDest) || fs.statSync(heroDest).size !== buffer.length) {
    fs.writeFileSync(heroDest, buffer)
  }
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const lang = node.frontmatter.lang || `tr`
    const slug =
      node.frontmatter.slug ||
      path.basename(getNode(node.parent).relativePath, `.md`)
    createNodeField({ node, name: `lang`, value: lang })
    createNodeField({ node, name: `postSlug`, value: slug })
    createNodeField({ node, name: `slug`, value: ROUTES[lang].post(slug) })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const staticPages = [
    { template: `home`, key: `home` },
    { template: `projects`, key: `projects` },
    { template: `blog-list`, key: `blog` },
  ]
  staticPages.forEach(({ template, key }) => {
    ;[`tr`, `en`].forEach((lang) => {
      const altLang = lang === `tr` ? `en` : `tr`
      createPage({
        path: ROUTES[lang][key],
        component: path.resolve(`src/templates/${template}.js`),
        context: {
          lang,
          altPath: ROUTES[altLang][key],
          trPath: ROUTES.tr[key],
          enPath: ROUTES.en[key],
        },
      })
    })
  })

  const result = await graphql(`
    query {
      allMarkdownRemark {
        nodes {
          fields {
            lang
            postSlug
          }
        }
      }
    }
  `)
  if (result.errors) throw result.errors

  const bySlug = {}
  result.data.allMarkdownRemark.nodes.forEach((node) => {
    const { postSlug, lang } = node.fields
    bySlug[postSlug] = bySlug[postSlug] || {}
    bySlug[postSlug][lang] = true
  })

  Object.entries(bySlug).forEach(([slug, langs]) => {
    ;[`tr`, `en`].forEach((lang) => {
      if (!langs[lang]) return
      const altLang = lang === `tr` ? `en` : `tr`
      const hasAlt = Boolean(langs[altLang])
      createPage({
        path: ROUTES[lang].post(slug),
        component: path.resolve(`src/templates/blog-post.js`),
        context: {
          lang,
          postSlug: slug,
          altPath: hasAlt ? ROUTES[altLang].post(slug) : ROUTES[altLang].blog,
          trPath: langs.tr ? ROUTES.tr.post(slug) : null,
          enPath: langs.en ? ROUTES.en.post(slug) : null,
        },
      })
    })
  })
}

// llms.txt + llms-full.txt for AI crawlers
exports.onPostBuild = async ({ graphql }) => {
  const result = await graphql(`
    query {
      allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
        nodes {
          rawMarkdownBody
          fields {
            lang
            postSlug
          }
          frontmatter {
            title
            date
            excerpt
            category
          }
        }
      }
    }
  `)
  if (result.errors) throw result.errors

  const posts = result.data.allMarkdownRemark.nodes
  const tr = posts.filter((p) => p.fields.lang === `tr`)
  const en = posts.filter((p) => p.fields.lang === `en`)

  const header = [
    `# Hüseyin Karacif`,
    ``,
    `> Personal site of Hüseyin Karacif — Solution Expert & Senior Software Developer based in Istanbul, Türkiye. He writes about AI (agents, MCP, context engineering), software architecture, and engineering practice, in Turkish and English.`,
    ``,
    `- Site: ${SITE_URL}`,
    `- Writing (Turkish): ${SITE_URL}/yazilar/`,
    `- Writing (English): ${SITE_URL}/en/writing/`,
    `- Projects: ${SITE_URL}/projeler/`,
    `- Medium: https://medium.com/@hsynkrcf`,
    `- GitHub: https://github.com/huseyinkaracif`,
    `- LinkedIn: https://www.linkedin.com/in/huseyin-karacif`,
    `- Contact: karacif.dev@gmail.com`,
    ``,
  ]

  const section = (title, list, lang) => [
    `## ${title}`,
    ``,
    ...list.map(
      (p) =>
        `- [${p.frontmatter.title}](${SITE_URL}${ROUTES[lang].post(p.fields.postSlug)}): ${p.frontmatter.excerpt || ``} (${p.frontmatter.date})`
    ),
    ``,
  ]

  const llms = [
    ...header,
    ...section(`Articles (English)`, en, `en`),
    ...section(`Articles (Turkish)`, tr, `tr`),
  ].join(`\n`)

  const fullBody = (list, lang) =>
    list
      .map((p) =>
        [
          `---`,
          ``,
          `# ${p.frontmatter.title}`,
          ``,
          `URL: ${SITE_URL}${ROUTES[lang].post(p.fields.postSlug)}`,
          `Date: ${p.frontmatter.date}`,
          `Category: ${p.frontmatter.category}`,
          ``,
          p.rawMarkdownBody.trim(),
          ``,
        ].join(`\n`)
      )
      .join(`\n`)

  const llmsFull = [
    ...header,
    `## Full articles (English)`,
    ``,
    fullBody(en, `en`),
    `## Full articles (Turkish)`,
    ``,
    fullBody(tr, `tr`),
  ].join(`\n`)

  const pub = path.join(__dirname, `public`)
  fs.writeFileSync(path.join(pub, `llms.txt`), llms, `utf-8`)
  fs.writeFileSync(path.join(pub, `llms-full.txt`), llmsFull, `utf-8`)
}
