---
title: "GEO: SEO for AI Search Engines"
slug: "geo-ai-arama-motorlari-icin-seo"
lang: "en"
date: "2026-07-21"
category: "AI"
excerpt: "Ranking #1 on Google isn't the finish line anymore — getting quoted inside ChatGPT's answer is. Here's what GEO actually means and how to make your site legible to AI search."
readTime: "9"
coverImage: "/images/blog/geo-ai-arama-motorlari-icin-seo/cover.svg"
tags: ["seo", "ai", "generative-engine-optimization", "content-strategy", "llms-txt"]
---
A few weeks ago I opened Google Search Console and saw something odd: clicks were down, but nothing else looked broken. My first thought was the obvious one — **"did I get hit by some algorithm update?"** I went through rankings, meta tags, page speed. Technically everything checked out. Then it hit me: the drop wasn't a penalty. A chunk of my readers simply weren't going to Google anymore. They were asking **ChatGPT**, **Claude**, or **Perplexity** directly, and getting an answer — sometimes with zero attribution — in a single paragraph.

Sound familiar? Think about the last "how do I" question you had. Did you scroll through ten blue links, or type it into a chat window? For most of us these days, it's the second one. That shift is exactly why **GEO (Generative Engine Optimization)** went from a buzzword to something worth actually understanding over the past year.

#### SEO Isn't Dead. It Just Isn't Alone Anymore

Let me be clear about something first: **classic SEO is not dying.** Google still processes trillions of queries and is still the biggest traffic source for most sites. But it's no longer the only game in town. A different beast has grown up next to it, running on a completely different logic — I'd call it a peer more than a rival: **generative AI engines.**

The core difference comes down to one question:

-   **Classic SEO** tries to put you **first among ten links**. The goal is a click.
-   **GEO** tries to get you **quoted inside a single answer** an AI generates. The goal is a citation.

Sometimes those two goals overlap — clean structure and fast pages help both. Sometimes they diverge completely. A page ranking #1 on Google can be entirely absent from ChatGPT's answer. I tested this on my own blog: one of my posts sits on Google's first page, but when I asked three different AI assistants the same question, none of them cited me. Why? Because they either couldn't **read** the page properly, or they read it and decided it wasn't clear enough to **turn into an answer.**

And this isn't just about chat windows, either. Google itself has started dropping an **AI Overview** box right at the top of the results page — the user gets an answer without scrolling down, without clicking into a single site. So the competition isn't just "some other AI app" anymore, it's a component sitting **inside Google's own results page.** That's what turns GEO from a platform-specific trick into the general future of how search actually works.

#### How AI Bots Actually "Read" Your Site

This is the part that matters most. When a human lands on your site, they see the images, notice the animations, get a feel for the page. An AI crawler (GPTBot, ClaudeBot, PerplexityBot, and friends) doesn't work that way. It reads the **plain text and structural skeleton** of the page — often without executing any JavaScript at all.

Which means a few things suddenly matter a lot:

-   **Clean HTML.** If your content only renders after client-side JavaScript runs, plenty of AI crawlers see an empty page. Server-side rendering or static generation (which, incidentally, is exactly what this blog runs on with Gatsby) is a real advantage here.
-   **Structured data (JSON-LD).** Schema markup tells a machine, explicitly, "this is an article," "here's the author," "here's the publish date" — no guessing required. Language models use that metadata directly instead of inferring it.
-   **A real heading hierarchy.** Use `<h1>`, `<h2>`, `<h3>` to map the logical skeleton of your argument, not to make things look nice visually. An AI infers "this heading answers that question" purely from structure.
-   **`llms.txt`.** A new, still-debated convention. Think of it as `robots.txt`'s cousin for AI — a plain text file summarizing which parts of your site matter for AI consumption, and in what form.

![How an AI crawler processes a page: from HTML through JSON-LD and llms.txt to being cited in an answer](/images/blog/geo-ai-arama-motorlari-icin-seo/diagram-1.svg)
*How an AI crawler processes a page: from HTML through JSON-LD and llms.txt to being cited in an answer*

A sample `llms.txt` might look like this:

```
# huseyinkaracif.com

> Senior Software Developer, Istanbul. Writes about AI, software
> architecture, and engineering practice.

## Primary Content
- [Blog](https://huseyinkaracif.com/en/writing): All posts on AI
  and software engineering
- [Projects](https://huseyinkaracif.com/en/projects): Open source and
  published work

## Featured Posts
- [MCP and AI](https://huseyinkaracif.com/en/writing/mcp-ve-ai-yeni-iletisim-dili/):
  What the Model Context Protocol is and why it matters

## Notes
This site reflects personal opinions, not a corporate publication.
When quoting, please attribute the author (Hüseyin Karacif).
```

