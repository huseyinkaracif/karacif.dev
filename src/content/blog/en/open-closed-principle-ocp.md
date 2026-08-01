---
title: "Open-Closed Principle (OCP) — SOLID"
slug: "open-closed-principle-ocp"
lang: "en"
date: "2022-11-10"
category: "Engineering"
excerpt: "Open for extension, closed for modification: how to add new behavior without breaking the code you already have."
readTime: "4"
coverImage: "/images/blog/open-closed-principle-ocp/img-01.png"
mediumUrl: "https://medium.com/@hsynkrcf/open-closed-principle-ocp-solid-bafb791a9a61"
tags: []
---
![Open/Closed Software Principle](/images/blog/open-closed-principle-ocp/img-01.png)
*Open/Closed Software Principle*

The **Open-Closed Principle** says that modules — classes, methods, and so on — should be "open for extension, but closed for modification." This principle helps us build **flexible** software (extendability) that's easy to change and maintain down the line.

> Every developer knows that software is synonymous with constant change.

**"If the one thing that never changes is change itself, shouldn't we be making that change as cheap as possible?"**

![Open-Closed Principle (OCP) — SOLID](/images/blog/open-closed-principle-ocp/img-02.png)

In short, this principle is the foundation of writing sustainable, reusable code. Our goal is simple: **we should be able to give an object new capabilities without changing its existing behavior.**

> Okay, got it — so how do we actually use this?

Let me walk you through two versions of the same example: one written badly, ignoring the principle, and one written well, following it.

## The Bad Example

Here's the setup: we run a phone factory. We wrote a **Phone** class with an enum called **PhoneType** inside it, listing the two kinds of phones we manufacture. Then we created two classes, Samsung and iPhone, that inherit from Phone — each passing the right enum value into its constructor.

Now let's build our factory. We create a class called **PhoneFactory** with a method called **MakePhone**, which takes the type of phone to build as a parameter and calls the right function based on that parameter.

Time to go into production, friends. In our `Program.cs`, we use the classes above to manufacture two kinds of phones.

### The Output of Our Example

![Open-Closed Principle (OCP) — SOLID](/images/blog/open-closed-principle-ocp/img-03.png)

Great, our factory is up and running. But then one day we decide: enough is enough, Xiaomi is selling like crazy, let's manufacture that too. **No problem**, we think — we'll just do whatever we did for the others.

1.  Go into the **PhoneType** enum and add the Xiaomi brand.
2.  Create a Xiaomi class just like the others, inheriting from **Phone**.
3.  Add the new brand to our **PhoneFactory** class and write a **MakeXiaomi** method to produce it.
4.  Finally, call the new phone's production logic from our Main method.

![Open-Closed Principle (OCP) — SOLID](/images/blog/open-closed-principle-ocp/img-04.png)

### The New Output of Our Example

![Open-Closed Principle (OCP) — SOLID](/images/blog/open-closed-principle-ocp/img-05.png)

We got our new brand onto the production line. 👏 But think about it — there wasn't a single class we didn't have to touch, a single step we could skip. We needed exactly four separate changes. If we wanted to add Huawei tomorrow, would we really have to go through all of that again? Wasn't the whole point of this principle to be open for extension and closed for modification?

## The Good Example (Better Than Previous)

Now we're at my favorite part. Here we'll see how to write this in a way that actually follows the principle — and it's easier too.

First, we define our **Phone** class as **abstract** and put a **Make()** method inside it. Then our other classes simply implement it and **override** that method.

Take a look at our factory below. Can you believe it? We don't need **switch/case** style **conditions** anymore. The only job of the **MakePhone()** method is to call the **Make()** method on whatever object was derived from our **abstract** class.

Using it in our Main method stays exactly the same as before.

Feels a bit better already, doesn't it? Let's add Huawei to our factory too and go global. Let's see if it gives us as much trouble as Xiaomi did 😅

![Open-Closed Principle (OCP) — SOLID](/images/blog/open-closed-principle-ocp/img-06.png)

### The Final Output of Our Example

![Open-Closed Principle (OCP) — SOLID](/images/blog/open-closed-principle-ocp/img-07.png)

### And that's it!

Now, you might be thinking — didn't both versions do the exact same thing?

They did, my friends, but in the first example, we needed four separate changes just to manufacture a new phone. In the second example, all we had to do was inherit from the **Phone** class for the new brand and kick off production in **Main** — and that alone made our lives so much easier.

-   We made our code open for extension and closed to major changes.
-   Abstraction made it easy to extend.
-   We made the code a bit more generic and got rid of the dependency on conditionals.

### SUMMARY

> The Open-Closed Principle is one of the most important design principles you need to know as a developer. This approach to software design has been around for decades, and it's still just as useful today. It gives us a solid way to think about our designs — and how they can be extended and changed — without worrying about breaking something else in the application.

**Grateful that you read this.**

**Take care, friends...**

To keep going with the SOLID principles, check out [**the Liskov Substitution Principle**](/en/writing/liskov-substitution-principle-lsp/):

👉 [**Liskov Substitution Principle (LSP) — SOLID**](/en/writing/liskov-substitution-principle-lsp/)

### References:

[What is Open-Closed Principle](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle) (Important)

[What are The Benefits of The OCP](https://blog.knoldus.com/solid-open-closed-principle/) (Special Thanks)

[How to Design for Open-Closed Principle](http://www.canertosuner.com/post/SOLID-Prensipleri-Open-Closed) (Special Thanks)

[Open-Closed With C#](https://dotnettutorials.net/lesson/open-closed-principle/)
