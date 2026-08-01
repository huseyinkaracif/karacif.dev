---
title: "Entegrasyonun Vazgeçilmezi Webhook Nedir?"
slug: "webhook-nedir"
lang: "tr"
date: "2025-01-17"
category: "Mühendislik"
excerpt: "İki sistem arasında gerçek zamanlı iletişimi sağlayan sessiz kahraman: Webhook'un çalışma mantığı, kullanım alanları ve API'lerden farkı."
readTime: "3"
coverImage: "/images/blog/webhook-nedir/img-01.png"
mediumUrl: "https://medium.com/@hsynkrcf/entegrasyonun-vazge%C3%A7ilmezi-webhook-nedir-1eaacad9aa0d"
tags: ["javascript", "development", "software-development", "webhooks"]
---
**Teknoloji dünyasında** birçok terimle karşılaşıyoruz, fakat bazıları var ki adeta **sessiz kahramanlar** gibi. İşte **Webhook**’lar da tam olarak böyle bir kavram. Peki, **Webhook** nedir ve neden bu kadar önemli?

![](/images/blog/webhook-nedir/img-01.png)

**Webhook**’lar, iki sistem arasında gerçek zamanlı iletişimi sağlayan otomatik bildirim mekanizmalarıdır. Basitçe açıklamam gerekirse, bir uygulamanın diğerine **“Hey, burada bir şeyler oldu, haberdar olmalısın!”** demesinin modern yoludur.

#### WebHook Nasıl Çalışır ?

Günlük hayattan bir örnekle açıklayalım: Bir kargo firmasının SMS bildirimi sistemini düşünün. Paketiniz teslim edildiğinde otomatik olarak bir mesaj alırsınız. İşte **webhook**’lar da aynen böyle çalışır — **bir olay gerçekleştiğinde, önceden belirlenmiş bir adrese otomatik olarak bilgi gönderir.**

Teknik açıdan örnek vermek gerekirse:

```
{    "event_type": "kargo_teslim",    "order_id": "12345",    "timestamp": "2024-03-21T10:30:00Z",    "details": {        "customer_name": "Hüseyin Karacif",        "total_amount": 150.00,        "status": "onaylandi"    }}
```

#### Günlük Hayatımızdaki Webhook’lar

Büyük şirketlerden örnek uygulamaları aşağıda görebilirsiniz. Webhook’lar her yerde. Orada bir köy var uzakta, bilmesekte, görmesekte 😄

