---
title: "Sıralama Algoritmaları 101"
slug: "siralama-algoritmalari-101"
lang: "tr"
date: "2024-06-21"
category: "Algoritmalar"
excerpt: "Bubble, Selection, Insertion, Merge, Quick ve Heap Sort — temel sıralama algoritmalarının çalışma mantığı ve karmaşıklık analizleri."
readTime: "5"
coverImage: "/images/blog/siralama-algoritmalari-101/img-01.webp"
mediumUrl: "https://medium.com/@hsynkrcf/s%C4%B1ralama-algoritmalar%C4%B1-101-72107f49f698"
tags: ["development", "csharp", "education", "sorting-algorithms", "algorithms"]
---
**Bubble Sort, Selection Sort, Quick Sort, Insertion Sort, Heap Sort ve Merge Sort** hakkında temel ve önemli bilgiler öğreneceksiniz.

![](/images/blog/siralama-algoritmalari-101/img-01.webp)

**Yazılımcılar için** sıralama algoritmaları, **veri işleme** ve **optimizasyon** süreçlerinde **hayati** bir rol oynar. Bu yazıda, farklı senaryolarda ve veri kümelerinde etkili çözüm sunan, **en önemli altı sıralama algoritmasını** ve bu algoritmaların temel özelliklerini ve kullanım alanlarını kısaca ele alacağız.

### Kabarcık Sıralaması (Bubble Sort)

**Bubble Sort**, en basit sıralama algoritmalarından biridir. Sürekli ikili elemanların **karşılaştırılması** ve gerektiğinde **yer değiştirilmesi** prensibiyle çalışır. Bu algoritma özellikle küçük veri setlerinde ve eğitim amaçlı kullanılır.

![Kabarcık Sıralaması Örneği](/images/blog/siralama-algoritmalari-101/img-02.gif)
*Kabarcık Sıralaması Örneği*

#### Kabarcık Sıralaması Algoritması Uygulaması (C#)

```csharp
public int[] BubbleSort(int[] arr)
{
    int n = arr.Length;
    for (int i = 0; i < n - 1; i++)
    {
        for (int j = 0; j < n - i - 1; j++)
        {
            if (arr[j] > arr[j + 1])
            {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    
    return arr;
}
```

#### **Avantajları:**

1.  **Basitlik:** Algoritmanın mantığı çok basittir ve kolayca anlaşılabilir.
2.  **Düşük bellek kullanımı:** Ekstra bellek gerektirmez, yerinde sıralama (in-place sorting) yapar.
3.  **Küçük veri setleri için uygun:** Küçük ve neredeyse sıralanmış veri setlerinde kabul edilebilir performans sağlar.

#### **Dezavantajları:**

1.  **Verimsizlik:** Büyük veri setleri için çok yavaş olabilir (O(n²)).
2.  **Optimal olmayan kullanım:** Genellikle diğer daha verimli algoritmaların kullanılması önerilir.
3.  **Düşük performans:** Ortalama ve en kötü durumda yavaş çalışır.

### Seçerek Sıralama (Selection Sort)

**Selection Sort**, her adımda **en küçük** veya **en büyük** elemanı bulur ve onu sıralanmamış kısmın başına yerleştirir. Yavaş bir algoritma olmasına rağmen, anlaşılması oldukça kolaydır.

![Seçerek Sıralama Örneği](/images/blog/siralama-algoritmalari-101/img-03.gif)
*Seçerek Sıralama Örneği*

#### Seçerek Sıralama Algoritması Uygulaması (C#)

```csharp
public int[] SelectionSort(int[] arr)
{
    int n = arr.Length;
    for (int i = 0; i < n - 1; i++)
    {
        int minIdx = i;
        for (int j = i + 1; j < n; j++)
        {
            if (arr[j] < arr[minIdx])
            {
                minIdx = j;
            }
        }
        int temp = arr[minIdx];
        arr[minIdx] = arr[i];
        arr[i] = temp;
    }
    
    return arr;
}
```

#### **Avantajları:**

1.  **Basitlik:** Algoritmanın anlaşılması ve uygulanması kolaydır.
2.  **Az bellek kullanımı:** Ekstra bellek gerektirmez, yerinde sıralama yapar.
3.  **Stabil olmayan veri setleri:** Veri setinin büyük kısmı zaten sıralanmışsa verimli olabilir.

#### **Dezavantajları:**

1.  **Verimsizlik:** Büyük veri setleri için yavaş (O(n²)).
2.  **Stabil olmayan sıralama:** Algoritma stabil değildir, yani eşit elemanların sırası değişebilir.
3.  **Optimal olmayan kullanım:** Genellikle daha verimli algoritmalar tercih edilir.

### Hızlı Sıralama (Quick Sort)

