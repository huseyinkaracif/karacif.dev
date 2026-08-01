---
title: "GEO: Yapay Zeka Arama Motorları için SEO"
slug: "geo-ai-arama-motorlari-icin-seo"
lang: "tr"
date: "2026-07-21"
category: "Yapay Zeka"
excerpt: "Google'da sıralama artık yetmiyor; asıl mesele ChatGPT'nin cevabında adının geçmesi. GEO'nun ne olduğunu, klasik SEO'dan farkını ve sitenizi yapay zekaya nasıl 'okutacağınızı' anlatıyorum."
readTime: "7"
coverImage: "/images/blog/geo-ai-arama-motorlari-icin-seo/cover.svg"
tags: ["seo", "ai", "generative-engine-optimization", "content-strategy", "llms-txt"]
---
Geçen ay bir öğleden sonra Google Search Console'u açtım ve organik tıklamalarda tuhaf bir düşüş gördüm. İlk içgüdüm panikti: **“Acaba bir algoritma güncellemesinde ceza mı yedim?”** Loglara, sıralamalara, meta etiketlere baktım — teknik olarak her şey yolundaydı. Sonra fark ettim ki mesele ceza değildi. Mesele şuydu: okuyucularımın bir kısmı artık Google'a hiç uğramıyordu. Sorularını doğrudan **ChatGPT'ye**, **Claude'a** ya da **Perplexity'ye** soruyorlardı ve cevabı orada, tek bir paragrafta, kaynak bile göstermeden alıp gidiyorlardı.

Tanıdık geldi mi? Kendinize son sorduğunuz “nasıl yapılır” sorusunu düşünün — on tane mavi link arasından mı seçtiniz, yoksa bir sohbet penceresine mi yazdınız? Çoğumuz için cevap artık ikincisi. İşte tam bu yüzden **GEO (Generative Engine Optimization)** diye bir kavram son bir yılda hızla ciddiye alınır oldu.

#### SEO Ölmedi, Ama Yalnız Değil Artık

Önce net olayım: **Klasik SEO ölmüyor.** Google hâlâ trilyonlarca sorguyu işliyor, hâlâ birçok site için en büyük trafik kaynağı. Ama artık tek oyuncu değil. Yanında bambaşka bir mantıkla çalışan bir rakip — ya da belki ortak — büyüdü: **üretici yapay zeka motorları.**

Aradaki fark, aslında çok temel bir soruda saklı:

-   **Klasik SEO**, sizi **on link arasında birinci sıraya** koymaya çalışır. Amaç: tıklama.
-   **GEO**, sizi bir yapay zekanın verdiği **tek bir cevabın içine, kaynak olarak** sokmaya çalışır. Amaç: alıntılanmak.

Bu ikisi bazen aynı şeyi gerektirir (temiz yapı, hızlı sayfa, doğru bilgi), ama bazen tamamen ayrışır. Google'da birinci sırada olan bir sayfa, ChatGPT'nin cevabında hiç geçmeyebilir. Ben bunu kendi blogumda test ettim — bir yazım Google'da ilk sayfadaydı ama aynı konuyu üç farklı yapay zeka asistanına sorduğumda beni hiç kaynak göstermediler. Neden? Çünkü onlar sayfamı **okuyamamışlardı**, ya da okumuşlardı da bir cevaba **dönüştürecek kadar net bulmamışlardı.**

Üstelik mesele sadece sohbet pencereleri de değil. Google'ın kendisi bile arama sonuçlarının en tepesine bir **AI Overview** kutusu yerleştirmeye başladı — kullanıcı hiç aşağı kaydırmadan, hiçbir siteye tıklamadan cevabı orada görüyor. Yani rakip artık sadece “başka bir yapay zeka uygulaması” değil, **Google'ın kendi arama sonucu sayfası içindeki** bir bileşen. Bu da GEO'yu tek bir platforma özgü bir taktik olmaktan çıkarıp, arama deneyiminin genel geleceği hâline getiriyor.

#### Yapay Zeka Botları Sitenizi Nasıl “Okur”?

Burası işin can alıcı noktası. Bir insan sitenize girdiğinde görselleri görür, animasyonları fark eder, sayfanın “hissini” alır. Bir AI crawler'ı (GPTBot, ClaudeBot, PerplexityBot gibi) böyle çalışmaz. O, sayfanızın **düz metin ve yapısal iskeletini** okur — çoğu zaman JavaScript bile çalıştırmadan.

Bu yüzden şunlara dikkat etmek gerekiyor:

