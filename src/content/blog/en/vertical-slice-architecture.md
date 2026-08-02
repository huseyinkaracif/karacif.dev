---
title: "Every Slice Is a Feature: A Micro Approach with Vertical Slice Architecture"
slug: "vertical-slice-architecture"
lang: "en"
date: "2025-06-16"
category: "Architecture"
excerpt: "A fresh alternative to layered architecture: Vertical Slice Architecture, which handles each feature end-to-end within its own vertical slice."
readTime: "6"
coverImage: "/images/blog/vertical-slice-architecture/img-01.webp"
mediumUrl: "https://medium.com/@hsynkrcf/her-dilim-bir-%C3%B6zellik-vertical-slice-architecture-ile-mikro-yakla%C5%9F%C4%B1m-8daeeae4c17d"
tags: ["architecture", "clean-code", "vertical-slice", "development", "software"]
---
The **software** world offers us countless **architectural patterns** and **approaches** to build our projects with. The **layered structures** most of us are familiar with do bring a certain order, but sometimes shipping a single feature means touching different corners of the codebase — almost like piecing together a **jigsaw puzzle**.

This is exactly where one approach stands apart with its simplicity and functionality. Meet **Vertical Slice Architecture**. So what does this **architecture** do differently, and why is it being chosen **more and more** every day?

![Vertical Slice Architecture (VSA)](/images/blog/vertical-slice-architecture/img-01.webp)
*Vertical Slice Architecture (VSA)*

### What Is Vertical Slice Architecture? Let's Understand It First

In traditional software architectures, we usually see a layered structure. The most well-known layers are:

-   **Presentation Layer:** What the user sees (web pages, mobile screens).
-   **Business Logic Layer:** Where the application's rules and calculations happen.
-   **Data Access Layer:** The part that talks to the database.

In **Vertical Slice**, when you want to add a new feature **(say, "show order")**, you usually have to make changes across all of these layers. **Kind of like slicing a cake horizontally, into its layers, isn't it?**

**Vertical Slice Architecture** says something different: think of a feature as a single vertical slice that runs from the user interface all the way down to the database. In other words, the **"show order"** feature acts like its own mini application, **cutting through all the layers vertically and carving its own path.**

![Tiered vs Vertical Slice](/images/blog/vertical-slice-architecture/img-02.webp)
*Tiered vs Vertical Slice*

#### To Put It Simply

-   **Traditional (Horizontal Slice):** Picture a fruit cake. To build a feature, you touch the sauce and fruit layer on top, then the cream layer, then the sponge layer underneath.
-   **Vertical Slice:** From that same cake, you take one full slice straight down to the plate with your fork. That slice has the sauce, the fruit, the cream, and the sponge, all in one. That's a vertical slice containing **everything a feature needs.**

### Vertical Slice Architecture — But What Exactly Is a "Slice"?

In **Vertical Slice Architecture**, a **"slice"** means handling a **feature** with **all its layers, end-to-end**, together. So from the UI down to the database, only the code specific to that one feature is grouped together.

Each slice contains its own Request, Handler, Validation, Persistence, and UI logic. **In short, it's a structure that pulls in only the pieces of each layer relevant to that specific feature.**

![What is a slice?](/images/blog/vertical-slice-architecture/img-03.webp)
*What is a slice?*

### Why Use Vertical Slice Architecture? What Are the Advantages?

From what I've researched, there are good reasons this architecture has grown popular — **pay attention here, this part matters!**

**Focused Development:** While working on a feature, you focus only on the code related to that feature. You're not wrestling with the rest of the project's complexity.

-   *Let me give an example:* if you're working on **"add new product,"** you only concern yourself with that operation's interface, business rules, and database records. The code for the **"user reviews"** section doesn't concern you at all in that moment.

**Lower Coupling:** Features become more independent from one another. A change you make in one feature is less likely to break the others.

-   Changing how the **"search product"** feature works doesn't directly affect the **"add to cart"** feature, because their code is largely separate.