**Quick Sort**, en hızlı sıralama algoritmalarından biridir ve **böl-ve-yönet** yaklaşımı ile çalışır. Bu algoritma, **büyük veri setlerinde** oldukça etkilidir ve birçok **standart kütüphanede** kullanılır.

![Hızlı Sıralama Örneği](/images/blog/siralama-algoritmalari-101/img-04.gif)
*Hızlı Sıralama Örneği*

#### Hızlı Sıralama Algoritması Uygulaması (C#)

```csharp
public int[] QuickSort(int[] arr, int low, int high)
{
    if (low < high)
    {
        int pi = Partition(arr, low, high);
        QuickSort(arr, low, pi - 1);
        QuickSort(arr, pi + 1, high);
    }
    
    return arr;
}

private int Partition(int[] arr, int low, int high)
{
    int pivot = arr[high];
    int i = (low - 1);
    for (int j = low; j < high; j++)
    {
        if (arr[j] < pivot)
        {
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    int temp1 = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp1;
    return i + 1;
}
```

#### **Avantajları:**

1.  **Hız:** Ortalama durumda çok hızlıdır. (O(n log n)).
2.  **Yerinde sıralama:** Ekstra bellek gerektirmez, yerinde sıralama yapar.
3.  **Genel kullanım:** Büyük ve küçük veri setlerinde iyi performans gösterir.

#### **Dezavantajları:**

1.  **En kötü durum performansı:** En kötü durumda O(n²) zaman alabilir, özellikle kötü pivot seçiminde.
2.  **Recursive yapı:** Deep recursive çağrıları yoğun kullanımı **stack overflow** neden olabilir.
3.  **Kararsız sıralama:** Algoritma stabil değildir, eşit elemanların sırası değişebilir.

### Eklemeli Sıralama (Insertion Sort)

**Insertion Sort**, küçük veri setlerinde oldukça etkilidir ve **kart sıralama** yöntemine benzer şekilde çalışır. **Her adımda** bir eleman seçilir ve doğru konumuna yerleştirilir.

![Eklemeli Sıralama Örneği](/images/blog/siralama-algoritmalari-101/img-05.gif)
*Eklemeli Sıralama Örneği*

#### Eklemeli Sıralama Algoritması Uygulaması (C#)

```csharp
public int[] InsertionSort(int[] arr)
{
    int n = arr.Length;
    for (int i = 1; i < n; ++i)
    {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key)
        {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
    
    return arr;
}
```

#### **Avantajları:**

1.  **Basitlik:** Algoritmanın anlaşılması ve uygulanması kolaydır.
2.  **Küçük veri setleri için uygun:** Küçük ve neredeyse sıralanmış veri setlerinde çok hızlı çalışır.
3.  **Yerinde sıralama:** Ekstra bellek gerektirmez, yerinde sıralama yapar.

#### **Dezavantajları:**

1.  **Verimsizlik:** Büyük veri setleri için yavaş (O(n²)).
2.  **Kararsız sıralama:** Algoritma stabil değildir, eşit elemanların sırası değişebilir.
3.  **Az optimal kullanım:** Büyük veri setlerinde daha verimli algoritmalar tercih edilmelidir.

### Yığın Sıralaması (Heap Sort)

**Heap Sort**, öncelik kuyruğu şeklinde veri yapısını kullanarak çalışan bir sıralama algoritmasıdır. Heap veri yapısını kullanarak karmaşıklığı azaltmayı amaçlar. Bu algoritma, büyük veri setlerinde etkili olabilir.

![Yığın Sıralaması Örneği](/images/blog/siralama-algoritmalari-101/img-06.gif)
*Yığın Sıralaması Örneği*

#### Yığın Sıralama Algoritması Uygulaması (C#)

```csharp
public int[] HeapSort(int[] arr)
{
    int n = arr.Length;
    for (int i = n / 2 - 1; i >= 0; i--)
        Heapify(arr, n, i);
    for (int i = n - 1; i >= 0; i--)
    {
        int temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;
        Heapify(arr, i, 0);
    }
    
    return arr;
}

private void Heapify(int[] arr, int n, int i)
{
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    if (left < n && arr[left] > arr[largest])
        largest = left;
    if (right < n && arr[right] > arr[largest])
        largest = right;
    if (largest != i)
    {
        int swap = arr[i];
        arr[i] = arr[largest];
        arr[largest] = swap;
        Heapify(arr, n, largest);
    }
}
```

#### **Avantajları:**

1.  **Hız:** O(n log n) zaman karmaşıklığı ile çalışır.
2.  **Yerinde sıralama:** Ekstra bellek gerektirmez, yerinde sıralama yapar.
3.  **Genel kullanım:** Hem küçük hem de büyük veri setlerinde iyi performans gösterir.

#### **Dezavantajları:**

