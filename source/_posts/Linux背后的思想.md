---
title: 听林纳斯聊聊 Linux 背后的思想
date: 2021-03-12
categories: 计算机基础
tags: [Linux, 人物]
---

> Linus Torvalds，一个任何极客都不会陌生的名字，Linux之父、Git之父，大神在计算机领域的影响力可以说是划时代的。那么在这些传奇的背后蕴藏着怎样的思想呢？下面这个Linus2016年时在TED上接受的一次访谈或许能让我们对Linux背后的思想略窥一二。

<!--more-->

### 一、传奇的诞生

1991年的8月25日，一个刚进入赫尔辛基大学不久的21岁学生在学校的邮箱列表中公开了这样一封邮件：“What would you like to see most in minix —— small poll for my new operation system”，在邮件中他这么写道：“我正在开发一个（免费的）操作系统 ...... 这只是出于爱好，不会像gnu那样庞大和专业 ...... 我现在已经移植了bash和gcc ...... 看起来几个月之内就会有实质性的进展”。1991年9月，他通过大学的FTP服务器发布了这个叫Freax的操作系统，随后它被重新命名为我们今天所熟知的名字：Linux。

时至今日，我想我们已无需再多去赘述Linux产生的影响和它划时代的意义，我更想来聊聊的是Linus另一个对世界影响至深的理念——开源。

Software is like sex, It‘s better when it’s free. —— Linus Torvalds

26年后，当Linus描述起一开始建立Linux项目时的工作情况，他说：“Linux最初并不是一个团队合作的产物”，这个操作系统最初只是作为众多为他自己服务的一系列项目中的一个，仅仅是一个因为个人需要而开发的产物。接下来当项目逐渐成长起来，需要获得别人的一些认可和意见，他才逐渐把源码放开，“我已经在这个项目上努力半年了，快来看看我的成果”。在那时，也没有使用什么开源方法或是改进项目的手段，只是不同的人贡献了一些不同的代码，让你觉得，“噢，我从来没有想过可以这样，这样竟然可以让项目获得改进”。不久之后，Linus将其加入了FSF（ 自由软件基金 ）的 GNU 计划中，使用流行的开源许可证，避免了商业或其他的因素参与导致的负面影响，也同时允许用户合法的免费使用、拷贝并且改动程序。今天，Linux 内核是地球上目前为止最活跃的开源项目，是服务器端处于支配地位的操作系统，是 Android 的基础。世界上所有的超级计算机都跑在 Linux 上，包括 NASA 的集群和SpaceX的引擎。

### 二、开源的力量

最开始的时候，人们并不是向项目直接贡献代码，人们更多的是贡献自己的想法。Linus原本是不喜欢有人打扰自己的工作的，对他来说，哪怕是电脑主机都不需要性能多强劲，只需要做到绝对的安静就好。所以当人们开始评论、开始对代码提供反馈信息的时候，突然就会让人耳目一新，这是一种崭新的时刻，“I Love Other People”！ 

不知道为何，好像所有的Geek都不是社交达人，Linus的姐姐（或许是妹妹）说过，他最大的异常特征是从不参与众人的行动，独自沉浸在计算机，沉浸在数学，沉浸在物理学这些他擅长的领域中。不过开源最核心的理念之一就是它非常鼓励不同的人一起合作，不见得需要互相喜欢对方，甚至可能互相都瞧不上，但是大家可以有非常热烈的非常专业的争论，这就是开源的魅力。

早期，Linus是担心商业带来的负面影响的，所以他反对软件专利，认为商业人士是来利用你的工作的。但是，他渐渐发现这些商业人士完成了他完全不感兴趣的事情，在完全基于不同的目标，商业使用开源的方式只是专注技术的大神自己刚好不想走的路，“我关心技术，同时有些人关心UI，但我不会去做UI来拯救我的人生。如果我被困在岛屿上，同时唯一的脱困方式是做一个漂亮的UI，那我肯定会死在那儿的”。Linus自己也承认，如果没有全力投入到开源，并且真得放开手，Linux永远也不可能是现在的样子。可能像谷歌这样的公司利用Linus的开源软件赚了好几亿美元，但对他自己来说，他做了正确的选择。

