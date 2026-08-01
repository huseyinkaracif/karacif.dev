---
title: "Context Engineering: Prompt Yazmanın Ötesine Geçmek"
slug: "context-engineering-promptun-otesi"
lang: "tr"
date: "2026-07-14"
category: "Yapay Zeka"
excerpt: "İyi bir prompt yazmak artık yetmiyor. Modelin o an ne 'gördüğünü' tasarlamak, yani context engineering, günümüzün en az konuşulan ama en çok fark yaratan becerisi."
readTime: "7"
coverImage: "/images/blog/context-engineering-promptun-otesi/cover.svg"
tags: ["context-engineering", "llm", "rag", "prompt-engineering", "ai"]
---

![](/images/blog/context-engineering-promptun-otesi/cover.svg)

Geçen hafta bir arkadaşım bana sinirli sinirli mesaj attı: **"Kardeşim aynı prompt'u yazdım, dün mükemmel çalıştı, bugün saçmalıyor!"** Prompt'a baktım, gerçekten değişmemişti. Ama etrafındaki her şey değişmişti: RAG'den gelen dokümanlar farklıydı, konuşma geçmişi uzamıştı, sistem promptuna yeni bir kural eklenmişti. **Prompt aynıydı, context tamamen başkaydı.**

İşte bu yazı tam olarak bu farkın üzerine: **prompt engineering** ile **context engineering** arasındaki fark, ve neden ikincisi artık çok daha kritik bir beceri.

### Prompt Engineering'in Sınırı Nerede Biter?

Prompt engineering, modele **ne sorduğunuzla** ilgili. "Sen bir uzman avukatsın, şu sözleşmeyi analiz et" gibi cümleler kurmak, few-shot örnekler eklemek, "adım adım düşün" demek — bunların hepsi gerçek ve faydalı teknikler. Ama tek bir varsayımları var: **modelin göreceği her şeyin geri kalanı zaten doğru ve düzenli.**

Gerçek dünyada öyle değil. Bir müşteri destek ajanınız var diyelim. Kullanıcının sorusu geliyor, buna ek olarak: geçmiş 15 mesajlık konuşma, RAG'den çekilen 3 doküman, kullanıcı profili verisi, bir önceki tool çağrısının çıktısı, sistem promptu, belki bir de "bugünkü kampanyalar" bilgisi. **Modelin gördüğü şey, sizin yazdığınız o güzel prompt değil — bu karman çorman yığının tamamı.**

İşte context engineering, tam olarak bu yığını **kasıtlı olarak tasarlamak** demek: neyin içeri gireceğine, ne zaman gireceğine ve nasıl sıralanacağına karar vermek.

### Context Window'u Bir Bütçe Gibi Düşünün

Bunu anlamamı sağlayan en iyi analoji şu oldu: **context window, sınırlı bir bütçedir — para gibi.** Elinizde 100.000 token'lık bir bütçeniz varsa, bunu nasıl harcadığınız, modelin performansını doğrudan etkiler.

Kötü bir bütçeleme şöyle görünür: konuşmanın tamamını, ilgisiz RAG sonuçlarını, kullanılmayan tool tanımlarını, tekrar eden sistem talimatlarını context'e tıkıştırmak. Sonuç? Model, gerçekten önemli olan bilgiyi o kalabalığın içinde kaybediyor. Buna bazı araştırmacılar **"context rot"** yani bağlam çürümesi diyor — context uzadıkça, modelin ilgili bilgiyi bulma ve doğru kullanma performansı düşüyor. Ne kadar çok "gürültü" varsa, sinyal o kadar zayıflıyor.

> Şunu unutmayın: daha fazla context, her zaman daha iyi context demek değildir. Bazen 5 sayfa alakasız doküman göndermek, hiç göndermemekten daha kötü sonuç verir.

Ben artık her context tasarımında kendime şunu soruyorum: **"Bu bilgi, modelin doğru cevap vermesi için gerçekten şart mı, yoksa ben rahat olayım diye mi ekliyorum?"** Genelde ikinci seçenek kazanıyor ve bu tam olarak kaçınmam gereken şey.

