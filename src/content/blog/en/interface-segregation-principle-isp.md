---
title: "Interface Segregation Principle (ISP) — SOLID"
slug: "interface-segregation-principle-isp"
lang: "en"
date: "2022-11-19"
category: "Engineering"
excerpt: "Small, purpose-built interfaces instead of one giant one: the logic behind ISP, with a worked example in C#."
readTime: "3"
coverImage: "/images/blog/interface-segregation-principle-isp/img-01.png"
mediumUrl: "https://medium.com/@hsynkrcf/interface-segregation-principle-isp-solid-f70747d905dc"
tags: ["solid", "interface-segregation", "software-development"]
---
**Rather than **one giant interface** that covers every responsibility, prefer **several small, focused interfaces** built around specific groups of methods.**

![Interface Segregation Software Principle](/images/blog/interface-segregation-principle-isp/img-01.png)
*Interface Segregation Software Principle*

**Interface Segregation**, in short, is the design principle that tells us not to implement interfaces containing **methods** or **properties** our objects don't actually need. Much like [SRP](/en/writing/single-responsibility-principle-srp/), the goal of the **Interface Segregation Principle** is to split software into multiple independent pieces, reducing both the side effects and the frequency of changes we're forced to make.

> *No code should be forced to depend on methods it doesn't use. — Robert C. Martin (Uncle Bob)*

As a project grows, **interface** classes tend to pick up more and more responsibilities. Over time, all those newly loaded responsibilities make these interfaces balloon into something unwieldy and hard to control.

![](/images/blog/interface-segregation-principle-isp/img-02.png)

To build genuinely sustainable projects, we have to be careful about how we use **interfaces**. That care is exactly what protects us from the complexity that a poorly implemented interface can create.

Let's work through an example to make this click — we always use phones as examples, so this time let's learn through animals instead.

Say we have three kinds of animals, and one **Interface** that provides all their features.

![Without ISP](/images/blog/interface-segregation-principle-isp/img-03.png)
*Without ISP*

As you can see, we gave all our animals their features through a single interface.

But wait! Something's off here — **dogs can't fly, fish can't walk, and birds can't swim!** (I'm ignoring the exceptions, friends — biology is a deep ocean 😅)

If dogs can't fly, why does our **Fly()** method even exist? You already see the problem. This is what we call DummyCode (fake code), because it's functionally useless. And this is exactly where **Interface Segregation** comes in.

### So what do we need to do here?

In a situation like this, we need to split the relevant methods into separate **Interfaces**, so each class only carries the methods it actually needs. In short: **Interface Segregation** — literally, "segregating interfaces"!

Let's get to it right away!

> *Note: interfaces usually take an "I" prefix and an "-able" suffix.*

![With ISP](/images/blog/interface-segregation-principle-isp/img-04.png)
*With ISP*

As you can see, we created three new **Interfaces** and inherited them into the right classes. A dog can walk, but it can't fly, right? And finally, all of them still connect back to a **base** **IAnimal** Interface, because every animal eats and sleeps!

We don't even need more code — it's all pretty self-explanatory, isn't it? **Interface Segregation** is a genuinely important principle. Let's avoid **Interfaces** stuffed with dozens of unrelated capabilities. Instead, let's separate our features based on what's actually needed, group them sensibly, and hand them off to the right classes.

Doing it this way — where you never end up writing a method or feature nobody needs — turns out to be extremely useful when you circle back to the code later.

![Happy Ending :)](/images/blog/interface-segregation-principle-isp/img-05.png)
*Happy Ending :)*

#### SUMMARY

> Interface Segregation is a simple principle that's surprisingly easy to violate — usually by tacking methods onto an existing interface that its consumers don't actually need. ISP is also closely tied to the other SOLID principles.

> That said, we should never forget that applying any principle too aggressively can create a whole new set of problems in the codebase.

**Grateful that you read this.**

**Take care, friends...**

To keep going with the SOLID principles, check out [Dependency Inversion Principle](/en/writing/dependency-inversion-prensibi-dip/):

[Dependency Inversion Principle (DIP) — SOLID](/en/writing/dependency-inversion-prensibi-dip/)

#### References

[What is Interface Segregation Principle](https://en.wikipedia.org/wiki/Interface_segregation_principle) (Important)

[Benefits of Interface Segregation](https://reflectoring.io/interface-segregation-principle/)

[Interface Segregation With DotNet](https://dotnettutorials.net/lesson/interface-segregation-principle/)

[How to Design for ISP](https://www.baeldung.com/java-interface-segregation)
