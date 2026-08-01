---
title: "Kendi Yapay Zeka Ekibinizi (Agent Orchestration) Nasıl Kurarsınız?"
slug: "kendi-yapay-zeka-ekibinizi-nasil-kurarsiniz"
lang: "tr"
date: "2026-01-14"
category: "Yapay Zeka"
excerpt: "Tek bir modele her işi yaptırmak yerine uzmanlaşmış yapay zeka ajanlarından bir ekip kurmak: Agent Orchestration'ın mantığı, mimarisi ve pratik kurulumu."
readTime: "8"
coverImage: "/images/blog/kendi-yapay-zeka-ekibinizi-nasil-kurarsiniz/img-01.png"
mediumUrl: "https://medium.com/@hsynkrcf/kendi-yapay-zeka-ekibinizi-agent-orchestration-nas%C4%B1l-kurars%C4%B1n%C4%B1z-795fb65055ae"
tags: ["programming", "ai", "ai-agent", "artificial-intelligence", "technology"]
---
![](/images/blog/kendi-yapay-zeka-ekibinizi-nasil-kurarsiniz/img-01.png)

Hepimiz bu anı en az bir kez yaşamışızdır: Claude’ye veya benzeri bir modele karmaşık, çok adımlı bir iş verirsiniz. Başta her şey yolunda gibidir, ancak konuşma uzadıkça model “unutmaya” başlar, **yani bağlamı (context) kaybeder** veya en kötüsü; kendinden çok emin bir şekilde yanlış bilgiler uydurur. (buna kibarca **“halüsinasyon”** diyoruz) [(ai-hallucination)](https://en.wikipedia.org/wiki/Hallucination_\(artificial_intelligence\))

Çünkü tek bir Yapay Zeka modelinden; hem harika bir **araştırmacı**, hem yaratıcı bir **yazar**, hem de titiz bir **editör** olmasını bekliyoruz. Gerçek hayatta bir insandan bu kadar farklı yetkinlikleri aynı anda beklesek, o kişi muhtemelen **tükenmişlik sendromu** yaşardı. 😅

İşte tam bu noktada, yapay zeka dünyasının yeni yıldızı sahneye çıkıyor: **Agent Orchestration (Ajan Orkestrasyonu).**

> Bugün sizlere, cebimizden tek kuruş harcamadan, bilgisayarımızda çalışan ve birbirleriyle konuşarak iş yapan “dijital çalışanlardan” kurulu bir ekibi nasıl kurduğumu anlatacağım.

### Bölüm: Nedir Bu “Ajan Orkestrasyonu”?

Kendince karar alabilen, eylemler gerçekleştiren otonom yapay zekalar düşünün. **Ajan (Agent)** kavramı, bu beyne “eller ve ayaklar” (araçlar/tools) vererek onun aksiyon almasını sağlamaktır.

![](/images/blog/kendi-yapay-zeka-ekibinizi-nasil-kurarsiniz/img-02.jpg)

**Ajan Orkestrasyonu**, tek bir ajanın yeteneklerinin ötesine geçip, birden fazla ajanın ortak bir hedefe ulaşmak için koordineli çalışmasıdır.

Bunu bir **İnşaat Sahası** metaforuyla açıklayabiliriz:

-   **Single Agent (Tek Ajan):** Hem duvar ören, hem elektrik döşeyen, hem de mimari çizimi yapan tek bir usta. Hata yapma riski yüksektir ve yorulur.
-   **Orchestration:** Bir Şantiye Şefi (Orchestrator) vardır. Duvarcıya “duvarı ör”, elektrikçiye “kabloları çek” der. Herkes sadece uzman olduğu işi yapar. Şef, işlerin sırasını ve kalitesini denetler.

> İşte bu yapıya Agent Orchestration diyoruz.

#### Neden Orkestrasyona İhtiyacımız Var?

1.  **Bağlam Sınırını Aşmak:** Tek bir LLM’e tüm proje detaylarını yüklerseniz “unutmaya” başlar ve bağlamı kaybeder. Orkestrasyonda her ajan sadece kendi küçük parçasını bilir.
2.  **Uzmanlaşma:** Bir ajana “Sen sadece Python kodla”, diğerine “Sen sadece dokümantasyon yaz” derseniz bir nevi fine tuning yapmış olursunuz, her ikisi de tek bir AI’dan daha iyi ve efektif çalışır..
3.  **Hata Toleransı:** Bir ajan hata yaparsa, yönetici ajan (Manager) bunu fark edip “Tekrar dene” diyebilir. Buda görevi loop’a sokup başarılı olana kadar tekrar denemesine izin verir. Sizede kahve keyfi kalır ☕️
4.  **İletişim:** İnsan müdahalesi olmadan mükemmelleşme döngüsü!

### Karşılaştıralım: Hangi Framework Sizin İçin?

Piyasada bu işi yapan devasa araçlar var. Hangisini seçeceğiniz size ve aklınızdaki fikrin karmaşıklığına bağladırı. Ben bir çok kaynağı toplayıp AI tarafından ince ele, sık doku mantığı ile aşağıya bir tablo bırakıyorum.

![Made By AI with My Infos](/images/blog/kendi-yapay-zeka-ekibinizi-nasil-kurarsiniz/img-03.png)
*Made By AI with My Infos*

### Özet Geç Hüseyin: Hangisini Seçmeliyim?

-   Eğer **“Hemen çalışan bir şeyler yapıp ve ekibi kurucam, kodla çok boğuşmayayım”** diyorsanız → **CrewAI** (Benim Seçim).
-   Eğer **“Ajanın her nefes alışını ben kontrol edeyim, hafızasını ben yöneteyim”** diyorsanız → **LangGraph**.
-   Eğer **“Bana kod yazan, hatayı bulup kendi düzelten otonom geliştiriciler lazım”** diyorsanız → **AutoGen**.
-   Eğer **“Şirketimde production ortamında çalışacak, profesyonel, hata yapma lüksü olmayan, deep bir şey lazım”** diyorsanız → **Upsonic**.

⭐️ **LangChain:** Bu işin “İsviçre Çakısı”dır. Çok güçlüdür, her şeyi (hafıza, vektör tabanları) en ince detayına kadar özelleştirebilirsiniz. Ancak öğrenme eğrisi diktir ve bazen basit bir iş için çok fazla kod yazmanızı gerektirebilir.

⭐️ **CrewAI:** LangChain üzerine kuruludur ancak karmaşıklığı soyutlar. “Sen Yazarsın, Sen Editörsün” diyerek ilerlemek istiyorsanız en iyi seçenektir.

⭐️ **Upsonic:** Son dönemin yükselen yıldızı. Özellikle **“Güvenilirlik” (Reliability)** ve **“Function Calling”** odaklıdır. CrewAI daha çok “sohbet eden ekip” gibiyken, Upsonic daha çok “hata yapmayan, kesin kuralları olan askerler” gibidir. Eğer ajanınızın *mutlaka* belirli bir formatta (örneğin JSON) çıktı vermesi hayati önem taşıyorsa, Upsonic’in sıkı tip (strict typing) yapısı hayat kurtarır.

⭐️ **AutoGen (Microsoft)**: Çok ajanlı sistemler için tasarlanmıştır. Ajanlar arası konuşma, rol dağılımı ve durma koşulları net biçimde tanımlanır. CrewAI’ye göre daha düşük seviyelidir; esneklik ve kontrol sunar ama daha fazla kod ve disiplin ister. Kurumsal, denetlenebilir ve tekrar üretilebilir sistemler için uygundur.

### Proje: “Sıfır Maliyetli” Blog Ekibi

Bu teoriyi test etmek için bir deney yaptım. Hedefim şuydu: ***“Ben sadece bir konu başlığı vereyim, gerisini ekip halletsin.”***

Ancak bir sorun vardı: Bu işler için kullanılan araçlar (özellikle OpenAI API’leri) dolar bazında maliyetli olabiliyordu. Ben de “Sıfır Maliyet” (Zero Cost) prensibiyle bir teknoloji yığını seçtim:

-   **(LLM):** Google’ın geliştirdiği **Gemini 2.5-Flash**. Hem inanılmaz hızlı hem de geliştiriciler için Google’ın cömert bir ücretsiz kotası var. 300$ ve 90 günlük kullanım süresi beni mest etti 😺
-   **(Orchestration):** **CrewAI**. Ajanları yönetmek, onlara rol ve görev atamak için şu an piyasadaki en iyi kütüphanelerden biri.
-   **(Search Tool):** **DuckDuckGo**. API anahtarı gerektirmeyen, ücretsiz ve gizlilik odaklı arama motoru.

Bunu bir dergi-makale ofisi gibi düşünün. Üç tane çalışanı olsun:

-   **Araştırmacı Ajan:** Sadece interneti tarar, en güncel verileri bulur. Yazı yazmakla uğraşmaz.
-   **Yazar Ajan:** Araştırmacının getirdiği verileri alır, akıcı bir metne dönüştürür. Doğruluk kontrolü yapmaz, sadece “yazar”.
-   **Editör Ajan:** Yazılan metni alır, imla hatalarını düzeltir ve yayınlanacak hale getirir.

![Github üzerinden proje’ye erişip ayağa kaldırabilirsiniz. (Örnek Orchestration Projem)](/images/blog/kendi-yapay-zeka-ekibinizi-nasil-kurarsiniz/img-04.png)
*Github üzerinden proje’ye erişip ayağa kaldırabilirsiniz. (Örnek Orchestration Projem)*

Yukarıdaki uygulamayı hızlıca hayata geçirdim. Sizde projeyi forklayıp localde çalıştırıp deneyebilirsiniz gayet güzel sonuçlar veriyor. 🙏

[GitHub - huseyinkaracif/ai-blog-team](https://github.com/huseyinkaracif/ai-blog-team)

<a href="https://medium.com/media/672dfbbb5f89856c2fadd21f572e2471/href">https://medium.com/media/672dfbbb5f89856c2fadd21f572e2471/href</a>

### Sahne Arkasında Neler Oldu?

Ekibi kurup “Başlat” tuşuna bastığımda terminal ekranında akan yazıları izlemek büyüleyiciydi.

İlk önce **“Kıdemli Araştırmacı”** sahneye çıktı. *“Konu hakkında 2024–2025 trendlerini arıyorum…”* diyerek DuckDuckGo üzerinden gerçek zamanlı aramalar yaptı. Bulduğu makaleleri okudu, özetledi ve bir rapor haline getirdi.

Sonra bu raporu ”Blog Yazarı”na devretti. Yazar, elindeki ham veriyi alıp; **giriş**, **gelişme** ve **sonuç** bölümleri olan, okuması keyifli bir Türkçe makale taslağı oluşturdu.

Son olarak **“Baş Editör”** devreye girdi. Yazıyı okudu, başlıkları düzenledi, dilbilgisi kontrolü yaptı ve altına *“Yazar: AI Team”* imzasını atarak dosyayı kaydetti.

![{topic} olarak “Hüseyin Karacif” yazdığımda agentların tek tek çalışması ve output görseli](/images/blog/kendi-yapay-zeka-ekibinizi-nasil-kurarsiniz/img-05.png)
*{topic} olarak “Hüseyin Karacif” yazdığımda agentların tek tek çalışması ve output görseli*

Ben ne mi yaptım? Sadece kahvemi yudumladım. ☕️

### Karşılaştığım Zorluklar (Ve Çözümleri)

Tabii ki her yazılım projesinde olduğu gibi, “Bitti” diyene kadar bazı engellere takıldım. Bu işe girecekler için iki “**altın ipucu**” vereyim:

1.  **Güvenlik Filtreleri:** Google Gemini, bazen internetten gelen karışık verileri “güvensiz” sanıp cevap vermeyi reddedebiliyor. Kod tarafında güvenlik filtrelerini (Safety Settings) tamamen kapatarak modelin özgürce çalışmasını sağlamak gerekiyor.
2.  **Tool Uyumsuzluğu:** Hazır kütüphaneler bazen birbiriyle çakışabiliyor. En sağlam yol, ajanların kullanacağı araçları (örneğin arama modülünü) kendi ellerinizle, basit bir Python sınıfı olarak yazmak. Bu, hata riskini sıfıra indiriyor. (Ayrıca python env’larına dikkat ediniz)
3.  **API Haberleşmesi:** Bazı paketlerde **(CrewAI)** environment olarak standart **OpenAI Key** isteniyor, bunları empty set ederek ilerlettim, API’ler bağlantı kuramıyor bu sebepten sizde dikkat ediniz.

*“Ben bugün CrewAI ile başladım ama sizin projeniz büyüdükçe Upsonic’in kararlılığına veya AgentOps’un analiz yeteneğine ihtiyaç duyabilirsiniz”*

### EKSTRA BİLGİ İYİDİR

#### AgentOps & Observability: “Agentların Jira’sı”

Bir yazılım ekibini yönetirken Jira veya Trello kullanırsınız. **Peki ya dijital ajanları nasıl yöneteceksiniz?** Onlar çalışırken **“Nerede takıldı?”**, **“Neden sonsuz döngüye girdi?”**, **“Bu işlem kaç para tuttu?”** sorularını sormaya başladığınızda terminal ekranı yetmez.

İşte burada **“Agent Observability” (Gözlemlenebilirlik)** araçları devreye girer: (Bu kısım önemli lütfen vakit ayıralım)

-   [**AgentOps:**](https://www.agentops.ai/) Ajanlarınızın performansını takip eden, oturumlarını kaydeden bir gösterge paneli. Tıpkı bir Product Manager’ın (PM) ekibini izlediği gibi, ajanların hangi görevde ne kadar vakit harcadığını görselleştirir.
-   [**LangSmith:**](https://www.langchain.com/langsmith/observability) LangChain ekibinin geliştirdiği, ajanların “beyninin içine” bakmanızı sağlayan araç. Hatanın hangi adımda olduğunu (Trace) saniyesi saniyesine gösterir.
-   [**Automaker:**](https://automaker.app/) Sektör hızla “Koddan Arayüze” kayıyor. Geliştiriciler artık ajanları terminalden değil, **Automaker** gibi AI odaklı arayüzlerden veya **Kanban** panoları üzerinden (Trello kartı sürükler gibi görev atayarak) yönetmeye başlıyor. Bu, teknik olmayan PM’lerin de yapay zeka ekiplerini yönetebileceği bir geleceğin habercisi.

![Agent Orchestration & Development & Observability](/images/blog/kendi-yapay-zeka-ekibinizi-nasil-kurarsiniz/img-06.jpg)
*Agent Orchestration & Development & Observability*

### Sonuç

Yapay zeka artık sadece soru sorup cevap aldığımız bir **“asistan”** değil. **Doğru kurgulandığında, bizim için çalışan, araştıran ve üreten bir “iş gücü” oldu.**

**CrewAI** ve **Gemini** ikilisiyle kurduğumuz bu yapı, geleceğin yazılım mimarisinin nasıl olacağının küçük bir demosu. Artık kod yazarken sadece algoritmaları değil, bu **dijital ajanların** psikolojisini ve iş akışlarını da tasarlıyoruz.

Eğer siz de bu sistemi kendi bilgisayarınızda denemek ve geliştirmek isterseniz, projenin tüm kaynak kodlarını [GitHub profilimde](https://github.com/huseyinkaracif/ai-blog-team) paylaştım. **İndirin, kurcalayın, öğrenin ve kendi ordunuzu yaratın!**

> *Evet yazının sonuna geldik. Artık bilgilerin kolayca bulunabildiği yapay zeka’nın mertliği bozduğu bir dönemdeyiz.* ***Sizler için uğraşıp benim içinde yeni bir konuyu boş zamanlarımda derledim ve sundum.*** *Geri bildirimlerinizi eksik etmeyiniz. 🙏*

> Okuduğunuz için Minnettarım.

> Sağlıcakla kalın Dostlarım..

#### KAYNAKLARIM

-   [What is AI Agent Orchestration? | IBM](https://www.ibm.com/think/topics/ai-agent-orchestration)
-   [Agent Orchestration: When to Use LangChain, LangGraph, AutoGen — or Build an Agentic RAG System](https://medium.com/@akankshasinha247/agent-orchestration-when-to-use-langchain-langgraph-autogen-or-build-an-agentic-rag-system-cc298f785ea4)
-   [AI Agent Orchestration: How To Coordinate Multiple AI Agents](https://botpress.com/blog/ai-agent-orchestration)
-   [What is Multi-Agent Orchestration? An Overview | Talkdesk](https://www.talkdesk.com/blog/multi-agent-orchestration/)

-   [AI AGENT ORCHESTRATİON FRAMEWORKS](https://blog.n8n.io/ai-agent-orchestration-frameworks/) BY N8N
