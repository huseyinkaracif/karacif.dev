---
title: "Clean Code Prensipleri"
date: "2024-01-05"
category: "Engineering"
excerpt: "Okunabilir ve sürdürülebilir kod yazmanın incelikleri."
readTime: "6"
coverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCOrn-DlNyDYTf82A8mMZ9BW-QKhL-4ws_1C0Tuhn7Mz73JDMEOodDIKJ2MP2quBMgAryyPj8u4PZ4-WxbG4CSlGzsgRhe1sVAti1GbmtdBefiCK8rChYqgAfg6seq6_rh0v8I1nSD6H_vn5aa2NvXnYx8NEo0Pre39cStB1sUaCua0GsFXENYk6uYQNvPgTwa64hGQRAS9gg8Ew5JBtac6OlQuOjq0oXJJhII1pefJhKsQmpcv8lYOJQ77C9jXVViwnSEL3HghWLw"
---

Kod sadece çalışmak için değil, okunmak için yazılır. Robert C. Martin'in "Clean Code" kitabından ilham alarak, günlük geliştirme pratiğinize katmanız gereken temel prensipleri ele alıyoruz.

## Anlamlı İsimler

Değişken, fonksiyon ve sınıf isimlerinin niyeti açıkça ifade etmesi gerekir. `d` yerine `elapsedTimeInDays`, `getInfo()` yerine `getAccountInfo()` kullanın.

## Küçük Fonksiyonlar

Her fonksiyon yalnızca bir şey yapmalıdır. Eğer bir fonksiyonun birden fazla şey yaptığını düşünüyorsanız, parçalara bölün.

## DRY — Don't Repeat Yourself

Aynı kodu iki kez yazmak, bakım maliyetini iki katına çıkarır. Tekrar eden kalıpları soyutlayın.

## Yorumlar vs. Kod

İyi kod kendi kendini açıklar. Yorum yazmak yerine kodu okunabilir hale getirin. Yorumlar çoğunlukla "neden" sorusunu yanıtlamalıdır, "ne" sorusunu değil.

## Test Edilebilir Kod

Her fonksiyonun bağımsız test edilebilir olması, tasarım kalitesinin en iyi göstergesidir. Eğer bir şeyi test etmekte zorlanıyorsanız, tasarımı gözden geçirin.

Temiz kod yazmak bir alışkanlıktır. Her commit'te biraz daha iyi olmak, zamanla büyük bir fark yaratır.
