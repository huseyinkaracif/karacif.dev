---
title: "Open-Closed Principle (OCP) — SOLID"
slug: "open-closed-principle-ocp"
lang: "tr"
date: "2022-11-10"
category: "Mühendislik"
excerpt: "Gelişime açık, değişime kapalı: mevcut kodu bozmadan yeni davranış eklemenin yolu."
readTime: "4"
coverImage: "/images/blog/open-closed-principle-ocp/img-01.png"
mediumUrl: "https://medium.com/@hsynkrcf/open-closed-principle-ocp-solid-bafb791a9a61"
tags: []
---
![Open/Closed Yazılım Prensibi](/images/blog/open-closed-principle-ocp/img-01.png)
*Open/Closed Yazılım Prensibi*

**Open-Closed Principle** (**Açık / Kapalı Prensibi**), modüllerin (sınıflar, metodlar vb.) “genişletilmeye açık, ancak değiştirilmeye kapalı olması” gerektiğini söyleyen bir tasarım prensibidir. Bu prensip, gelecekte kolayca değiştirilebilen ve bakımı yapılabilen **esnek(**Extendability) yazılımların oluşturulmasına yardımcı olur.

> Her yazılım geliştirici bilir ki, yazılım kaçınılmaz değişim demektir.

**“Madem değişmeyen tek şey değişimin kendisi ise o zaman biz de bu değişimi “en düşük maliyetli” hale getirmeliyiz değil mi?”**

![Open-Closed Principle (OCP) — SOLID](/images/blog/open-closed-principle-ocp/img-02.png)

Özet olarak bu prensip, sürdürülebilir ve tekrar kullanılabilir yapıda kod yazmanın temelini oluşturur. Yani bizim amacımız **bir nesnenin davranışını değiştirmeden, ona yeni özellikler kazandırabiliyor olmalıyız.**

> Tamam anladım, peki biz bunu nasıl kullanıyoruz ?

Bunun için ilk önce prensibimize uymadan kötü yazım ve prensibe uyarak iyi yazım olarak iki farklı kullanım şeklinde örneklendiriyor olacağım.

## Kötü Yazım Örnek

Örneğimiz şöyle; telefon üreten fabrikamız var. **Phone** sınıfı yazıp, sınıf içerisine **PhoneType** adlı bir enum koyduk. Enum içerisinde iki tip telefon ürettiğimizin bilgisi var. Son olarak Phone sınıfından kalıtım almış Samsung ve Iphone adında iki sınıf oluşturup. Constructor’larında gerekli enum değerini veriyoruz.

Şimdi fabrikamızı oluşturuyoruz. **PhoneFactory** isminde bir sınıf oluşturup, içerisine **MakePhone** isminde bir metot oluşturuyoruz. Bu metot hangi telefon üreteceğini parametre olarak alan ve parametreye göre ilgili telefonu üreten fonksiyonları çağırsın.

Artık üretime geçiyoruz arkadaşlar. “Program.cs” sınıfımızda aşağıdaki gibi yazdığımız sınıfları oluşturarak iki çeşit telefon üretiyoruz.

### Örneğimizin Ekran Çıktısı

![Open-Closed Principle (OCP) — SOLID](/images/blog/open-closed-principle-ocp/img-03.png)

Evet fabrikamız artık işler halde çalışıyor. Peki biz yarın bir gün yeter artık Xiaomi çok satıyor onuda üretelim dedik. **Problem yok**, hemen işe koyulup diğerlerini nasıl yaptıysak, bunuda yaparız diye girişiyoruz.

1.  **PhoneType** adlı enum’a gidip, Xiaomi markasını eklememiz gerek.
2.  Diğer sınıflar gibi Xiaomi sınıfı oluşturduk. Yine **Phone** sınıfından kalıtım alıyor.
3.  **PhoneFactory** sınıfımıza yeni markamızı ekleyip, **MakeXiaomi** adlı Xiaomi üreten metodumuzu yazıyoruz.
4.  Evet son olarak,Main metodumuzda yeni telefonumuzun üretimi için gerekli çağrıyı yapıyoruz.

