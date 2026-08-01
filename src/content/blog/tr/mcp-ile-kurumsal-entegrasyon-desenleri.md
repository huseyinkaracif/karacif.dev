---
title: "MCP ile Kurumsal Entegrasyon Desenleri"
slug: "mcp-ile-kurumsal-entegrasyon-desenleri"
lang: "tr"
date: "2026-06-16"
category: "Yapay Zeka"
excerpt: "MCP'yi hafta sonu demosundan çıkarıp gerçek müşteri verisine dokunan bir üretim sistemine dönüştürmek, izinleri, denetim kayıtlarını ve modelin ne yapmaya yetkili olduğunu yeniden düşünmek demek."
readTime: "7"
coverImage: "/images/blog/mcp-ile-kurumsal-entegrasyon-desenleri/cover.svg"
tags: ["mcp", "ai", "enterprise-architecture", "api-design", "security"]
---
Geçtiğimiz yıl MCP hakkında yazdığımda [(MCP ve AI: Akıllı Sistemlerin Yeni İletişim Dili)](/yazilar/mcp-ve-ai-yeni-iletisim-dili/), örneklerim hep şirin şeylerdi: akıllı lamba, hava durumu, Spotify çalma listesi. O yazıyı okuyanlardan aldığım en sık soru şuydu: **“Peki bunu gerçek bir şirket sisteminde, gerçek müşteri verisiyle nasıl kurarım?”** İşte bu yazı, tam olarak o sorunun cevabı.

Çünkü **“Merhaba dünya” seviyesinde bir MCP sunucusu yazmak** ile **üretim ortamında, CRM'inize, faturalama sisteminize ya da müşteri veritabanınıza bağlanan bir MCP sunucusu tasarlamak** arasında kocaman bir uçurum var. Biri hafta sonu projesi, diğeri güvenlik ekibinizin sizi masaya çağırdığı bir konu 😅

#### Hobi Projesinden Kurumsal Sisteme: Neler Değişiyor?

Bir demo MCP sunucusunda genelde şunlar olur: tek bir API'ye bağlanan birkaç fonksiyon, kimlik doğrulama olarak tek bir API anahtarı, hata olursa konsola yazdırıp geçme. Bu, öğrenmek için harika. Ama üretimde bu yaklaşım üç şeyi görmezden gelir: **kim bu isteği yapıyor, ne yapmaya yetkisi var, ve bunu neden yaptığını kim, ne zaman sorgulayacak.**

Kurumsal bir ortamda MCP sunucusu artık sadece bir “araç kutusu” değil, bir **yetki sınırı**dır. Yanlış tasarlarsanız, elinizde modelin — ya da modeli kötüye kullanan birinin — üretim veritabanınıza doğrudan erişebildiği bir kapı kalır. Bunu asla istemezsiniz.

#### Desen 1: Gateway MCP Sunucusu

En sağlıklı yaklaşım, her iç servise ayrı ayrı MCP sunucusu yazmak değil, **tek bir gateway MCP sunucusu** kurup, o sunucunun arkasında iç API'lerinize bağlanmasıdır. Tıpkı bir şirketin resepsiyonu gibi düşünün: Dışarıdan gelen kimse doğrudan muhasebeye, İK'ya ya da sunucu odasına dalamaz. Önce resepsiyona uğrar, kimliğini gösterir, kiminle görüşeceğini söyler.

Gateway MCP sunucusu tam olarak bu resepsiyon rolünü oynar:

