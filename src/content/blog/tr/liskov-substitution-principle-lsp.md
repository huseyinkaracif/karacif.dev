---
title: "Liskov Substitution Prensibi (LSP) — SOLID"
slug: "liskov-substitution-principle-lsp"
lang: "tr"
date: "2022-11-13"
category: "Mühendislik"
excerpt: "Alt sınıflar, üst sınıfların yerine sorunsuz geçebilmelidir: LSP'nin mantığı ve telefon kilidi örneğiyle uygulaması."
readTime: "3"
coverImage: "/images/blog/liskov-substitution-principle-lsp/img-01.webp"
mediumUrl: "https://medium.com/@hsynkrcf/liskov-subsititutions-principle-lsp-65e5e41e9406"
tags: []
---
![Liskov Substitution Yazılım Prensibi](/images/blog/liskov-substitution-principle-lsp/img-01.webp)
*Liskov Substitution Yazılım Prensibi*

**Liskov Substitution**(**Liskov’un Yerine Geçme Prensibi**), yaratılan alt sınıflar, üst sınıflardan kalıtım alırken, üst sınıfların tüm özelliklerini kullanabilmesi gerektiğini söyleyen bir tasarım prensibidir. Yani **bir özellik gereksiz yere kalıtım yolu ile alınmamalıdır.**

> “Temel (base) sınıfın işaretçisini (pointer) ya da referansını kullanan fonksiyonlar, bu sınıftan türemiş olan (derived) sınıfları da ekstra bilgiye ihtiyaç duymaksızın kullanabilmelidir.” — Robert C. Martin (Bob Amca)

Bu prensip aslında [Open/Closed Prensibi](/yazilar/open-closed-principle-ocp/)’ne benzer, özel bir türü diyebiliriz. Her ikisinde de genişlemeye açık yapılar söz konusudur.

![Liskov Substitution Prensibi (LSP) — SOLID](/images/blog/liskov-substitution-principle-lsp/img-02.webp)

Liskov’un yerine geçme prensibi aslında **OOP** prensiplerinden **Polymorphism** (Çok biçimlilik) ile yakından ilgilidir. Hadi bir örnek ile daha iyi anlayalım, önceki prensipte kullandığımız örnek üzerinden ilerleyeceğiz.

Örneğimiz şöyle, bir **Interface** tanımlıyoruz. Diğer sınıflarımız bundan kalıtım alıp, **OpenLock** metodu ile telefonun kilidi açılacak, **AddTouchId()** metodu ile telefona bir biyometrik şifre koyulacaktır.

![Liskov Substitution Prensibi (LSP) — SOLID](/images/blog/liskov-substitution-principle-lsp/img-03.webp)

Ardından **Iphone**, **Samsung** ve **Xiaomi** somut(concreate) sınıflarını **IMobilePhone** interface’i ile kalıtım yoluyla oluşturuyoruz. Artık hazırız, tüm telefonlarımızın kilidini açıp, hepsine teker teker TouchId Biyometrik kilidi koyuyoruz.

![Liskov Substitution Prensibi (LSP) — SOLID](/images/blog/liskov-substitution-principle-lsp/img-04.webp)

İşlem tamamdır, peki ya şimdi bu uygulamaya bir telefon daha ekleyelim. Artık efsane kasa Nokia 3310 telefonuna bu işlemleri uygulamak istiyoruz! Amanın Nokia’da TouchId diye bir özellik yok! **IMobilePhone** interface’imiz içerisindeki elemanları zorla uygulatmaktadır. Burada Nokia için **AddTouchId()** metodu gereksizdir. Ee şimdi ne yapacağız ?

![Liskov Substitution Prensibi (LSP) — SOLID](/images/blog/liskov-substitution-principle-lsp/img-05.webp)

Hemen harekete geçip, Nokia için artık bir şart koyduk. Biz herşey için böyle if/else yaparak mı gideceğiz peki ? Haliyle LSP’ye aykırı olan bu durum OCP’ye de aykırıdır. En kötü **NotImplementedException** koyup try/catch bloğunda yakalarız dimi. 😅

Gelin şimdi Liskov Substitution Prensibi’ni uygulayarak çözelim.

![Liskov Substitution Prensibi (LSP) — SOLID](/images/blog/liskov-substitution-principle-lsp/img-06.webp)

Iphone, Samsung ve Xiaomi hem kilit açma hemde biyometrik özelliklere sahip oldukları için iki interface’den kalıtım almaktadırlar. Nokia ise sadece kilit açma yapabileceği için sadece **ILockable** interface’inden kalıtım almaktadır. Bu sayede kullanmayacağı bir işlev olan **AddTouchId()** metodunu barındırmak zorunda kalmayacaktır.

Görüldüğü üzere base objemizi arayüzlere bölmüş bulunmaktayız. Bu yaptığımız işlem Arayüz Ayrım Prensibi([**Interface Segregation Principle**](/yazilar/interface-segregation-principle-isp/))’ne uyarlı bir yaklaşımdır.

> Not: Interface’ler genelde başlarında I takısı ve sonunda -able takısı almaktadır.

![Liskov Substitution Prensibi (LSP) — SOLID](/images/blog/liskov-substitution-principle-lsp/img-07.webp)

**İşte Bu Kadar! Neler Yaptık ?**

-   Kodumuzu biraz daha generic yapıp, **Condition**(if/else) bağımlılığını sildik.
-   Değişiklik değil aksine gelişimsellik söz konusu olduğu için [Open/Closed Prensibi](/yazilar/open-closed-principle-ocp/)’ne uygun bir tasarım yaptık.
-   Her yapı tek bir işi yaptığı için [Single Responsibility Prensibi](/yazilar/single-responsibility-principle-srp/)’ne uygun bir tasarım yaptık.
-   Interface’leri kullanarak özellikleri ayırdık. Bu sayede [Interface Segregation](/yazilar/interface-segregation-principle-isp/) Prensibi’ne uygun tasarım yaptık.

### ÖZET

> LSP, hem yeni bir uygulama geliştirirken hem de mevcut bir uygulamayı geliştirirken veya değiştirirken akılda tutulması gereken çok faydalı bir fikirdir.
> 
> Yeni bir uygulama için sınıf hiyerarşisini tasarlarken, **LSP, problem alanımızdaki kavramları düzenlememize ve geleceğe yönelik kod yazmamıza yardımcı olur.**

**Okuduğunuz için Minnettarım.**

**Sağlıcakla kalın Dostlarım..**

SOLID prensiplerine devam etmek için [**Interface Segregation Prensibi**](/yazilar/interface-segregation-principle-isp/)’ne göz atabilirsiniz;

👉 [**Interface Segregation Principle (ISP) — SOLID**](/yazilar/interface-segregation-principle-isp/)

### Kaynakça

[What is Liskov Subsititutions Principle](https://en.wikipedia.org/wiki/Liskov_substitution_principle) (Important)

[Liskov Subsititutions With C#](https://www.gencayyildiz.com/blog/liskovun-yerine-gecme-prensibiliskov-substitution-principle-lsp/) (Special Thanks)

[LSP Abstraction Examples](https://www.gokhan-gokalp.com/en/liskov-substitution-principle-lsp-liskovun-yerine-gecme-prensibi/) (Special Thanks)

[How to Design for LSP](https://stackify.com/solid-design-liskov-substitution-principle/)
