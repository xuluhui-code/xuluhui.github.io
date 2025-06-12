---
title: CF_Round_1024_Div_2
published: 2025-06-12
description: ''
image: ''
tags: [题解]
category: '题解'
draft: false 
lang: ''
---
# [A.](https://codeforces.com/contest/2102/problem/A) [Dinner Time](https://www.luogu.com.cn/problem/CF2102A)
## Problem
### 题目描述
给定四个整数 $n$、$m$、$p$ 和 $q$，判断是否存在一个整数数组 $a_1, a_2, \ldots, a_n$（元素可以为负）满足以下条件：

- 数组中所有元素的和等于 $m$：
  $$a_1 + a_2 + \ldots + a_n = m$$
- 每 $p$ 个连续元素的和都等于 $q$：
  $$a_i + a_{i + 1} + \ldots + a_{i + p - 1} = q, 1 \le i \le n - p + 1$$

### 输入格式

每个测试包含多个测试用例。第一行输入测试用例数量 $t$（$1 \le t \le 10^4$）。接下来是各测试用例的描述。

每个测试用例的第一行也是唯一一行包含四个整数 $n$、$m$、$p$ 和 $q$（$1 \le p \le n \le 100$，$1 \le q, m \le 100$）——分别表示数组长度、元素总和、子段长度和子段总和。

### 输出格式

对于每个测试用例，如果存在满足上述条件的数组，输出"YES"（不带引号），否则输出"NO"（不带引号）。

你可以以任意大小写形式输出"YES"和"NO"（例如字符串"yES"、"yes"和"Yes"都会被识别为有效响应）。

### 输入输出样例 #1

**输入 #1**

```
5
3 2 2 1
1 1 1 1
5 4 2 3
10 7 5 2
4 4 1 3
```

**输出 #1**

```
YES
YES
YES
NO
NO
```

### 说明/提示

在第一个测试用例中，满足条件的数组示例是 $[1, 0, 1]$。这是因为：
- $a_1 + a_2 + a_3 = 1 + 0 + 1 = 2 = m$
- $a_1 + a_2 = 1 + 0 = 1 = q$
- $a_2 + a_3 = 0 + 1 = 1 = q$

在第二个测试用例中，唯一满足条件的数组是 $[1]$。

在第三个测试用例中，满足条件的数组示例是 $[-2, 5, -2, 5, -2]$。

在第四个测试用例中，可以证明不存在满足条件的数组。

## Solution
首先要意识到的是，如果数组的前 $p$ 个元素是确定的，那么其余元素将是唯一的 ( $a_i=a_i−p$ 表示总和)。如果 $p$ 除以 $n$，那么将有 $n/p$ 个块，每个块的总和为 $q$，因此它们的总和 $q \times n/p$ 应该等于 $m$。如果不相等，最后生成的不完整图块可以用来弥补总和的差额，因此总是有可能的。

## Code

```cpp
#include<bits/stdc++.h>
using namespace std;
int n,m,p,q;
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
    inline void IOS(){ios::sync_with_stdio(0);cin.tie(0);cout.tie(0);}
}using namespace rw;
inline void solve(){
    n=read(),m=read(),p=read(),q=read();
    puts((n%p==0&&(n/p)*q!=m)?"NO":"YES");
}
signed main(){
    int T=read();
    while(T--) solve();
    return 0;
}
```
# [B.](https://codeforces.com/contest/2102/problem/B) [The Picky Cat](https://www.luogu.com.cn/problem/CF2102B)
## Problem
### 题目描述

给定一个整数数组 $a_1, a_2, \ldots, a_n$。你可以执行以下操作任意次数（包括零次）：

- 选择一个下标 $i$（$1 \le i \le n$）。将 $a_i$ 乘以 $-1$（即更新 $a_i := -a_i$）。

你的任务是判断是否可以通过上述操作使得下标为 $1$ 的元素成为数组的中位数。注意操作也可以应用于下标 $1$，这意味着中位数可以是 $a_1$ 的原值或其相反数。

数组 $b_1, b_2, \ldots, b_m$ 的中位数定义为数组中第 $\left\lceil \frac{m}{2} \right\rceil$ 小的元素 $^{\text{∗}}$。例如，数组 $[3, 1, 2]$ 的中位数是 $2$，而数组 $[10, 1, 8, 3]$ 的中位数是 $3$。

保证数组 $a$ 中元素的绝对值互不相同。形式化地说，不存在下标对 $1 \le i < j \le n$ 满足 $|a_i| = |a_j|$。

$^{\text{∗}}$ $\lceil x \rceil$ 是向上取整函数，返回大于等于 $x$ 的最小整数。

### 输入格式

