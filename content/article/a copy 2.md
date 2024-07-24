---
title: 'aqwq'
description: 'meta desc if about page' 
time: '2023-10-01 10:00 AM'
---

As you might notice, I recently added a sliding enter effect to almost all the pages in my blog. And I quite like it. If you missed it, refresh the page to see it in action.
正如你可能注意到的，我最近在我的博客中几乎所有的页面上都添加了滑动输入效果。我很喜欢它。如果你错过了它，刷新页面看看它的行动。

This effect is inspired by paco.me - the portfolio of Paco Coursey, one of my favorite developer-designers.
这个效果的灵感来自paco.me-Paco Coursey的作品集，他是我最喜欢的开发人员设计师之一。

In this blog post, let’s break it down and implement one our own.
在这篇博客文章中，让我们分解它并实现我们自己的。

Breakdown  击穿#
If you go inspecting the source code of paco.me, you will find that it’s implemented with CSS animation, and it’s quite concise:
如果你去检查paco.me的源代码，你会发现它是用CSS动画实现的，而且非常简洁：

@keyframes enter {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

[data-animate] {
  --stagger: 0;
  --delay: 120ms;
  --start: 0ms;
}

@media (prefers-reduced-motion: no-preference) {
  [data-animate] {
    animation: enter 0.6s both;
    animation-delay: calc(var(--stagger) * var(--delay) + var(--start));
  }
}

[data-animation-controller='false'] [data-animate] {
  animation: none;
}
And in the HTML usage, we have:
在HTML的使用中，我们有：

<p style="--stagger: 1" data-animate>Block 1</p>
<p style="--stagger: 2" data-animate>Block 2</p>
It defines a keyframe animation enter that slides the element up by 10px and fades, creating the gentle "floating" effect. The key point is the animation-delay property - assigning a different delay to each element/block, making them have the effect of enter one by one. Then, some CSS variables are used to make the the delay sequence easier to control.
它定义了一个关键帧动画 enter ，该动画将元素向上滑动10 px并逐渐消失，从而创建柔和的“浮动”效果。关键点是 animation-delay 属性-为每个元素/块分配不同的延迟，使它们具有逐个输入的效果。然后，一些CSS变量被用来使延迟序列更容易控制。

Applying to Contents  应用于内容#
Now with it, we should be able to add nice sliding enter animation to our layout and homepage, etc. Even though it can be a bit verbose to add style to each element, it gives you full control of what and when those animations take place.
现在有了它，我们应该能够添加漂亮的滑动进入动画到我们的布局和主页等，即使它可以有点冗长添加样式到每个元素，它给你完全控制什么和什么时候这些动画发生。

However, when it comes to content like a Markdown page, it will not be that pleasant to wrap each paragraph with a <p> tag and add the data-animate attribute. So I begin to wonder if there is an easier way to apply to all my posts.
然而，当涉及到像Markdown页面这样的内容时，用 <p> 标签包装每个段落并添加 data-animate 属性就不会那么令人愉快了。所以我开始想知道是否有一个更简单的方法来申请我所有的职位。

I started messing up with the CSS Counters, an interesting way allowing you to store some numeric variables inside of CSS.
我开始使用CSS计数器，这是一种有趣的方法，允许你在CSS中存储一些数值变量。

So it should be something like this, where you can add slide-enter-content class wrapping the generated content of a Markdown page:
所以它应该是这样的，你可以添加 slide-enter-content 类来包装Markdown页面的生成内容：

.slide-enter-content {
  counter-reset: enter-count;
}

.slide-enter-content > p {
  --stagger: 0;
  --delay: 150ms;
  --start: 0ms;
  animation: slide-enter 1s both 1;
  animation-delay: calc(var(--start) + var(--stagger) * var(--delay));
}

.slide-enter-content > p {
  counter-increment: enter-count;
  --stagger: counter(enter-count);
}
It all seems to make sense, but it actually doesn’t work. The reason is that the counter() function returns a string instead of a number and currently there is no way to convert it to a number, in which the calc() function will fail to compute. There are some discussions & proposals about this, but it seems not going to happen very soon.
这一切似乎都有道理，但实际上并不起作用。原因是 counter() 函数返回一个字符串而不是一个数字，目前没有办法将其转换为一个数字，其中 calc() 函数将无法计算。关于这一点有一些讨论和建议，但似乎不会很快发生。

So as a workaround, which also been posted in the previous link, we can use the nth-child() selector to achieve the same effect, manually:
因此，作为一种变通方法，我们可以手动使用 nth-child() 选择器来实现相同的效果：

.slide-enter-content > *{
  --stagger: 0;
  --delay: 150ms;
  --start: 0ms;
  animation: slide-enter 1s both 1;
  animation-delay: calc(var(--start) + var(--stagger)* var(--delay));
}

.slide-enter-content > *:nth-child(1) { --stagger: 1; }
.slide-enter-content >*:nth-child(2) { --stagger: 2; }
.slide-enter-content > *:nth-child(3) { --stagger: 3; }
.slide-enter-content >*:nth-child(4) { --stagger: 4; }
.slide-enter-content > *:nth-child(5) { --stagger: 5; }
.slide-enter-content >*:nth-child(6) { --stagger: 6; }
.slide-enter-content > *:nth-child(7) { --stagger: 7; }
.slide-enter-content >*:nth-child(8) { --stagger: 8; }
.slide-enter-content > *:nth-child(9) { --stagger: 9; }
.slide-enter-content >*:nth-child(10) { --stagger: 10; }
.slide-enter-content > *:nth-child(11) { --stagger: 11; }
.slide-enter-content >*:nth-child(12) { --stagger: 12; }
.slide-enter-content > *:nth-child(13) { --stagger: 13; }
.slide-enter-content >*:nth-child(14) { --stagger: 14; }
.slide-enter-content > *:nth-child(15) { --stagger: 15; }
.slide-enter-content >*:nth-child(16) { --stagger: 16; }
.slide-enter-content > *:nth-child(17) { --stagger: 17; }
.slide-enter-content >*:nth-child(18) { --stagger: 18; }
.slide-enter-content > *:nth-child(19) { --stagger: 19; }
.slide-enter-content >*:nth-child(20) { --stagger: 20; }
The limitation is clear, that the animation only applies to a finite number of elements. You could add more CSS rules to support more, but in practice, I think 20 elements are already quite enough as we don’t usually have that many paragraphs fit in one screen.
这个限制很明显，动画只适用于有限数量的元素。您可以添加更多CSS规则来支持更多内容，但实际上，我认为20个元素已经足够了，因为我们通常不会在一个屏幕中容纳那么多段落。

So that’s it, I have applied this effect to most of the pages as well as the blog posts. Let me know what do you think! And you can find the source code here.
就这样，我把这个效果应用到了大部分的页面和博客文章上。“你以为你赢了吗？你可以在这里找到源代码。