![Context window bir bütçe gibidir: sistem promptu, retrieval, hafıza, tool çıktıları ve konuşma geçmişi arasında paylaşılır](/images/blog/context-engineering-promptun-otesi/diagram-1.svg)
*Context window'u bir bütçe gibi paylaştırmak*

### Context'in Kaynakları: Tek Bir Prompt Değil, Bir Orkestra

Modelin gördüğü context, aslında birden fazla kaynaktan besleniyor ve her birinin kendi kuralları var:

- **Sistem promptu:** Ajanın kimliğini, kurallarını, sınırlarını tanımlar. Statiktir ama şişmeye çok müsaittir — "ah bir kural daha ekleyeyim" diyerek zamanla 3 sayfaya çıkabilir. Ben periyodik olarak sistem promptumu okuyup **"bu kural hâlâ gerekli mi?"** diye soruyorum.
- **RAG (retrieval):** Dış bilgi kaynaklarından çekilen dokümanlar. Burada asıl sanat, **alakalı en az sayıda parçayı** getirmek — "belki lazım olur" diye 20 doküman göndermek değil.
- **Hafıza (memory):** Önceki oturumlardan, kullanıcı tercihlerinden gelen bilgi. Ham konuşma geçmişini değil, **özetlenmiş ve yapılandırılmış** notları taşımak çok daha verimli.
- **Tool çıktıları:** Bir API'den dönen JSON, genelde modelin ihtiyaç duymadığı 30 alan içerir. Bunu ham haliyle context'e atmak yerine, sadece ilgili alanları süzmek gerekiyor.
- **Konuşma geçmişi:** En sinsi olanı bu. Konuşma uzadıkça, geçmişin tamamını taşımak hem pahalı hem de context rot'u tetikliyor.

Her biri ayrı bir "bütçe kalemi" gibi düşünülmeli. Hiçbiri sınırsız değil.

### Context Sorunlarını Nasıl Fark Edersiniz?

Bunu anlamanın en pratik yolu, modelin **tuhaf davranışlarının** aslında birer semptom olduğunu kabul etmek. Ben şu belirtileri gördüğümde ilk şüphelendiğim şey context, prompt değil:

- Model, konuşmanın başında verdiği bir bilgiyi "unutuyor" — genelde context çok uzamış ve o bilgi ortalarda bir yerde kaybolmuş demektir.
- Aynı soruya bazen doğru, bazen alakasız cevap veriyor — muhtemelen RAG'den gelen dokümanların alaka sırası tutarsız, ya da context'in içeriği isteğe göre değişiyor.
- Model, kullanmaması gereken bir tool'u çağırıyor ya da yanlış parametre veriyor — büyük ihtimalle tool tanımları context'te fazla kalabalık, ya da örnekler yetersiz.
- Cevaplar giderek daha "genel" ve daha az spesifik hale geliyor — context rot'un klasik belirtisi, sinyal gürültüye karışmış demektir.

Bu belirtileri gördüğünüzde önce promptu değil, **modelin o an gerçekte ne gördüğünü** loglayıp incelemenizi öneririm. Çoğu zaman suçlu, yazdığınız cümleler değil, o cümlelerin etrafındaki yığındır.

### Pratikte İşe Yarayan Kalıplar

Birkaç projede denedikten sonra benim için gerçekten fark yaratan üç pattern var:

**1. Compaction (sıkıştırma):** Konuşma belirli bir uzunluğa ulaştığında, geçmişin tamamını taşımak yerine, onu özetleyip context'in başına bir "özet notu" olarak koyuyorum. Detayları kaybediyorsunuz ama modelin **odağını** koruyorsunuz. Uzun bir konuşmanın son 5 mesajını ham haliyle, öncesini özetlenmiş olarak taşımak iyi bir denge.

**2. Yapılandırılmış notlar:** Ajan bir görev üzerinde çalışırken, ham "düşünce akışını" biriktirmek yerine, önemli bulguları küçük, yapılandırılmış notlara (örneğin bir JSON veya markdown liste) dönüştürüp saklıyorum. Bu notlar hem daha az yer kaplıyor hem de tekrar okunduğunda daha net.

