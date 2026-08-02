---
title: "Yapay Zeka ile Devrim: Denemeniz Gereken 10 MCP Agent"
slug: "denemeniz-gereken-10-mcp-agent"
lang: "tr"
date: "2025-06-29"
category: "Yapay Zeka"
excerpt: "100'den fazla MCP agent denedim; günlük iş akışınızı gerçekten değiştiren 10 tanesini seçip nedenleriyle anlattım."
readTime: "8"
coverImage: "/images/blog/denemeniz-gereken-10-mcp-agent/img-01.webp"
mediumUrl: "https://medium.com/@hsynkrcf/yapay-zeka-ile-devrim-denemeniz-gereken-10-mcp-agent-c51e7655c4c7"
tags: ["ai", "mcp-server", "software-development", "programming", "technology"]
---
**Model Context Protocol (MCP)**, yapay zekanın **kusursuz entegrasyon** ile beraber **kullanıcı merkezli**, yaratıcı bir **oyun alanıdır**. Bir geliştirici olarak 100+ farklı **agent** denedim ve bu deneyimlerim makaleyi yazmamın ana sebebi oldu.

#### Bu açık kaynaklı yeni araçlar beni heyecanlandırıyor arkadaşlar! 😮

![](/images/blog/denemeniz-gereken-10-mcp-agent/img-01.webp)

> Not: MCP’nin ne olduğunu bilmiyorsanız, alttaki yazım sizi aydınlatacaktır.