每个测试包含多个测试用例。第一行输入测试用例数量 $t$（$1 \le t \le 10^4$）。接下来是各测试用例的描述。

每个测试用例的第一行包含一个整数 $n$（$1 \le n \le 10^5$）——数组 $a$ 的长度。

每个测试用例的第二行包含 $n$ 个整数 $a_1, a_2, \ldots, a_n$（$|a_i| \le 10^6$，$|a_i| \neq |a_j|$）——数组 $a$ 的元素。

保证所有测试用例的 $n$ 之和不超过 $10^5$。

### 输出格式

对于每个测试用例，如果可以使下标为 $1$ 的元素成为数组的中位数，输出"YES"，否则输出"NO"。

你可以以任意大小写形式输出答案（例如字符串"yEs"、"yes"、"Yes"和"YES"都会被识别为肯定回答）。

### 输入输出样例 #1

**输入 #1**

```
7
3
2 3 1
5
1 2 3 4 5
4
4 2 0 -5
4
-5 0 4 3
4
-10 8 3 2
1
1
10
9 1000 -999 -13 456 -223 23 24 10 0
```

**输出 #1**

```
YES
YES
YES
NO
NO
YES
YES
```

### 说明/提示

在第一个测试用例中，$a_1 = 2$ 已经是数组 $a = [2, 3, 1]$ 的中位数，因此不需要任何操作。

在第二个测试用例中，我们可以执行两次操作：一次在下标 $2$，一次在下标 $5$。数组变为 $[1, -2, 3, 4, -5]$，其中中位数为 $1$。

在第三个测试用例中，如果对下标 $1$ 执行操作，数组将变为 $[-4, 2, 0, -5]$，其中中位数为 $-4$。

在第四个测试用例中，可以证明不存在任何操作序列能使数组的中位数变为 $5$ 或 $-5$。

## Solution
明显，此题的答案只与 $a$ 的绝对值有关。对于任意 $a_i (i \ne 1)$，当且仅当 $|a_i|>|a_1|$ 时，$a_i$ 的正负性才能影响 $a_1$ 是否是中位数，记录每个满足的数，设总数为 $cnt$，根据中位数的定义若 $cnt \ge (n-1)/2$ 时 $a_1$ 才有可能成为中位数。

## Code
```cpp
#include<bits/stdc++.h>
using namespace std;
const int N=1e5+5;
int n,a[N],b[N];
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
    inline void IOS(){ios::sync_with_stdio(0);cin.tie(0);cout.tie(0);}
}using namespace rw;
inline void solve(){
    n=read();int cnt=0;
    for(int i=1;i<=n;i++){
        a[i]=read();
        if(abs(a[i])>abs(a[1])) cnt++;
    }
    if(cnt>=(n-1)/2) return puts("YES"),void(0);
	return puts("NO"),void(0);
}
signed main(){
    int T=read();
    while(T--) solve();   
    return 0;
}
```
# [C.](https://codeforces.com/contest/2102/problem/C) [Mex in the Grid](https://www.luogu.com.cn/problem/CF2101A)
## Problem
### 题目描述

你有一个 $n\times n$ 的网格，初始全部为空。

你要把 $0$ 到 $n^2-1$ 这些数填入网格中，使得每个数出现恰好一次，并使这个网格的所有子网格的 mex 值之和最大。

一个网格是另一个网格的子网格，当且仅当在后者中存在一个矩形区域和前者完全相同。\
一个网格的 mex 最小的没有出现在此网格中的非负整数。

### 输入格式

多组数据，第一行一个整数 $t(1\le t\le 100)$，表示数据组数。

对于每组数据，输入一行一个整数 $n(1\le n\le 500)$。

保证在单个测试点中 $\sum n\le 1000$。

### 输出格式

对于每组数据，输出 $n$ 行，每行 $n$ 个数字，表示你填完数字后的网格。

如果有多解，输出任意一种均可。

### 输入输出样例 #1

**输入 #1**

```
2
2
3
```

**输出 #1**

```
0 1 
2 3 
8 4 5 
6 0 1 
7 2 3
```

### 说明/提示

**样例解释**

第一组数据中，一种可行解是：

|$0$|$1$|
|:-:|:-:|
|$2$|$3$|

这个矩形有 $9$ 个子网格，其中存在 $4$ 个子网格的 mex 大于零，如下所示：

|$0$|
|:-:|

mex 为 $1$。

|$0$|$1$|
|:-:|:-:|

mex 为 $2$。

|$0$|
|:-:|
|$2$|

mex 为 $1$。

|$0$|$1$|
|:-:|:-:|
|$2$|$3$|

mex 为 $4$。

