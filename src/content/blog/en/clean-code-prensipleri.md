---
title: "Clean Code Principles"
slug: "clean-code-prensipleri"
lang: "en"
date: "2024-01-05"
category: "Engineering"
excerpt: "Writing code is easy. Writing code someone else can read at 2 a.m. during an incident is the actual job. Here's how a 'temporary fix' turned into a six-month nightmare, and what I do differently now."
readTime: "9"
coverImage: "/images/blog/clean-code-prensipleri/cover.webp"
tags: ["clean-code", "refactoring", "code-quality", "craftsmanship"]
---

One day I got handed an **"urgent"** task: a teammate had gone on leave, and I had to take over the order module he owned. I opened the file and found a single method. **800 lines.** Variables named `x`, `temp`, `flag1`, `flag2`, three levels of nested `if-else`, and comments that meant nothing to anyone anymore. One line said **"// fix this later."** `git blame` said: written two years earlier. 😅

That day it clicked: this isn't a talent problem, it's a **discipline problem.** The person who wrote it wasn't a bad engineer — he just kept saying "good enough for now" until those small concessions compounded into a monster nobody dared touch. **I'm still writing about this because I still meet a version of that file almost every week.**

### Why It Matters: Code Is Read Far More Than It's Written

There's a ratio Robert C. Martin keeps coming back to in **"Clean Code":** for every hour spent writing a line, we spend roughly **ten times that** reading it back — you in six months, a teammate hunting a bug, someone doing a line-by-line review. **Code lives far longer as something read than as something written.**

Think of it this way: **a messy codebase is a credit card balance quietly accruing interest.** You don't notice it month one — you might even feel fast. By month three, every feature starts with "let me figure out what this does." By month six, nobody wants to touch that file, and "there be dragons" is an inside joke. **Every shortcut you take for speed gets paid back later, with interest.**

