---
title: "Sorting Algorithms 101"
slug: "siralama-algoritmalari-101"
lang: "en"
date: "2024-06-21"
category: "Algorithms"
excerpt: "Bubble, Selection, Insertion, Merge, Quick, and Heap Sort — how the core sorting algorithms work, and their complexity analysis."
readTime: "5"
coverImage: "/images/blog/siralama-algoritmalari-101/img-01.webp"
mediumUrl: "https://medium.com/@hsynkrcf/s%C4%B1ralama-algoritmalar%C4%B1-101-72107f49f698"
tags: ["development", "csharp", "education", "sorting-algorithms", "algorithms"]
---
You'll learn the core, essential fundamentals of **Bubble Sort, Selection Sort, Quick Sort, Insertion Sort, Heap Sort, and Merge Sort**.

![](/images/blog/siralama-algoritmalari-101/img-01.webp)

**For developers**, sorting algorithms play a **vital** role in **data processing** and **optimization**. In this article, we'll briefly cover the **six most important sorting algorithms**, ones that offer effective solutions across different scenarios and datasets, along with their core characteristics and use cases.

### Bubble Sort

**Bubble Sort** is one of the simplest sorting algorithms. It works on the principle of repeatedly **comparing** adjacent elements and **swapping** them when needed. This algorithm is mostly used for small datasets and for teaching purposes.

![Bubble Sort Example](/images/blog/siralama-algoritmalari-101/img-02.gif)
*Bubble Sort Example*

#### Bubble Sort Implementation (C#)

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

#### **Advantages:**

1.  **Simplicity:** The algorithm's logic is very simple and easy to understand.
2.  **Low memory usage:** Requires no extra memory — it's an in-place sort.
3.  **Good for small datasets:** Delivers acceptable performance on small, nearly sorted datasets.

#### **Disadvantages:**

1.  **Inefficiency:** Can be very slow for large datasets (O(n²)).
2.  **Suboptimal usage:** Other, more efficient algorithms are generally recommended instead.
3.  **Low performance:** Runs slowly in the average and worst cases.

### Selection Sort

**Selection Sort** finds the **smallest** or **largest** element at each step and places it at the front of the unsorted portion. It's a slow algorithm, but it's quite easy to understand.

![Selection Sort Example](/images/blog/siralama-algoritmalari-101/img-03.gif)
*Selection Sort Example*

#### Selection Sort Implementation (C#)

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

#### **Advantages:**

1.  **Simplicity:** Easy to understand and implement.
2.  **Low memory usage:** Requires no extra memory — it's an in-place sort.
3.  **Nearly sorted data:** Can be efficient when most of the dataset is already sorted.

#### **Disadvantages:**

1.  **Inefficiency:** Slow for large datasets (O(n²)).
2.  **Unstable sort:** The algorithm isn't stable, meaning the order of equal elements can change.
3.  **Suboptimal usage:** More efficient algorithms are generally preferred.

### Quick Sort

**Quick Sort** is one of the fastest sorting algorithms, working on a **divide-and-conquer** approach. It's highly effective on **large datasets** and is used in many **standard libraries**.

![Quick Sort Example](/images/blog/siralama-algoritmalari-101/img-04.gif)
*Quick Sort Example*

#### Quick Sort Implementation (C#)

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

#### **Advantages:**

1.  **Speed:** Very fast on average (O(n log n)).
2.  **In-place sorting:** Requires no extra memory.
3.  **General purpose:** Performs well on both large and small datasets.

#### **Disadvantages:**

1.  **Worst-case performance:** Can take O(n²) in the worst case, especially with poor pivot selection.
2.  **Recursive structure:** Heavy use of deep recursive calls can cause a **stack overflow**.
3.  **Unstable sort:** The algorithm isn't stable — the order of equal elements can change.

### Insertion Sort

**Insertion Sort** is quite efficient on small datasets and works in a way similar to **sorting a hand of cards**. **At each step**, an element is picked and placed into its correct position.

