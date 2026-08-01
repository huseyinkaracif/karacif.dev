---
title: "Interface Segregation Principle (ISP) — SOLID"
slug: "interface-segregation-principle-isp"
lang: "tr"
date: "2022-11-19"
category: "Mühendislik"
excerpt: "Tek dev arayüz yerine ihtiyaca özel küçük arayüzler: ISP'nin mantığı ve C# üzerinde örnek uygulaması."
readTime: "3"
coverImage: "/images/blog/interface-segregation-principle-isp/img-01.png"
mediumUrl: "https://medium.com/@hsynkrcf/interface-segregation-principle-isp-solid-f70747d905dc"
tags: ["solid", "interface-segregation", "software-development"]
---
**Tüm sorumlulukları kapsayan **tek bir arayüz** kullanmak yerine, metod gruplarına hizmet veren özelleştirilmiş **birkaç arayüz** tercih edilmelidir.**

![Interface Segregation Yazılım Prensibi](/images/blog/interface-segregation-principle-isp/img-01.png)
*Interface Segregation Yazılım Prensibi*

**Interface Segregation** (**Arayüz Ayrımı**), kısaca nesnelerin ihtiyaç duymadıkları **metot** veya **property** içeren interface’leri implement **etmememizi** söyleyen tasarım prensibidir. [SRP](/yazilar/single-responsibility-principle-srp/)’ye benzer şekilde, **Arayüz Ayırma** **Prensibinin** amacı, yazılımı birden çok bağımsız parçaya bölerek gerekli değişikliklerin yan etkilerini ve sıklığını azaltmaktır.

> *Hiçbir kod, kullanmadığı yöntemlere bağımlı olmaya zorlanmamalıdır. Robet C. Martin (Uncle Bob)*

Projemiz büyürken birden fazla sorumluluğu olan **Interface**(Arayüz) sınıflar oluşur. Zaman içinde yüklenen yeni sorumluluklarla bu interface sınıflar çok büyür ve kontrol edilemez bir hale gelebilir.

![](/images/blog/interface-segregation-principle-isp/img-02.png)

Gerçekten sürdürülebilir projeler geliştirebilmek için **arayüzleri** (interface) dikkatli kullanmamız gerekiyor. Bu sayede nesne yönetimimizi kolaylaştırması için kullanmamız gereken interface’in hatalı uygulamalar nedeniyle ortaya çıkartacağı olası karmaşıklıkların önüne geçebiliriz.

Hadi bir örnek ile daha iyi anlayalım, sürekli telefon ile örnek veriyoruz, gelin bu sefer hayvanlar üzerinden öğrenelim.

Şöyle ki, elimizde üç çeşit hayvan cinsimiz var. Hepsinin özelliğini sağlayacak bir **Interface**’imiz var.

![Without ISP](/images/blog/interface-segregation-principle-isp/img-03.png)
*Without ISP*

Gördüğünüz gibi tek Interface ile hayvanlarımıza özelliklerini verdik.

Ama durun! Birşeyler ters, **köpek uçabilir, balık yürüyebilir, kuş yüzebilir**! (İstisna olanları saymıyorum arkadaşlar biyoloji derya deniz 😅)

Köpek uçamadığına göre **Fly()** metodumuz neden var ? Hemen anladınız dimi. Buna DummyCode(Sahte Kod) deniyor. Çünkü işlevsiz. İşte burada **Interface Segregation** devreye giriyor.

### Burada yapmamız gereken nedir ?

Böyle bir durumda yapmamız gereken ilgili metodları farklı **Interface** veya **Interface’ler** oluşturarak sadece sınıflarımızın ihtiyacı olan metodları barındırmaktır. Özetle **Interface Segregation(**“Arayüzleri Ayırıyoruz”)!

O zaman hemen işe koyulalım!

> *Not: Interface’ler genelde başlarında I takısı ve sonunda -able takısı almaktadır.*

![With ISP](/images/blog/interface-segregation-principle-isp/img-04.png)
*With ISP*

Gördüğünüz gibi 3 yeni **Interface** oluşturduk. Sonrasında gerekli sınıflarımıza kalıtım sağladık. Köpek yürüyebilir ama uçamaz değil mi ?Son olarak hepsi **base** olan **IAnimal** Interface’ine bağlı çünkü tüm hayvanlar yemek yer ve uyur!

Kod yazmamıza gerek yok, herşey açık ortada değil mi ? **Interface Segregation** çok önemli bir prensiptir. İçerisinde onlarca yetenek bulunduran **Interface**(Arayüz)’lerden kaçınalım arkadaşlar. İhtiyaç doğrultusunda özelliklerimizi ayırıp, gruplayarak ilgili sınıflara aktaralım.

Bu sayede gereksiz metot veya işlev yazılmadan dönüp bir bakmak, oldukça faydalı ve kullanışlı olabilir.

![Happy Ending :)](/images/blog/interface-segregation-principle-isp/img-05.png)
*Happy Ending :)*

#### ÖZET

> Interface Segregation, müşterilerin ihtiyaç duymadığı mevcut arayüzlere yöntemler ekleyerek ihlal etmesi kolay olan basit bir ilkedir. ISP, diğer SOLID ilkeleriyle de yakından ilişkilidir.

> Yine de, herhangi bir prensibin aşırı agresif bir şekilde uygulanmasının kod tabanında başka sorunlara yol açabileceğini unutmamalıyız.

**Okuduğunuz için Minnettarım.**

**Sağlıcakla kalın Dostlarım..**

SOLID prensiplerine devam etmek için [Dependency Inversion Prensibi](/yazilar/dependency-inversion-prensibi-dip/)’ne göz atabilirsiniz;

[Dependency Inversion Prensibi(DIP) — SOLID](/yazilar/dependency-inversion-prensibi-dip/)

#### Kaynakça

[What is Interface Segregation Principle](https://en.wikipedia.org/wiki/Interface_segregation_principle) (Important)

[Benefits of Interface Segregation](https://reflectoring.io/interface-segregation-principle/)

[Interface Segregation With DotNet](https://dotnettutorials.net/lesson/interface-segregation-principle/)

[How to Design for ISP](https://www.baeldung.com/java-interface-segregation)
