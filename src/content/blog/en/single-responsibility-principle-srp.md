---
title: "Single Responsibility Principle (SRP) — SOLID"
slug: "single-responsibility-principle-srp"
lang: "en"
date: "2022-11-06"
category: "Engineering"
excerpt: "Every class and method should carry exactly one responsibility: writing readable, maintainable code with SRP."
readTime: "3"
coverImage: "/images/blog/single-responsibility-principle-srp/img-01.webp"
mediumUrl: "https://medium.com/@hsynkrcf/single-responsibility-prensibi-srp-solid-148cbc91b4c5"
tags: []
---
![Single Responsibility Software Principle](/images/blog/single-responsibility-principle-srp/img-01.webp)
*Single Responsibility Software Principle*

The **Single Responsibility Principle** aims to make code — which becomes **rigid** (impossible to reuse) and **fragile** (a change in one place breaks something else) when dependency management goes wrong — more modular.

As Uncle Bob puts it: [**gather together the things that change for the same reason, and separate the things that change for different reasons.**](https://www.oreilly.com/library/view/97-things-every/9780596809515/ch76.html#:~:text=Martin%20\(Uncle%20Bob\),single%20responsibility%20principle%2C%20or%20SRP.)

The more responsibilities we pile onto a class, the more often it has to change. And that means even a tiny update ends up costing more and more, until our code starts actively resisting change.

![Single Responsibility Principle (SRP) — SOLID](/images/blog/single-responsibility-principle-srp/img-02.webp)

Our goal isn't to shrug and say "it works, don't touch it" — it's to **shrink our responsibilities down so the code can adapt to change easily.**

So what does that actually mean in practice? Let's look at an example.

![Single Responsibility Principle (SRP) — SOLID](/images/blog/single-responsibility-principle-srp/img-03.webp)
```
public class Fatura{     public void FaturaEkle()     {        // İş Kuralları     }     public void FaturaSil()     {        // İş Kuralları     }     public void RaporHazirla()     {        // İş Kuralları     }     public void EmailGonder()     {        // İş Kuralları     }}
```

Our `FaturaEkle()` (AddInvoice) method is only responsible for adding an invoice to the system, `FaturaSil()` (DeleteInvoice) is only responsible for deleting invoices, and the same goes for `RaporHazirla()` (PrepareReport) and `EmailGonder()` (SendEmail).

On their own, we could say each of these methods satisfies the single responsibility principle. But look at the `Fatura` (Invoice) class as a whole, and you'll see it's juggling several unrelated responsibilities — which violates the principle.

### So what do we need to do here?

Since `FaturaEkle()` and `FaturaSil()` deal with the same kind of functionality, it makes sense to keep them together in one class.

`RaporHazirla()` and `EmailGonder()`, on the other hand, are completely independent and serve entirely different purposes — pulling them out into their own separate classes is exactly what satisfies the single responsibility principle.

Let's fix it right now!

![Single Responsibility Principle (SRP) — SOLID](/images/blog/single-responsibility-principle-srp/img-04.webp)
![Single Responsibility Principle (SRP) — SOLID](/images/blog/single-responsibility-principle-srp/img-05.webp)
```
public class Fatura{     public void FaturaEkle()     {         // İş Kuralları     }          public void FaturaSil()     {         // İş Kuralları     }}public class Rapor{     public void RaporHazirla()     {         // İş Kuralları     }}   public class Email{     public void EmailGonder()     {         // İş Kuralları     }}
```

And that's it!

Now every class has exactly one responsibility, and exactly one reason to change. The code is smaller and easier to manage for each piece of functionality. So whenever you need to change something, you no longer have to understand — or test — the entire class just to touch one part of it.

Working this way makes our code far easier to control, and it also boosts **reusability**.

### **SUMMARY**

> Now we understand how to restructure code to reach the Single Responsibility Principle. It helps us cut down on complexity and makes our code much easier to maintain.

**Grateful that you read this.**

**Take care, friends...**

To keep going with the SOLID principles, check out [**the Open/Closed Principle**](/en/writing/open-closed-principle-ocp/):

👉 [**Open-Closed Principle (OCP) — SOLID**](/en/writing/open-closed-principle-ocp/)

### References:

[What is Single Responsibility Principle](https://en.wikipedia.org/wiki/Single-responsibility_principle) (Important)

[Single Responsibility With C#](https://www.c-sharpcorner.com/article/solid-single-responsibility-principle-with-c-sharp/)

[Dotnet Tutorials for SOLID](https://dotnettutorials.net/lesson/single-responsibility-principle/#:~:text=SRP%20in%20C%23.-,What%20is%20the%20Single%20Responsibility%20Principle%20in%20C%23%3F,only%20one%20responsibility%20to%20do.)

[Explained SRP](https://stackify.com/solid-design-principles/)
