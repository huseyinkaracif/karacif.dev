---
title: "Single Responsibility Prensibi (SRP) — SOLID"
slug: "single-responsibility-principle-srp"
lang: "tr"
date: "2022-11-06"
category: "Mühendislik"
excerpt: "Her sınıf ve metot tek bir sorumluluk taşımalı: SRP ile okunabilir ve sürdürülebilir kod."
readTime: "3"
coverImage: "/images/blog/single-responsibility-principle-srp/img-01.webp"
mediumUrl: "https://medium.com/@hsynkrcf/single-responsibility-prensibi-srp-solid-148cbc91b4c5"
tags: []
---
![Tek Sorumluluk Yazılım Prensibi](/images/blog/single-responsibility-principle-srp/img-01.webp)
*Tek Sorumluluk Yazılım Prensibi*

**Single Responsibility Principle** (**Tek Sorumluluk Prensibi**), bağımlılık yönetiminin kötü olmasından kaynaklanan **sabit** (tekrar kullanılamayan) ve **kırılgan** (değişikliğin farklı yerleri etkilemesi) kodu daha modüler hale getirmeye yardımcı olmayı amaçlamaktadır.

Bob Amca der ki; [**Aynı nedenle değişenleri bir araya toplayın ve farklı nedenlerle değişenleri ayırın.**](https://www.oreilly.com/library/view/97-things-every/9780596809515/ch76.html#:~:text=Martin%20\(Uncle%20Bob\),single%20responsibility%20principle%2C%20or%20SRP.)

Sınıfımız ne kadar çok sorumluluk yüklenirse, o kadar fazla değişime uğramak zorunda kalır. Böylece ufak bir güncellemenin bile maliyeti katlanarak artar ve kod parçalarımız değişime direnmeye başlar.

![Single Responsibility Prensibi (SRP) — SOLID](/images/blog/single-responsibility-principle-srp/img-02.webp)

Bizim amacımız “çalışıyorsa hiç dokunmayalım” konuşmasını yapmadan **sorumluluklarımızı azaltıp, değişime kolay adapte olmayı sağlamaktır.**

Peki bu aslında ne anlama geliyor ? Aşağıdaki örneği ele alalım.

![Single Responsibility Prensibi (SRP) — SOLID](/images/blog/single-responsibility-principle-srp/img-03.webp)
```
public class Fatura{     public void FaturaEkle()     {        // İş Kuralları     }     public void FaturaSil()     {        // İş Kuralları     }     public void RaporHazirla()     {        // İş Kuralları     }     public void EmailGonder()     {        // İş Kuralları     }}
```

FaturaEkle() metodumuz yalnızca sisteme fatura eklemekten sorumludur, FaturaSil() metodu sadece faturaları silmekten sorumludur ve aynı olay RaporHazirla() ve EmailGonder() metodları için de geçerlidir.

Burada metodların tek sorumluluk prensibini karşıladığını söyleyebiliriz. Ama Fatura sınıfına bakarsanız tek sorumluluk prensibini yerine getirmeyen birden fazla sorumluluk ile ilgilendiğini göreceksiniz.

### Burada yapmamız gereken nedir ?

FaturaEkle() ve FaturaSil() metodlarımız, benzer özellikte bir işlevsellik yaptıkları için tek sınıfta birleştirmemiz gerekir.

RaporHazirla() ve EmailGonder() metodları için tamamen bağımsız ve farklı işlevlere sahip oldukları ayrı ayrı sınıflar oluşturmamız tek sorumluluk prensibini yerine getirmemiz demektir.

O zaman hemen düzeltiyoruz!

![Single Responsibility Prensibi (SRP) — SOLID](/images/blog/single-responsibility-principle-srp/img-04.webp)
![Single Responsibility Prensibi (SRP) — SOLID](/images/blog/single-responsibility-principle-srp/img-05.webp)
```
public class Fatura{     public void FaturaEkle()     {         // İş Kuralları     }          public void FaturaSil()     {         // İş Kuralları     }}public class Rapor{     public void RaporHazirla()     {         // İş Kuralları     }}   public class Email{     public void EmailGonder()     {         // İş Kuralları     }}
```

İşte bu kadar!

Artık her sınıfın sadece bir sorumluluğu ve değişmek için sadece tek bir nedeni oldu. Kod artık her işlevsellik için daha küçük ve yönetilebilir durumda. Böylece herhangi bir sınıf için değişiklik yapmak istediğinizde, tüm sınıfın ne yaptığına bakmak veya test etme gereksiniminiz olmayacak.

Bu şekildeki kullanımlarda hem kodumuzun kontrolü daha kolaylaşıyor hem de **tekrar kullanılabilirliği** (*Reusability*) artıyor.

### **ÖZET**

> Artık kodun nasıl yeniden düzenleneceğini ve Tek Sorumluluk İlkesine nasıl ulaşılacağını anladık. Single Responsibility Prensibi, programın karmaşıklığını azaltmamıza ve kodun bakımını daha kolay hale getirmemize yardımcı olur.

**Okuduğunuz için Minnettarım.**

**Sağlıcakla kalın Dostlarım..**

SOLID prensiplerine devam etmek için [**Open / Closed Prensibi**](/yazilar/open-closed-principle-ocp/)**’**ne göz atabilirsiniz;

👉 [**Open-Closed Principle (OCP) — SOLID**](/yazilar/open-closed-principle-ocp/)

### Kaynakça;

[What is Single Responsibility Principle](https://en.wikipedia.org/wiki/Single-responsibility_principle) (Important)

[Single Responsibility With C#](https://www.c-sharpcorner.com/article/solid-single-responsibility-principle-with-c-sharp/)

[Dotnet Tutorials for SOLID](https://dotnettutorials.net/lesson/single-responsibility-principle/#:~:text=SRP%20in%20C%23.-,What%20is%20the%20Single%20Responsibility%20Principle%20in%20C%23%3F,only%20one%20responsibility%20to%20do.)

[Explained SRP](https://stackify.com/solid-design-principles/)
