---
title: "Clean Code Prensipleri"
slug: "clean-code-prensipleri"
lang: "tr"
date: "2024-01-05"
category: "Mühendislik"
excerpt: "Kod yazmak kolay, okunabilir kod yazmak zor. Bir 'geçici çözüm'ün nasıl altı ayda kabusa dönüştüğünü ve bunu önlemenin somut yollarını anlatıyorum."
readTime: "9"
coverImage: "/images/blog/clean-code-prensipleri/cover.webp"
tags: ["clean-code", "refactoring", "code-quality", "craftsmanship"]
---

Bir gün bana **"acil"** bir iş devredildi. Ekipteki arkadaşım izne çıkmıştı, ben de onun sahip olduğu "sipariş modülü"nü devralmam gerekiyordu. Dosyayı açtığımda karşımda tek bir metot vardı, **800 satır.** İçinde `x`, `temp`, `flag1`, `flag2` gibi değişkenler, üç seviye iç içe geçmiş `if-else` blokları ve satır aralarına serpiştirilmiş, artık hiçbir anlam ifade etmeyen yorumlar. **"//burayı sonra düzelt"** yazan bir satır vardı, git blame'e baktım: iki yıl önce yazılmış. 😅

O gün anladım ki mesele **yetenek değil disiplin.** O kodu yazan arkadaş kötü bir mühendis değildi, sadece "şimdilik çalışsın" diyerek biriktirdiği küçük tavizler, zamanla kimsenin dokunmaya cesaret edemediği bir canavara dönüşmüştü. **Bugün o yazıyı yazıyorum, çünkü hâlâ her hafta benzer bir dosyayla karşılaşıyorum.**

### Neden Önemli? Kod, Yazmaktan Çok Okunur

Robert C. Martin'in **"Clean Code"** kitabında sık geçen bir oran var: bir satır kod yazmak için harcadığımız zamanın **kabaca on katını**, o kodu okumaya harcıyoruz. Siz altı ay sonra kendi kodunuza bakarken, ekip arkadaşınız bug ararken, code review yapan biri satır satır okurken — kod, **yazıldığı andan çok daha uzun bir süre boyunca okunuyor.**

Bunu bir de şöyle düşünün: **dağınık bir kod tabanı, faizi işleyen bir kredi kartı borcu gibidir.** İlk ay fark etmezsiniz, hatta hızlı bile gidersiniz. Ama üç ay sonra her yeni özellik, önce "bu kısmı anlamaya" çalışmakla geçiyor. Altı ay sonra kimse o dosyaya dokunmak istemiyor, "orada ejderha var" esprisi ekip içi bir klasiğe dönüşüyor. **Hız kazanmak için aldığınız her kısayol, gelecekte faiziyle geri ödeniyor.**

![Temiz bir kod tabanının teslimat hızı zamanla artarken, dağınık bir kod tabanının hızı hızla düşüyor](/images/blog/clean-code-prensipleri/diagram-1.svg)
*Dağınıklığın maliyeti zamanla katlanarak büyür*

### Anlamlı İsimler: Kodun İlk İzlenimi

Bir değişkenin veya fonksiyonun adı, kodu okuyan kişiye **niyeti** anlatmalı. İsim iyi seçilmişse, yorum yazmanıza bile gerek kalmaz. Kötü seçilmişse, en iyi yorum bile onu kurtaramaz.

```javascript
// Kötü
let d;
function getInfo(u) { ... }
if (flag1 && !flag2) { ... }

// İyi
let elapsedTimeInDays;
function getAccountInfo(user) { ... }
if (isPremiumUser && !hasActiveSubscription) { ... }
```

Küçük bir kural koydum kendime: **bir değişken veya fonksiyon adını okuduğumda, ne işe yaradığını anlamak için başka bir yere bakmam gerekiyorsa, isim yanlıştır.** `data`, `temp`, `obj`, `handleStuff()` gibi isimler gördüğümde artık refleks olarak duruyorum. Bunlar aslında birer **"burada bir isim bulamadım"** itirafı. İsim koymak zor geliyorsa, genelde sorun isim değil, o fonksiyonun **birden fazla iş yapıyor olmasıdır** — ki zaten sıradaki başlık tam da bu.