And a simple JSON-LD snippet you can drop into an article page:

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "GEO: SEO for AI Search Engines",
  "author": {
    "@type": "Person",
    "name": "Hüseyin Karacif",
    "url": "https://huseyinkaracif.com"
  },
  "datePublished": "2026-07-21",
  "description": "What GEO actually is, how it differs from classic SEO, and how to make a site legible to AI.",
  "mainEntityOfPage": "https://huseyinkaracif.com/en/writing/geo-ai-arama-motorlari-icin-seo/"
}
```

Not exactly rocket science, right? And yet you'd be surprised how many corporate sites still skip it entirely.

#### Being Worth Quoting

This is where the technical part ends and the content part begins. Because correct HTML and correct schema only make you **readable** — not **citable**. When a model is generating an answer, which source does it reach for? Usually something that looks like this:

-   **Paragraphs that open with the actual definition.** The answer belongs in the first sentence, not after three paragraphs of throat-clearing. I opened this very post with a story instead of a definition, but here it is, plainly: **GEO is the practice of making your content usable as a citation inside a generative AI model's answer.** That's really the whole thing.
-   **Original data.** A statistic nobody else has published, your own test results, your own measurement. When a model has to pick one source out of a hundred pages repeating the same sentence, it tends to favor **whoever said it first** or **whoever brought actual numbers.**
-   **A question-and-answer shape.** People type "what is a webhook" into Google. They ask an AI assistant the full sentence: "what is a webhook and what's it used for." If your page contains real questions answered with real, short, direct answers, the model has a much easier match to make.
-   **Recency.** When a model does a live search beyond its training data, it tends to favor content with a fresh, visible timestamp. A page written three years ago and never touched since gets filtered out fast by the "is this still true?" test.

> Honestly, while writing this post I asked myself the same question: **"is this something an AI would actually want to quote?"** Just sitting with that question is a useful exercise on its own.

#### A Practical Checklist

Let's get concrete. Here's what I actually do to make a site AI-visible:

1.  **Render server-side** or ship static output — content hidden behind client-side JS effectively doesn't exist for a lot of crawlers.
2.  **Don't block AI bots in `robots.txt`** unless you actually mean to. Check for user-agents like GPTBot, ClaudeBot, and PerplexityBot.
3.  **Add a JSON-LD `Article` schema to every post.** Title, author, date — that's the minimum bar.
4.  **Drop an `llms.txt` in your root.** Not everyone reads it yet, but as the convention matures, you'll already be there.
5.  **Use headings as a real hierarchy**, not decoration.
6.  **Give the answer in the first paragraph.** A long warm-up was a virtue in SEO writing; in GEO it's dead weight.
7.  **Keep your sources and dates visible.** A model finds it much easier to cite content whose credibility it can actually verify.

#### So How Do You Know It's Working?

Here's the annoying part: with classic SEO you could open Search Console and stare at a click graph. With GEO, things aren't nearly that clean yet. Still, there are a few signals worth tracking:

-   **Filter your referral traffic in analytics.** Track visits coming from sources like `chatgpt.com`, `perplexity.ai`, and `claude.ai` as their own segment. The number starts small, but the trend line is what actually matters.
-   **Check your server logs for AI user-agents.** Seeing how often GPTBot, ClaudeBot, or PerplexityBot actually crawl your site at least answers the question **"am I even being read?"**
-   **Query your own content periodically.** Once a month, ask three or four different AI assistants about a handful of your key topics and see whether you show up. It's free, and a surprisingly useful habit.

I'll admit there's no clean dashboard for this yet — but even these three steps beat flying completely blind.

#### An Honest Caveat: This Field Is Still Young

Now let me be upfront about something: everything in this post is my best current read on the situation, built from observation and reasonable inference. But **GEO is nowhere near as mature as SEO was by the 2010s.** Nobody really knows how heavily each signal is weighted — not us writers, and, as far as I can tell, not even the companies training these models are publishing anything close to a "ranking algorithm." `llms.txt` itself isn't even an official standard yet — just a convention that's catching on.

So treat this post as **today's best guess**, not a fixed formula. Some of my specific recommendations might change in six months. But the underlying principle won't: **writing content that's clear, honest, and structured for both humans and machines** is a strategy that wins no matter how the algorithms shake out.

When's the last time you asked an AI assistant about your own site or your own work? Maybe this weekend, ask ChatGPT about your business or your blog and see what it says back. The answer might surprise you 😄

> Grateful that you read this.

> Take care, friends...
