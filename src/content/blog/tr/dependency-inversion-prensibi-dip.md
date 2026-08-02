---
title: "Dependency Inversion Prensibi(DIP) — SOLID"
slug: "dependency-inversion-prensibi-dip"
lang: "tr"
date: "2023-01-13"
category: "Mühendislik"
excerpt: "Sınıflar arası bağımlılığı en aza indirin: üst sınıflar detaylara değil, soyutlamalara bağımlı olmalı."
readTime: "4"
coverImage: "/images/blog/dependency-inversion-prensibi-dip/img-01.webp"
mediumUrl: "https://medium.com/@hsynkrcf/dependency-inversion-prensibi-dip-solid-ca05721c9059"
tags: ["software-development", "dependency-inversion", "solid"]
---
**Sınıflar arası bağımlılığın en aza indirgenmesini öneren prensiptir. Alt sınıfta yapılan değişiklikler üst sınıfları etkilememelidir.**

![Dependency Inversion Yazılım Prensibi](/images/blog/dependency-inversion-prensibi-dip/img-01.webp)
*Dependency Inversion Yazılım Prensibi*

**Dependency Inversion (Bağımlılığın Tersine Çevrilmesi),** kısaca sınıflar arası bağımlılıkların minimal seviyeye indirgenmesi ve bağımlılıkların sınıflar ile değil **arayüzler (interface)** ile kurulması gerektiğine dayanır. Yani amacımız soyutlamaları detaylara değil aksine detayları soyutlamalarımıza bağlı olmasıdır.

> Yüksek seviyeli modüller, düşük seviyeli modüllere bağlı olmamalıdır. Her ikisi de soyutlamalara bağlı olmalıdır.

> Robert C.Martin (Uncle Bob)

![](/images/blog/dependency-inversion-prensibi-dip/img-02.webp)

**Dependency Inversion**, bu dizide tartıştığımız beşinci ve son tasarım prensibidir. Dikkat ediyorsanız tüm prensiplerimiz aynı mantığı taşıyor değil mi ? Amacımız projelerdeki maliyeti düşürmek, sonradan eklemeleri kolaylaştırmak, okunabilirliği ve esnekliği arttırmaktır.

> High-Level Class > Abstraction Layer > Low-Level Class

Bu kadar üst alt yeter. Hadi yine bir örnek ile konuyu pekiştirelim.  
Örneğimiz yemek üzerine olsun, gece olunca çok acıkıyorum 😅

```
public class Kebab{    public void PrepareKebap(bool hotSpice){      // Prepare Kebab    }}
```

Artık kebap hazırlayabiliyoruz. Sınıfımızı oluşturduk.

```
public class Lahmacun{    public void PrepareLahmacun(bool hotSpice){      // Prepare Lahmacun    }}
```

