---
title: "Her Dilim Bir Özellik: Vertical Slice Architecture ile Mikro Yaklaşım"
slug: "vertical-slice-architecture"
lang: "tr"
date: "2025-06-16"
category: "Mimari"
excerpt: "Katmanlı mimariye taze bir alternatif: her özelliği kendi dikey dilimi içinde uçtan uca ele alan Vertical Slice Architecture."
readTime: "6"
coverImage: "/images/blog/vertical-slice-architecture/img-01.png"
mediumUrl: "https://medium.com/@hsynkrcf/her-dilim-bir-%C3%B6zellik-vertical-slice-architecture-ile-mikro-yakla%C5%9F%C4%B1m-8daeeae4c17d"
tags: ["architecture", "clean-code", "vertical-slice", "development", "software"]
---
**Yazılım** dünyasında projelerimiz için sayısız **mimari desen** ve **yaklaşım** mevcut. Çoğumuzun aşina olduğu **katmanlı yapılar**, belirli bir düzen sunsa da, bazen bir özelliği hayata geçirmek için kodun farklı köşelerine dokunmak, adeta bir **yapbozun parçalarını** birleştirmek gibi hissettirebilir.

İşte tam bu noktada birisi sadeliğiyle ve işlevselliğiyle diğerlerinden ayrılıyor. Karşınızda **Dikey Dilim Mimarisi (Vertical Slice Architecture)**. Peki, bu **mimari** neyi farklı yapıyor ve neden gün geçtikçe **daha fazla tercih** ediliyor?

![Vertical Slice Architecture (VSA)](/images/blog/vertical-slice-architecture/img-01.png)
*Vertical Slice Architecture (VSA)*

### Vertical Slice Architecture (Dikey Dilim Mimarisi) Nedir? Önce Bir Anlayalım

Geleneksel yazılım mimarilerinde genellikle katmanlı bir yapı görürüz. En bilinenleri:

-   **Sunum Katmanı (Presentation Layer)**: Kullanıcının gördüğü arayüz (Web sayfaları, mobil ekranlar).
-   **İş Mantığı Katmanı** **(Business Logic Layer)**: Uygulamanın kurallarının, hesaplamalarının yapıldığı yer.
-   **Veri Erişim Katmanı** (**Data Access Layer)**: Veritabanı ile konuşan kısım.

**Vertical Slice**’da ise yeni bir özellik eklemek istediğinde **( “sipariş göster”)**, genellikle bu katmanların hepsinde değişiklik yapman gerekir. **Sanki pastayı yatay olarak katmanlarına ayırmak gibi değil mi ?**

**Dikey Dilim Mimarisi** ise şöyle der: Bir özelliği, kullanıcı arayüzünden başlayıp veritabanına kadar uzanan tek bir dikey dilim olarak düşün. Yani, **“sipariş gösterme”** özelliği kendi içinde bir mini uygulama gibi, **tüm katmanları dikey olarak keserek kendi yolunu çizer.**

![Tiered vs Vertical Slice](/images/blog/vertical-slice-architecture/img-02.png)
*Tiered vs Vertical Slice*

#### Sade Bir Örnekle Anlatılırsa

-   **Geleneksel (Yatay Dilim):** Bir meyveli pasta düşün. Bir özelliği yapmak için önce üstteki sos ve meyve katmanına, sonra krema katmanına, sonra kek katmanına dokunursun.
-   **Dikey Dilim:** Aynı pastadan, çatalınla dibine kadar inen tam bir dilim alırsın. O dilimde sos, meyve, krema ve kek vardır. İşte bu, bir özelliğin **tüm ihtiyaçlarını içeren** bir dikey dilimdir.

### Dikey Dilim Mimarisi Ama “Dilim” Nedir ?

**Vertical Slice Architecture’da** “**slice**” yani **dilim**, bir özelliğin **(feature)** uçtan uca **tüm katmanlarıyla birlikte** ele alınmasıdır. Yani UI’den veritabanına kadar, sadece o özelliğe özel olan kodlar bir araya getirilir.

Her slice kendi Request, Handler, Validation, Persistence, UI mantığını içerir. **Kısaca her katmandan sadece ilgili özelliğe ait parçaları içeren bir yapı.**

![What is a slice?](/images/blog/vertical-slice-architecture/img-03.png)
*What is a slice?*

### Neden Dikey Dilim Mimarisi Kullanılır? Avantajları Nelerdir?

