--- 
title: 'Algorithm'
description: '--' 
time: '2024-09-01'
tag: '#Algorithm'
---


基本数据结构（如数组、链表、栈、队列、树、图等）

## 数组和链表的区别

```markdown
内存分配:
数组: 连续的内存空间，一次性分配。
链表: 非连续的内存空间，可以动态分配。

数据访问:
数组: O(1) 时间复杂度，可以直接通过索引访问元素。
链表: O(n) 时间复杂度，需要从头节点遍历到目标位置。

插入和删除操作:
数组: 在末尾插入/删除是 O(1)，但在中间插入/删除需要 O(n)，因为要移动其他元素。
链表: 在已知位置插入/删除都是 O(1)，只需要调整指针。

大小:
数组: 在 JavaScript 中，数组大小可以动态调整，但在一些语言中是固定的。
链表: 大小可以动态变化，没有固定限制。

内存使用:
数组: 可能会有未使用的预分配空间。
链表: 只占用实际需要的空间，但每个节点需要额外空间存储指针。

实现难度:
数组: 实现简单，JavaScript 原生支持。
链表: 需要自行实现，相对复杂。

应用场景:
如果需要频繁的随机访问，数组更合适；
如果需要频繁的插入和删除操作，尤其是在数据的开头或中间，链表可能更有优势。
```

排序算法

  冒泡排序 (Bubble Sort)

  选择排序 (Selection Sort)

  插入排序 (Insertion Sort)

  归并排序 (Merge Sort)

  快速排序 (Quick Sort)

  堆排序 (Heap Sort)

  计数排序 (Counting Sort)

  桶排序 (Bucket Sort)

  基数排序 (Radix Sort)

  希尔排序 (Shell Sort)
 
::code-tab{:tabs='["Bubble", "Selection", "Insertion", "Merge", "Quick", "Heap", "Counting", "Bucket", "Radix", "Shell"]'}

#Bubble
```javascript
/**
 * 冒泡排序
 * 时间复杂度: O(n^2)
 * 空间复杂度: O(1)
 * 稳定性: 稳定
 */
function bubbleSort(arr) {
  const n = arr.length;
  // 外层循环控制排序轮数
  for (let i = 0; i < n - 1; i++) {
    // 内层循环比较相邻元素
    for (let j = 0; j < n - i - 1; j++) {
      // 如果前一个元素大于后一个元素，则交换它们
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}
```

#Selection
```js
/**
 * 选择排序
 * 时间复杂度: O(n^2)
 * 空间复杂度: O(1)
 * 稳定性: 不稳定
 */
function selectionSort(arr) {
  const n = arr.length;
  // 外层循环控制已排序部分的边界
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    // 内层循环寻找未排序部分的最小元素
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    // 将找到的最小元素与边界元素交换
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  return arr;
}
```

#Quick
```javascript
/**
 * 快速排序
 * 时间复杂度: 平均 O(n log n)，最坏 O(n^2)
 * 空间复杂度: O(log n)
 * 稳定性: 不稳定
 */
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  
  // 选择中间元素作为基准
  const pivot = arr[Math.floor(arr.length / 2)];
  
  // 将数组分成三部分：小于基准、等于基准、大于基准
  const left = arr.filter(x => x < pivot);
  const middle = arr.filter(x => x === pivot);
  const right = arr.filter(x => x > pivot);
  
  // 递归排序左右两部分，并与中间部分合并
  return [...quickSort(left), ...middle, ...quickSort(right)];
}
```

#Insertion
```javascript
/**
 * 插入排序
 * 时间复杂度: O(n^2)
 * 空间复杂度: O(1)
 * 稳定性: 稳定
 */
function insertionSort(arr) {
  const n = arr.length;
  // 从第二个元素开始，将其插入到已排序的部分
  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;
    // 将大于key的元素向右移动
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    // 在正确的位置插入key
    arr[j + 1] = key;
  }
  return arr;
}
```

#Merge
```javascript
/**
 * 归并排序
 * 时间复杂度: O(n log n)
 * 空间复杂度: O(n)
 * 稳定性: 稳定
 */
function mergeSort(arr) {
  // 基本情况：数组长度为1或0时已经排序
  if (arr.length <= 1) return arr;
  
  // 将数组分成两半
  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);
  
  // 递归排序两半，然后合并
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;
  
  // 比较两个数组的元素，将较小的元素放入结果数组
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }
  
  // 将剩余的元素添加到结果数组
  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}
```