-   **Temiz HTML:** İçeriğiniz client-side JavaScript ile sonradan render ediliyorsa, birçok AI crawler'ı boş bir sayfa görür. Server-side rendering veya statik üretim (tam da bu blogun Gatsby ile yaptığı gibi) burada büyük avantaj.
-   **Yapısal veri (JSON-LD):** Şema işaretlemesi, “bu bir makale,” “yazarı bu,” “yayın tarihi bu” gibi bilgileri makineye açıkça söyler. Yapay zeka modelleri, tahmin etmek zorunda kalmadan bu meta bilgiyi doğrudan kullanır.
-   **Anlamlı başlık hiyerarşisi:** `<h1>`, `<h2>`, `<h3>` sırasını görsel olarak güzel dursun diye değil, **konunun mantıksal iskeletini** çizsin diye kullanın. Bir AI, “bu başlığın altında şu soru cevaplanıyor” diye çıkarım yapar.
-   **`llms.txt`:** Yeni ve hâlâ tartışmalı bir standart. `robots.txt`'nin AI'a yönelik kuzeni gibi düşünün — sitenizin hangi bölümlerinin, hangi formatta, yapay zeka tüketimi için önemli olduğunu özetleyen basit bir metin dosyası.

![AI crawler bir sayfayı nasıl işler: HTML, JSON-LD ve llms.txt üzerinden anlamlandırma akışı](/images/blog/geo-ai-arama-motorlari-icin-seo/diagram-1.svg)
*AI crawler bir sayfayı nasıl işler: HTML, JSON-LD ve llms.txt üzerinden anlamlandırma akışı*

Örnek bir `llms.txt` dosyası şöyle görünebilir:

```
# huseyinkaracif.com

> Senior Software Developer, İstanbul. Yapay zeka, yazılım mimarisi
> ve mühendislik pratikleri üzerine yazıyor.

## Ana İçerik
- [Blog](https://huseyinkaracif.com/yazilar): Yapay zeka ve yazılım
  mühendisliği üzerine tüm yazılar
- [Projeler](https://huseyinkaracif.com/projeler): Açık kaynak ve
  yayınlanmış projeler

## Öne Çıkan Yazılar
- [MCP ve AI](https://huseyinkaracif.com/yazilar/mcp-ve-ai-yeni-iletisim-dili/):
  Model Context Protocol'ün ne olduğu ve neden önemli olduğu

## Notlar
Bu site kişisel görüşler içerir, kurumsal bir yayın değildir.
Alıntı yaparken yazar adını (Hüseyin Karacif) belirtin.
```