1.  **Karışıklık:** Algoritmanın mantığı ve uygulanması diğer basit algoritmalara göre daha karmaşıktır.
2.  **Kararsız sıralama:** Algoritma stabil değildir, eşit elemanların sırası değişebilir.
3.  **Uygulama zorluğu:** Diğer daha basit algoritmalara göre uygulaması zordur.

### Birleştirmeli Sıralama (Merge Sort)

**Merge Sort**, **böl-ve-yönet** yaklaşımı ile çalışan bir başka etkili sıralama algoritmasıdır. **Parçalama ve birleştirme** adımlarıyla çalışır ve **büyük veri setlerinde** oldukça etkilidir.

![Birleştirmeli Sıralama Örneği](/images/blog/siralama-algoritmalari-101/img-07.gif)
*Birleştirmeli Sıralama Örneği*

#### Birleştirmeli Sıralama Algoritması Uygulaması (C#)

```csharp
public int[] MergeSort(int[] arr, int left, int right)
{
    if (left < right)
    {
        int mid = (left + right) / 2;
        MergeSort(arr, left, mid);
        MergeSort(arr, mid + 1, right);
        Merge(arr, left, mid, right);
    }
    
    return arr;
}

private void Merge(int[] arr, int left, int mid, int right)
{
    int n1 = mid - left + 1;
    int n2 = right - mid;
    int[] L = new int[n1];
    int[] R = new int[n2];
    for (int i = 0; i < n1; ++i)
        L[i] = arr[left + i];
    for (int j = 0; j < n2; ++j)
        R[j] = arr[mid + 1 + j];
    int k = left;
    int i = 0, j = 0;
    while (i < n1 && j < n2)
    {
        if (L[i] <= R[j])
        {
            arr[k] = L[i];
            i++;
        }
        else
        {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
    while (i < n1)
    {
        arr[k] = L[i];
        i++;
        k++;
    }
    while (j < n2)
    {
        arr[k] = R[j];
        j++;
        k++;
    }
}
```

#### **Avantajları:**

1.  **Hız:** O(n log n) zaman karmaşıklığı ile çalışır.
2.  **Stabil sıralama:** Algoritma stabildir, eşit elemanların sırası korunur.
3.  **Büyük veri setleri:** Büyük veri setlerinde çok iyi performans gösterir.

#### **Dezavantajları:**

1.  **Bellek kullanımı:** Ekstra bellek gerektirir, bu da yerinde sıralama yapmadığı anlamına gelir.
2.  **Karmaşıklık:** Algoritmanın mantığı ve uygulanması diğer basit algoritmalara göre daha karmaşıktır.
3.  **Recursive yapı:** Deep recursive çağrıları yoğun kullanımı **stack overflow** neden olabilir.

> Her bir algoritmanın **avantajlarını** ve **dezavantajlarını** anlamak, hangi algoritmanın hangi durumda en uygun olduğunu belirlemenize yardımcı olabilir.  
> **Bubble Sort** ve **Selection Sort** gibi algoritmaların daha basit ve eğitim amaçlı olduğunu,  
> **Quick Sort** ve **Merge Sort** gibi algoritmaların ise büyük ve karmaşık veri setlerinde daha etkili olduğunu unutmayın.  
> **Heap Sort** ise özellikle yığın veri yapılarıyla çalışırken tercih edilir.  
> **Insertion Sort** ise küçük veya neredeyse sıralı veri kümeleri için idealdir.

> **Sıralama algoritmalarının** bu geniş yelpazesini öğrenerek, **yazılım geliştirme** süreçlerinde doğru seçimler yapabilirsiniz. Bu bilgileri **ders materyallerinizde**, **kodlama projelerinizde** veya **algoritma** yarışmalarında rahatlıkla kullanabilirsiniz.

> *Özet şeklinde bahsettim fakat yine de uzun bir yazı oldu. Zaman ayırıp okuduğunuz için minnettarım. Sağlıcakla Kalın Dostlarım..*

### Kaynaklarım

-   [About of the Sorting Terminology](https://www.geeksforgeeks.org/sorting-algorithms/)
-   [Efficient Sorting Algorithms](https://en.wikipedia.org/wiki/Sorting_algorithm)
-   [Kavramlarla Sıralama](https://bilgisayarkavramlari.com/2008/08/09/siralama-algoritmalari-sorting-algorithms/)
-   [Sortings In Minutes Videos](https://www.youtube.com/@MichaelSambol/featured)
-   [Görsel Kaynaklar İçin](https://www.wikimedia.org/)
-   Special Thanks [Salih Cantekin](https://medium.com/u/5c4e866ce6ec) for this [playlist](https://www.youtube.com/watch?v=sdBM37iH2Lg&list=PLRp4oRsit1bwqwUOtT3ITHwd6YQ6To-Yz)!
