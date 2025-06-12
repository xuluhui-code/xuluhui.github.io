---
title: tree
published: 2025-06-11
description: ''
image: ''
tags: [tree,算法]
category: '算法'
draft: false 
lang: ''
---

# dfs 序

对于一棵树，我们从根节点处开始 dfs，过程中在每个点第一次遇到的时候把它记录下来，就得到了一棵树的 dfs 序，一般记作 dfn。

它有一个优势在于一棵子树中的节点在 dfs 序上是连续的，这可以帮我们解决很多子树修改、子树查询问题。

---

## 例题：
## 子树加子树求和

给出一棵 $n$ 个节点的树，以 $1$ 为根，初始时所有点的点权均为 $0$，$q$ 次操作，每次操作给出 $u,x$，你需要给子树 $u$ 中的所有点点权都加上 $x$，然后输出子树 $u$ 的点权和。

$1\le n,q\le 5\times10^5$

---

求出树的 dfn 后该问题就变成了区间加、区间求和问题，线段树维护即可。

---

## [Nearest Leaf](https://www.luogu.com.cn/problem/CF1110F)

Difficulty:$2600$


给定一棵树，边有边权，保证其有一种 dfn 为 $1,2,3,\dots ,n$。

保证 $1$ 号节点不是叶子。

$m$ 次询问，每次给定 $x,l,r$，你需要求出 $\min\limits_{i\in [l,r],i \text{是叶子}}dis(x,i)$ 。

$3\le n\le 5\times10^5,1\le m\le 5\times 10^5$

---

考虑一个弱化的问题：如果查询的始终是根节点，那么我们只需求出每个点到根节点的距离，然后查询就变成了一个区间最小值问题。

回到原题，此处涉及一个换根的问题，如果要把根节点换成一个相邻的节点，经过一条长度为 $l$ 的边到 $u$，那么每个 $u$ 子树内的点，它到根的距离会减少 $l$，其余节点到根的距离会增加 $l$，这就是一个子树加减的操作，所以直接用线段树维护子树加，子树最小值即可。

---

# 欧拉序

在上述 dfs 的过程中，每次进入一个节点就把它记下来，得到的长度为 $2(n-1)$ 的序列为欧拉序。

如果把欧拉序首尾拼接可以得到一个环，选择不同的断点可以得到不同的根下所得的欧拉序，所以欧拉序的换根是方便的。

---

# 最近公共祖先

$u,v$ 的公共祖先中深度最大的节点被称为 $u,v$ 的最近公共祖先，一般记作 $\operatorname{lca}(u,v)$。

---

在欧拉序中，设 $u,v$ 最早出现的位置分别为 $idx_u,idx_v$，不妨设 $idx_u\le idx_v$，那么它们的 $\operatorname{lca}$ 一定出现在 $[idx_u,idx_v]$ 中，而更浅的祖先不会，所以这就转化为了一个区间最小值问题，可以配合 ST 表做到 $O(1)$ 求 LCA。

在 dfn 中，$[idx_u,idx_v]$ 中一定会出现它们 $\operatorname{lca}$ 的一个子节点，那么我们也只需求出区间最小值，然后返回它的父亲节点即可，注意要特判 $v$ 在 $u$ 子树中的情况，或者，你也可以询问 $[idx_u+1,idx_v]$ 中的最小值，这样只需要特判 $u=v$ 就可以。

---

考虑对于每个节点，我们预处理出他的所有 $2^k$ 级节点。

对于两个相同深度的节点，我们可以将 $k$ 从 $\log_2n$ 起依次减少，每次判断 $u,v$ 的 $2^k$ 级祖先是否相同，如果不同，则将 $u,v$ 同时跳到它们的 $2^k$ 级祖先，最后再求出 $u,v$ 两者的父亲即可。

对于两个深度不同的节点，我们可以先将深度较大的节点向上跳到和另一节点同一高度，然后再用上面的做法。

这个做法是单 $\log$ 的。

---

## [Company](https://www.luogu.com.cn/problem/CF1062E)

Difficulty:$2300$

给定一颗树，有若干个询问，每个询问给出 $l$，$r$，要求编号为 $l\sim r$ 的点任意删去一个之后剩余点的 $\operatorname{lca}$ 深度最大，输出删去点的编号和 $\operatorname{lca}$ 的最大深度。

$2\le n\le10^5,1\le q\le 10^5$

可以做到 $O(n\log n+q)$。

---

考虑区间 $\operatorname{lca}$ 怎么求，可以用 st 表或线段树维护，这样的预处理时间复杂度是 $O(n\log^2n)$ 的。

但是这个区间的 $\operatorname{lca}$ 实际上等于其中在 dfn 中的 idx 最大、最小的两个节点的 $\operatorname{lca}$，可以用 dfn 求 $\operatorname{lca}$ 的方法直接证明。