**Higher Cohesion:** All the code related to a feature **(UI, business logic, data access)** lives together, usually in the same folder or module. This makes the code much easier to understand and modify.

-   All the files related to a **"Forgot Password"** feature — the controller, command, handler, view, and so on, as I mentioned above — can be grouped under a folder like Features/ForgotPassword.

**Great for Team Work:** Different developers or teams can work more comfortably on different vertical slices **(features)** at the same time, without stepping on each other's toes.

-   While one team works on the **"Payment System Integration"** slice, another team can be working on the **"User Profile Update"** slice. It reduces overlap and cuts down on that nagging thorn of merge conflicts. 😄

**Easier to Test:** Since each vertical slice is self-contained, it's more isolated and easier to test.

-   One last thing I can add, in case anyone's curious. It can potentially offer technological flexibility. In theory, each slice could use different technologies and libraries internally, but in practice, that can make things harder to manage and messier overall. Still, it offers a degree of flexibility 👍

#### Below I've left an example "slice." No need for a "what does that look like" question in your head — let's get the logic locked in 🙏

![An Example](/images/blog/vertical-slice-architecture/img-04.webp)
*An Example*

### Vertical Slice vs Onion (Clean) Architecture

I can't really give you a thorough rundown of **Clean Architecture** here, so let me leave you a really solid resource instead. Written by someone I value, and also a colleague of mine — thank you to him.