### Küçük Fonksiyonlar ve Tek Sorumluluk: Bir Refactor Hikayesi

Şimdi gelelim işin **et ve kemik** kısmına. Aşağıda, bir sipariş işleme fonksiyonunun — üzerinde biraz oynasam da — gerçek hayatta gördüğüm halinden pek de uzak olmayan bir örneğini görüyorsunuz:

```csharp
public decimal ProcessOrder(Order order)
{
    decimal total = 0;
    foreach (var item in order.Items)
    {
        total += item.Price * item.Quantity;
    }

    if (order.Customer.IsPremium)
    {
        total = total - (total * 0.1m);
    }

    if (total > 1000)
    {
        total = total - (total * 0.05m);
    }

    decimal tax = total * 0.18m;
    total = total + tax;

    if (order.Customer.Country == "TR")
    {
        Console.WriteLine("Fatura Türkiye için kesiliyor.");
    }
    else
    {
        Console.WriteLine("Fatura yurt dışı için kesiliyor.");
    }

    db.SaveOrder(order, total);
    emailService.Send(order.Customer.Email, "Siparişiniz alındı, tutar: " + total);

    return total;
}
```

Görünüşte çalışıyor, hatta test de edilebilir gibi duruyor. Ama şu soruyu sormanızı istiyorum: **bu fonksiyon kaç sebepten değişir?** Vergi oranı değişirse, indirim kuralı değişirse, fatura formatı değişirse, e-posta metni değişirse, veritabanı şeması değişirse — hepsinde bu tek fonksiyona dokunacaksınız. **İşte tam da bu, Single Responsibility Principle'ın ihlal edildiği an.** Bir fonksiyonun "tek bir şey yapması" demek, satır sayısının az olması değil, **değişmek için tek bir sebebi olması** demektir.

Aynı fonksiyonu küçük, isimli parçalara böldüğümde şuna benziyor:

```csharp
public decimal ProcessOrder(Order order)
{
    var subtotal = CalculateSubtotal(order.Items);
    var discounted = ApplyDiscounts(subtotal, order.Customer);
    var total = ApplyTax(discounted);

    IssueInvoice(order.Customer);
    SaveOrder(order, total);
    NotifyCustomer(order.Customer, total);

    return total;
}

private decimal CalculateSubtotal(IEnumerable<OrderItem> items) =>
    items.Sum(item => item.Price * item.Quantity);

private decimal ApplyDiscounts(decimal amount, Customer customer)
{
    if (customer.IsPremium)
        amount -= amount * PremiumDiscountRate;

    if (amount > BulkOrderThreshold)
        amount -= amount * BulkOrderDiscountRate;

    return amount;
}

private decimal ApplyTax(decimal amount) =>
    amount + (amount * TaxRate);

private void IssueInvoice(Customer customer)
{
    var market = customer.Country == "TR" ? "Türkiye" : "yurt dışı";
    logger.Info($"Fatura {market} için kesiliyor.");
}

private void NotifyCustomer(Customer customer, decimal total) =>
    emailService.Send(customer.Email, $"Siparişiniz alındı, tutar: {total}");
```

Fark ettiniz mi, `ProcessOrder` artık **ne yaptığını değil, hangi adımların sırayla olduğunu** anlatıyor. Kodu okuyan biri, `ApplyDiscounts` ile ilgilenmiyorsa o satırı atlayıp geçebiliyor — tıpkı bir kitabın içindekiler sayfasına bakar gibi. Test yazarken de artık "indirim mantığı doğru mu" diye sormak için 800 satırlık fonksiyonu tetiklemek yerine, doğrudan `ApplyDiscounts`'u çağırabiliyorsunuz. **Küçük fonksiyonlar, aslında küçük hikayelerdir — her biri tek bir şey anlatır, ve iyi anlatır.**