Araştırmalarıma göre bu mimarinin popülerleşmesinin iyi sebepleri var; **Buralar önemli arkadaşlar!**

**Odaklanmış Geliştirme:** Bir özellik üzerinde çalışırken, sadece o özellikle ilgili kodlara odaklanırsın. Projenin diğer karmaşık yerleriyle boğuşmazsın.

-   *Örnek vereyim:* **“Yeni ürün ekleme”** özelliği üzerinde çalışıyorsan, sadece bu işlemin arayüzü, iş kuralları ve veritabanı kayıtlarıyla ilgilenirsin. **“Kullanıcı yorumları”** bölümünün kodları seni o an için ilgilendirmez.

**Daha Az Bağımlılık (Low Coupling):** Özellikler birbirinden daha bağımsız olur. Bir özellikte yaptığın değişiklik, diğerlerini bozma riskini azaltır.

-   “**Ürün arama”** özelliğinin çalışma şeklini değiştirmen, **“Sepete ekle”** özelliğini doğrudan etkilemez çünkü kodları büyük ölçüde ayrıdır.

**Daha Yüksek Bütünlük (High Cohesion):** Bir özellikle ilgili tüm kodlar **(arayüz, iş mantığı, veri erişimi)** bir arada, genellikle aynı klasör veya modül içinde bulunur. Bu, kodu anlamayı ve üzerinde değişiklik yapmayı kolaylaştırır.

-   **“Şifremi Unuttum”** özelliğiyle ilgili tüm dosyalar yukarıda yazdığım gibi (controller, command, handler, view vb.) Features/SifremiUnuttum gibi bir klasörde toplanabilir.

**Takım Çalışmasına Uygunluk:** Farklı geliştiriciler veya takımlar, farklı dikey dilimler **(özellikler)** üzerinde aynı anda, birbirlerinin ayağına basmadan daha rahat çalışabilir.

-   Bir ekip **“Ödeme Sistemi Entegrasyonu”** dilimi üzerinde çalışırken, başka bir ekip **“Kullanıcı Profili Güncelleme”** dilimi üzerinde çalışabilir. Teması azaltır, kanayan yaramız conflictleri bir nebze engeller. 😄

**Daha Kolay Test Edilebilirlik:** Her bir dikey dilim, kendi içinde bir bütün olduğu için daha izole ve kolay test edilebilir.

> Son bir ekleme daha yapabilirim merak eden olabilir. Potansiyel olarak teknolojik esneklik sağlayabilir. Teoride her dilim kendi içerisinde farklı teknolojiler ve kütüphaneler kullanabilir ama pratikte yönetimi zorlaştırıp işleri daha çok karıştırabiliriz. Yinede bir esneklik sunar 👍

#### Aşağıya örnek bir “slice” (dilim) bırakıyorum. Kafanızda neye benzer tarzı soru oluşmasın. Mantığı oturtalım 🙏

![An Example](/images/blog/vertical-slice-architecture/img-04.png)
*An Example*

### Vertical Slice vs Onion (Clean) Architecture

Arkadaşlar uzun uzadıya **Clean Architecture** ile ilgili bilgi vermem mümkün değil bu sebeple sizlere çok iyi bir kaynak bırakıyorum. Değerli bir insan ayrıca çalışma arkadaşım, kendisine teşekkür ediyorum.