Ve bir makale sayfasına eklenebilecek basit bir JSON-LD örneği:

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "GEO: Yapay Zeka Arama Motorları için SEO",
  "author": {
    "@type": "Person",
    "name": "Hüseyin Karacif",
    "url": "https://huseyinkaracif.com"
  },
  "datePublished": "2026-07-21",
  "description": "GEO nedir, klasik SEO'dan farkı ne ve bir siteyi yapay zekaya nasıl okutursunuz?",
  "mainEntityOfPage": "https://huseyinkaracif.com/yazilar/geo-ai-arama-motorlari-icin-seo/"
}
```

Karmaşık değil, değil mi? Ama şaşıracaksınız — birçok kurumsal site bunu hâlâ eksik bırakıyor.

#### Alıntılanmaya Değer Olmak

Burada işin teknik kısmı bitiyor, içerik kısmı başlıyor. Çünkü doğru HTML ve doğru şema, sizi sadece **okunabilir** yapar; **alıntılanabilir** yapmaz. Bir yapay zeka modeli, cevap üretirken hangi kaynağı seçsin? Genelde şunlara benzeyen içerikleri:

-   **Net tanımlarla açılan paragraflar.** Sorunun cevabı, üç paragraf giriş yazısından sonra değil, ilk cümlede olmalı. Ben bu yazıyı bile “GEO nedir” diye başlıksız bir hikâyeyle açtım ama az sonra göreceksiniz, tanımı net şekilde vereceğim: **GEO, içeriğinizi üretici yapay zeka modellerinin cevaplarında kaynak olarak kullanılabilir hale getirme pratiğidir.** İşte, bu kadar basit.
-   **Orijinal veri.** Kimsenin daha önce yazmadığı bir istatistik, kendi test sonucunuz, kendi ölçümünüz. Yapay zekalar aynı cümleyi tekrar eden yüz sayfadan birini seçmek zorunda kalınca, genelde **ilk söyleyeni** ya da **en somut veriyi vereni** tercih ediyor.
-   **Soru-cevap yapısı.** İnsanlar Google'a “webhook nedir” yazar, yapay zeka asistanına ise tam cümleyle “webhook nedir, ne işe yarar” diye sorar. Sayfanızda gerçek sorulara gerçek, kısa, öz cevaplar varsa, model bu eşleşmeyi çok daha kolay kurar.
-   **Güncellik.** Modeller eğitim verisinin ötesinde canlı arama yaptığında, güncel tarih damgalı, güncellenmiş içerikleri tercih ediyor. Üç yıl önce yazılıp bir daha dokunulmamış bir sayfa, “bu bilgi hâlâ doğru mu?” testinden kolayca elenir.

> Dürüst olmak gerekirse, ben de bu yazıyı yazarken kendi kendime sordum: **“Bu yazı, bir yapay zekanın alıntılamak isteyeceği bir yazı mı?”** Cevap üzerine düşünmeniz bile başlı başına iyi bir egzersiz.

#### Pratik Bir Kontrol Listesi

Sahaya inelim. Bir siteyi “AI-görünür” hale getirmek için benim gerçekten uyguladığım adımlar:

1.  **Sunucu tarafında render edin** ya da statik üretim kullanın — JS arkasına gizlenen içerik, birçok crawler için hiç yok demektir.
2.  **`robots.txt`'de AI botlarını engellemeyin** (bilerek engellemek istemiyorsanız). GPTBot, ClaudeBot, PerplexityBot gibi user-agent'ları kontrol edin.
3.  **Her makaleye JSON-LD `Article` şeması ekleyin.** Başlık, yazar, tarih — minimum bu üçü.
4.  **Kök dizine bir `llms.txt` koyun.** Herkes okumuyor olabilir ama standart olgunlaştıkça avantaj sizde olur.
5.  **Başlıkları gerçek bir hiyerarşi olarak kullanın**, dekorasyon olarak değil.
6.  **İlk paragrafta cevabı verin.** SEO'da “giriş yazısı” makbuldü, GEO'da fazlalık.
7.  **Kaynaklarınızı ve tarihlerinizi görünür tutun.** Bir model, güvenilirliği doğrulayabildiği içeriği daha kolay alıntılar.

#### Peki Bunun İşe Yaradığını Nasıl Anlarsınız?

İşin can sıkıcı tarafı burası: klasik SEO'da Search Console açıp tıklama grafiğine bakabiliyordunuz, GEO'da işler bu kadar net değil. Yine de takip edebileceğiniz birkaç sinyal var:

-   **Referral trafiğinizi analytics'te süzün.** `chatgpt.com`, `perplexity.ai`, `claude.ai` gibi kaynaklardan gelen ziyaretleri ayrı bir segment olarak izleyin. Sayı küçük başlar ama artış trendi asıl önemli olan.
-   **Sunucu loglarında AI user-agent'larını arayın.** GPTBot, ClaudeBot, PerplexityBot gibi crawler'ların sitenizi kaç kez ziyaret ettiğini görmek, en azından **“okunuyor muyum?”** sorusuna cevap verir.
-   **Kendi içeriğinizi periyodik olarak sorgulayın.** Ayda bir, birkaç anahtar konunuzu üç dört farklı AI asistanına sorup kendinizin geçip geçmediğine bakmak, ücretsiz ve şaşırtıcı derecede öğretici bir alışkanlık.

Kesin bir dashboard yok henüz, itiraf edeyim — ama bu üç adım bile size “kör uçmuyorum” hissini veriyor.

#### Dürüst Bir Not: Bu Alan Daha Çok Genç

Şimdi size küçük bir itirafta bulunayım: Bu yazıda anlattığım her şey, bugün elimizdeki en iyi gözlemler ve mantıklı çıkarımlar. Ama **GEO, SEO'nun 2010'lardaki olgunluğuna henüz çok uzak.** Hangi sinyalin ne kadar ağırlıklı olduğunu kimse tam olarak bilmiyor — ne biz yazarlar, ne de muhtemelen bu modelleri eğiten şirketlerin kendisi net bir “sıralama algoritması” paylaşıyor. `llms.txt` bile hâlâ resmi bir standart değil, sadece yaygınlaşan bir konvansiyon.

Yani bu yazıyı bir **kesin formül** olarak değil, **bugünün en iyi tahmini** olarak okuyun. Altı ay sonra bazı önerilerim değişebilir. Ama temel fikir değişmeyecek: **içeriğinizi hem insanlar hem de makineler için net, dürüst ve yapılandırılmış yazmak**, her koşulda kazandıran bir strateji.

Siz sitenizi son ne zaman bir yapay zeka asistanına sorup test ettiniz? Belki bu hafta sonu, kendi işinizi ya da blogunuzu ChatGPT'ye sorup ne cevap aldığınıza bakmalısınız. Sonuç sizi şaşırtabilir 😄

> Okuduğunuz için Minnettarım.

> Sağlıcakla kalın Dostlarım..