**3. Tam zamanında (just-in-time) retrieval:** Her şeyi baştan context'e yüklemek yerine, ajan bir bilgiye ihtiyaç duyduğu **an** onu çekiyor. Yani "olur da lazım olur" diye önceden 10 doküman getirmek yerine, ajan "şu bilgiye ihtiyacım var" dediğinde bir arama tool'u çağırıp sadece o anki ihtiyacı karşılıyor. Bu, hem bütçeyi korur hem de alaka düzeyini artırır.

### Kötü ve İyi Context Assembly: Yan Yana

Somutlaştırmak için, bir müşteri destek ajanının aynı soruya verdiği context'i iki farklı şekilde kuralım.

**Kötü yaklaşım:**

```
System: Sen bir destek asistanısın. Kibarca cevap ver. Türkçe konuş.
[15 mesajlık ham konuşma geçmişinin tamamı]
[RAG'den gelen 8 doküman, alaka sırasına göre değil, arama skoruna göre]
[Kullanıcının tüm profil JSON'u — 40 alan]
[Önceki tool çağrısının ham API cevabı — 200 satır JSON]
Kullanıcı: "Kargom ne zaman gelir?"
```

Burada model, 40 alanlık profil içinde teslimat adresini arayacak, 200 satırlık JSON içinde kargo durumunu bulmaya çalışacak, 8 dokümandan hangisinin gerçekten ilgili olduğunu kendi başına ayıklayacak. **İşin çoğunu modele yıkıyorsunuz.**

**İyi yaklaşım:**

```
System: Sen bir destek asistanısın. Kibarca ve kısa cevap ver. Türkçe konuş.
Kullanıcı özeti: Ahmet, İstanbul, sadık müşteri (3 yıl), açık talebi yok.
Son 3 mesaj (ham): [...]
Konuşma özeti (öncesi): Kullanıcı sipariş #4521 için kargo takibi soruyor.
İlgili bilgi: Sipariş #4521 - kargoya verildi, tahmini teslimat 2 gün.
Kullanıcı: "Kargom ne zaman gelir?"
```

Aynı bilgiyi taşıyor ama modelin işini kolaylaştırıyor: **neyin önemli olduğunu siz belirlemişsiniz, model sadece cevap üretiyor.** İkinci versiyon hem daha az token harcıyor hem de çok daha tutarlı sonuç veriyor. Bunu kendi projelerimde defalarca test ettim; fark gözle görülür.

![Kötü context assembly: ham ve alakasız veri yığını. İyi context assembly: özetlenmiş, süzülmüş, sıralı bilgi](/images/blog/context-engineering-promptun-otesi/diagram-2.svg)
*Kötü ve iyi context assembly'nin yan yana karşılaştırması*

### Context Rot'a Karşı Küçük Bir Hile

Uzun konuşmalarda modelin "unutmaya" başladığını fark ederseniz, tek çözüm bağlamı büyütmek değil — bazen tam tersi. Ben şu kuralı koydum: context belirli bir eşiği geçtiğinde, otomatik olarak bir **compaction** adımı tetikleniyor. Ayrıca kritik bilgileri (kullanıcı adı, açık görev, önemli kısıtlar) her seferinde context'in **en sonuna** (modelin en çok dikkat ettiği yere) tekrar ekliyorum. Küçük bir hile ama gerçekten işe yarıyor.

### Son Söz

Prompt engineering hâlâ önemli — nasıl sorduğunuz gerçekten fark yaratır. Ama artık yeterli değil. **Context engineering**, modelin o anda "gördüğü dünyayı" tasarlamak, gereksiz her şeyi ayıklamak ve gerçekten önemli olanı doğru zamanda, doğru yerde sunmak demek. Bunu bir kere içselleştirdiğinizde, "aynı prompt ama farklı sonuç" şikayetleri büyük ölçüde azalıyor.

Ajanlarınızı production'a taşırken bu konunun maliyet ve güvenilirlik tarafına da değindiğim [Yapay Zeka Ajanlarını Production'a Taşımak](/yazilar/yapay-zeka-ajanlarini-productiona-tasimak/) yazısına da göz atmanızı öneririm.

> Okuduğunuz için Minnettarım.

> Sağlıcakla kalın Dostlarım..