![Delivery velocity of a clean codebase keeps climbing over time while a messy codebase's velocity collapses](/images/blog/clean-code-prensipleri/diagram-1.svg)
*The cost of mess compounds over time*

### Meaningful Names: Code's First Impression

A variable or function name's job is to tell the reader **what it's for.** A good name makes a comment unnecessary; a bad one, no comment can save.

```javascript
// Bad
let d;
function getInfo(u) { ... }
if (flag1 && !flag2) { ... }

// Good
let elapsedTimeInDays;
function getAccountInfo(user) { ... }
if (isPremiumUser && !hasActiveSubscription) { ... }
```

I hold myself to a small rule now: **if I read a name and still have to look elsewhere to understand what it does, the name is wrong.** Names like `data`, `temp`, `obj`, or `handleStuff()` make me stop as a reflex these days — they're really a confession: **"I couldn't come up with a name."** When naming feels genuinely hard, the problem usually isn't the name — it's that the function is **doing more than one thing.**

### Small Functions and Single Responsibility: A Refactor Story

Now for the **meat and bones.** Below is an order-processing function — tweaked a bit, but not far off from things I've genuinely found in production:

```csharp
public decimal ProcessOrder(Order order)
{
    decimal total = 0;
    foreach (var item in order.Items)
    {
        total += item.Price * item.Quantity;
    }

    if (order.Customer.IsPremium)
    {
        total = total - (total * 0.1m);
    }

    if (total > 1000)
    {
        total = total - (total * 0.05m);
    }

    decimal tax = total * 0.18m;
    total = total + tax;

    if (order.Customer.Country == "US")
    {
        Console.WriteLine("Issuing domestic invoice.");
    }
    else
    {
        Console.WriteLine("Issuing international invoice.");
    }

    db.SaveOrder(order, total);
    emailService.Send(order.Customer.Email, "Your order was received, total: " + total);

    return total;
}
```

It works, and even looks testable at a glance. But ask: **how many different reasons does this function have to change?** Tax rate, discount rule, invoice format, email copy, database schema — every one lands in this same function. **That's the Single Responsibility Principle, violated.** A function "doing one thing" was never about line count — it's about having **exactly one reason to change.**

Split into small, named pieces, the same function looks like this:

```csharp
public decimal ProcessOrder(Order order)
{
    var subtotal = CalculateSubtotal(order.Items);
    var discounted = ApplyDiscounts(subtotal, order.Customer);
    var total = ApplyTax(discounted);

    IssueInvoice(order.Customer);
    SaveOrder(order, total);
    NotifyCustomer(order.Customer, total);

    return total;
}

private decimal CalculateSubtotal(IEnumerable<OrderItem> items) =>
    items.Sum(item => item.Price * item.Quantity);

private decimal ApplyDiscounts(decimal amount, Customer customer)
{
    if (customer.IsPremium)
        amount -= amount * PremiumDiscountRate;

    if (amount > BulkOrderThreshold)
        amount -= amount * BulkOrderDiscountRate;

    return amount;
}

private decimal ApplyTax(decimal amount) =>
    amount + (amount * TaxRate);

private void IssueInvoice(Customer customer)
{
    var market = customer.Country == "US" ? "domestic" : "international";
    logger.Info($"Issuing {market} invoice.");
}

private void NotifyCustomer(Customer customer, decimal total) =>
    emailService.Send(customer.Email, $"Your order was received, total: {total}");
```

Notice how `ProcessOrder` now reads as **the sequence of steps, not the implementation of any of them.** A reader who doesn't care about discount logic can skip right over `ApplyDiscounts`. And when you write tests, you no longer trigger the entire 800-line beast to ask "is the discount math correct?" — you call `ApplyDiscounts` directly. **Small functions are really just small stories. Each one tells exactly one thing, and tells it well.**

![Five responsibilities tangled inside one function get split into five small, clearly named functions after refactoring](/images/blog/clean-code-prensipleri/diagram-2.svg)
*Turning one overgrown function into five small, single-purpose ones*

### Comments vs. Self-Documenting Code

I took **"good code doesn't need comments"** a bit too literally for a long time. The point was never "zero comments" — it's **"don't write the wrong comment."** A `// save the user` comment above `SaveUser()` adds nothing; the code already says that. Worse, it's maintenance debt: the code changes, the comment doesn't, and eventually you're left with **a comment that actively lies to you.**

But there's a comment I will never delete:

```javascript
// The bank's API returns UTC, not UTC+3, so we add 3 hours here.
// Do not remove this line — reconciliation reports will be wrong. (see INC-4521)
const adjustedTime = addHours(transaction.timestamp, 3);
```

This comment doesn't explain **what** is happening — the code already does that. It explains **why** something that looks strange is actually correct. Code can tell me `+3` gets added; it can never tell me **why**, or which incident taught us we needed it. That's exactly where a good comment earns its keep: when it carries context the code has no way to express. My rule of thumb: before writing a comment, I ask **"could a rename say this instead?"** If yes, I rename.

### DRY and Its Limits: Sometimes Duplication Beats the Wrong Abstraction

From the moment we learn **DRY (Don't Repeat Yourself)**, we treat it like doctrine. See the same code twice and your hand instinctively reaches for a shared function. But I learned the hard way: **two things looking alike by coincidence doesn't make them the same thing.**

`ValidateUserEmail` and `ValidateSupplierEmail` started out identical, so I merged them into one `ValidateEmail`. Three months later, suppliers needed a mandatory corporate domain rule, and the merged function filled up with `if (type == "supplier")` branches — a **"god function"** fitting neither case well. Splitting them back apart was a relief.

That taught me to take the **AHA principle (Avoid Hasty Abstractions)** seriously: **abstract when you actually feel the pain of duplication — not on the third repetition, and never on the first.** Two pieces of code looking similar today isn't reason enough to merge them; watch whether they **change for the same reason.** If they do, it's genuinely one concept — abstract away. If they change for different reasons, that's coincidental resemblance, and merging them costs **far more later, when you have to tear them back apart, than the duplication ever did.**

### Clean Error Handling

Error handling is usually the most neglected part of any codebase, because the **happy path** is simply more fun to write. But real code lives surrounded by failure: networks time out, users send unexpected data, third-party services go down. A pattern I see constantly: mixing error signals into business logic.

```javascript
// Bad
function getUser(id) {
  const user = db.find(id);
  if (!user) return -1; // is -1 an error, or a valid user ID?
  return user;
}

// Good
function getUser(id) {
  const user = db.find(id);
  if (!user) throw new UserNotFoundError(id);
  return user;
}
```

Instead of magic values (`-1`, `null`, `undefined`), throwing **meaningful, named exceptions** makes it far easier for calling code to understand what happened. Also worth watching: **don't make try-catch blocks so broad they swallow the error's actual meaning.** One `catch (Exception e) { log(e); }` wrapping an entire function mostly just hides which line broke, and why. Catch at the **narrowest scope where it's still meaningful**, and re-throw with added context.

### Testability: A Mirror Held Up to Your Design

The most practical way to check whether code is clean is to **try testing it.** If testing a function means mocking five dependencies, resetting hidden global state, or "skipping over" half the function for a meaningful assertion, the problem isn't the test — **it's the design.**

You'll spot the same symptoms every time: the function does too much, dependencies are created with `new` instead of injected, or business logic is tangled up with I/O. Forcing code to be easy to test really means forcing yourself to **design it better** — testability isn't the outcome, it's a **design signal.**

### The Boy Scout Rule: Clean Code Is a Habit

Last one, maybe my favorite: the **Boy Scout Rule.** "Leave the campground cleaner than you found it." In software: every time you touch a file, leave it a little better — rename a variable, update a stale comment, split one function into two. Nobody expects a giant refactor in one sitting; what's actually asked of you is **a small improvement with every commit.**

That 800-line file never got "fixed" in one pass — too risky, too unrealistic. Every time I touched it, I shrank one more piece, gave it a real name, added a test. Six months later it wasn't the dragon everyone feared. Just an ordinary module.

**Clean code is less about talent than it is about habit,** built through small, consistent steps. I think of the SOLID principles as that habit's backbone — if you haven't yet, follow up with [What Is SOLID?](/en/writing/solid-nedir/).

> Grateful that you read this.

> Take care, friends...
