---
title: "Agentic Coding: Yazılımcının Yeni İş Akışı"
slug: "agentic-coding-yeni-gelistirici-workflow"
lang: "tr"
date: "2026-06-30"
category: "Yapay Zeka"
excerpt: "Autocomplete'ten ajanlara: kod yazma şeklimiz kökten değişti. Peki geliştiricinin rolü tam olarak nereye evrildi, ve bu 'verimlilik' hikayesinin gerçekten doğru olan kısmı hangisi?"
readTime: "7"
coverImage: "/images/blog/agentic-coding-yeni-gelistirici-workflow/cover.svg"
tags: ["agentic-coding", "developer-workflow", "ai-tools", "software-engineering", "productivity"]
---

![](/images/blog/agentic-coding-yeni-gelistirici-workflow/cover.svg)

Geçen hafta bir junior arkadaşımız ofiste şöyle bir şey söyledi: **"Ben artık kod yazmıyorum ki, ajana anlatıyorum."** İlk başta biraz tedirgin oldum açıkçası — sanki bir şeyler kaybediliyormuş gibi hissettim. Ama sonra kendi son bir haftama baktım: Claude Code'a bir özellik anlattım, planını okudum, üç dosyada değişiklik önerdi, ikisini onayladım, birini reddedip **"burada farklı bir pattern kullanmamız lazım, mevcut kod tabanında zaten X yapıyoruz"** diye düzelttim. O da düzeltti. Sonra testleri çalıştırdım, review ettim, merge ettim.

**Ben de kod yazmamıştım aslında. Yönetmiştim.**

İşte bu yazı, tam olarak bu dönüşümle ilgili: **agentic coding** dediğimiz şey nereden geldi, geliştiricinin rolü nereye evriliyor ve bu işin abartılmayan, gerçek tarafı ne.

### Autocomplete'ten Ajana: Kısa Bir Tarih

Hatırlıyorum, GitHub Copilot ilk çıktığında hepimiz için büyülüydü — satır tamamlıyordu, bazen bütün bir fonksiyonu tahmin ediyordu. Ama o hâlâ **pasif** bir araçtı: siz yazıyordunuz, o öneriyordu, siz kabul edip etmemeye karar veriyordunuz. Bir nevi çok yetenekli bir otomatik tamamlama.

Sonra Cursor gibi araçlarla "chat ile düzenleme" geldi: bir dosyayı seçip "şunu değiştir" diyebiliyorduk. Yine de siz her adımı tetikliyordunuz.

Şimdi ise **Claude Code** gibi araçlarla tamamen farklı bir modele geçtik: siz bir **hedef** tanımlıyorsunuz, ajan kod tabanını kendi başına geziyor, ilgili dosyaları buluyor, bir plan çıkarıyor, değişiklikleri kendi başına yapıyor, testleri kendi başına çalıştırıyor, hatta gerekirse terminal komutları çalıştırıp hatayı kendi başına debug ediyor. Siz artık her tuşa basmıyorsunuz — **döngünün dışına çıkıp onu izliyorsunuz.**

Bu, otomatik tamamlamadan otonom çalışmaya geçiş. Küçük ama devasa bir fark.

### Peki Geliştiricinin Rolü Nereye Gitti?

Burada dürüst olmak lazım: **"artık kod yazmıyoruz"** demek yanlış bir basitleştirme. Hâlâ kod yazıyoruz — ama daha az satır düzeyinde, daha çok **karar** düzeyinde.

Benim gördüğüm rol değişimi şöyle:

- **Mimar:** Hangi pattern'i kullanacağımıza, sistemin nasıl bölüneceğine, hangi trade-off'ları kabul edeceğimize karar veriyoruz. Ajan bunu sizin yerinize seçmiyor, siz belirliyorsunuz — o uyguluyor.
- **Reviewer:** Ajanın önerdiği her diff'i okumak, artık geliştiricinin ana işlerinden biri. Kod yazmaktan çok, **kod okumaya ve eleştirmeye** daha fazla zaman ayırıyorum şu an.
- **Bağlam sağlayıcı:** Ajan sizin kod tabanınızı, iş kurallarınızı, "neden böyle yaptık"ları bilmiyor — siz ona bu bağlamı vermezseniz. Bu da beni bir sonraki bölüme getiriyor.