所以可以做到 $O(n\log n)$ 预处理，$O(1)$ 查询。

那么题目中的去掉一个点就是去掉 idx 最大或最小的点，简单分讨即可。

---

# 树上距离

一般定义树上两点之间的唯一一条简单路径的长度为这两点之间的距离。

不妨设每个点 $x$ 到根的距离为 $dep_x$，则 $u,v$ 之间的距离为 $dep_u+dep_v-2dep_{\operatorname{lca}(u,v)}$，可以 $O(1)$ 求出。

---

# 树的直径

（以下的讨论建立于树的边权均为非负数的情况）

树上最长的链为这棵树的直径，直径可以有多条。

在前面已经讲了一个换根，维护所有点到根的距离的方式，显然可以做到 $O(n\log n)$ 求直径，但是，还能再强一点吗？

---

不妨让我们先发现一下直径的性质，我们可以发现：

对于每个节点 $u$，以 $u$ 为一端的最长链另一端一定是直径的一端，否则可以考虑把这条链的另一端接到直径上去。

---

于是我们可以得到一个极简做法：

随便找一个点，求出离它最远的点，这个点即直径的一个端点。

然后再求出离这个端点最远的一个点，就是直径的另一个端点。

时间复杂度 $O(n)$。

---

当然，也不难想到一个 dp 做法，即对于每一个节点，求出它跟子树内离它最远的点之间的距离，然后把两条拼接成一条，不难得到直径，时间复杂度也是 $O(n)$ 的。

---

或者，我们考虑一条路径的长度为 $dep_u+dep_v-2dep_{\operatorname{lca}(u,v)}$，在欧拉序上，我们只需找到三个位置 $p\le q\le r$，使得 $dep_p+dep_r-2dep_q$ 最大即可，可以转化为欧拉序上 dp。

---

## 例题：区间直径

给定一棵树，设 $\operatorname{dis}(x,y)$ 表示节点 $x,y$ 在树上的距离。

$q$ 次询问，每次给出 $l,r$，求：

$$\max_{l\le x,y\le r}\operatorname{dis}(x,y)$$

$1\le n\le 2\times10^5,1\le q\le 10^6$

---

直径是可合并的，如果两个点集中的直径分别为 $\{p,q\},\{u,v\}$，那么两个点集的并集的直径两个端点必定是 $p,q,u,v$ 中的两个，凭借这个性质，我们可以 $O(1)$ 合并两个点集的直径。

结合 ST 表可以做到 $O(n\log n)$ 预处理，$O(1)$ 查询区间直径。

---

## [Dynamic](https://www.luogu.com.cn/problem/CF1192B)[ Diameter](https://www.luogu.com.cn/problem/P6845)

有一棵树，含 $n$ 个节点，边带权。

会有 $q$ 次修改，每次会将树上的一条边的边权进行修改，在每次修改后，您需要求出这棵树的直径长度。

**强制在线。**

$1\le n,q\le10^5$

---

优化欧拉序上 dp，用线段树维护以下几个值：

- $\max_{l\le x\le r} dep_x$
- $\min_{l\le x\le r} dep_x$
- $\max_{1\le x\le y\le r} dep_x-2dep_y$
- $\max_{1\le x\le y\le r} -2dep_x+dep_y$
- $\max_{1\le x\le y\le z\le r} dep_x-2dep_y+dep_z$

维护一个区间加的操作即可。

---

很多题目都会出现最长链等关键词，通常这些题目都要用到直径有关的性质。

---

## [Roads and Ramen](https://www.luogu.com.cn/problem/CF1413F)

Difficulty:$2800$

给出一棵 $n$ 个点的树，每条边上有权值 $0/1$，定义路径的长度为路径上边的数量。

$q$ 次修改，每次修改会修改一条边的权值，每次修改后回答最长的有偶数个 $1$ 的路径长度。

$2\le n\le 5\times10^5,1\le q\le 5\times10^5$

---

随意定一个根，令点 $x$ 到根路径上边权异或和为 $s_x$，那么一条路径 $\{x,y\}$ 上有偶数个 $1$ 当且仅当 $s_x=s_y$。

对于直径 $\{p,q\}$，如果 $s_p=s_q$，那么答案显然就是直径的长度。

否则，对于任意一个点 $u$，由于 $s_p\neq s_q$，则必有 $s_u=s_p$ 或 $s_u=s_q$，所以答案的链的一个端点一定是直径的一个端点。

用线段树维护区间 $0/1$ 翻转即可动态维护最长直链，以直径两端为根分别做一遍即可。

时间复杂度 $O(n+q\log n)$。

---

# 树的中心

对于一个节点，如果所有节点到它距离的最大值取到最小值，那么这个节点就是树的中心。

树的中心可以直接考虑求出树的直径，然后找到直径中点即可，时间复杂度 $O(n)$。

---

## [Tree Compass](https://www.luogu.com.cn/problem/CF1943C)