#Heap
```js
/**
 * 堆排序
 * 时间复杂度: O(n log n)
 * 空间复杂度: O(1)
 * 稳定性: 不稳定
 */
function heapSort(arr) {
  buildMaxHeap(arr);
  // 从最后一个元素开始，逐个将堆顶元素（最大值）放到数组末尾
  for (let i = arr.length - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, 0, i);
  }
  return arr;
}

function buildMaxHeap(arr) {
  const n = arr.length;
  // 从最后一个非叶子节点开始，自下而上构建最大堆
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, i, n);
  }
}

function heapify(arr, i, heapSize) {
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  let largest = i;

  // 找出父节点、左子节点、右子节点中的最大值
  if (left < heapSize && arr[left] > arr[largest]) {
    largest = left;
  }
  if (right < heapSize && arr[right] > arr[largest]) {
    largest = right;
  }

  // 如果最大值不是父节点，则交换并继续向下调整
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, largest, heapSize);
  }
}
```

#Counting
```js
/**
 * 计数排序
 * 时间复杂度: O(n + k)，其中k是数值范围
 * 空间复杂度: O(k)
 * 稳定性: 稳定
 */
function countingSort(arr) {
  const max = Math.max(...arr);
  const min = Math.min(...arr);
  const range = max - min + 1;
  const count = new Array(range).fill(0);
  const output = new Array(arr.length);

  // 统计每个元素出现的次数
  for (let i = 0; i < arr.length; i++) {
    count[arr[i] - min]++;
  }

  // 计算累积次数
  for (let i = 1; i < range; i++) {
    count[i] += count[i - 1];
  }

  // 从后向前遍历原数组，将元素放入正确的位置
  for (let i = arr.length - 1; i >= 0; i--) {
    output[count[arr[i] - min] - 1] = arr[i];
    count[arr[i] - min]--;
  }

  return output;
}
```

#Bucket
```js
/**
 * 桶排序
 * 时间复杂度: 平均 O(n + k)，最坏 O(n^2)，其中k是桶的数量
 * 空间复杂度: O(n + k)
 * 稳定性: 稳定
 */
function bucketSort(arr, bucketSize = 5) {
  if (arr.length === 0) {
    return arr;
  }

  // 确定桶的范围
  const minValue = Math.min(...arr);
  const maxValue = Math.max(...arr);
  
  // 创建桶
  const bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
  const buckets = new Array(bucketCount);
  for (let i = 0; i < buckets.length; i++) {
    buckets[i] = [];
  }
  
  // 将元素分配到桶中
  for (let i = 0; i < arr.length; i++) {
    const bucketIndex = Math.floor((arr[i] - minValue) / bucketSize);
    buckets[bucketIndex].push(arr[i]);
  }

  // 对每个桶进行排序，然后合并
  const sortedArray = [];
  for (let i = 0; i < buckets.length; i++) {
    insertionSort(buckets[i]);
    sortedArray.push(...buckets[i]);
  }

  return sortedArray;
}

// 使用插入排序对每个桶进行排序
function insertionSort(arr) {
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}
```

#Radix
```js
/**
 * 基数排序
 * 时间复杂度: O(d(n + k))，其中d是最大数的位数，k是基数（这里是10）
 * 空间复杂度: O(n + k)
 * 稳定性: 稳定
 */
function radixSort(arr) {
  // 找出最大数，确定位数
  const max = Math.max(...arr);
  // 对每一位进行计数排序
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    countingSortByDigit(arr, exp);
  }
  return arr;
}

function countingSortByDigit(arr, exp) {
  const n = arr.length;
  const output = new Array(n).fill(0);
  const count = new Array(10).fill(0);

  // 统计每个数字出现的次数
  for (let i = 0; i < n; i++) {
    count[Math.floor(arr[i] / exp) % 10]++;
  }

  // 计算累积次数
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }

  // 构建输出数组
  for (let i = n - 1; i >= 0; i--) {
    output[count[Math.floor(arr[i] / exp) % 10] - 1] = arr[i];
    count[Math.floor(arr[i] / exp) % 10]--;
  }

  // 将排序后的数组复制回原数组
  for (let i = 0; i < n; i++) {
    arr[i] = output[i];
  }
}
```

#Shell
```js
/**
 * 希尔排序
 * 时间复杂度: 取决于间隔序列，最坏 O(n^2)，最好 O(n log n)
 * 空间复杂度: O(1)
 * 稳定性: 不稳定
 */
function shellSort(arr) {
  const n = arr.length;
  // 初始间隔设为数组长度的一半，每次减半
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    // 对每个子序列进行插入排序
    for (let i = gap; i < n; i++) {
      let temp = arr[i];
      let j;
      for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
        arr[j] = arr[j - gap];
      }
      arr[j] = temp;
    }
  }
  return arr;
}
```
::

搜索算法（如二分查找、深度优先搜索、广度优先搜索等）
动态规划
贪心算法
字符串处理
递归与迭代
时间复杂度和空间复杂度分析
