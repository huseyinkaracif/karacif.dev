---
title: "SOLID Nedir ? Solid Prensipleri Nelerdir ?"
slug: "solid-nedir"
lang: "tr"
date: "2022-10-17"
category: "Mühendislik"
excerpt: "İş ilanlarında aranan, mülakatlarda sorulan ama çoğu zaman önemsenmeyen beş prensip: SOLID'e genel bakış."
readTime: "3"
coverImage: "/images/blog/solid-nedir/img-01.jpg"
mediumUrl: "https://medium.com/@hsynkrcf/solid-nedir-solid-prensipleri-nelerdir-74b89a99479e"
tags: []
---
[Robert C. Martin (Uncle Bob)](https://en.wikipedia.org/wiki/Robert_C._Martin), yazılım geliştirme süreçlerinde karşılaşılan temel sorunlara getirilen çözümleri 5 temel başlık altında toplayıp 2000'li yıllarda yazılım camiasına sundu. O zamandan beri kabul gören ve en fazla dikkat edilerek kullanılan yazılım prensibi oldu.

## **SOLID NEDİR?**

**S.O.L.I.D, yazılım geliştirirken sürdürülebilir, ölçeklenebilir, test edilebilir ve yeniden kullanılabilir kod yazmamızı sağlayan prensipler bütünüdür.**

![Solid Tasarım Prensipleri](/images/blog/solid-nedir/img-01.jpg)
*Solid Tasarım Prensipleri*

Kısaca prensiplerden bahsedeyim;

### [S — Single Responsibility Principle (SRP)](/yazilar/single-responsibility-principle-srp/)

Bir sınıfı değiştirmek için sadece bir nedenimiz olmalıdır. Yani her bir sınıf veya fonksiyon sadece **tek bir sorumluluğa** sahip olmalıdır.

### [O — Open-Closed Principle (OCP)](/yazilar/open-closed-principle-ocp/)

Bir sınıfın davranışını değiştirmeden genişletebilmeniz gerekir. Yani sınıfınız yada metodunuz **gelişime açık, değişime kapalı** olmalıdır.

### [L — Liskov Substitutions Principle(LSP)](/yazilar/liskov-substitution-principle-lsp/)

Herhangi bir değişiklik yapmadan türetilen(üst) sınıflar, türeyen(alt) sınıfların **tüm** **özelliklerini kullanabilmelidir.**

### [I — Interface Segregation Principle (ISP)](/yazilar/interface-segregation-principle-isp/)

Tüm sorumlulukları kapsayan **tek bir arayüz** kullanmak yerine, metod gruplarına hizmet veren özelleştirilmiş **birkaç arayüz** tercih edilmelidir.

### [D — Dependency Inversion Principle (DIP)](/yazilar/dependency-inversion-prensibi-dip/)

Sınıflar arası **bağımlılığın en aza indirgenmesini** öneren prensiptir. Alt sınıfta yapılan değişiklikler üst sınıfları etkilememelidir.

## **SOLID Tasarım Prensiplerine neden ihtiyacımız var?**

Değişiklik veya yeni özellik istekleri yazılım geliştirmenin bir parçasıdır. Bunları durduramayız ve reddedemeyiz. Fakat tasarımımız ufak değişikliklere bile uzun zaman ve efor harcamamıza neden olabilir.

Peki burada suçlu kim? Açıkçası, uygulamanın tasarımıdır.

![SOLID Nedir ? Solid Prensipleri Nelerdir ?](/images/blog/solid-nedir/img-02.jpg)

## **SOLID Tasarım** Prensiplerinin **Avantajları**

Bir uygulama geliştirirken aşağıdaki noktaları göz önünde bulundurmanız gerekir.

### **Esneklik ve Genişletilebilirlik**

Günümüzde esneklik ve genişletilebilirlik, uygulamalar için çok gereklidir. Bu yüzden uygulamayı esnek olacak şekilde tasarlamalıyız, böylece farklı şekillerde çalışacak şekilde uyarlanabilir ve genişletilebilir, minimum değişiklikle kolayca yeni özellikler ekleyebiliriz.

### **Test edilebilirlik**

Test Odaklı Geliştirme (TDD), günümüzde büyük ölçekli bir uygulama tasarlamanız ve geliştirmeniz gerektiğinde en önemli anahtar unsurlardan biridir. Uygulamayı, her bir işlevi ayrı ayrı test edecek şekilde tasarlamamız gerekiyor.

### **Bakım**

Günümüzde yazılımın bakımı, insanlar için en büyük zorluktur. Gün geçtikce firmalar büyüyebilir ve iş büyüdükçe yazılımı yeni değişikliklerle geliştirmeniz gerekir. Bu yüzden yazılımı, gelecekteki değişiklikleri minimum çabayla ve sorunsuz olarak kabul edecek şekilde tasarlamamız gerekir.

**SOLID Prensipleri**, yukarıdaki kilit noktaların tümüne ulaşılmasında önemli bir rol oynar.

1.  Kodun karmaşıklığında boğulmanızı engeller.
2.  Okunabilirliği, genişletilebilirliği artırır.
3.  Hatayı azaltır ve yeniden kullanılabilirlik sağlar.
4.  Daha iyi test edilebilirlik elde edilir.
5.  Bağlılıklar en aza indirilir.

## ÖZET

> Bu prensipleri uygulamak ilk başta bunaltıcı gelebilir ama prensiplere uygun kod ile uygun olmayan kod arasındaki farkları anlamak, uygulamalarımızın tasarım süreçlerini daha kolay ve daha verimli hale getirmeye yardımcı olacaktır.

Hadi biz de bu prensipleri sırasıyla kod örnekleriyle açıklamaya çalışalım. Umarım keyifli ve SOLID prensiplerini kavradığımız güzel bir makale dizisi olur.

**Okuduğunuz için Minnettarım.**

**Sağlıcakla kalın Dostlarım..**

### **SOLID** yazı dizisinin devamını örneğiyle ve detaylı okuyabilirsiniz;

👉 [**Single Responsibility Prensibi (SRP) — SOLID**](/yazilar/single-responsibility-principle-srp/)

👉 [**Open-Closed Principle (OCP) — SOLID**](/yazilar/open-closed-principle-ocp/)

👉 [**Liskov Substitution Principle (LSP) — SOLID**](/yazilar/liskov-substitution-principle-lsp/)

👉 [**Interface Segregation Principle (ISP) — SOLID**](/yazilar/interface-segregation-principle-isp/)

👉 [**Dependency Inversion Prensibi(DIP) — SOLID**](/yazilar/dependency-inversion-prensibi-dip/)