-   Tüm araç (tool) tanımları tek bir yerde yaşar, dağınık değildir.
-   Kimlik doğrulama ve yetkilendirme merkezi bir noktadan geçer.
-   Loglama, hız sınırlama (rate limiting) ve izleme tek katmanda uygulanır.
-   İç sistemleriniz değiştiğinde (yeni bir CRM'e geçmek gibi), sadece gateway'i güncellersiniz; dışarıya açık arayüz aynı kalır.

![Gateway MCP sunucusu: AI ajanı, tek bir yetkilendirme katmanından geçerek iç sistemlere erişir](/images/blog/mcp-ile-kurumsal-entegrasyon-desenleri/diagram-1.svg)
*Gateway MCP sunucusu: AI ajanı, tek bir yetkilendirme katmanından geçerek iç sistemlere erişir*

#### Desen 2: İzinler ve Kapsam (Scoping)

Bir modelin “her şeyi yapabilme” yetkisine sahip olması, bir stajyere şirketin tüm sistemlerinin root şifresini vermek gibidir. Niyeti iyi olsa bile, bir gün yanlışlıkla `DROP TABLE customers` çalıştırabilir — farkı şu ki, bu stajyer bazen saniyede bin istek atabiliyor.

Kurumsal MCP tasarımında her araç, **kim tarafından, hangi kapsamda çağrılabileceği** net olarak tanımlanmalı:

-   Kullanıcı bazlı roller: Satış temsilcisi sadece kendi bölgesindeki müşterileri görebilir, finans ekibi faturalama araçlarına erişebilir.
-   OAuth kapsamları (scopes): Her araç, hangi kapsamın gerekli olduğunu açıkça bildirir — `crm:read`, `crm:write`, `billing:refund` gibi.
-   Zaman sınırlı erişim (short-lived tokens): Sürekli geçerli bir anahtar yerine, oturum bazlı, kısa ömürlü kimlik bilgileri.

#### Desen 3: Salt Okunur ve Eylem Araçlarını Ayırın

Bence bu, en çok göz ardı edilen desen. Bir MCP sunucusunda **“müşteri bilgisi getir”** ile **“müşteriyi sil”** aynı güven seviyesinde olmamalı. Ben bu ikisini iki farklı kategoriye ayırıyorum:

-   **Salt okunur araçlar (read-only):** `get_customer`, `list_invoices`, `search_orders`. Bunlar veri döndürür, hiçbir şeyi değiştirmez. Model bunları nispeten serbestçe çağırabilir.
-   **Eylem araçları (action tools):** `send_invoice`, `refund_payment`, `delete_customer`. Bunlar geri dönüşü zor ya da imkânsız sonuçlar doğurur. Bu araçlar için **insan onayı (human-in-the-loop)** zorunlu olmalı — model bir eylemi “önerir”, gerçek bir kullanıcı onaylar, ancak o zaman çalışır.

Bu ayrımı yapmadığınızda olabilecek en kötü senaryo şu: bir kullanıcı asistana **“şu üç aydır sipariş vermeyen müşterileri temizle”** der, model bunu **“sil”** olarak yorumlar, ve siz elinizde CRM'i boşalmış olarak bulursunuz. Gülünç gibi geliyor ama inanın, bu tarz hikâyeleri son bir yılda birden fazla kez duydum.

#### Desen 4: Audit Logging — Her Şey Kayıt Altında

Bir eylem aracı çağrıldığında şu sorulara her zaman cevap verebilmelisiniz: **Kim istedi? Hangi ajan/oturum üzerinden? Ne zaman? Hangi parametrelerle? Sonuç neydi?**

Bu, sadece güvenlik ekibini mutlu etmek için değil — bir gün bir müşteri **“faturamı neden iptal ettiniz?”** diye sorduğunda, elinizde net bir cevap olması için. MCP sunucunuzun her tool çağrısını, girdi/çıktısıyla birlikte, değiştirilemez bir log'a yazmasını sağlayın. Bunu sonradan eklemek, baştan tasarlamaktan çok daha zor — deneyimle söylüyorum.

#### Desen 5: Sırların (Secrets) Yönetimi

Modelin, ham API anahtarlarını ya da veritabanı şifrelerini **hiçbir zaman** görmemesi gerekiyor. Sırlar MCP sunucusunda kalmalı, model sadece sonucu görmeli. Pratikte bu şu anlama gelir:

-   Kimlik bilgileri ortam değişkenlerinde ya da bir secrets manager'da tutulur, tool tanımlarının içine ya da prompt'a asla gömülmez.
-   Model çıktısında yanlışlıkla sızabilecek hassas alanlar (API anahtarı, iç IP adresi, dahili hata mesajı) tool sonucundan filtrelenir.
-   Her entegrasyon için ayrı, dar kapsamlı kimlik bilgisi kullanılır — tek bir “her şeyi yapabilen” servis hesabı değil.

#### Kaçınılması Gereken Anti-Desenler

-   **Dev Her Şeyi Yapan Sunucu:** Tek bir MCP sunucusunun içine CRM, muhasebe, İK, DevOps araçlarının hepsini tıkıştırmak. Bu, mikroservis dünyasındaki “God object” hatasının MCP versiyonu. Bakımı kabusa döner, yetkilendirmesi imkânsızlaşır.
-   **Kapsamsız veritabanı erişimi:** Modele doğrudan **“SQL çalıştır”** aracı vermek. Kulağa esnek geliyor ama pratikte bir felaket senaryosudur. Model iyi niyetli olsa bile, belirsiz bir talimat karşısında yanlış tabloyu güncelleyebilir.
-   **Hız sınırlaması olmayan araçlar:** Bir ajan döngüye girip aynı aracı saniyede yüzlerce kez çağırabilir. Rate limiting olmadan bu, hem maliyet hem stabilite sorunu yaratır.
-   **Sessiz sürüm değişiklikleri:** Bir aracın davranışını, parametrelerini ya da dönüş formatını habersizce değiştirmek. Buna birazdan geleceğim.

#### Somut Bir Örnek: CRM için MCP Sunucusu Tasarlamak

Diyelim ki şirketinizin CRM'i için bir MCP sunucusu tasarlıyorsunuz. Araç listesi kabaca şöyle görünebilir:

```typescript
const tools = [
  {
    name: "search_customers",
    kind: "read",
    scope: "crm:read",
    description: "İsim, e-posta veya şirket adına göre müşteri arar.",
    inputSchema: { query: "string", limit: "number" },
  },
  {
    name: "get_customer_details",
    kind: "read",
    scope: "crm:read",
    description: "Tek bir müşterinin tüm detaylarını getirir.",
    inputSchema: { customerId: "string" },
  },
  {
    name: "list_open_invoices",
    kind: "read",
    scope: "billing:read",
    description: "Belirli bir müşterinin ödenmemiş faturalarını listeler.",
    inputSchema: { customerId: "string" },
  },
  {
    name: "update_customer_notes",
    kind: "action",
    scope: "crm:write",
    requiresApproval: false,
    description: "Müşteri kaydına bir not ekler. Geri alınabilir, düşük risk.",
    inputSchema: { customerId: "string", note: "string" },
  },
  {
    name: "issue_refund",
    kind: "action",
    scope: "billing:refund",
    requiresApproval: true,
    description: "Bir ödemeyi iade eder. Geri dönüşü zor, insan onayı zorunlu.",
    inputSchema: { invoiceId: "string", amount: "number", reason: "string" },
  },
  {
    name: "delete_customer",
    kind: "action",
    scope: "crm:admin",
    requiresApproval: true,
    description: "Müşteri kaydını siler. Geri alınamaz, yalnızca admin kapsamı.",
    inputSchema: { customerId: "string", confirmationCode: "string" },
  },
];
```

Dikkat ederseniz her araçta üç şey var: **`kind`** (okuma mı, eylem mi), **`scope`** (kim çağırabilir) ve gerektiğinde **`requiresApproval`** (insan onayı şart mı). Bu üç alan, yukarıda anlattığım desenlerin neredeyse tamamını tek bir şemada somutlaştırıyor.

![Salt okunur ve eylem araçlarının ayrımı: eylem araçları insan onayından geçer, denetim kaydına yazılır](/images/blog/mcp-ile-kurumsal-entegrasyon-desenleri/diagram-2.svg)
*Salt okunur ve eylem araçlarının ayrımı: eylem araçları insan onayından geçer, denetim kaydına yazılır*

#### Test Etme ve Sürümleme

Bir MCP sunucusu, aslında bir **API sözleşmesidir** — sadece tüketicisi bir insan değil, bir dil modeli. Bu yüzden aynı disiplinle davranmak gerekir:

-   **Tool şemalarını test edin.** Girdi/çıktı formatlarının beklenen şekilde kaldığını doğrulayan otomatik testler yazın. Bir aracın açıklamasını ya da parametre isimlerini değiştirmek, onu çağıran ajanların davranışını sessizce bozabilir.
-   **Semantik sürümleme kullanın.** Bir aracın davranışını değiştiriyorsanız, bunu yeni bir sürüm (`refund_payment_v2` gibi) olarak sunun, eskisini bir süre daha yaşatın.
-   **Sahada test edin, sadece birim testle yetinmeyin.** Gerçek bir ajanla, gerçek senaryolarla (“bu müşteriye iade yap ama önce faturasını kontrol et” gibi çok adımlı görevler) sunucunuzu deneyin. Modelin aracı yanlış yorumlaması, kodun kendisi kadar sık karşılaşılan bir hata kaynağı.

#### Bu İş Nereye Gidiyor?

Bana sorarsanız, önümüzdeki birkaç yıl içinde şirketler eskiden **API gateway** kurdukları gibi, şimdi **“MCP gateway”** kuracaklar — kurumsal mimarinin standart bir parçası olarak. Şu an her ekip kendi MCP sunucusunu kendi başına icat ediyor; bu, 2010'ların ortasında herkesin kendi REST API standardını yazdığı döneme çok benziyor. Zamanla bir konsolidasyon göreceğiz: ortak kimlik doğrulama katmanları, ortak audit araçları, belki de bir “MCP sunucusu için OWASP Top 10” listesi bile çıkar.

Şu an için tavsiyem basit: **MCP'yi bir oyuncak gibi değil, bir üretim sistemi gibi tasarlayın** — çünkü kullanıcılarınız onu tam olarak öyle kullanmaya başlayacak.

MCP'nin temellerini merak ediyorsanız, [ilk yazıma](/yazilar/mcp-ve-ai-yeni-iletisim-dili/) göz atabilirsiniz. Siz şirketinizde MCP denediniz mi? Hangi deseni, hangi anti-deseni yaşadınız — yorumlarda ya da bana yazarak paylaşırsanız çok sevinirim.

> Okuduğunuz için Minnettarım.

> Sağlıcakla kalın Dostlarım..
