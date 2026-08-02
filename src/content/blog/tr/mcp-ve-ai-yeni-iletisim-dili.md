---
title: "MCP ve AI: Akıllı Sistemlerin Yeni İletişim Dili"
slug: "mcp-ve-ai-yeni-iletisim-dili"
lang: "tr"
date: "2025-06-24"
category: "Yapay Zeka"
excerpt: "MCP, yapay zekanın dış dünyaya bağlanmasını sağlayan ortak dil. USB-C analojisinden akıllı ev senaryosuna, MCP'nin ne olduğu ve neden önemli olduğu."
readTime: "6"
coverImage: "/images/blog/mcp-ve-ai-yeni-iletisim-dili/img-01.webp"
mediumUrl: "https://medium.com/@hsynkrcf/mcp-ve-ai-ak%C4%B1ll%C4%B1-sistemlerin-yeni-i%CC%87leti%C5%9Fim-dili-b93d06db1848"
tags: ["programming", "technology", "data-science", "mcp-server", "artificial-intelligence"]
---
Yapay zekanın dış dünya ile etkileşim kurma ihtiyacı, günümüzün en büyük teknolojik zorluklarından biriydi. Ta ki **Model Context Protocol (MCP)** gelene kadar. **MCP**, akıllı sistemlerin sadece **“düşünmesini”** değil, aynı zamanda dış dünyaya **“bağlanmasını”** ve **“eyleme geçmesini”** mümkün kılıyor. Bu yeni iletişim diliyle **Skynet** gerçeğe bir adım daha yaklaşıyor 🤖

![](/images/blog/mcp-ve-ai-yeni-iletisim-dili/img-01.webp)

#### Akıllı Ama Biraz “Saf” Dostlarımız

**Öncelikle hayal edelim**: Elimizde inanılmaz güçlü, ansiklopedileri saniyeler içinde okuyabilen, en karmaşık hesapları yapabilen **bir robot var**. Ama ona **“Biraz yoruldum”** dediğinizde size yorgunluğun biyokimyasal tanımını yapıyor. Veya **“Ev çok havasız”** dediğinizde size en yakın meteoroloji istasyonunun nem oranını söylüyor.

**Tanıdık geldi mi?** İşte günümüzün yapay zekaları bazen tam da böyle. İnanılmaz yetenekliler ama insan olmanın getirdiği o **“anlama”** yetisinden, yani **bağlamdan** yoksunlar. Söylediğimiz şeyin arkasındaki niyeti, içinde bulunduğumuz durumu veya neye ihtiyacımız olduğunu sezmekte zorlanıyorlar.

Peki, bu **“akıllı ama saf”** dostlarımıza nasıl **“arif”** olmayı öğretebiliriz? İşte bu sorunun cevabı, kulağa biraz teknik gelse de aslında çok basit bir fikre dayanan **Model Context Protocol (MCP)**’de saklı olabilir.

#### İyi de, Kim Buldu Bu MCP’yi?

İnternette aradığınızda, bu protokolü icat eden tek bir kişi veya şirket bulamayacaksınız. Çünkü **MCP**, birinin bir gecede yazdığı bir kod parçasından ziyade, yapay zeka dünyasının **“artık bunun zamanı geldi”** dediği, ortak akılla gelişen **kavramsal bir çerçevedir.**