[Clean Architecture * Burak Neiş](https://burakneis.com/clean-architecture/)

Now let's compare this newly learned architecture with the one I love and use the most. Both aim for **modularity**, **testability**, and **maintainability**, but their approaches and priorities are quite different. 🍀

#### Instead of a long write-up, I've put it together for you in a table: (honestly)

```csv
Kriter,🧩Vertical Slice Architecture (VSA),🧅Onion / Clean Architecture
Yaklaşım Biçimi,Özellik (feature)-bazlı,"Katman (layer)-bazlı, merkezde domain"
Kod Organizasyonu,Her özellik ayrı dosya/folder yapısında,"Katmanlara göre organize edilir (Domain, App, Infra, UI vs.)"
Bağımlılık Yönü,Her slice kendi iç bağımlılıklarına sahiptir,Dış katmanlar iç katmanlara bağlıdır
Test Edilebilirlik,Slice’lar bağımsız olduğu için kolay test edilebilir,Domain merkezi yapı test için güçlüdür
Anlaşılabilirlik,Yeni başlayanlar için basit ve anlaşılır,Başlangıçta soyut ve öğrenmesi zor olabilir
Değişiklik Etkisi,Bir slice değiştirmek diğerlerini etkilemez,Katmanlar arası değişiklikler zincirleme etki yaratabilir
Uygulama Tipi için Uygunluk,Monolith ya da mikroservis öncesi yapılar,"Karmaşık, kurumsal, çok katmanlı sistemler"
Domain’e Odak,İş mantığı slice içinde dağılmış olabilir,Domain model her şeyin merkezindedir
Yeniden Kullanılabilirlik,Kod tekrarına açık olabilir,Domain logic katmanlarda tekrar kullanıma açık
İlk Kurulum ve Maliyet,Hızlı ve düşük kurulum maliyeti,İlk kurulum maliyeti ve soyutlama yükü fazladır
Ölçeklenebilirlik,Özellik bazlı ölçekleme kolay,Mimariyi genişletmek sabit ama yapılandırılmış
Uygulama Akışı,UI → Request → Handler → Result (dikey),UI → App Layer → Domain → Infra (yatay)
CQRS Uygunluğu,Yüksek — her slice kolayca CQRS ile uyarlanabilir,Uygulanabilir ama daha fazla katman ve karmaşa gerekir
```

Below you can see a small breakdown I put together of the file structure used in both architectures.

```markdown
# Onion ve Vertical Slice Mimarisinin Dosya Yapıları

## Onion Architecture
```
📦 /Domain
├── 📄 Entities/User.cs
├── 📄 Interfaces/IUserRepository.cs

📦 /Application
├── 📁 Users
│   ├── 📄 Commands/RegisterUserCommand.cs
│   ├── 📄 Handlers/RegisterUserHandler.cs
│   ├── 📄 Validators/RegisterUserValidator.cs

📦 /Infrastructure  
├── 📁 Repositories
│   ├── 📄 UserRepository.cs

📦 /API
├── 📁 Controllers
│   ├── 📄 UserController.cs
```

---

## Vertical Slice Architecture
```
📦 /Features
├── 📁 Users
│   ├── 📄 RegisterUser.cs
│   ├── 📄 RegisterUserValidator.cs
│   ├── 📄 RegisterUserHandler.cs
│   ├── 📄 RegisterUserResponse.cs
```
```

### Hüseyin, Which One Should I Use in Which Scenario?

These two architectures serve different needs, and I'll say it again: it depends on the **size of your project**, your **team structure**, your **domain complexity**, and your **long-term goals**.

**Vertical Slice Architecture** 🧩

-   Small to medium-sized projects — startups, MVPs, POCs, and pre-microservice monoliths
-   Fast development, a simple structure, situations where abstracting the domain isn't critical (when shipping early is the priority)
-   When each feature needs to be developed independently by a single team
-   When you want rapid implementation with tools like CQRS and MediatR

**Onion / Clean Architecture** 🧅

-   Large enterprise systems (long-lived projects)
-   When you're using a Domain-Driven Design (DDD) approach
-   When there are complex business rules, policies, and behavioral models
-   Long-lived, maintainable, test-focused projects

**For a new, fast-growing project** → Vertical Slice is a great fit to start with.

**For a large-scale, multi-layered system** → Clean Architecture offers a much sturdier foundation in the long run.

### Things to Watch Out For / Potential Challenges

#### It Carries a Code Duplication Risk

Since features (slices) are isolated from one another, some **shared needs** **(e.g., user validation, error logging, DTO mapping, caching mechanisms)** can end up repeated across every slice.

To **minimize** this duplication: create a Shared Kernel folder. Use helper libraries like Utility, Common, or CrossCuttingConcerns.

But be careful: don't let these shared areas **grow unnecessarily into a new "god layer."**

#### Architectural Discipline

Slices should be designed feature-specific but stay within defined boundaries. Shared services (like ILogger, IDateTimeProvider) should be managed through **dependency injection**.

Team **conventions** and folder structures need to be defined up front. Otherwise every developer ends up writing slices in their own "style."

#### Clarity Between Layers

In Vertical Slice architecture, **the layers aren't separated**, but the **"roles"** are still clear. In practice, things like data access, validation, and mapping shouldn't all get dumped into a single class inside the Handler.

That's why code needs to be written simply and with a focused responsibility [**(SRP — Single Responsibility Principle)**](/en/writing/single-responsibility-principle-srp/)**. If you haven't read it yet, take a look :)**

#### Management Gets Harder as It Grows

As the app grows, the number of slices grows with it. In that case: slices can be split into subfolders (e.g., Features/Users/Register, Features/Users/Login). Or a slice's Command, Query, Response, Handler, Validator files can be grouped logically.

> **Grateful that you read this.**

> **Take care, friends...**

#### Sources;

[Simplest Vertical Slice Architecture](https://www.milanjovanovic.tech/blog/vertical-slice-architecture)

[VSA Solutions and Templates](https://www.jimmybogard.com/vertical-slice-architecture/)

[The Best Ways to Structure Your Project](https://www.reddit.com/r/dotnet/comments/1eo7uhk/vertical_slice_architecture_the_best_ways_to/)

[Why Vertical Slices Won't Evolve from Clean Architecture](https://ricofritzsche.me/why-vertical-slices-wont-evolve-from-clean-architecture/)

[Vertical Slice Architecture in ASP.NET Core](https://code-maze.com/vertical-slice-architecture-aspnet-core/)