Difficulty:$2300$

给出一棵 $n$ 个点的树，初始时所有点都是白色的，每次你可以选择一个点 $x$ 和一个非负整数半径 $r$，将树上所有与 $x$ 距离为 $r$ 的点染成黑色，求把所有点染成黑色的最少操作次数，并给出一组方案。

$1\le n\le2\times10^3$

可以做到 $O(n)$。

---

求出树的直径和中点，设直径长度为 $l$。

如果 $l$ 为奇数：

此时有一个中心，对于这个中心操作 $\lceil\frac{l}{2}\rceil$ 次，可以证明是最优方案。

$l$ 为偶数时有两个中心，同理操作即可。

---

# 树的重心

对于一个节点，如果删掉这个节点后，所有连通块大小的最大值取到最小值，那么这个节点就是树的重心。

---

树的重心有一系列性质：

- 树的重心如果不唯一，则至多有两个，且这两个重心相邻。
- 以树的重心为根时，所有子树的大小都不超过整棵树大小的一半。
- 树中所有点到某个点的距离和中，到重心的距离和是最小的；如果有两个重心，那么到它们的距离和一样。
- 把两棵树通过一条边相连得到一棵新的树，那么新的树的重心在连接原来两棵树的重心的路径上。
- 在一棵树上添加或删除一个叶子，那么它的重心最多只移动一条边的距离。

---

通过以上性质可以推得：设子树 $u$ 的大小为 $siz_u$，$u$ 的子节点中的最大子树大小为 $mx_u$，则如果某个节点 $u$ 满足 $n-siz_u\le \frac{n}{2}$ 且 $mx_u\le\frac{n}{2}$，那么这个节点就是重心，即 $2mx_u\le n\le 2siz_u$。

通过上述性质可以 $O(n)$ 求出重心。

---

## 例题：[Kay and Snowflake](https://www.luogu.com.cn/problem/CF685B)

给出一棵 $n$ 个节点的树，求每个子树的重心。

$2\le n\le 3\times10^5$

可以做到 $O(n)$。

---

我们称一个节点的所有儿子中 $siz$ 最大的节点为它的重儿子，其它的为轻儿子。

发现对于子树 $u$，它的重心不可能在 $u$ 的轻儿子的子树。

设重儿子为 $v$，子树 $v$ 的重心为 $cent_v$，那么 $cent_u$ 一定在 $u$ 到 $cent_v$ 的路径上，因为除了这些点以外的点为根的子树大小都小于 $\frac{1}{2}siz_u$。

所以直接从 $cent_v$ 开始往上跳即可，每个点最多被跳到一次，所以是 $O(n)$ 的。

---

## [[CSP-S2019] 树的重心](https://www.luogu.com.cn/problem/P5666)

求对于每条边，删除这条边后产生的两棵树的重心编号和之和，若有多个重心则全都计算。

$7\le n\le 3\times10^5-5$，$n$ 为奇数。

可以做到 $O(n)$。

---

通过上一题的做法，我们可以求出每个子树的重心，那么接下来还需考虑去掉每个子树后的重心。

如果删掉的边不在重子树内，那么原来的重心只会不断走向重儿子，显然删的子树越大跳的越多，把那些子树大小桶排之后直接从重心开始跳即可。

否则，重心不断向根节点的次重节点移动，同理维护即可。

需要处理两个重心的细节，时间复杂度 $O(n)$。

---

# dfs 生成树

我们对一个图进行 dfs，每一个点搜到后就打标记不再搜，保留搜索通过的边，删掉其它的边可以得到一棵 dfs 生成树。

---