Yani rol, **üretmekten yönetmeye ve denetlemeye** kaydı. Bu, bazıları için "daha az teknik" gibi hissettirebilir ama bence tam tersi: doğru mimari kararı vermek, kötü bir diff'i fark etmek, hâlâ derin teknik bilgi istiyor. Sadece klavyede geçirdiğiniz süre azaldı.

### Pratik İş Akışı: Planla → Devret → İncele → Doğrula

Kendi iş akışımı dört adıma indirdim, ve bunun dışına çıktığımda genelde işler kötü gidiyor:

**1. Planla:** Ajana direkt "şunu yap" demek yerine, önce **plan modunda** ne yapacağını sormayı seviyorum. "Bu değişikliği nasıl yapmayı düşünüyorsun?" Plan, benim aklımda olmayan bir riski ortaya çıkarabiliyor — ya da benim aklımdaki riski ajanın görmediğini fark ediyorum, o zaman ekstra bağlam veriyorum.

**2. Devret:** Plan makul görünüyorsa, ajana işi bırakıyorum. Burada sabırlı olmak lazım — her adımda müdahale etmek, agentic coding'in verdiği zaman kazancını sıfırlıyor.

**3. İncele:** Diff geldiğinde, satır satır okuyorum. Özellikle şu sorulara bakıyorum: **Bu, mevcut kod tabanının pattern'lerine uyuyor mu? Edge case'ler düşünülmüş mü? Gereksiz bir soyutlama eklenmiş mi?** Ajanlar bazen "çalışan ama gereksiz karmaşık" kod üretiyor — buna dikkat.

**4. Doğrula:** Testleri çalıştırmak yetmiyor, gerçekten uygulamayı açıp davranışı gözlemlemek gerekiyor. "Testler geçti" ile "gerçekten doğru çalışıyor" arasında hâlâ bir uçurum var, özellikle UI ve entegrasyon tarafında.

Bu dört adımı atlayıp direkt "yap, commit'le" dediğim her seferde, bir hafta sonra o kod tabanında bir garabetle karşılaştım. Söz veriyorum, tecrübeyle geldi bu 😅

![Agentic coding iş akışı: planla, devret, incele, doğrula döngüsü](/images/blog/agentic-coding-yeni-gelistirici-workflow/diagram-1.svg)
*Plan → Devret → İncele → Doğrula döngüsü*

### Ajanların Gerçekten Zorlandığı Yerler

Şimdi abartısız konuşalım, çünkü bu konuda çok fazla pazarlama dili var. Ajanlar şu konularda hâlâ ciddi şekilde zorlanıyor:

- **Büyük refactor'lar:** 50 dosyayı etkileyen bir mimari değişiklikte, ajan genelde ya bağlamı kaybediyor ya da tutarsız kararlar veriyor (bir dosyada bir pattern, diğerinde başka bir pattern). Bu tip işlerde ben görevi küçük, bağımsız parçalara böldüğümde çok daha iyi sonuç alıyorum.
- **Zevk (taste):** Bir API'nin isimlendirmesi, bir bileşenin ne kadar soyutlanacağı, bir hatanın kullanıcıya nasıl gösterileceği gibi konularda ajan "teknik olarak doğru" ama "sizin ekibinizin zevkine uymayan" kararlar verebiliyor. Bu, hâlâ insan judgment'ı gerektiriyor.
- **Güvenlik:** Ajan, işlevsel olarak çalışan ama güvenlik açığı olan kod üretebiliyor — SQL injection'a açık bir sorgu, yanlış yerde saklanan bir secret, eksik bir yetkilendirme kontrolü. Bunlar "testler geçti" diye fark edilmeyen şeyler. Güvenlik odaklı bir review adımı hâlâ şart.
- **Örtük iş kuralları:** Kod tabanında yazılı olmayan, sadece ekibin bildiği kurallar ("biz bu tabloyu asla direkt güncellemeyiz, hep event üzerinden yaparız" gibi) ajan tarafından bilinemez, çünkü hiçbir yerde yazmıyor.

Bu son madde beni doğrudan bir sonraki konuya getiriyor.

### CLAUDE.md ve Kural Dosyaları: Takımın Ortak Hafızası

Bunu keşfettiğimde gerçekten oyunun kurallarını değiştiren bir an oldu benim için: bir `CLAUDE.md` (ya da benzeri bir kural dosyası) yazıp kod tabanının köküne koyduğunuzda, ajan artık her seferinde sıfırdan başlamıyor. **"Biz burada bunu böyle yaparız"** diye yazdığınız her şey, ajanın her göreve otomatik olarak taşıdığı bağlam oluyor.