总和为 $8$，可以证明这是可以达到的最大值。

## Solution
~~感性理解：构造方法为蛇形填数。~~

### 粗略证明

通过画图可得在一个矩阵内越靠近中间位置出现的次数越多，以下可以简单证明：

首先想象这样的一个 $5\times 5$ 的矩阵，此时取的矩阵到 $4\times 4$，边会出现以下的情况（$0$ 表示没包含在选定矩阵内，$1$ 表示包含在选定矩阵内）：
```
11110
11110
11110
11110
00000
```
```
01111
01111
01111
01111
00000
```
```
00000
01111
01111
01111
01111
```
```
00000
11110
11110
11110
11110
```

可以发现，最中间格子的位置 $(3,3)$ 取到了 $4$ 次，而左上角格子 $(1,1)$ 只取到了 $1$ 次。

依次类推，便可以证明。

要求最大的 $\sum mex$，就要将 $0$ 放在中间，发现是填的数中的最小值，接下来就要填 $1$，也填在中间的位置，如此就可以使填 $1$ 的格子被包括进选取矩阵的次数最多。

所以做法就是将数字从小到大一圈一圈的由内向外面扩展，而在二维平面内，蛇形矩阵满足条件。

### 详细证明

为什么蛇形矩阵满足要求。


两个和相同的数相乘，当它们彼此尽可能接近时，答案最大。因此，对于每个子网格，如果我们考虑它上下的空行，并分别考虑它左右的列，如果有一列是固定的，那么这个位置就会被优化为在中间。同样，我们也可以说，如果子网格的长度和高度彼此接近，那么它也是最优的，因为增加其中一个会导致另一个减小。综合以上两点，具有上述特性的子网格，如果是一个位于网格中间的近似正方形的子网格，那么它就是最优的。

例如样例：

```
8 4 5 
6 0 1 
7 2 3
```
而满足以上构造方式的一个简单例子就是蛇形矩阵，于是这道题就转化为给出一个数，求出它的蛇形矩阵。

## Code
```cpp
#include<bits/stdc++.h>
using namespace std;
const int N=1e3+5;
int n,a[N][N];
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
    inline void IOS(){ios::sync_with_stdio(0);cin.tie(0);cout.tie(0);}
}using namespace rw;
inline void solve(){
    n=read();int i=1,x=1,y=0;
    memset(a,0,sizeof(a));
    while(i<=n*n){
        while(y<n&&!a[x][y+1]) a[x][++y]=i++;
        while(x<n&&!a[x+1][y]) a[++x][y]=i++;
        while(y>1&&!a[x][y-1]) a[x][--y]=i++;
        while(x>1&&!a[x-1][y]) a[--x][y]=i++;
    }
    for(int i=1;i<=n;i++){
        for(int j=1;j<=n;j++){
            print(n*n-a[i][j],' ');
        }
        puts("");
    }
}
signed main(){
    int T=read();
    while(T--) solve();
    return 0;
}
```
# [D.](https://codeforces.com/problemset/problem/2101/B) [Quartet Swapping](https://www.luogu.com.cn/problem/CF2101B)
## Problem
### 题目描述

给定一个长度为 $n$ 的排列 $a$ $^{\text{∗}}$。你可以进行以下操作任意次数（包括零次）：

- 选择一个下标 $1 \le i \le n - 3$。然后，同时交换 $a_i$ 和 $a_{i+2}$，以及 $a_{i+1}$ 和 $a_{i+3}$。换句话说，排列 $a$ 将从 $[\ldots, a_i, a_{i+1}, a_{i+2}, a_{i+3}, \ldots]$ 变为 $[\ldots, a_{i+2}, a_{i+3}, a_i, a_{i+1}, \ldots]$。

请确定通过任意次上述操作后能得到的字典序最小的排列 $^{\text{†}}$。

$^{\text{∗}}$ 一个长度为 $n$ 的排列是由 $1$ 到 $n$ 的 $n$ 个不同整数按任意顺序组成的数组。例如，$[2,3,1,5,4]$ 是一个排列，但 $[1,2,2]$ 不是排列（因为 $2$ 出现了两次），$[1,3,4]$ 也不是排列（$n=3$ 但数组中出现了 $4$）。

$^{\text{†}}$ 对于两个相同长度的数组 $x$ 和 $y$，$x$ 字典序小于 $y$ 当且仅当满足以下条件：
- 在第一个 $x$ 和 $y$ 不同的位置，$x$ 的元素小于 $y$ 的对应元素。

### 输入格式

多组数据，第一行一个整数 $t(1\le t\le 1000)$。