[**Github Events**](https://docs.github.com/en/webhooks/webhook-events-and-payloads)

-   **PR** açıldığında ekibin **Slack** kanalına otomatik bildirim gönderme
-   **Jenkins**’te otomatik build tetikleme, CI/CD için.
-   Proje yönetiminde kolaylıklar **Jira**’da oto task güncelleme

![Github WebHook Events](/images/blog/webhook-nedir/img-02.png)
*Github WebHook Events*

[**Stripe**](https://docs.stripe.com/api/webhook_endpoints)**,** [**Paypal**](https://developer.paypal.com/api/rest/webhooks/)**,** [**Shopify**](https://shopify.dev/docs/api/webhooks?reference=toml)

-   **Stripe** — Başarılı ödemeler sonrası sipariş sisteminin otomatik güncellenmesi
-   **Stripe** — Ödeme durumlarının satıcı sistemlerine anlık bildirimi
-   **Paypal** — Başarısız ödemelerde müşteri hizmetlerine otomatik bildirim
-   **Paypal** — Şüpheli işlem tespitinde güvenlik ekiplerine otomatik uyarı
-   **Shopify** — Stok güncellemelerinin tedarikçilere anlık iletimi
-   **Shopify** — Yeni sipariş oluştuğunda kargo firmasına otomatik bildirim

![Stripe, Paypal, Shopify Webhook Events](/images/blog/webhook-nedir/img-03.png)
*Stripe, Paypal, Shopify Webhook Events*

[**Instagram**](https://developers.facebook.com/docs/messenger-platform/instagram/features/webhook/)

-   Yeni bir fotoğraf paylaşıldığında **Facebook’ta** otomatik paylaşım
-   İşletme hesaplarında etkileşim analizlerinin **CRM** sistemlerine aktarımı

![Instagram Webhook Events](/images/blog/webhook-nedir/img-04.png)
*Instagram Webhook Events*

[**Slack Webhook Events**](https://api.slack.com/automation/triggers/webhook)

**Webhooks** denilince akla ilk gelen büyük firmalardan biriside nitekim Slack olmalı. Bu konuda ekipler gayet güzel bir ekosistem kurmuşlar. 👏

-   Takım içi iletişimde diğer uygulamalardan gelen bildirimlerin entegrasyonu
-   Trello, Jira gibi proje yönetim araçlarıyla anlık senkronizasyon

![Slack Webhook Events](/images/blog/webhook-nedir/img-05.png)
*Slack Webhook Events*

[**Incoming:**](https://slack.com/marketplace/A0F7XDUAZ-incoming-webhooks) Dış sistemlerden bildirim göndermek için

[**Outgoing:**](https://slack.com/marketplace/A0F7VRG6Q-outgoing-webhooks) Basit chatbot/otomatik yanıtlar için

[**Slash Commands:**](https://api.slack.com/interactivity/slash-commands) Kullanıcı komutları ve interaktif işlemler için

[**Events:**](https://slack.com/events) Karmaşık olay yakalama ve işleme için

### Express ve Axios Kullanarak Ufak Bir Örnek

Javascript kullanarak ufak bir webhook örneği ile öğrendiklerimiz veya hatırladığımız bilgilerimizin pekişmesi için;

<a href="https://medium.com/media/15dd0d06cc900abc1048749df96abb48/href">https://medium.com/media/15dd0d06cc900abc1048749df96abb48/href</a>

Bir **server** oluşturduk, **webhook** endpointini dinleyecek gelen **post** isteklerini işleyip **json** bir mesaj dönecek şekilde yazdık.

<a href="https://medium.com/media/305ea728f69f8b955b98899dda054c37/href">https://medium.com/media/305ea728f69f8b955b98899dda054c37/href</a>

Burada **axios** yeni siparişimizi **http isteği** ile **webhook’a** iletir. Sunucudan gelen yanıtı konsola yazdırıyoruz. Burada gelen siparişi anlık bildirim ile sunucuya göndermeyi test ettik.

> Kısaca nasıl kullanılır değil, neden kullanıldığını ve nasıl bir mantığa sahip olduğunu öğrenmemiz yeterli.

### Webhook vs. WebSocket vs. API: Temel Farklar

Son olarak **Webhook**’lar ile yeni tanışanlar sıklıkla **WebSocket** ve **API**’lerle karıştırabilir. Aralarındaki temel farkları bilmek gerekiyor.

#### Webhook (HTTP Push)

-   Tek yönlü iletişim
-   Olay tabanlı çalışır
-   “Push” prensibi: Veri hazır olduğunda otomatik gönderilir
-   Örnek: Ödeme bildirimleri, form gönderimleri

#### WebSocket

-   Çift yönlü, gerçek zamanlı iletişim
-   Sürekli açık bağlantı
-   Canlı veri akışı gerektiğinde kullanılır
-   Örnek: Canlı sohbet uygulamaları, online oyunlar, borsa verileri

#### API (REST/HTTP)

-   İstemci tarafından tetiklenir (Pull)
-   Düzenli aralıklarla sorgulama gerektirir
-   Anlık bildirim özelliği yoktur
-   Örnek: Hava durumu verilerini çekmek için yapılan periyodik sorgulamalar, ürün listesi alma, CRUD

### Ne Zaman Hangisi Kullanılmalı?

-   Webhook: Belirli olaylar gerçekleştiğinde anlık bildirim gerekiyorsa
-   WebSocket: Gerçek zamanlı, çift yönlü iletişim gerekiyorsa
-   API: Talep üzerine veri alışverişi yeterliyse

Bu konuda güzel bir kaynak bırakıyorum, **her teknolojinin ihtiyaca ve duruma bağlı olarak kullanılacağını bilerek hareket etmemiz daha doğrudur.**

[Understanding API, Webhook, and WebSocket: When to Use Each](https://medium.com/@neeraztiwari/understanding-api-webhook-and-websocket-when-to-use-each-b112582717c8)

> Okuduğunuz için Minnettarım. Sağlıcakla Kalın Dostlarım..