![](https://oi-wiki.org/graph/images/bcc-1.svg)

---

可以证明 dfs 生成树没有横跨边，而 bfs 生成树则没有返祖边。

dfs 生成树没有横跨边的性质非常优秀，这使我们始终能从下往上处理问题。

---

## 例题：[Choose Your Queries](https://www.luogu.com.cn/problem/CF2025F)

Difficulty:$2700$

给定长度为 $n$ 的数组 $a$，初始全是 $0$，$q$ 次操作，每次给出 $x,y$，你必须选择以下两种操作中的一种执行：

- 将 $a_x$ 或 $a_y$ 加一。
- 将 $a_x$ 或 $a_y$ 减一。

你需要保证任何时刻，序列中所有数非负，并且最终序列的和最小，求一组方案。
$3\le n\le3\times 10^5,1\le q\le3\times10^5$，可以做到 $O(n+q)$。

---

对于二元的条件，很多时候需要使用建图的方式处理。

对于每对给出的 $x,y$，我们在 $x$ 和 $y$ 之间连一条边，现在相当于对于每条边都要选一个端点操作，那么对于同一个点，我们一定会交替的选择加一和减一，这样肯定是最优的，那么每次操作相当于选一个点 $01$ 反转。

那么我们建出 dfs 生成树，从低往高考虑，对于每个点往上连的所有边，如果这个点是 $1$，那么就选一条边用来反转他，剩下的所有边都往上反转，否则就直接全都往上反转，由于除了根以外的节点至少有连向父亲的一条边，所以这些点的权值一定是 $0$，只有根可能是 $1$，不难证明此时总和达到了最小值。

---

值得注意的是，图不一定是连通的，要对每个连通块跑一遍。

---

## [Pairs of Pairs](https://www.luogu.com.cn/problem/CF1391E)

Difficulty:$2600$

给出一张 $n$ 个点 $m$ 条边的无向简单连通图，选择以下一个任务完成：

- 输出一条长度至少为 $\lceil\frac{n}{2}\rceil$ 的路径。
- 选出偶数个点（至少 $\lceil\frac{n}{2}\rceil$ 个），将它们两两配对，使得每两对中的四个点的导出子图最多有两条边。

---

搜出一棵 dfs 生成树，如果有长度大于等于 $\lceil\frac{n}{2}\rceil$ 的直链，那么直接输出。

否则，把每个点按深度归类，将每个深度中的点两两配对，这样每个深度中只有最多一个点没有被配对，而最大深度不超过 $\lfloor\frac{n}{2}\rfloor$，那么就有至少 $\lceil\frac{n}{2}\rceil$ 个点被配对，而 dfs 生成树没有横跨边，所以每两对中的四个点的导出子图最多有两条边。

---

# 树上启发式合并

众所周知并查集有两种优化方式，一种是路径压缩，一种是按秩合并，那么在按秩合并的过程中，每次我们会把大小较小的集合合并到较大的集合中，这看上去很暴力，但是它的复杂度就是对的，这是**启发式合并**的思想。

这种思想在树上问题中会比较常见，当对于每个节点，我们需要合并它所有子节点的答案来得到它本身的答案的时候，经常会用到**树上启发式合并**。

---

## 例题：[Lomsat gelral](https://www.luogu.com.cn/problem/CF600E)

Difficulty:$2300$

给出一棵 $n$ 个点的有根树，点有点权，对于每棵子树，求出其中点权的所有众数之和。

$1\le n\le 10^5,1\le \text{点权}\le n$。

---

考虑维护每个点权出现的次数 $cnt$，同时不难维护答案，如果直接去合并 $cnt$ 会比较困难。

可以考虑每个节点都可以继承一个儿子的 $cnt$ 数组，然后对于其它的儿子，将那些子树都跑一遍并更新 $cnt$，只要每次继承子树大小最大的儿子即可，时间复杂度 $O(n\log n)$。

---

复杂度分析：

我们考虑只保留每个点到重儿子的边，把其他边都删了，那么维护每一个连通块的答案总复杂度是 $O(n)$ 的，接下来考虑重新更新 $cnt$ 的复杂度。

每次我们更新一次 $cnt$ 就把这个连通块连到父亲上，由于这个连通块不是这个父亲的重儿子，所以连通块大小一定会翻倍，那么对于每个节点，它所在的连通块大小只会翻倍 $O(\log n)$ 次，所以每个点的更新次数都是 $O(\log n)$ 次，总复杂度为 $O(n\log n)$。

---

## [Arpa’s letter-marked tree and Mehrdad’s Dokhtar-kosh paths](https://www.luogu.com.cn/problem/CF741D)

Difficulty:$2900$

给定一棵 $n$ 个点的树，根为 $1$，每条边上有一个字符（a 到 v 共 $22$ 种）。一条简单路径被称为 Dokhtar-kosh，当且仅当路径上的字符经过重新排序后可以变成一个回文串。 求每个子树中最长的 Dokhtar-kosh 路径的长度。

$1\le n\le 5\times10^5$

---

首先发现一个字符串能重排成回文串当且仅当有最多一个字符出现了奇数次。

我们用一个 $0\sim2^{22}-1$ 之间的数 $val_x$ 表示一个点到根路径上每种字母出现了奇数次还是偶数次，那么从 $x$ 到 $y$ 的路径上的信息就是 $val_x\operatorname{xor}val_y$。

那么也就是 $val_x\operatorname{xor}val_y$ 等于 $0$ 或 $2^p$ 时合法。

直接用一个数组记录每个 $val$ 在子树内的最大深度，转移这个数组即可，时间复杂度 $O(|\Sigma|n\log n)$。

---

# 树上随机游走

一张图的随机游走问题一般复杂度是 $O(n^3)$，但是由于树的优秀性质，所以在此类问题上复杂度通常为 $O(n)$。

---

有时候，我们可以把走一条路径的贡献拆成其中每一条边的贡献。

---

## [Alice's Adventures in the Rabbit Hole](https://www.luogu.com.cn/problem/CF2028E)

Difficulty:$2300$

给出一棵 $n$ 个点的树，初始时棋子在节点 $x$，每次有相同的概率选 $A,B$ 中的一人操作，操作为将棋子往相邻的一条边移动，若棋子移到根则 $A$ 胜，若棋子移到叶子则 $B$ 胜，若两人都以最优决策操作，对于 $x=1,2,\dots,n$，分别求出 $A$ 赢的概率，答案对 $998244353$ 取模。

$2\le n\le2\times10^5$

可以做到 $O(n)$。

---

考虑如果树是一条直链，$A$ 赢的概率是多少？

实际上等于 $\frac{n-dep_x}{n}$。

那么如果现在对于节点 $x$，在子树中深度最浅的叶子到他的距离为 $len$，那么在不到达叶子的情况下，它能往上走一步的概率为 $\frac{len+1}{len}$，设 $f_x$ 表示从 $x$ 处开始 $A$ 能赢的概率，则 $f_x=\frac{len+1}{len}f_{fa_x}$，直接 dp 即可。

---

也有时候，我们不能简单地处理贡献。

---

## 例题：[Random Walk](https://www.luogu.com.cn/problem/CF1823F)

Difficulty:$2600$

给出一棵 $n$ 个点的树和起点 $s$，终点 $t$，求从 $s$ 开始随机游走，经过每个点的期望次数，答案对 $998244353$ 取模。

$2\le n\le 2\times10^5$

---

我们设 $dp_i$ 表示期望经过 $i$ 点的次数，那么对于除了 $s$ 和 $t$ 之外的节点，有：

$$dp_i=\sum_{\{i,j\}\in E\land j\neq t}\frac{dp_j}{deg_j}$$

其中 $deg_j$ 表示节点 $j$ 的度数。

$dp_s$ 是上述的式子加一而 $dp_t=1$。

发现这个式子没法转移。

---

$$dp_i=\sum_{\{i,j\}\in E\land j\neq t}\frac{dp_j}{deg_j}$$

重新观察一下这个式子，我们虽然没有办法快速转移这个式子，但是我们可以方便地将 $dp_i$ 表示为 $k_i\times dp_{fa_i}+b_i$ 的形式。

首先叶子结点可以直接表示，然后对于每个节点 $i$，如果它的所有子节点 $j$ 的 $dp_j$ 都已经被表示成 $k_j\times dp_i+b_j$，那么直接代入到上面的式子里，这个式子就会变成一个只跟 $dp_i$ 和 $dp_{fa_i}$ 有关的等式，那么显然可以将 $dp_i$ 表示为 $k_i\times dp_{fa_i}+b_i$ 的形式。

发现根节点没有父亲，所以 $dp_{root}=b_{root}$，然后再不断下传即可。

---

## [Send the Fool Further!](https://www.luogu.com.cn/problem/CF802L)

Difficulty:$2400$

给出一棵 $n$ 个点的带权树，从根开始随机游走直到走到叶子结点，求经过的期望距离，答案对 $10^9+7$ 取模。

$3\le n\le10^5$

---

设 $dp_x$ 为从节点 $x$ 走到叶子结点的期望距离，$out_x$ 为 $x$ 出边之和。

显然有：

$$dp_x=\frac{out_x+dp_{fa_x}+\sum\limits_{y\in son_x}dp_y}{degree_x}$$

用上一个题的套路处理即可。

---
# 树链剖分
树链剖分的思想及能解决的问题
树链剖分用于将树分割成若干条链的形式，以维护树上路径的信息。

具体来说，将整棵树剖分为若干条链，使它组合成线性结构，然后用其他的数据结构维护信息。

树链剖分（树剖/链剖）有多种形式，如重链剖分，长链剖分 和用于 $\text{Link/cut Tree}$ 的剖分（有时被称作「实链剖分」），大多数情况下（没有特别说明时），「树链剖分」都指「重链剖分」。

重链剖分可以将树上的任意一条路径划分成不超过 $O(\log n)$ 条连续的链，每条链上的点深度互不相同（即是自底向上的一条链，链上所有点的 $\text{LCA}$ 为链的一个端点）。

重链剖分还能保证划分出的每条链上的节点 $\text{dfs}$ 序连续，因此可以方便地用一些维护序列的数据结构（如线段树）来维护树上路径的信息。

如：

- 修改 树上两点之间的路径上 所有点的值。
- 查询 树上两点之间的路径上 节点权值的 和/极值/其它（在序列上可以用数据结构维护，便于合并的信息）。

除了配合数据结构来维护树上路径信息，树剖还可以用来 $O(\log n)$（且常数较小）地求 $\text{LCA}$。在某些题目中，还可以利用其性质来灵活地运用树剖。
## 重链剖分
我们给出一些定义：

定义**重子节点**表示其子节点中子树最大的子结点。如果有多个子树最大的子结点，取其一。如果没有子节点，就无重子节点。

定义**轻子节点**表示剩余的所有子结点。

从这个结点到重子节点的边为**重边**。

到其他轻子节点的边为**轻边**。

若干条首尾衔接的重边构成**重链**。

把落单的结点也当作重链，那么整棵树就被剖分成若干条重链。
![](https://oi-wiki.org/graph/images/hld.png)

实现
树剖的实现分两个 DFS 的过程。伪代码如下：

第一个 $\text{DFS}$ 记录每个结点的父节点（$\text{father}$）、深度（$\text{deep}$）、子树大小（$\text{size}$）、重子节点（$\text{hson}$）。

$\begin{array}{l}
\text{TREE-BUILD }(u,dep) \\
\begin{array}{ll}
1 & u.hson\gets 0 \\
2 & u.hson.size\gets 0 \\
3 & u.deep\gets dep \\
4 & u.size\gets 1 \\
5 & \textbf{for }\text{each }u\text{'s son }v \\
6 & \qquad u.size\gets u.size + \text{TREE-BUILD }(v,dep+1) \\
7 & \qquad v.father\gets u \\
8 & \qquad \textbf{if }v.size> u.hson.size \\
9 & \qquad \qquad u.hson\gets v \\
10 & \textbf{return } u.size
\end{array}
\end{array}$

第二个 $\text{DFS}$ 记录所在链的链顶（$\text{top}$，应初始化为结点本身）、重边优先遍历时的 $\text{DFS}$ 序（$\text{dfn}$）、$\text{DFS}$ 序对应的节点编号（$\text{rank}$）。

$\begin{array}{l}
\text{TREE-DECOMPOSITION }(u,top) \\
\begin{array}{ll}
1 & u.top\gets top \\
2 & tot\gets tot+1\\
3 & u.dfn\gets tot \\
4 & rank(tot)\gets u \\
5 & \textbf{if }u.hson\text{ is not }0 \\
6 & \qquad \text{TREE-DECOMPOSITION }(u.hson,top) \\
7 & \qquad \textbf{for }\text{each }u\text{'s son }v \\
8 & \qquad \qquad \textbf{if }v\text{ is not }u.hson \\
9 & \qquad \qquad \qquad \text{TREE-DECOMPOSITION }(v,v) 
\end{array}
\end{array}$

以下为代码实现。

我们先给出一些定义：

$fa[x]$ 表示节点 $x$ 在树上的父亲。
$dep[x]$ 表示节点 $x$ 在树上的深度。
$siz[x]$ 表示节点 $x$ 的子树的节点个数。
$son[x]$ 表示节点 $x$ 的 重儿子。
$top[x]$ 表示节点 $x$ 所在 重链 的顶部节点（深度最小）。
$dfn[x]$ 表示节点 $x$ 的 $\text{DFS}$  序，也是其在线段树中的编号。
$rnk[x]$ 表示 $\text{DFS}$ 序所对应的节点编号，有 $rnk[dfn[x]]=x$。
我们进行两遍 $\text{DFS}$  预处理出这些值，其中第一次 $\text{DFS}$ 求出 $fa[x]$，$dep[x]$，$siz[x]$，$son[x]$，第二次 $\text{DFS}$  求出 $top[x]$，$dfn[x]$，$rnk[x]$。
```cpp
inline void dfs1(const int o){
  son[o]=-1,siz[o]=1;
  for (int j=h[o];j; j = nxt[j])
    if (!dep[p[j]]) {
      dep[p[j]] = dep[o] + 1;
      fa[p[j]] = o;
      dfs1(p[j]);
      siz[o] += siz[p[j]];
      if (son[o] == -1 || siz[p[j]] > siz[son[o]]) son[o] = p[j];
    }
}

void dfs2(int o, int t) {
  top[o] = t;
  cnt++;
  dfn[o] = cnt;
  rnk[cnt] = o;
  if (son[o] == -1) return;
  dfs2(son[o], t);  // 优先对重儿子进行 DFS，可以保证同一条重链上的点 DFS 序连续
  for (int j = h[o]; j; j = nxt[j])
    if (p[j] != son[o] && p[j] != fa[o]) dfs2(p[j], p[j]);
}
```
### 重链剖分的性质
树上每个节点都属于且仅属于一条重链。

重链开头的结点不一定是重子节点（因为重边是对于每一个结点都有定义的）。

所有的重链将整棵树**完全剖分**。

在剖分时 重边优先遍历，最后树的 $\text{DFS}$ 序上，重链内的 $\text{DFS}$ 序是连续的。按 $\text{DFN}$ 排序后的序列即为剖分后的链。

一颗子树内的 $\text{DFS}$ 序是连续的。

可以发现，当我们向下经过一条**轻边**时，所在子树的大小至少会 $\div 2$。

因此，对于树上的任意一条路径，把它拆分成从 $\text{LCA}$ 分别向两边往下走，分别最多走 $O(\log n)$ 次，因此，树上的每条路径都可以被拆分成不超过 $O(\log n)$ 条重链。

用树链剖分求树上两点路径权值和，伪代码如下：

$\begin{array}{l}
\text{TREE-PATH-SUM }(u,v) \\
\begin{array}{ll}
1 & tot\gets 0 \\
2 & \textbf{while }u.top\text{ is not }v.top \\
3 & \qquad \textbf{if }u.top.deep< v.top.deep \\
4 & \qquad \qquad \text{SWAP}(u, v) \\
5 & \qquad tot\gets tot + \text{sum of values between }u\text{ and }u.top \\
6 & \qquad u\gets u.top.father \\
7 & tot\gets tot + \text{sum of values between }u\text{ and }v \\
8 & \textbf{return } tot 
\end{array}
\end{array}$

链上的 $\text{DFS}$ 序是连续的，可以使用线段树、树状数组维护。

每次选择深度较大的链往上跳，直到两点在同一条链上。

同样的跳链结构适用于维护、统计路径上的其他信息。

子树维护
有时会要求，维护子树上的信息，譬如将以 x 为根的子树的所有结点的权值增加 $v$。

在 $\text{DFS}$ 搜索的时候，子树中的结点的 $\text{DFS}$ 序是连续的。

每一个结点记录 $bottom$ 表示所在子树连续区间末端的结点。

这样就把子树信息转化为连续的一段区间信息。

求最近公共祖先
不断向上跳重链，当跳到同一条重链上时，深度较小的结点即为 $\text{LCA}$。

向上跳重链时需要先跳所在重链顶端深度较大的那个。
```cpp
inline int lca(const int u,const int v){
    while(top[u]!=top[v]){
        if(dep[top[u]]>dep[top[v]]) u=fa[top[u]];
        else v=fa[top[v]];
    }
    return dep[u]>dep[v]?v:u;
}
```

## 长链剖分
长链剖分本质上就是另外一种链剖分方式。

定义 重子节点 表示其子节点中子树深度最大的子结点。如果有多个子树最大的子结点，取其一。如果没有子节点，就无重子节点。

定义**轻子节点**表示剩余的子结点。

从这个结点到重子节点的边为**重边**。

到其他轻子节点的边为**轻边**。

若干条首尾衔接的重边构成**重链**。

把落单的结点也当作重链，那么整棵树就被剖分成若干条重链。

如图（这种剖分方式既可以看成重链剖分也可以看成长链剖分）：
![](https://oi-wiki.org/graph/images/hld.png)
长链剖分实现方式和重链剖分类似，这里就不再展开。

### 长链剖分求 k 级祖先
即询问一个点向父亲跳 $k$ 次跳到的节点。

首先我们假设我们已经预处理了每一个节点的 $2^i$ 级祖先。

现在我们假设我们找到了询问节点的 $2^i$ 级祖先满足 $2^i \le k < 2^{i+1}$。

我们考虑求出其所在重链的节点并且按照深度列入表格。假设重链长度为 $d$。

同时我们在预处理的时候找到每条重链的根节点的 $1$ 到 $d$ 级祖先，同样放入表格。

根据长链剖分的性质，$k-2^i \le 2^i \leq d$, 也就是说，我们可以 $O(1)$ 在这条重链的表格上求出的这个节点的 k 级祖先。

预处理需要倍增出 $2^i$ 次级祖先，同时需要预处理每条重链对应的表格。

预处理复杂度 $O(n\log n)$, 询问复杂度 $O(1)$。

### *[Luogu P3384 【模板】重链剖分/树链剖分](https://www.luogu.com.cn/problem/P3384)*
如题，已知一棵包含 $N$ 个结点的树（连通且无环），每个节点上包含一个数值，需要支持以下操作：

- ```1 x y z```，表示将树从 $x$ 到 $y$ 结点最短路径上所有节点的值都加上 $z$。

- ```2 x y```，表示求树从 $x$ 到 $y$ 结点最短路径上所有节点的值之和。

- ```3 x z```，表示将以 $x$ 为根节点的子树内所有节点值都加上 $z$。

- ```4 x``` 表示求以 $x$ 为根节点的子树内所有节点值之和。

**Code**

```cpp
#include<bits/stdc++.h>
using namespace std;
const int N=1e5+5;
struct E{int to,next;}edge[N<<1];
int n,m,rt,mod,w[N],a[N],head[N],cnt;
inline void add(const int u,const int v){
    edge[++cnt].next=head[u];
    edge[cnt].to=v;
    head[u]=cnt;
}
namespace rw{
    inline int read(){
        int tot=0,t=1;char ch=getchar();
        while(ch<'0'||ch>'9'){if(ch=='-') t=-1;ch=getchar();}
        while(ch>='0'&&ch<='9'){tot=tot*10+ch-'0';ch=getchar();}
        return tot*t;
    }
    inline void write(int x){
        if(x<0) putchar('-'),x=-x;
        static int sta[35];int top=0;
        do{sta[top++]=x%10,x/=10;}while(x);
        while(top) putchar(sta[--top]+'0');
    }
    inline void file(){
        freopen(".in","r",stdin);
        freopen(".out","w",stdout);
    }
    inline void print(const int x,const char ch){return (write(x),putchar(ch)),void(0);}
}using namespace rw;
namespace SGT{
    struct node{int l,r,sum,size,tag;}tree[N<<2];
    inline void pushup(const int p){tree[p].sum=(tree[p<<1].sum+tree[p<<1|1].sum)%mod;}
    inline void maketag(const int p,const int num){
        tree[p].sum=(tree[p].sum+tree[p].size*num)%mod;
        tree[p].tag=(tree[p].tag+num)%mod;
    }
    inline void pushdown(const int p){
        if(tree[p].tag){
            maketag(p<<1,tree[p].tag),maketag(p<<1|1,tree[p].tag);
            tree[p].tag=0;
        }
    }
    inline void build(const int p,const int l,const int r){
        tree[p].l=l,tree[p].r=r,tree[p].size=r-l+1;
        if(l==r) return tree[p].sum=w[l]%mod,void(0);
        int mid=(l+r)>>1;
        build(p<<1,l,mid);
        build(p<<1|1,mid+1,r);
        pushup(p);
    }
    inline void update(const int p,const int l,const int r,const int num){
        if(l<=tree[p].l&&tree[p].r<=r) return maketag(p,num),void(0);
        pushdown(p);int mid=(tree[p].l+tree[p].r)>>1;
        if(l<=mid) update(p<<1,l,r,num);
        if(r>mid) update(p<<1|1,l,r,num);
        pushup(p);
    }
    inline int ask(const int p,const int l,const int r){
        if(l<=tree[p].l&&tree[p].r<=r) return tree[p].sum;
        pushdown(p);int mid=(tree[p].l+tree[p].r)>>1,res=0;
        if(l<=mid) res=(res+ask(p<<1,l,r))%mod;
        if(r>mid) res=(res+ask(p<<1|1,l,r))%mod;
        return res; 
    }
}
namespace HLD{
    int dep[N],siz[N],fa[N],son[N],dfn[N],top[N],idx;
    inline void dfs1(const int u,const int f){
        dep[u]=dep[f]+1;siz[u]=1;fa[u]=f;
        int maxn=-1;
        for(int i=head[u];i;i=edge[i].next){
            int v=edge[i].to;
            if(f==v) continue;
            dfs1(v,u);
            siz[u]+=siz[v];
            if(siz[son[u]]<siz[v]) son[u]=v;
        }
    }
    inline void dfs2(const int u,const int f){
        dfn[u]=++idx,w[idx]=a[u],top[u]=f;
        if(!son[u]) return;dfs2(son[u],f);
        for(int i=head[u];i;i=edge[i].next){
            int v=edge[i].to;
            if(!dfn[v]) dfs2(v,v);
        }
    }
    inline void update(int x,int y,int num){
        while(top[x]!=top[y]){
            if(dep[top[x]]<dep[top[y]]) swap(x,y);
            SGT::update(1,dfn[top[x]],dfn[x],num);
            x=fa[top[x]];
        }
        if(dep[x]>dep[y]) swap(x,y);
        SGT::update(1,dfn[x],dfn[y],num);
    }
    inline int ask(int x,int y){
        int res=0;
        while(top[x]!=top[y]){
            if(dep[top[x]]<dep[top[y]]) swap(x,y);
            res=(res+SGT::ask(1,dfn[top[x]],dfn[x]))%mod;
            x=fa[top[x]];
        }
        if(dep[x]>dep[y]) swap(x,y);
        res=(res+SGT::ask(1,dfn[x],dfn[y]))%mod;
        return res;
    }
    inline void init(){dfs1(rt,0);dfs2(rt,rt);}
}
signed main(){
    n=read(),m=read(),rt=read(),mod=read();
    for(int i=1;i<=n;i++) a[i]=read();
    for(int i=1;i<n;i++){
        int u=read(),v=read();
        add(u,v),add(v,u);
    }
    HLD::init();SGT::build(1,1,n);
    while(m--){
        int op=read();
        if(op==1){
            int x=read(),y=read(),z=read()%mod;
            HLD::update(x,y,z);
        }
        if(op==2){
            int x=read(),y=read();
            print(HLD::ask(x,y),'\n');
        }
        if(op==3){
            int x=read(),z=read()%mod;
            SGT::update(1,HLD::dfn[x],HLD::dfn[x]+HLD::siz[x]-1,z);
        }
        if(op==4){
            int x=read();
            print(SGT::ask(1,HLD::dfn[x],HLD::dfn[x]+HLD::siz[x]-1),'\n');
        }
    }
    return 0;
}
```
---

**特别致谢 $Gold14526$**