对于每组数据，第一行一个整数 $n(4\le n\le 2\times 10^5)$。\
第二行 $n$ 个整数 $a_1,a_2,\cdots,a_n(1\le a_i\le n)$，保证 $a$ 为 $1$ 到 $n$ 的排列。

### 输出格式

对于每组数据，输出一行 $n$ 个整数，表示可以得到的字典序最小的排列。

### 输入输出样例 #1

**输入 #1**

```
3
4
3 4 1 2
5
5 4 3 1 2
10
10 9 8 7 6 5 4 3 2 1
```

**输出 #1**

```
1 2 3 4 
2 1 3 4 5 
2 1 4 3 6 5 8 7 10 9
```

### 说明/提示

**样例解释**

第一组数据中，选择 $i=1$ 执行一次操作，排列变为 $[1,2,3,4]$，可以证明这是可以得到的字典序最小的排列。

第二组数据中，一种可以得到字典序最小的排列的操作如下：

- 选择 $i=2$ 执行一次操作，排列变为 $[5,1,2,4,3]$；
- 选择 $i=1$ 执行一次操作，排列变为 $[2,4,5,1,3]$；
- 选择 $i=2$ 执行一次操作，排列变为 $[2,1,3,4,5]$。
## Solution
首先考虑变换的本质为：$...a,b,c,d... \to ...c,d,a,b...$。发现 $a$ 与 $c$ ，$b$ 与 $d$ 位置的奇偶性相同。
于是我们就可以先找出奇数位上的最小值放到第一位，再找出偶数位上的最小值放到第二位，以此类推。若找到的数在最后一位，可以将最后四个数交换，再将它提到前面。

然后我们就会发现最后三个数 $a_{n-2},a_{n-1},a_{n}$，$a_{n-1}$ 的位置是在最优情况下是固定的，而 $a_{n-2},a_{n}$ 的位置不确定，也就是会让 $a_{n-2}>a_{n}$ 而达不到最优。

想到排序，那一定得想到逆序对。

假设当前我们要把奇数位上的 $a_{i+2}$ 放到更前面，我们交换 $a_i,a_{i+2}$，同时 $a_{i+1},a_{i+3}$ 也会交换，且有 $a_{i}>a_{i+2}$，因此奇数位上的逆序对数量少一，而对于 $a_{i+1},a_{i+3}$，逆序对的数量会加一或减一。此时会发现，对于一次变换，逆序对的个数会变化偶数次，即偶数位上逆序对的改变会影响奇数位逆序对的数量的改变，奇数位上的改变也会影响偶数位。

而最后 $a_{n-1}$ 的逆序对数量为 $0$，$a_n$ 的逆序对的数量为 $0/1$。

综上所述，若奇数位逆序对奇偶性等于偶数位奇偶性，则 $a_{n-2}<a_{n}$，反之则 $a_{n-2}>a_{n}$。

所以当奇数位逆序对奇偶性等于偶数位奇偶性时我们只需将奇数位和偶数位分别排序；否则，我们需要交换 $a_{n-2},a_{n}$ 的位置。

## Code
```cpp
#include<bits/stdc++.h>
#define int long long
using namespace std;
const int N=2e5+5;
int n,tree[N],ans[N];
vector<int> a1,a2;
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
    inline void IOS(){ios::sync_with_stdio(0);cin.tie(0);cout.tie(0);}
}using namespace rw;
namespace BIT{
    inline int lowbit(const int x){return x&-x;}
    inline void add(int pos){
        while(pos<=n){
            tree[pos]++;
            pos+=lowbit(pos);
        }
    }
    inline int ask(int pos){
        int res=0;
        while(pos){
            res+=tree[pos];
            pos-=lowbit(pos);
        }
        return res;
    }
}using namespace BIT;
inline int nxd(const vector<int> x){
    for(int i=0;i<=n;i++) tree[i]=0;int res=0;
    for(int i=x.size()-1;i>=0;i--) res+=ask(x[i]),add(x[i]);
    return res;
}
inline void solve(){
    n=read();a1.clear(),a2.clear();
    for(int i=1;i<=n;i++){
        int x=read();
        if(i%2==1) a1.push_back(x);
        else a2.push_back(x);
    }
    bool t=(nxd(a1)%2!=nxd(a2)%2);
    sort(a1.begin(),a1.end());
    sort(a2.begin(),a2.end());
    int x1=0,x2=0;
    for(int i=1;i<=n;i++){
        if(i%2==1) ans[i]=a1[x1++];
        else ans[i]=a2[x2++];
    }
    if(t) swap(ans[n-2],ans[n]);
    for(int i=1;i<=n;i++) print(ans[i],' ');puts("");
}
signed main(){
    int T=read();
    while(T--) solve();
    return 0;
}
```