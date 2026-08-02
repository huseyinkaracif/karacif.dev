---
title: "Dependency Inversion Principle (DIP) — SOLID"
slug: "dependency-inversion-prensibi-dip"
lang: "en"
date: "2023-01-13"
category: "Engineering"
excerpt: "Minimize coupling between classes: high-level classes should depend on abstractions, not on details."
readTime: "4"
coverImage: "/images/blog/dependency-inversion-prensibi-dip/img-01.webp"
mediumUrl: "https://medium.com/@hsynkrcf/dependency-inversion-prensibi-dip-solid-ca05721c9059"
tags: ["software-development", "dependency-inversion", "solid"]
---
**The principle that pushes us to minimize coupling between classes. Changes made to a low-level class should never affect the high-level ones.**

![Dependency Inversion Software Principle](/images/blog/dependency-inversion-prensibi-dip/img-01.webp)
*Dependency Inversion Software Principle*

**Dependency Inversion**, in short, is built on the idea that coupling between classes should be kept to a minimum, and that dependencies should be built through **interfaces** rather than concrete classes. In other words, our goal is for the details to depend on our abstractions — not the other way around.

> High-level modules should not depend on low-level modules. Both should depend on abstractions.

> Robert C. Martin (Uncle Bob)

![](/images/blog/dependency-inversion-prensibi-dip/img-02.webp)

**Dependency Inversion** is the fifth and final design principle in this series. Notice something? Every single one of these principles carries the same underlying logic. Our goal is always to lower the cost of a project, make future additions easier, and boost readability and flexibility.

> High-Level Class > Abstraction Layer > Low-Level Class

Enough about high and low — let's cement this with another example.

Let's make this one about food this time — it's nighttime and I'm starving 😅

```
public class Kebab{    public void PrepareKebap(bool hotSpice){      // Prepare Kebab    }}
```

Now we can prepare kebab. Our class is done.

```
public class Lahmacun{    public void PrepareLahmacun(bool hotSpice){      // Prepare Lahmacun    }}
```

We've added another legend to the menu — wouldn't mind eating some right now (:

```
public class Restaurant{      public void Prepare(){      Kebab kebab = new Kebab();      Lahmacun lahmacun = new Lahmacun();      kebab.PrepareKebapb(true);      lahmacun.PrepareLahmacun(false);    }}
```

So, we sort of have a restaurant now, but doesn't something feel off? Our restaurant is dependent on the dishes — it's supposed to be the high-level piece here, but it gets affected by any change we make to a dish. Which means if we change the menu, we're forced to go modify the restaurant class too 😢

That, my friends, violates the **Dependency Inversion Principle**.

![The high-level class depends on the low-level class.](/images/blog/dependency-inversion-prensibi-dip/img-03.webp)
*The high-level class depends on the low-level class.*

#### So what should we do?

To break this dependency, we obviously need an abstraction. Let's create an interface right away.

```
public interface IFood{    void Prepare(bool hotSpice);}
```

Let's implement it in our Kebab class.

```
public class Kebab : IFood{    public void Prepare(bool hotSpice)    {        PrepareKebab(hotSpice);    }    public void PrepareKebab(bool hotSpice)    {        // Prepare Kebab    }}
```

Same thing for our Lahmacun class.

```
public class Lahmacun : IFood{    public void Prepare(bool hotSpice)    {        PrepareLahmacun(hotSpice);    }    public void PrepareLahmacun(bool hotSpice)    {        // Prepare Lahmacun    }}
```

And let's adapt our Restaurant class to match, and we're done.

```
 public class Restaurant {     private IFood _food;     public Restaurant(IFood food){         _food = food;     }          public void Prepare(bool hotSpice){         _food.Prepare(hotSpice);     } }
```

#### And that's it! What did we actually do?

-   We cut the direct link between our high-level class and the low-level ones.
-   We used an interface to build an abstraction layer.
-   We decoupled the dependency and brought it in line with DIP.
-   We made the code reusable and more flexible.

![By abstracting through an interface, we inverted the high-level class's dependency.](/images/blog/dependency-inversion-prensibi-dip/img-04.webp)
*By abstracting through an interface, we inverted the high-level class's dependency.*

#### A Useful Bit of Extra Context

Friends, these terms can get confusing sometimes — I run into this a lot myself while researching. So I felt it was worth adding a bit of extra clarity here.

![The Dependency Warriors — IOC vs DI vs DIP](/images/blog/dependency-inversion-prensibi-dip/img-05.webp)
*The Dependency Warriors — IOC vs DI vs DIP*

The terms above are closely related, but they're not the same thing. For anyone curious, I'll leave you a great, clear resource: definitely check out [Martin Fowler](https://martinfowler.com/)'s article, [DIP in the Wild](https://martinfowler.com/articles/dipInTheWild.html#YouMeanDependencyInversionRight).

**DI (Dependency Injection)** is about how an object receives its dependency. If a dependency is supplied from the outside, the system is using DI.
**IoC (Inversion of Control)** is about who's calling the code. If our code is the one initiating the call, that's not IoC.
**DIP (Dependency Inversion)** is about the level of abstraction in the messages the code sends to whatever it calls.

> DIP asks What? DI asks How? IoC asks Who? — It's not quite that simple, friends 😄

#### SUMMARY

> We can sometimes end up violating the Dependency Inversion Principle, but doing so tends to drive coupling way up — which, in turn, makes the code harder to maintain, harder to read, and much more fragile.

> DIP is a solid cornerstone for writing reusable, loosely coupled code.

**Grateful that you read this.**

**This was the last post in my SOLID Principles series.**

**If I managed to put together a genuinely useful resource for you all, that would truly make me happy 😍**

**Take care, friends...**

#### References

[What is Dependency Inversion Principle](https://en.wikipedia.org/wiki/Dependency_inversion_principle)

[How to Design for DIP](https://deviq.com/principles/dependency-inversion-principle)

[Dependency Inversion In DotNet](https://www.c-sharpcorner.com/blogs/dependency-inversion-principle-in-net-60)

[Benefits of DIP](https://stackify.com/dependency-inversion-principle/)

[DIP in The Wild (Important)](https://martinfowler.com/articles/dipInTheWild.html#YouMeanDependencyInversionRight)
