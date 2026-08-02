---
title: "What is SOLID? The SOLID Principles Explained"
slug: "solid-nedir"
lang: "en"
date: "2022-10-17"
category: "Engineering"
excerpt: "Five principles that show up in job postings, get asked in interviews, and are ignored far too often: a look at SOLID."
readTime: "3"
coverImage: "/images/blog/solid-nedir/img-01.webp"
mediumUrl: "https://medium.com/@hsynkrcf/solid-nedir-solid-prensipleri-nelerdir-74b89a99479e"
tags: []
---
[Robert C. Martin (Uncle Bob)](https://en.wikipedia.org/wiki/Robert_C._Martin) gathered the solutions to the core problems we run into during software development under five headings and handed them to the software community back in the 2000s. Ever since, it's been one of the most respected and most carefully applied principles in our field.

## **WHAT IS SOLID?**

**S.O.L.I.D is a set of principles that lets us write software that's sustainable, scalable, testable, and reusable.**

![SOLID Design Principles](/images/blog/solid-nedir/img-01.webp)
*SOLID Design Principles*

Let me give you a quick rundown of each one.

### [S — Single Responsibility Principle (SRP)](/en/writing/single-responsibility-principle-srp/)

A class should only ever have one reason to change. In other words, every class or function should have **exactly one responsibility**.

### [O — Open-Closed Principle (OCP)](/en/writing/open-closed-principle-ocp/)

You should be able to extend a class's behavior without changing it. Your class or method should be **open for extension, closed for modification**.

### [L — Liskov Substitution Principle (LSP)](/en/writing/liskov-substitution-principle-lsp/)

A subclass should be usable anywhere its parent class is expected, **without breaking anything** — no special-casing required.

### [I — Interface Segregation Principle (ISP)](/en/writing/interface-segregation-principle-isp/)

Rather than **one giant interface** that covers every responsibility, prefer **several small, focused interfaces** built around specific groups of methods.

### [D — Dependency Inversion Principle (DIP)](/en/writing/dependency-inversion-prensibi-dip/)

The principle that pushes us to **minimize dependencies** between classes. Changes to a low-level class shouldn't ripple up and break the high-level ones.

## **Why do we need the SOLID principles at all?**

Change requests and new feature requests are just part of building software. We can't stop them, and we can't say no to all of them. But a bad design can turn even a tiny change into something that costs us a huge amount of time and effort.

So who's to blame here? Honestly — it's the application's design.

![What is SOLID? The SOLID Principles Explained](/images/blog/solid-nedir/img-02.webp)

## **The Advantages** of the **SOLID** Principles

When you're building an application, here's what you need to keep in mind.

### **Flexibility and extensibility**

Flexibility and extensibility are essential for modern applications. That's why we need to design our application to be flexible — adaptable to different scenarios, extendable, and able to accept new features with minimal changes.

### **Testability**

Test-Driven Development (TDD) is one of the key ingredients when you need to design and build a large-scale application today. We need to design the application so each piece of functionality can be tested on its own.

### **Maintenance**

Maintaining software is, today, one of the biggest challenges people face. Companies grow over time, and as the business grows you have to evolve the software right along with it. That's why we need to design software that can absorb future changes smoothly and with minimal effort.

**The SOLID Principles** play a major role in achieving every one of the points above.

1.  They keep you from drowning in complexity.
2.  They boost readability and extensibility.
3.  They reduce bugs and enable reusability.
4.  They give you better testability.
5.  They keep coupling to a minimum.

## SUMMARY

> Applying these principles can feel overwhelming at first, but understanding the difference between code that follows them and code that doesn't will make your design process easier and more efficient going forward.

Let's go through each of these principles one by one, with code examples. I hope this turns into an enjoyable series that helps us really internalize SOLID.

**Grateful that you read this.**

**Take care, friends...**

### You can read the rest of the **SOLID** series in detail, with examples, right here:

👉 [**Single Responsibility Principle (SRP) — SOLID**](/en/writing/single-responsibility-principle-srp/)

👉 [**Open-Closed Principle (OCP) — SOLID**](/en/writing/open-closed-principle-ocp/)

👉 [**Liskov Substitution Principle (LSP) — SOLID**](/en/writing/liskov-substitution-principle-lsp/)

👉 [**Interface Segregation Principle (ISP) — SOLID**](/en/writing/interface-segregation-principle-isp/)

👉 [**Dependency Inversion Principle (DIP) — SOLID**](/en/writing/dependency-inversion-prensibi-dip/)