![Open-Closed Principle (OCP) — SOLID](/images/blog/open-closed-principle-ocp/img-04.png)

### Örneğimizin Yeni Ekran Çıktısı

![Open-Closed Principle (OCP) — SOLID](/images/blog/open-closed-principle-ocp/img-05.png)

Yeni markamızı üretim bandına ekledik. 👏 Peki ama bir marka eklemek için dokunmadığımız sınıf, yapmadığımız şey kalmadı. Ancak tam 4 farklı adımda yapabildik. Bir gün Huawei üretmek istesek aynı işlemleri mi yapmamız gerekicek ? Prensip gelişime açık, değişime kapalı olmalı diyordu hani ?

## İyi Yazım Örnek (Better Than Previous)

Sıra geldi benim en sevdiğim bölüme. Bu bölümde prensibimize uygun ve daha kolay nasıl yazabileceğimizi öğreniyor olacağız.

Öncelikle **Phone** sınıfımızı burada **abstract** olarak tanımlayıp içine **Make()** metodunu koyuyoruz. Sonrasında diğer sınıflarımız bunu implemente edip metodumuzu **override** ederek basitce kullanabilecekler.

Bakın aşağıda fabrikamız var. İnanabildiniz mi? Artık **Switch/Case** gibi **condition**’lar kullanmamıza gerek kalmadı. **MakePhone()** metodunun tek görevi **abstract** sınıfımızdan türeyen objemizin **Make()** metodunu çağırmak.

Main metodumuzda diğer örnekte olduğu gibi aynı şekilde kullanmamız bizim için yeterli olacaktır.

Biraz daha iyi geldi değil mi ? Hadi Huawei markamızı da fabrikamıza ekleyip globalleşmeye doğru yol alalım. Bakalım Xiaomi gibi bizi uğraştıracak mı 😅

![Open-Closed Principle (OCP) — SOLID](/images/blog/open-closed-principle-ocp/img-06.png)

### Örneğimizin Son Örnek Çıktısı

![Open-Closed Principle (OCP) — SOLID](/images/blog/open-closed-principle-ocp/img-07.png)

### İşte bu kadar!

Şimdi biz ne yaptık arkadaşım, ikiside aynı şeyi yaptı diyebilirsiniz.

Dostlarım ilk örnekte yeni telefon üretmek için yaptığımız 4 farklı değişiklikten kurtulduk. İkinci örneğimizde gördüğünüz gibi sadece üreteceğimiz markayı **Phone** sınıfından kalıtım alarak, **Main** fonksiyonunda üretime başlamak, mis gibi işimizi kolaylaştıracaktır.

-   Kodumuzu gelişime açık, büyük değişimlere kapalı hale getirdik.
-   Soyutlama ile kolay geliştirebilir hale getirdik.
-   Kodumuzu biraz daha generic yapıp, condition bağımlılığını sildik.

### ÖZET

> Açık Kapalı Prensibi, yazılım geliştirirken bilmemiz gereken en önemli tasarım prensiplerinden biridir. Yazılım tasarlamaya yönelik bu yaklaşım uzun yıllardır var. Ama bugün hala kullanışlı. Uygulamamızda başka bir şeyi bozma endişesi duymadan tasarımlarımızı ve bunların nasıl genişletilip değiştirilebileceğini düşünmemiz için bize iyi bir yol sağlar.

**Okuduğunuz için Minnettarım.**

**Sağlıcakla kalın Dostlarım..**

SOLID prensiplerine devam etmek için [**Liskov Subsititutions Prensibi**](/yazilar/liskov-substitution-principle-lsp/)’ne göz atabilirsiniz;

👉 [**Liskov Subsititutions Principle (LSP) — SOLID**](/yazilar/liskov-substitution-principle-lsp/)

### Kaynakça;

[What is Open-Closed Principle](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle) (Important)

[What are The Benefits of The OCP](https://blog.knoldus.com/solid-open-closed-principle/) (Special Thanks)

[How to Design for Open-Closed Principle](http://www.canertosuner.com/post/SOLID-Prensipleri-Open-Closed) (Special Thanks)

[Open-Closed With C#](https://dotnettutorials.net/lesson/open-closed-principle/)
