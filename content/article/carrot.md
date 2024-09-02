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

排序算法（如冒泡排序、快速排序、归并排序等）
 
::code-tab{:tabs='["bubble", "quick", "merge"]'}

#bubble
```javascript
function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}
```

#quick
```javascript
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const right = arr.filter(x => x > pivot);
  return [...quickSort(left), pivot, ...quickSort(right)];
}
```

#merge
```javascript
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);
  return merge(mergeSort(left), mergeSort(right));
}
```
::

搜索算法（如二分查找、深度优先搜索、广度优先搜索等）
动态规划
贪心算法
字符串处理
递归与迭代
时间复杂度和空间复杂度分析