![Tek bir fonksiyonda birbirine dolanmış beş sorumluluk, refactor sonrası beş küçük ve isimli fonksiyona ayrılıyor](/images/blog/clean-code-prensipleri/diagram-2.svg)
*Bir dev canavarın beş küçük, sorumluluğu net fonksiyona ayrılması*

### Yorumlar mı, Kendini Açıklayan Kod mu?

Uzun süre **"iyi kod yorum gerektirmez"** cümlesini biraz fazla katı yorumladım itiraf edeyim. Sonra fark ettim ki mesele yorum yazmamak değil, **yanlış yorumu yazmamak.** `// kullanıcıyı kaydet` yorumunu `SaveUser()` fonksiyonunun üstüne yazmanın hiçbir değeri yok — kod zaten bunu söylüyor. Bu tarz yorumlar sadece bakım yükü: kod değişir, yorum unutulur, birkaç ay sonra **yalan söyleyen bir yorum** elinizde kalır.

Ama şu satırın üstündeki yorumu asla silmem:

```javascript
// Bankanın API'si UTC+3 yerine UTC gönderiyor, bu yüzden burada +3 saat ekliyoruz.
// Bu satırı silerseniz mutabakat raporları yanlış çıkar. (bkz. INC-4521)
const adjustedTime = addHours(transaction.timestamp, 3);
```

Bu yorum **"ne yapıldığını"** değil, **"neden bu tuhaf görünen şeyin yapıldığını"** anlatıyor. Kod bana `+3` eklendiğini söyleyebilir ama **neden** eklendiğini, hangi olayın bunu tetiklediğini asla söyleyemez. İşte iyi yorum tam olarak burada devreye giriyor: kodun **anlatamadığı bağlamı** taşıdığında değerlidir. Bir kural koydum kendime: yorum yazmadan önce **"bunu kodu yeniden adlandırarak anlatabilir miyim?"** diye soruyorum. Cevap evetse yorum yazmam, fonksiyonu yeniden adlandırırım.

### DRY ve Sınırları: Bazen Tekrar, Yanlış Soyutlamadan Daha İyidir