[Clean Architecture \* Burak Neiş](https://burakneis.com/clean-architecture/)

Şimdi gelelim bu yeni öğrendiğimiz mimari ile benim en sevdiğim ve bolca kullandığım mimarinin karşılaştırılmasına. Arkadaşlar ikisi de **modülerlik**, **test edilebilirlik** ve **sürdürülebilirlik** hedeflere uygun, ancak yaklaşım biçimleri ve öncelikleri oldukça farklıdır. 🍀

#### Uzun uzun yazmak yerine bir tabloda sizler için topladım: (Dürüstçe)

<a href="https://medium.com/media/dcb7debcc8e0f45523914916526d5f5f/href">https://medium.com/media/dcb7debcc8e0f45523914916526d5f5f/href</a>

Aşağıda her iki mimaride kullanılan sizler için ufakta olsa betimlemeye çalıştığım dosya yapısını görebilirsiniz.

<a href="https://medium.com/media/07eeab5d049e58f825c8b8f33ec5c169/href">https://medium.com/media/07eeab5d049e58f825c8b8f33ec5c169/href</a>

### Hüseyin Hangi Senaryoda Hangisini Kullanmalıyım?

Bu iki mimari farklı ihtiyaçlara hizmet ediyor yine söylüyorum arkadaşlar. **Projenin büyüklüğüne**, **ekip yapısına**, **domain karmaşıklığına** ve **uzun vadeli hedeflerine** göre değişir.

**Vertical Slice Architecture** 🧩

-   Küçük ve orta ölçek projeler, Startup-MVP-POC gibi, mikroservis öncesi monolith’ler
-   Hızlı geliştirme, sade yapı, domain’in soyutlanmasının kritik olmadığı durumlar (Erken teslim öncelikliyse)
-   Her özelliğin bir takım tarafından bağımsız geliştirilmesi gerekiyorsa
-   CQRS, MediatR gibi araçlarla hızlı uygulama isteniyorsa

**Onion / Clean Architecture** 🧅

-   Büyük kurumsal sistemler (Uzun soluklu projeler)
-   Domain-Driven Design (DDD) yaklaşımı kullanılıyorsa
-   Karmaşık iş kuralları, politikalar, davranış modelleri varsa
-   Uzun ömürlü, sürdürülebilir, test odaklı projelerde

**Yeni ve hızlı gelişen bir projede** → Vertical Slice başlangıç için çok uygundur.

**Büyük ölçekli, çok katmanlı bir sistemde** → Clean Architecture uzun vadede daha sağlam zemin sunar.

### Dikkat Edilmesi Gerekenler / Olası Zorluklar

#### **Kod Tekrarı Riski Barındıyor**

Özellikler (features) birbirinden izole olduğu için, bazı **ortak ihtiyaçlar** **(örneğin: kullanıcı doğrulama, hata loglama, DTO dönüşümleri, cache mekanizmaları)** her dilimde tekrar edilebilir.

Bu tekrarları **en aza indirmek** için: Shared Kernel (Ortak Çekirdek) klasörü oluşturulmalı. Utility, Common, CrossCuttingConcerns gibi yardımcı kütüphaneler kullanılmalı.

Ama dikkat: bu ortak alanlar **gereksiz büyür yeni bir “god layer”** olmasın.

#### **Mimari Disiplin**

Slice’lar özelliğe özel olarak tasarlanmalı ama belirli sınırlar içinde kalmalı. Ortak işlemler (örneğin: ILogger, IDateTimeProvider) gibi servisler **dependency injection** ile yönetilmeli.

Ekip içi **konvansiyonlar** ve klasör yapıları önceden belirlenmeli. Aksi takdirde her geliştirici kendi “tarzında” slice yazabilir.

#### Katmanlar Arası Netlik

Vertical Slice mimarisinde **katmanlar ayrılmaz**, ama **“roller”** bellidir. Uygulamada Handler’ın içinde veri erişimi, doğrulama, mapping gibi işlerin tek bir sınıfa yığılmaması gerekir.

Bu nedenle kod sade ve görev odaklı yazılmalıdır [**(SRP — Single Responsibility Principle)**](/yazilar/single-responsibility-principle-srp/)**. Okumadıysanız göz atabilirsiniz :)**

#### Büyüdükçe Yönetim Zorluğu

Uygulama büyüdükçe slice sayısı da artar. Bu durumda: Slice’lar alt klasörlere bölünebilir (örn: Features/Users/Register, Features/Users/Login). Ya da bir slice’in Command, Query, Response, Handler, Validator gibi dosyaları mantıksal olarak gruplandırılabilir.

> **Okuduğunuz için Minnettarım.**

> **Sağlıcakla kalın Dostlarım..**

#### Kaynakça;

[Simplest Vertical Slice Architecture](https://www.milanjovanovic.tech/blog/vertical-slice-architecture)

[VSA Solutions and Templates](https://www.jimmybogard.com/vertical-slice-architecture/)

[The Best Ways to Structure Your Project](https://www.reddit.com/r/dotnet/comments/1eo7uhk/vertical_slice_architecture_the_best_ways_to/)

[Why Vertical Slices Won’t Evolve from Clean Architecture](https://ricofritzsche.me/why-vertical-slices-wont-evolve-from-clean-architecture/)

[Vertical Slice Architecture in ASP.NET Core](https://code-maze.com/vertical-slice-architecture-aspnet-core/)
