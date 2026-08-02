---
title: "Liskov Substitution Principle (LSP) — SOLID"
slug: "liskov-substitution-principle-lsp"
lang: "en"
date: "2022-11-13"
category: "Engineering"
excerpt: "Subclasses should be able to stand in for their parent class without a hitch: the logic behind LSP, illustrated with a phone-lock example."
readTime: "3"
coverImage: "/images/blog/liskov-substitution-principle-lsp/img-01.webp"
mediumUrl: "https://medium.com/@hsynkrcf/liskov-subsititutions-principle-lsp-65e5e41e9406"
tags: []
---
![Liskov Substitution Software Principle](/images/blog/liskov-substitution-principle-lsp/img-01.webp)
*Liskov Substitution Software Principle*

The **Liskov Substitution Principle** says that any subclass inheriting from a parent class must be able to use everything the parent class offers. In other words, **a class should never inherit a feature it has no real use for.**

> "Functions that use pointers or references to a base class must be able to use objects of derived classes without knowing it." — Robert C. Martin (Uncle Bob)

This principle is actually quite similar to the [Open/Closed Principle](/en/writing/open-closed-principle-ocp/) — you could call it a special case of it. Both are about structures that stay open to extension.

![Liskov Substitution Principle (LSP) — SOLID](/images/blog/liskov-substitution-principle-lsp/img-02.webp)

The Liskov Substitution Principle is also closely tied to **Polymorphism**, one of the core OOP principles. Let's work through an example to really understand it — we'll keep building on the example from the previous principle.

Here's the setup: we define an **Interface**. Our other classes will inherit from it, unlocking the phone with an **OpenLock** method and adding a biometric passcode with an **AddTouchId()** method.

![Liskov Substitution Principle (LSP) — SOLID](/images/blog/liskov-substitution-principle-lsp/img-03.webp)

Then we create our **iPhone**, **Samsung**, and **Xiaomi** concrete classes, inheriting from the **IMobilePhone** interface. We're all set — now we can unlock every phone and add TouchId biometric locking to each one.

![Liskov Substitution Principle (LSP) — SOLID](/images/blog/liskov-substitution-principle-lsp/img-04.webp)

Job done — now let's add one more phone to the mix. Time to bring the legendary indestructible Nokia 3310 into this. Uh-oh — Nokia doesn't even have a TouchId feature! But our **IMobilePhone** interface forces every implementer to have one. For Nokia, the **AddTouchId()** method is completely pointless. So what do we do now?

![Liskov Substitution Principle (LSP) — SOLID](/images/blog/liskov-substitution-principle-lsp/img-05.webp)

We scramble and slap a special condition on Nokia. But are we really going to go through life writing if/else for every edge case like this? This obviously violates LSP — and since it does, it violates OCP too. Worst case, we just throw a **NotImplementedException** and catch it in a try/catch block, right? 😅

Let's actually solve this properly, by applying the Liskov Substitution Principle.

![Liskov Substitution Principle (LSP) — SOLID](/images/blog/liskov-substitution-principle-lsp/img-06.webp)

iPhone, Samsung, and Xiaomi all support both unlocking and biometrics, so they inherit from two interfaces. Nokia can only unlock, so it inherits only from **ILockable**. That way, it's never forced to carry an **AddTouchId()** method it will never use.

As you can see, we've split our base object up into interfaces. This is exactly the approach behind the [Interface Segregation Principle](/en/writing/interface-segregation-principle-isp/).

> Note: interfaces usually take an "I" prefix and an "-able" suffix.

![Liskov Substitution Principle (LSP) — SOLID](/images/blog/liskov-substitution-principle-lsp/img-07.webp)

**And that's it! What did we actually do?**

-   We made our code a bit more generic and removed the dependency on **conditionals** (if/else).
-   We ended up with a design that follows the [Open/Closed Principle](/en/writing/open-closed-principle-ocp/), because it's about extending, not modifying.
-   Every structure does exactly one job, so we ended up with a design that follows the [Single Responsibility Principle](/en/writing/single-responsibility-principle-srp/).
-   We used interfaces to separate features, giving us a design that follows the [Interface Segregation Principle](/en/writing/interface-segregation-principle-isp/).

### SUMMARY

> LSP is an incredibly useful idea to keep in mind, whether you're building a brand new application or extending and modifying an existing one.
>
> When you're designing a class hierarchy for a new application, **LSP helps you organize the concepts in your problem domain and write code that holds up over time.**

**Grateful that you read this.**

**Take care, friends...**

To keep going with the SOLID principles, check out [**the Interface Segregation Principle**](/en/writing/interface-segregation-principle-isp/):

👉 [**Interface Segregation Principle (ISP) — SOLID**](/en/writing/interface-segregation-principle-isp/)

### References

[What is Liskov Substitution Principle](https://en.wikipedia.org/wiki/Liskov_substitution_principle) (Important)

[Liskov Substitution With C#](https://www.gencayyildiz.com/blog/liskovun-yerine-gecme-prensibiliskov-substitution-principle-lsp/) (Special Thanks)

[LSP Abstraction Examples](https://www.gokhan-gokalp.com/en/liskov-substitution-principle-lsp-liskovun-yerine-gecme-prensibi/) (Special Thanks)

[How to Design for LSP](https://stackify.com/solid-design-liskov-substitution-principle/)