**DRY (Don't Repeat Yourself)** prensibini öğrendiğimiz ilk günden itibaren bir çeşit dini kural gibi benimseriz. Aynı kodu iki yerde görünce elimiz hemen ortak bir fonksiyona gidiyor. Ama şunu yıllar içinde acı bir şekilde öğrendim: **iki farklı şeyin tesadüfen aynı görünmesi, onların aynı şey olduğu anlamına gelmez.**

Bir örnek vereyim: `ValidateUserEmail` ile `ValidateSupplierEmail` fonksiyonları başta birebir aynı görünüyordu, ben de tek bir `ValidateEmail` fonksiyonuna birleştirdim. Üç ay sonra, tedarikçi tarafında farklı bir kural gelmesi gerekti (kurumsal domain zorunluluğu gibi). O tek fonksiyonun içi `if (type == "supplier")` gibi dallanmalarla dolmaya başladı. Sonunda elimde, ne kullanıcıya ne tedarikçiye tam oturan, **herkesi az biraz mutsuz eden bir "god fonksiyon"** vardı. Geri alıp ikisini tekrar ayırdığımda rahatladım.

Bu deneyimden sonra **AHA prensibini (Avoid Hasty Abstractions — Aceleci Soyutlamalardan Kaçının)** çok daha ciddiye almaya başladım. Mantığı basit: **soyutlamayı, tekrarın acısını gerçekten hissettiğinizde yapın — üçüncü tekrarda değil, ilkinde değil.** İki kod parçası bugün benzer görünüyor diye hemen birleştirmeyin; onların **aynı sebepten mi değiştiğini** gözlemleyin. Aynı sebepten değişiyorlarsa, gerçekten aynı kavramdır, soyutlayın. Farklı sebeplerden değişiyorlarsa, tesadüfi bir benzerlikle karşı karşıyasınızdır ve onları birleştirmek, **gelecekte onları ayırmaktan çok daha pahalıya patlar.**

### Temiz Hata Yönetimi

Hata yönetimi genelde en çok ihmal edilen kısım, çünkü **"mutlu senaryo"** yazmak daha keyifli. Ama gerçek dünyada kod, hata durumlarıyla çevrilidir: ağ zaman aşımına uğrar, kullanıcı beklenmedik veri gönderir, üçüncü parti servis çöker.

Sık gördüğüm bir anti-pattern, hata kodlarını iş mantığıyla karıştırmak:

```javascript
// Kötü
function getUser(id) {
  const user = db.find(id);
  if (!user) return -1; // -1 mi hata, yoksa geçerli bir kullanıcı ID'si mi?
  return user;
}

// İyi
function getUser(id) {
  const user = db.find(id);
  if (!user) throw new UserNotFoundError(id);
  return user;
}
```

Sihirli sayılar (`-1`, `null`, `undefined`) döndürmek yerine **anlamlı, isimli exception'lar** fırlatmak, çağıran kodun ne olup bittiğini anlamasını çok kolaylaştırıyor. Bir diğer önemli nokta: **try-catch bloklarını, hatanın gerçek anlamını gizleyecek kadar geniş tutmayın.** Tüm fonksiyonu tek bir `catch (Exception e) { log(e); }` ile sarmak, aslında hangi satırın patladığını, neden patladığını gizlemekten başka bir şey yapmıyor. Hatayı, **anlamlı olduğu en dar kapsamda** yakalayın ve mümkünse context ekleyerek yeniden fırlatın.

### Testability: Tasarımın Aynadaki Yansıması

Bana göre bir kodun temiz olup olmadığını anlamanın en pratik yolu şu: **onu test etmeye çalışın.** Eğer bir fonksiyonu test etmek için beş farklı bağımlılığı mock'lamanız, gizli bir global state'i sıfırlamanız veya fonksiyonun yarısını "atlayarak" test etmeniz gerekiyorsa, sorun testte değil, **tasarımdadır.**

Test edilebilirlik zorlaştıkça genelde şu belirtileri görürsünüz: fonksiyon çok fazla şey yapıyor, bağımlılıklar doğrudan `new` ile oluşturuluyor (dependency injection yerine), ya da iş mantığı ile I/O (veritabanı, dosya, ağ) iç içe geçmiş. Testi kolay yazılabilir hale getirmek için kodu zorlamak, aslında **kodu daha iyi tasarlamaya** zorlamaktır — test edilebilirlik, sonuç değil, bir **tasarım sinyalidir.**

### Boy Scout Kuralı: Temiz Kod Bir Alışkanlıktır

Son olarak, belki de en sevdiğim kural: **İzci Kuralı (Boy Scout Rule).** "Kampı bulduğunuzdan daha temiz bırakın." Yazılımda karşılığı şu: bir dosyaya her dokunduğunuzda, o dosyayı bulduğunuzdan biraz daha iyi bırakın. Bir değişken adını düzeltin, bir yorumu güncelleyin, bir fonksiyonu ikiye bölün. Kimse sizden büyük bir refactor'ü tek seferde bitirmenizi beklemiyor — istenen, **her commit'te küçük bir iyileşme.**

O 800 satırlık dosyayı hâlâ hatırlıyorum. Onu tek seferde "düzeltmeye" kalkışmadım, çünkü bu hem riskli hem de gerçekçi değildi. Her dokunduğumda bir parçasını küçülttüm, isimlendirdim, test ekledim. Altı ay sonra o dosya artık kimsenin korktuğu bir ejderha değil, sıradan bir modüldü.

**Temiz kod, yetenekten çok bir alışkanlık meselesi.** Ve her alışkanlık gibi, küçük ve tutarlı adımlarla inşa ediliyor. SOLID prensiplerini bu alışkanlığın omurgası olarak görüyorum; henüz okumadıysanız [SOLID Nedir?](/yazilar/solid-nedir/) yazımla devam etmenizi öneririm.

> Okuduğunuz için Minnettarım.

> Sağlıcakla kalın Dostlarım..