[MCP ve AI: Akıllı Sistemlerin Yeni İletişim Dili](https://medium.com/@hsynkrcf)

**MCP Agentları** bünyesinde toplayan ve geliştiricilerin kolayca istediği aracı bulup kullanmasını kolaylaştıran, kısaca **(MCP HUB)** diye tanımladığım [**smithery.ai**](https://smithery.ai/) platformunu öneriyorum. Buraya göz gezdiriniz efenim 🙏

![Smithery.AI](/images/blog/denemeniz-gereken-10-mcp-agent/img-02.webp)
*Smithery.AI*

Deneyimlediğim ve tecrübe edindiğim tüm araçların konstanre olanlarını sizler için topladım. **En iyi 10 MCP sunucusuna** hızlıca bir göz atalım;

### [1-) Desktop Commander MCP: Terminalin Efendisi](https://desktopcommander.app/)

Terminalle uğraşmayı bırakıyoruz. **Artık AI sadece konuşmakla kalmıyor, bilgisayarımızıda kontrol edebiliyor.** Bu yenilikçi araç doğrudan terminaliniz ile çalışıp tekrarlı ve süregelen tüm işlemlerinizi yapabiliyor. Aynı zamanda ücretsiz ve karmaşık yapılandırmasıda yok. 😮

#### Gerçek Zamanlı Komut Yürütme

Terminal komutlarını doğrudan çalıştırabilir, çıktıları anında görebilirsiniz. Uzun süren işlemler sırasında oturum yönetimi yapabilir, komutları durdurup yeniden başlatabilirsiniz.

#### Dosya Sistemine Tam Erişim

**Klasör oluşturma, dosya taşıma, içeriği okuma/yazma** gibi işlemleri doğal dille tarif ederek yaptırabilirsiniz. MCP, karmaşık dosya yapıları içinde dahi akıllı yönlendirmeler sağlar.

> Arkadaşlar bu araç ayrıca **process\_kill** yapabiliyor. **Force terminate** atabiliyor. Artık tek tek komutlarla boğuşmuyoruz. Söylüyoruz oluyor :)

#### **Kullanım Örneği**

```
// Dosyaları zahmetsizce bulun Komut:  "Projedeki test dosyalarını listele" Terminal MCP Aracı:  Arıyorum!MCP:  -  utils/test.js  -  helper/test101.js // Kodu sorunsuz bir şekilde yürütün Komut:  "server.js'i çalıştır" MCP: [Program başarıyla çalıştırıldı]// İşlem yaşam döngüsünü ve yapılandırmalarını yönetin Komut:   "Config dosyasındaki 'debug=false' değerini 'debug=true' yap"MCP:  Yapılandırma  başarıyla güncellendi ! 
```

**Detaylar İçin:** [https://github.com/wonderwhy-er/DesktopCommanderMCP](https://github.com/wonderwhy-er/DesktopCommanderMCP)  
**Smithery:** [https://smithery.ai/server/@wonderwhy-er/desktop-commander](https://smithery.ai/server/@wonderwhy-er/desktop-commander)

### [2-) Context7 MCP: Taze Döküman Uzmanı](https://context7.com/)

**Yapay Zeka’ya** yeni bir framework sorduğunuzda 2020'den kod aldığınız oldu mu hiç ? Bu **agent** siz yeni bir teknoloji veya gündemde olan bir konu hakkında soru sorduğunuzda **en güncel belgeleri** yapay zekaya sunuyor.

**Gerçek zamanlı içerikler ile “AI Hallucination” büyük ölçüde azalıyor.**

Hızlı geliştirilen **frameworkler**, örneğin **Next.Js** yazıyorsunuz veya **LLM** tabanlı kod geliştirmekte karşılaşılan **“outdated code”** ve **“hallucinated API”** sorunlarını ortadan kaldırır. Prompt içinde komut vermeniz yeterlidir

#### Kullanım Örneği

```
// Örnek: Next.js 15 uygulaması oluştur ve `use context7` kullanKomut: "Next.js 15 ile yeni bir proje oluştur — use context7"// Context7 MCP:1️⃣ Kullanılan kütüphaneyi tespit eder (Next.js)2️⃣ Resmi dokümantasyonu çeker3️⃣ Prompt’a sürüm uyumlu örnek kod parçası ekler4️⃣ Model gönderilen prompt içinde doğru kod üretir — eski veya yanlış fonksiyon yok.// Diğer örnekler:“React Query'de sorgu invalidasyonu nasıl yapılır? use context7”“FastAPI’de CRUD API örneği oluştur. use context7”
```

**Detaylar İçin:** [https://github.com/upstash/context7](https://github.com/upstash/context7)  
**Smithery:** [https://smithery.ai/server/@upstash/context7-mcp](https://smithery.ai/server/@upstash/context7-mcp)

### [3-) GitHub MCP: Yazılımcıların En İyi Dostu](https://github.com/modelcontextprotocol)

**Github** ile entegrasyon yazılımcılar için hayat kurtarıcıdır. GitHub’daki depolar, **pull request’ler, issue’lar** ve **CI/CD** işlemleri gibi verilere doğrudan erişim sağlar.

**Repo yönetimini otomatikleştiren araçlarla sanki fazladan bir çift ele sahipmişsiniz gibi hissediyorsunuz.**

#### Kullanım Örneği

```
// Claude Code veya Cursor üzerinden tek tıklamayla GitHub MCP kurulumumcp: add server → https://api.githubcopilot.com/mcp/ → OAuth giriş// Kullanım örnekleri:Mevcut PR’ları listeleYeni issue oluşturYeni repo oluştur ve kodlarımı pushlaREADME.md içeriğini al ve değiştirYeni GitHub Actions workflow ekle// Artık sıfır komut yazarak projenizde sürüm kontrolü yapabilirsiniz.
```

**Detaylar İçin:** [https://github.com/modelcontextprotocol](https://github.com/modelcontextprotocol)  
**Smithery:** [https://smithery.ai/server/@smithery-ai/github](https://smithery.ai/server/@smithery-ai/github)

### [4-) Exa Search: Arama Kurtarma Sorumlusu](https://exa.ai/)

**Yapay zeka** ile işlem yaparken bazen istatistiki bilgileri sallayabiliyor. Bu **agent LLM**’lerin bilgi boşluklarını kapatır, **AI** verilerini beslemek için web’de gerçek zamanlı arama yapar.  
**Başlık, URL** ve **özetli** içerik çıktılarıyla modelin canlı bilgi ile çalışması, yaptığınız işin kalitesini doğal olarak arttırır arkadaşlar 😏

#### Kullanım Örneği

```
// Claude Code veya Cursor içinde örnek kullanım:Komut: "Son 6 ayda iklim değişikliğiyle ilgili yayımlanmış araştırma makalalarını bul"MCP: Akademik arama çalışır, özet ve linklerle sonuç döner.Komut: "Türkiye'deki lider teknoloji şirketlerini ve rakiplerini listeleri"MCP: web_search_exa + company_research + competitor_finder araçları ile detaylı grafik döner.
```

**Detaylar İçin:** [https://github.com/exa-labs/exa-mcp-server](https://github.com/exa-labs/exa-mcp-server)  
**Smithery:** [https://smithery.ai/server/exa](https://smithery.ai/server/exa)

### [5-) Slack MCP: Yapay Zeka İletişim Elçisi](https://slack.com/)

Artık **Slack** kullanımınıda profesyonel olarak dil modellerimize yaptırabiliyoruz. **Zengin araç seti** ile kanaldan mesaja, kullanıcıdan reaksiyona kadar bütün **temel Slack işlemleri** destekleniyor, bir de **sessiz moda (stealth mode)** geçip bot izni istemeden çalışabilirsiniz.  
Bu sayede iş akışınızın verim ve kalitesini arttıracaksınız.

İşte size **iletişim dinamiklerinizi** tamamen değiştirecek bir agent 😅

#### Kullanım Örneği

```
// Claude, Cursor veya VS Code içindeki prompt’ta:Komut: "Slack’te #genel kanalındaki son 10 mesajı getir"MCP: Kanal geçmişini listeler — mesaj içerikleri, kullanıcı adları ve tarih bilgileri.Komut: "@ali’ye DM gönder: ‘Toplantı saatini 14:00 olarak ayarladım.’"MCP: DM gönderildi onay mesajıyla geri döner.Komut: "Mesaja 👍 reaksiyonu ekle"MCP: Reaksiyon eklendi onayı döner.
```

**Detaylar İçin:** [https://github.com/korotovsky/slack-mcp-server](https://github.com/korotovsky/slack-mcp-server)  
**Smithery:** [https://smithery.ai/server/@smithery-ai/slack](https://smithery.ai/server/@smithery-ai/slack)

### [6-) Docker MCP: Konteyner Kumandanı](https://www.docker.com/products/mcp-catalog-and-toolkit/)

**Docker** modern yazılım dağıtım stratejileri için bir temel taşıdır. **Docker MCP** ile **Konteyner oluşturma, compose stack dağıtımı, log takibi ve konteyner durum izleme** gibi işlemleri LLM sayesinde konuşma ile gerçekleştirerek geliştirme süreçlerine hız ve kontrol kazandırıyor.

#### Kullanım Örneği

```
// Claude Desktop veya Cursor içindeki prompt’ta:Komut: "nginx konteyneri oluşturup 9000 portuna yönlendir"MCP: plan hazırlar → çalıştırır → "nginx konteyneri başlatıldı, port 9000 dinleniyor" mesajı döner.Komut: "Tüm çalışan konteynerlerin loglarını yakala"MCP: docker ps komutu çalışır, ardından seçilen konteyner log’larını getirir.Komut: "wordpress ve mysql içeren bir stack deploy et"MCP: docker-compose dosyası oluşturur, stack’i ayağa kaldırır ve durum bilgisini döner.
```

**Detaylar İçin:** [https://github.com/docker/mcp-servers](https://github.com/docker/mcp-servers)  
**Smithery:** [https://smithery.ai/server/docker-mcp](https://smithery.ai/server/docker-mcp)

### [7-) Memory Tool MCP: Hatırlama Uzmanı](https://mem0.ai/)

Bu agent ile **LLM’lerin** kalıcı hafızaya erişmesini sağlayarak **geçmiş konuşmaları** ve **önemli bilgileri** güvenli biçimde saklayabiliyoruz. İstediğimiz zaman tekrar sorup erişebiliyoruz. Tam anlamıyla **hafıza sarayınız** oluyor. Böylece AI anlık değil geçmişide hatırlamış oluyor.

Giriş seviyesi için uygun olan bir **free-tier** mevcut fakat çok severseniz bence bir miktar ücret mukabilinde gayet iyi hizmet veriyor. Ayrıca **dashboard** olanağıda mevcut, **bilgilerinizi yönetebilirsiniz.** 🙌

#### Kullanım Örneği

```
// Cursor, Claude Desktop veya başka bir MCP istemcisinde:Komut: "Geçen hafta bana söylediğim fikirleri getir"MCP: `search_memory` çalışır → ilgili hafıza dönerKomut: "Ahmet ile proje toplantısı hakkında not ekle"MCP: `add_memories` çalışır → "Proje toplantısı: Ahmet ile konuşuldu" kaydedildi.Komut: "Tüm hafızaları listele"MCP: `list_memories` çalışır → hafıza başlıkları ve tarihler döner.
```

**Detaylar İçin:** [https://github.com/mem0ai/mem0-mcp](https://github.com/mem0ai/mem0-mcp)  
**Smithery:** [https://smithery.ai/server/docker-mcp](https://smithery.ai/server/@mem0ai/mem0-memory-mcp)

### [**8-) Supabase MCP: Veritabanı Asistanı**](https://supabase.com/)

Elle **SQL** yazmak artık vergi ödemek gibi hissettiriyor. S**upabase MCP**, IDE’nizi (Cursor’ı düşünün) **Supabase** veritabanınıza bağlayarak, sade Türkçe ile kontrol etmenizi sağlar. **Şemanızı çeker, değişiklikleri yapar** ve **her şeyi senkronize tutar.** Geliştirici deneyimini büyük ölçüde kolaylaştırır.

**Gece yarısı DB felaketleri yok artık. 🎃**

#### Kullanım Örneği

```
// Cursor veya Claude içinde Prompt:Komut: "users tablosundaki aktif kullanıcıları getir"MCP: read_records aracı çalışır → sonuçlar dönerKomut: "yeni bir kayıt ekle"MCP: create_records çalışır → "Kayıt başarıyla eklendi" mesajı dönerKomut: "storage bucket içindeki dosyaları listele"MCP: storage araçları devreye girer → liste döner-- Eski YöntemCREATE TABLE products (  id UUID PRIMARY KEY,  code TEXT NOT NULL,  name TEXT);-- Supabase MCPSay: "Kod ve isim kolonlu bir ürünler tablosu oluştur."Artık söylediğiniz kolonlar ile yeni bir ürün tablonuz var. ✅
```

**Detaylar İçin:** [https://github.com/supabase-community/supabase-mcp](https://github.com/supabase-community/supabase-mcp)  
**Smithery:** [https://smithery.ai/server/@supabase-community/supabase-mcp](https://smithery.ai/server/@supabase-community/supabase-mcp)

### [9-) Sequential Thinking MCP: Akıllı Düşünür](https://smithery.ai/server/@smithery-ai/server-sequential-thinking)

Bu **agent**, karmaşık problemleri **ardışık düşünce** adımlarına bölerek çözümlerin **sistematik** olarak ilerlemesini sağlar. **Düşünce takibi, gelişim, revizyon ve özetleme** gibi özellikler sayesinde **LLM’ler** mantıklı, derinlemesine ve yapılandırılmış biçimde çalışabilir.

**Sequential Thinking ile LLM, sorunu sadece çözmekle kalmıyor; nasıl çözdüğünü de anlıyor.**

#### Kullanım Örneği

```
// Claude Desktop, Cursor veya başka bir MCP istemcisinde:Komut: "Bir kahve demleme sürecini adım adım planla"MCP: 1️⃣ Problem tanımlandı ve adımlar belirlendi  2️⃣ Her adım için önerilen araçlar listelendi (ör. `research`, `summarize`)  3️⃣ Model alternatif yaklaşımlar sundu ve ilerledi  4️⃣ Süreç tamamlandığında özet oluşturuldu
```

**Detaylar İçin:** [https://github.com/arben-adm/mcp-sequential-thinking](https://github.com/arben-adm/mcp-sequential-thinking)  
**Smithery:** [https://smithery.ai/server/@smithery-ai/server-sequential-thinking](https://smithery.ai/server/@smithery-ai/server-sequential-thinking)

### [10-) n8n Workflow MCP: İş Geliştirme Uzmanı](https://n8n.io/)

**n8n** işimizi otomatikleştiren dünyaca ünlü bir **iş akışı otomasyonudur.** Düşünün bu agent doğal Türkçe ile **n8n** iş akışlarınızı **listeleyip, oluşturmaya, düzenlemeye ve çalıştırmaya** kadar olanak tanıyor. Workflowlarınızda tekrar eden görevler **otomatikleşir** ve **iş verimliğimiz** bu agent ile katlanarak artıyor.

#### Kullanım Örneği

```
// Claude, Cursor veya VS Code içindeki prompt’ta:Komut: "n8n’de mevcut tüm iş akışlarını listele"MCP: `list workflows` aracı çalıştırılır → tüm workflow isimleri döner.Komut: "Yeni ‘e-ticaret sipariş’ iş akışı oluştur"MCP: workflow oluşturuyor → "‘e‑ticaret sipariş’ iş akışı başarıyla oluşturuldu" mesajı verilir.Komut: "Belirli iş akışı için şu anda yürütülen işlemleri göster"MCP: `list executions` aracı çalıştırılır → çalışmakta olan veya tamamlanan çalıştırmalar listelenir.
```

**Detaylar İçin:** [https://github.com/fellipesaraiva88/n8n-mcp-server](https://github.com/fellipesaraiva88/n8n-mcp-server)  
**Smithery:** [https://smithery.ai/server/@tecnologiacomigo/n8n-mcp-server](https://smithery.ai/server/@tecnologiacomigo/n8n-mcp-server)

> Evet yazının sonuna geldik. Artık bilgilerin kolayca bulunabildiği yapay zeka’nın mertliği bozduğu bir dönemdeyiz. **Sizler için uğraşıp sevdiğim ve kullandığım araçları boş zamanlarımda derledim ve sundum.** Geri bildirimlerinizi eksik etmeyiniz. 🙏

#### Son Söz

Burada yazdığım agentlardan en az bir veya ikisini seçin, iş yaparken sanki bir kodlama yardımcısı işe almışsınız gibi hissettirecek. Son Olarak;  
**MCP sunucularının gücünü kucaklayın ve yapay zekanızın hayal gücünün sınırlarının ötesinde yenilikler yapmasını izleyin.**

> Okuduğunuz için Minnettarım.

> Sağlıcakla kalın Dostlarım..