![Insertion Sort Example](/images/blog/siralama-algoritmalari-101/img-05.gif)
*Insertion Sort Example*

#### Insertion Sort Implementation (C#)

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

#### **Advantages:**

1.  **Simplicity:** Easy to understand and implement.
2.  **Good for small datasets:** Runs very fast on small, nearly sorted datasets.
3.  **In-place sorting:** Requires no extra memory.

#### **Disadvantages:**

1.  **Inefficiency:** Slow for large datasets (O(n²)).
2.  **Unstable sort:** The algorithm isn't stable — the order of equal elements can change.
3.  **Suboptimal usage:** More efficient algorithms should be preferred for large datasets.

### Heap Sort

**Heap Sort** is a sorting algorithm that works using a priority-queue-style data structure. It aims to reduce complexity by using the heap data structure. This algorithm can be effective on large datasets.

![Heap Sort Example](/images/blog/siralama-algoritmalari-101/img-06.gif)
*Heap Sort Example*

#### Heap Sort Implementation (C#)

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

#### **Advantages:**

1.  **Speed:** Runs with O(n log n) time complexity.
2.  **In-place sorting:** Requires no extra memory.
3.  **General purpose:** Performs well on both small and large datasets.

#### **Disadvantages:**

1.  **Complexity:** Its logic and implementation are more complex than other simpler algorithms.
2.  **Unstable sort:** The algorithm isn't stable — the order of equal elements can change.
3.  **Harder to implement:** More difficult to implement than other, simpler algorithms.

### Merge Sort

**Merge Sort** is another effective sorting algorithm that works on the **divide-and-conquer** approach. It works through **splitting and merging** steps and is highly effective on **large datasets**.

![Merge Sort Example](/images/blog/siralama-algoritmalari-101/img-07.gif)
*Merge Sort Example*

#### Merge Sort Implementation (C#)

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

#### **Advantages:**

1.  **Speed:** Runs with O(n log n) time complexity.
2.  **Stable sort:** The algorithm is stable — the order of equal elements is preserved.
3.  **Large datasets:** Performs very well on large datasets.

#### **Disadvantages:**

1.  **Memory usage:** Requires extra memory, meaning it doesn't sort in place.
2.  **Complexity:** Its logic and implementation are more complex than other simpler algorithms.
3.  **Recursive structure:** Heavy use of deep recursive calls can cause a **stack overflow**.

> Understanding the **advantages** and **disadvantages** of each algorithm can help you decide which algorithm is best suited to which situation.
> Keep in mind that algorithms like **Bubble Sort** and **Selection Sort** are simpler and better suited for teaching purposes,
> while algorithms like **Quick Sort** and **Merge Sort** are more effective on large, complex datasets.
> **Heap Sort**, meanwhile, is preferred especially when working with heap data structures.
> **Insertion Sort** is ideal for small or nearly sorted datasets.

> By learning this broad range of **sorting algorithms**, you can make better decisions throughout your **software development** process. Feel free to put this knowledge to use in your **course materials**, **coding projects**, or **algorithm** competitions.

> *I meant to keep this brief, but it still turned into a long article. I'm grateful you took the time to read it. Take care, friends...*

### My Sources

-   [About of the Sorting Terminology](https://www.geeksforgeeks.org/sorting-algorithms/)
-   [Efficient Sorting Algorithms](https://en.wikipedia.org/wiki/Sorting_algorithm)
-   [Sorting Explained with Concepts](https://bilgisayarkavramlari.com/2008/08/09/siralama-algoritmalari-sorting-algorithms/)
-   [Sortings In Minutes Videos](https://www.youtube.com/@MichaelSambol/featured)
-   [For Visual Resources](https://www.wikimedia.org/)
-   Special Thanks [Salih Cantekin](https://medium.com/u/5c4e866ce6ec) for this [playlist](https://www.youtube.com/watch?v=sdBM37iH2Lg&list=PLRp4oRsit1bwqwUOtT3ITHwd6YQ6To-Yz)!