Menüye bir efsaneyi daha ekledik, olsada yesek (:

```
public class Restaurant{      public void Prepare(){      Kebab kebab = new Kebab();      Lahmacun lahmacun = new Lahmacun();      kebab.PrepareKebapb(true);      lahmacun.PrepareLahmacun(false);    }}
```

İyi kötü bir restoranımız var ama sanki bir şeyler yanlış değil mi ? Restoranımız yemeklere bağımlı bir halde, kendisi yüksek seviyeli fakat yemeklerde bir değişiklik yaparsak etkilenecektir. Yani menümüzü değiştirirsek restoran sınıfımızda değişiklik yapmak zorundayız 😢  
Bu durum **Dependency Inversion Prensibi**’ne aykırıdır dostlarım.

![Üst sınıf, alt sınıfa bağlıdır.](/images/blog/dependency-inversion-prensibi-dip/img-03.webp)
*Üst sınıf, alt sınıfa bağlıdır.*

#### Ne yapmalıyız ?

Tabi ki bağımlılığı ortadan kaldırmak için bir soyutlama yapmamız gerekli. Hemen bir interface oluşturuyoruz.

```
public interface IFood{    void Prepare(bool hotSpice);}
```

Kebap sınıfımıza implement edelim.

```
public class Kebab : IFood{    public void Prepare(bool hotSpice)    {        PrepareKebab(hotSpice);    }    public void PrepareKebab(bool hotSpice)    {        // Prepare Kebab    }}
```

Aynı şekilde Lahmacun sınıfımıza uyguluyoruz.

```
public class Lahmacun : IFood{    public void Prepare(bool hotSpice)    {        PrepareLahmacun(hotSpice);    }    public void PrepareLahmacun(bool hotSpice)    {        // Prepare Lahmacun    }}
```

Restoran sınıfımızıda buna uyarlayıp, bitiriyoruz.

```
 public class Restaurant {     private IFood _food;     public Restaurant(IFood food){         _food = food;     }          public void Prepare(bool hotSpice){         _food.Prepare(hotSpice);     } }
```

#### İşte Bu Kadar! Neler Yaptık ?

-   Üst seviye sınıfımızın alt ile olan doğrudan bağlantısını kestik.
-   Interface kullanarak soyut katman oluşturduk.
-   Bağımlılığı ayrıştırıp, DIP’e uygun hale getirdik.
-   Kodu tekrar kullanılabilir yapıp, esnekliği artırdık.

![Interface ile soyutlaştırarak, üst seviyeli sınıfın bağımlılığını tersine çevirdik.](/images/blog/dependency-inversion-prensibi-dip/img-04.webp)
*Interface ile soyutlaştırarak, üst seviyeli sınıfın bağımlılığını tersine çevirdik.*

#### Yararlı Ek Bilgi

Dostlarım bazen terimler kafa karıştırıcı olabiliyor. Araştırma yaparken bende çokca buna maruz kalıyorum. O yüzden güzel bir ek bilgi ihtiyacı hissettim.

![Bağımlılık Savaşcıları — IOC vs DI vs DIP](/images/blog/dependency-inversion-prensibi-dip/img-05.webp)
*Bağımlılık Savaşcıları — IOC vs DI vs DIP*

Yukarıdaki terimler birbirine çok yakın olsalar bile birbirlerinden farklıdırlar. Merak edenlere güzel ve açıklayıcı bir kaynak bırakıyorum. [Martin Fowler](https://martinfowler.com/)’in [DIP in the Wild](https://martinfowler.com/articles/dipInTheWild.html#YouMeanDependencyInversionRight) makalesine mutlaka göz gezdirin.

**DI(Dependency Injection)** nesnenin nasıl bağımlılık kazandığı ile ilgilidir. Dışarıdan bir bağımlılık sağlanıyorsa, sistem DI kullanıyor demektir.  
**IOC(Inversion of Control)** kodu kim çağırıyor bununla ilgilidir. Eğer kodumuz bir call başlatırsa, bu IoC değildir.  
**DIP(Dependency Inversion)** kodun çağırdığı şeye gönderdiği mesajlardaki soyutlama düzeyi ile ilgilidir.

> DIP Neyle? > DI Nasıl? > IoC Kimle? — Bu kadar basit değil arkadaşlar 😄

#### ÖZET

> Dependency Inversion Prensibi’ni bazen ihlal edebiliyoruz fakat bunu yapmak kodların bağlılığını aşırı artırabilir, sonuç olarak kodun bakımı zorlaşır, okunamaz ve kırılgan bir yapı haline gelir.

> DIP, tekrar kullanılabilen ve düşük bağımlılık (loosely coupled) ile kodlar yazabilmemiz için sağlam bir temel taşıdır.

**Okuduğunuz için Minnettarım.**

**Bu SOLID Prensipleri Yazı Dizimin sonuncusuydu.  
  
Sizlere güzel bir kaynak oluşturabildiysem, Ne Mutlu Bana 😍**

**Sağlıcakla kalın Dostlarım..**

#### Kaynakça

[What is Dependency Inversion Principle](https://en.wikipedia.org/wiki/Dependency_inversion_principle)

[How to Design for DIP](https://deviq.com/principles/dependency-inversion-principle)

[Dependency Inversion In DotNet](https://www.c-sharpcorner.com/blogs/dependency-inversion-principle-in-net-60)

[Benefits of DIP](https://stackify.com/dependency-inversion-principle/)

[DIP in The Wild (Important)](https://martinfowler.com/articles/dipInTheWild.html#YouMeanDependencyInversionRight)