[Introducing the Model Context Protocol](https://www.anthropic.com/news/model-context-protocol)

**Anthropic** tarafından Kasım 2024'te resmen duyuruldu ve açık kaynaklı hale getirildi ve [**OpenAI**](https://en.wikipedia.org/wiki/OpenAI) ve [**Google DeepMind**](https://en.wikipedia.org/wiki/Google_DeepMind) gibi büyük **AI** sağlayıcıları tarafından benimsenmiştir.

### Peki Nedir Bu Model Context Protocol (MCP)?

Araştırma yaparken sürekli karşıma çıkan bir anoloji var. Teknoloji yazarları buna **“MCP, yapay zeka için bir nevi USB-C portudur.”** diyor.

Bu analoji neden bu kadar iyi?

-   **Standarttır:** Nasıl ki USB-C ile telefonunuzu, laptop’ınızı, kulaklığınızı aynı kabloyla şarj edebiliyorsanız, MCP de yapay zekanın farklı araçlara **(hava durumu, akıllı lamba, takviminiz, veritabanı)** aynı standart dille bağlanmasını hedefler. Her bir araç için ayrı bir “tercüman” tutmak zorunda kalmaz.
-   **Çift Yönlüdür:** USB-C sadece güç vermekle kalmaz, aynı zamanda veri de aktarır. MCP de tam olarak bunu yapar. Sadece komut göndermez, aynı zamanda dış dünyadan ve araçlardan gelen bilgiyi **(yani bağlamı)** da alır.

![MCP looks likes USB-C but for AI applications by Norah Sakal](/images/blog/mcp-ve-ai-yeni-iletisim-dili/img-02.webp)
*MCP looks likes USB-C but for AI applications by Norah Sakal*

Ama ben bu analojiyi bir adım ileri taşımak istiyorum: **MCP** sadece o **“giriş portu”** değil, aynı zamanda o porta takılan **akıllı bir kablodur.** Bu kablo, üzerinden geçen verinin **ne** olduğunu, **neden** gönderildiğini ve **ne kadar** önemli olduğunu fısıldar.

### **Bir Örnekle Canlandıralım: “Hava Karardı”**

**Kullanıcı yani Ben:** (Esneyerek) “Off, hava da karardı.”

**MCP’siz Dünya (Dilsiz Doğası):** Akıllı asistan bunu duyar ve “Anladım. Hava karardı” bir durum tespiti. “Kullanıcıya güneşin batış saati hakkında bilgi vereyim.” **Sonuç?** Kullanıcının hiç de beklemediği, işine yaramayan bir cevap.

**MCP’li Dünya (Proaktif Akıl):** Asistan bu cümleyi duyduğu anda, MCP devreye girer ve bir **“dedikodu paketi”** hazırlar:

> **Giriş Bağlamı (Neler Oluyor?):** Akıllı hoparlör, merkezi yapay zekaya adeta fısıldar: *“****Selam patron****, ben oturma odasındaki hoparlör. Hüseyin burada, saatin farkındasın, akşam 9'u geçti. Odadaki ışık sensörü* ***‘zifiri karanlık’*** *alarmı veriyor. Hüseyin’in telefonundaki hareket sensörü son 10 dakikadır pasif, yani telefonuyla oynamıyor. Büyük ihtimalle yoruldu ve dinlenmek istiyor. Bana da* ***‘hava karardı’*** *dedi. Bu bir soru değil, bence bir ima!”*

> **Çıkış Bağlamı (Şimdi Ne Yapmalı?):** Merkezi yapay zeka bu zengin dedikodu paketini alır almaz durumu anlar. Niyetin **“ışıkları açmak”** olduğunu çözer. Ama hangi ışık? İşte burada MCP’nin **“USB-C”** yüzü devreye girer. **Yapay zeka**, elindeki araçlara **(akıllı lambalar, müzik sistemi vb.)** MCP üzerinden bağlanır:

![Created with ImageFX by Labs.Google](/images/blog/mcp-ve-ai-yeni-iletisim-dili/img-03.webp)
*Created with ImageFX by Labs.Google*

-   *“Hey* ***Philips Hue API****’si, Hüseyin’in* ***‘Akşam Keyfi’*** *diye bir sahnesi vardı. Onu çalıştırır mısın?* ***Oturma odası lambasını %50 sıcak sarı yap.****”*
-   *“Selam* ***Spotify API****’si, Hüseyin’in* ***‘Sakin Akşamlar’*** *listesini çok kısık bir sesle* ***çalar mısın?****”*

**Nihai Sonuç:** Yapay zeka, kullanıcıya şöyle seslenir: **“Haklısın Hüseyin, hava karardı. Senin için akşam keyfi modunu açtım. İyi dinlenmeler.”**

> Gördünüz mü? MCP, olayı basit bir komut-cevap döngüsünden çıkarıp, anlayan, empati kuran ve **proaktif** davranan bir tecrübeye dönüştürdü.

### **Bu Bizim İçin Ne Anlama Geliyor?**

MCP gibi bir yaklaşımın yaygınlaşması, hayatımızdaki teknolojiyi kökten değiştirecektir, **düşünün benim betimlemem ile tam olarak ahtapot gibi bir yardımcınız var, siz leb demeden leblebi diyor** 😅

-   **Gerçekten “Akıllı” Bir Ev:** Eviniz siz “üşüdüm” demeden ısı sensörleri ile ölçüm yapıp kombiyi çalıştırır. Işık sensörleri ile optimal ışığı yakalar ona göre ayarlar. Sürekli canlıdır, etkileşim halindedir.
-   **Daha İyi Bir İş Arkadaşı:** Yapay zeka asistanınız, size sadece “saat 5'te toplantı var” demez. “Saat 5'teki toplantıdan önce ilgili raporları okuman için sana 30 dakika ayırdım, kahve de söylememi ister misin?” der.
-   **Daha Güvenli Sistemler:** Otonom bir araç, sadece önündeki engeli değil, MCP sayesinde “okul bölgesi”nde olduğunu, “saatin çıkış saati” olduğunu ve “hafif bir çiseleme başladığını” bilerek çok daha güvenli bir karar verir.

### Son Söz

**Model Context Protocol (MCP)**, yapay zekanın çevresel bağlamlara erişimini mümkün kılarak onu daha **etkileşimli ve bilinçli** hale getirir. Farklı kaynaklardan **(e-posta, takvim, dosyalar vb.)** gelen bilgileri bir araya getirerek, yapay zeka sistemlerinin kullanıcıyla daha anlamlı ve kişisel düzeyde etkileşim kurmasını sağlar. **MCP** sayesinde, yapay zeka artık **yalnızca veriyle değil, bağlamla da konuşur** — bu da onu sadece yanıtlayan değil, **anlayan bir yardımcıya dönüştürür.**

![Model Context Protocol, as I call it, is the arms of the octopus called Artificial Intelligence. (Hüseyin Karacif)](/images/blog/mcp-ve-ai-yeni-iletisim-dili/img-04.webp)
*Model Context Protocol, as I call it, is the arms of the octopus called Artificial Intelligence. (Hüseyin Karacif)*

### **Bana göre MCP, Yapay Zeka denilen ahtapotun kollarıdır. — Hüseyin Karacif**

> Okuduğunuz için Minnettarım.

> Sağlıcakla kalın Dostlarım..

#### Kaynakça;

[Introducing the MCP by Anthropic](https://www.anthropic.com/news/model-context-protocol)

[MCP vs API Protocols by Norah Sakal](https://norahsakal.com/blog/mcp-vs-api-model-context-protocol-explained/)

[Model Context Protocol 101 Dev.to](https://dev.to/pavanbelagatti/model-context-protocol-mcp-101-a-hands-on-beginners-guide-47ho)

[Visual Guide to MCPs by Data Science](https://blog.dailydoseofds.com/p/visual-guide-to-model-context-protocol)

[How MCP Works by Descope](https://www.descope.com/learn/post/mcp)