时至今日，开源机制能够运转良好，其中很重要的一个缘故是代码可以将所有的事情都转化为黑和白（1和0）。通常这样利于作出决定，代码要么执行，要么不执行，因此意味着更少的争议空间。当然，你也能将同样的原则应用到其它领域的一些地方（比如科研、学术），因为黑色和白色混合在一起不只是变成灰色，而是很多不同的颜色。

### 三、优雅的品味

在Coding的领域，你不仅仅只需要打代码，还要对代码有好的品位。我们可以看看下面这个调用单向链表的例子：

你是希望用if语句有一个特殊情况处理一个特殊情况，

```c
void remove_list_entry(entry)
{
    prev = NULL;
    walk = head;    // Walk the list
    while (walk != entry){
        prev = walk;
        walk = walk->next;
    }    //Remove the entry by updating the head or the previous entry
    if(!prev)
        head = entry->next;
    else
        prev->next = entry->next;
}
```

还是直接通过指针变量指向next地址？

```c
void remove_list_entry(entry)
{
    //The "indirect" pointer points to the address of the thing we'll update
    indirect = &head;
    //Walk the list,looking for the thing that points to the entry we want to remove
    while ((*indirect) != entry)
        indirect = &(*indirect)->next;
        *indirect = entry->next    // .. and just remove it
}
```

CS 101，当碰到一个问题时，可以通过不同的方式被重写，移除一个特殊的情形恢复正常，就是好的代码。

"Good taste is much bigger than clever or stupid. Good taste is about really seeing the big patterns and kind of instinctively knowing what's the right way to do things." 

### 四、脚踏实地

人们常常把特斯拉和爱迪生拿来对比。特斯拉是有远见的有疯狂创意的科学家，人们爱特斯拉（不然怎么满大街的毛豆3呢）。爱迪生则是一个常常被批评为乏味的人。但大神更崇尚后者，“Genius is one percent inspiration and 99 percent perspiration”，爱迪生也许不是一个很好的人，但他的努力帮助他完成很多不平凡的事情。

“I am not a visionary, I do not have a five-year plan. I'm an engineer. And I'm perfectly happy with all the people who are walking around and just staring at the clouds and looking at the stars and saying, 'I want to go there'. But I'm looking at the ground, and I want to fix the pothole that's right in front of me before I fall in. This is the kind of person I am“。

### 五、笔者的其他一些废话

“I do code for fun, but I also want to code for something meaningful”，纵观整篇访谈，这是让我印象最深的一句话。技术是为了实现目标、解决问题而存在的，我始终相信，我们创造出的每一个程序都应该有自己存在的价值和意义。大家是不是都听过一种说法，CV工程师，复制-->粘贴，每天重复、机械的劳动，就和10年前的文员一样，整天CRUD，却离自己的初心渐行渐远。这是在尊重技术，还是只是为了名和利呢？

在知乎上看到这样一句话，让人感慨良多，它是这么说的：开源让更多人获取到技术，同时也让该技术和会该技术的劳动力变的廉价，以至于在资本家的眼里，那根本不叫技术。可能这的确是事实，大环境也决并非独立个体所能改变的，我们改变不了攫取价值的资本家，所能做的只是尽力向Linus那样去创造价值、贡献价值，To Make Someting Useful and Meaningful。我想，我们努力奋斗是为了更好地实践、创造和分享，这才是我们应有的初衷，这才是我们存在的意义。

第一次写长文，难免有些生疏，有些语句不通也请见谅。遗憾自己书读的还是不够多，见识还是不够广，唯有加紧努力让拥有的能力赶上自己的心气。访谈的原视频放在下面了，有什么问题欢迎及时指正。

### 六、TED 访谈视频

<div style="position: relative; width: 100%; height: 0; padding-bottom: 75%;">
    <iframe src="//player.bilibili.com/player.html?bvid=BV1w7411Z71f"  scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;"></iframe>
</div>
