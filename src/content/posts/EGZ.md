---
title: EGZ
published: 2025-09-22
description: ''
image: ''
tags: [数论,定理]
category: 数学
draft: false 
lang: ''
---
# Erdős-Ginzburg-Ziv 定理

## 内容

对于 $2 \times n - 1$ 个数 $a_1, a_2, \cdots a_{2 \times n - 1}$，总可以从中选出 $n$ 个数使它们的总和为 $n$ 的倍数。
## 证明

### $\text{I}$

**首先证明 $n$ 为素数**，这个稍微弱一点的结论。

我们可以先将这 $2 \times n - 1$ 个数全 $\operatorname{mod} n$ 得 $0 \le a_1 \le a_2 \le \cdots \le a_{2 \times n - 1} < n$。

1. **$\exists a_x = a_{x+n-1}(x \le n)$**
    这显然是成立的，因为至少有 $n$ 个相同的数出现，$\sum_{i=x}^{x+n-1} \equiv 0 (\operatorname{mod}n)$。

2. **$\forall a_x \ne a_{x+n-1}(x \le n)$**\
    考虑证明一个更强的结论：$\forall w, \exists A \in{a_1,a_2,\cdots a_{2 \times n - 1}},| A | = n, \sum_{x \in A} x \equiv w (\operatorname{mod} n)$。\
    设集合 $S_i=\{a_i,a_{i+n-1}\}(i \le n)$。特殊的 $S_n=\{ a_{2 \times n -1} \}$\
    取 $B_i=S_1+ S_2+ \cdots +S_i(i < n)$ 组成不可重集合，即模 $n$ 意义下的和集。\
    $\because{a_1 \ne a_n} \therefore{| B_1 | =2}$\
    稍微手模几组便会发现一个结论为 $| B_i | \ge i+1$。接下来让我们证明一下。\
    考虑反证法。假设 $| B_i | > i+1$ 即 $|B_i| \ge i$。\
    首先 $| B_{i-1} | \le | B_i | $ 因为将 $S_i$ 加入 $B$ 中后答案不可能减小。\
    设 $x$ 为满足 $| B_x | \ge x$ 的最小整数。又有 $|B_{x-1}| \le |B_i|$。\
    联立一下可得 $x \le |B_{x-1}| \le |B_i| \le x$。从而推出 $|B_{x-1}| = |B_i| = x$。\
    设 $C = B_{x-1} +\{a_x\},D = B_{x}+\{a_{x+n-1}\}$。可得 $C=B (\operatorname{mod} n)$。\
    $\because \forall{a_i \ne a_{i+n-1}(i \le n)}$ 且对一个模 $n$ 意义下的环进行两次位移量不同的平移得到的两个环必然不同。\
    $\therefore$ 当且仅当 $C$ 是模 $n$ 意义下的完系，才可能 $C=D(\operatorname{mod}n)$。\
    而 $x < n$，所以 $C$ 不可能为模 $n$ 意义下的完系。与假设的条件不相符，所以得证。
### $\text{II}$

既然证明了 $n$ 为素数，我们可以证明**原结论具有积性**。\
如果一个命题是积性的，则若对于素数 $n,m$ 成立，那么对于 $n\times m$ 也成立。

从 $a_1,a_2,\cdots ,a_{2 \times n \times m-1}$ 中取 $n\times m$ 个数。\
首先取 $2 \times n - 1$ 个数。其中定有 $n$ 个数满足结论。\
设这 $n$ 个数为 $a_1,a_2,\cdots ,a_n$，它们满足 $n \mid \sum_{i=1}^{n} a_i$。\
再取 $a_{n+1},a_{n+2},\cdots,a_{3\times n -1}$ 这 $2 \times n - 1$ 个数。其中也定有 $n$ 个数满足结论，则它们满足$n \mid \sum_{i=n+1}^{2\times n} a_i$\
这样一直做下去可得：$n \mid \sum_{i=k\times n +1}^{(k+1)\times n} a_i(0\le k \le 2 \times m -2)$。\
而这一共有 $2\times m -1$ 组，且 $m$ 对于上述结论也成立，所以可以在这 $2\times m - 1$ 组中取出 $m$ 组满足它们的和为 $m$ 的倍数。\
这其中一共有 $n\times m$ 既满足是 $n$ 的倍数也满足是 $m$ 的倍数。

所以这个结论是有积性的。

### $\text{III}$

有了前两个结论以后，最后一步就很简单了。\
对于任意一个 $n$，将它做质因数分解得到 $n = p_{1}^{q_1}\times p_{2}^{q_2} \times \cdots \times p_{k}^{q_k}$。而原结论是有积性的，所以对于 $p_{1}^{q_1},p_{2}^{q_2},\cdots,p_{k}^{q_k}$ 均成立。从而得到对于 $p_{1}^{q_1}\times p_{2}^{q_2} \times \cdots \times p_{k}^{q_k}$ 成立，即对于任意一个 $n$ 都满足Erdős-Ginzburg-Ziv 定理。


## 运用

[CF](https://codeforces.com/contest/1798/problem/F)[1798F](https://www.luogu.com.cn/problem/CF1798F)