Benim dosyamda genelde şunlar var: hangi pattern'leri tercih ettiğimiz, hangi kütüphaneleri kullanmadığımız, commit mesajı formatı, test yazma alışkanlıklarımız, "asla yapma" listesi. Bu dosya bir nevi **ekibin yazılı olmayan kurallarını yazılı hale getirme** egzersizi — ve bunu yaparken kendi ekibinizin tutarsızlıklarını da fark ediyorsunuz, ki bu ayrı bir fayda.

```markdown
# CLAUDE.md (özet örnek)

## Kod Standartları
- Yeni bir servis eklerken mevcut `BaseService` sınıfından türet
- Asla doğrudan repository katmanını component içinde çağırma
- Hata yönetimi için proje genelinde `Result<T>` pattern'i kullan

## Yasaklı
- `lodash` ekleme, native JS yeterli
- Yeni bir state management kütüphanesi ekleme, Context API kullan

## Test
- Her yeni endpoint için en az bir integration test
- Mock'ları `tests/mocks` altında topla
```

Bu dosyayı bir kere iyi yazıp, zamanla güncellemek, her yeni sohbette aynı şeyleri tekrar tekrar anlatmaktan çok daha verimli.

### Verimlilik İddialarına Dürüst Bir Bakış

"Yapay zeka geliştiriciyi %50 hızlandırıyor" gibi başlıklar her yerde. Ben bunu ne tamamen reddediyorum ne de körü körüne onaylıyorum. Kendi tecrübeme göre:

- **Bilindik, tekrarlayan işlerde** (CRUD endpoint, boilerplate, test yazma, mevcut pattern'i başka bir yere uygulama) gerçekten büyük bir hız kazancı var. Belki gerçekten 2-3 kat.
- **Yeni, belirsiz problemlerde** (mimari karar, performans sorunu debug etmek, "bu neden böyle davranıyor" tipi araştırma) kazanç çok daha az, bazen review ve düzeltme süresi, ajanın kazandırdığı zamanı yiyor.
- **Öğrenme eğrisi tersine döndü:** Junior geliştiriciler için asıl risk, ajanın ürettiği kodu anlamadan kabul etmek. Bu, kısa vadede hızlı ama uzun vadede zayıf bir mühendis yetiştiriyor. Ben junior arkadaşlara hep şunu söylüyorum: **"Ajanın yazdığı her satırı, kendin yazmış gibi savunabilmelisin."** Savunamıyorsan, anlamamışsın demektir.

Yani net cevap: **evet, gerçek bir verimlilik kazancı var, ama her yerde eşit değil, ve dikkatsiz kullanıldığında uzun vadede maliyeti olabiliyor.**

Somut bir örnek vereyim: geçen ay iki farklı işi karşılaştırdım. Birincisi, mevcut bir REST endpoint'ini GraphQL'e taşımak — tekrarlayan, kalıbı belli bir iş. Ajan bunu neredeyse tek seferde, benim yarım saatte yapacağım işi 5 dakikada bitirdi, ben sadece review ettim. İkincisi, üretimde ara sıra ortaya çıkan garip bir race condition'ı bulmak. Ajana verdim, birkaç makul ama yanlış teori üretti, sonunda ben logları elimle inceleyip kökeni buldum. **İki iş de "kodlama" ama biri ajanın güçlü olduğu, diğeri hâlâ benim güçlü olduğum taraftaydı.** Bu ayrımı yapabilmek, agentic coding'i verimli kullanmanın anahtarı bence.

### Son Söz

Agentic coding, yazılımcılığı ortadan kaldırmıyor — **neye zaman harcadığımızı değiştiriyor.** Klavyede satır satır yazmaktan, karar vermeye, bağlam sağlamaya ve denetlemeye kaydık. Bu geçiş rahatsız edici gelebilir, özellikle "kod yazmak" kimliğimizin büyük bir parçasıysa. Ama bence asıl heyecan verici olan da bu: artık daha çok zamanımızı **doğru şeyi inşa etmeye**, daha az zamanımızı **syntax'la boğuşmaya** ayırabiliyoruz.

Ajanlarla çalışırken context'i nasıl tasarladığınız da doğrudan sonucu etkiliyor; bu konuda [Context Engineering: Prompt Yazmanın Ötesine Geçmek](/yazilar/context-engineering-promptun-otesi/) yazımı okumanızı öneririm.

> Okuduğunuz için Minnettarım.

> Sağlıcakla kalın Dostlarım..
