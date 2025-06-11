---
title: DP进阶
published: 2025-06-11
description: ''
image: ''
tags: [c++]
category: 'c++'
draft: true
lang: ''
---
---
# 树形DP

树形 $\text{DP}$，即在树上进行的 $\text{DP}$。
由于遍历树固有的递归性质，树形 $\text{DP}$ 一般都是递归进行的。我们将从一些经典模型和例子开始。
## 求所有点的子树大小
```cpp
inline void dfs(const int u,const int f){
	siz[u]=1;
	for(int i=head[u];i;i=edge[i].next){
		int v=edge[i].to;
		if(f!=v) dfs(v,u);
		siz[u]+=siz[v];
	}
}
```
## 树上最大独立集
给出⼀个 $n$ 个点的树，每个点有权值 $w_{i}$，要求选出⼀个点集权值和最大。使得没有⼀条边两端的点同时被选。
要求时间复杂度 $O(n)$。

常见的树形 $\text{DP}$ 都会记录 $f_{u,0/1}$ 答案（视情况分析）。
在这个题里，可以这样设计状态 $f_{u,0/1}$ 分别表⽰**不选**和**选了**的情况下的答案。
因为树天生具有⼀种无后效性，想要合并儿子的信息只需要儿子那⼀个点的信息。
也就是子树内做完 $\text{DP}$ 之后，只需要保留根的信息就好了，同时采用 $\text{dfs}$ 的方法来 $\text{DP}$。

```cpp
inline void dfs(const int u,const int f){
	f[u][0]=0,f[u][1]=w[u];
	for(int i=head[u];i;i=edge[i].next){
		int v=edge[i].to;
		if(f!=v) dfs(v,u);
		f[u][0]+=max(f[v][0],f[v][1]); // 若u不选，则⼉⼦可选可不选，取⼤者。
		f[u][1]+=f[v][0];// 若u选上，则⼉⼦只能不选。
	}
}
```
## 树上背包
树上的背包问题，简单来说就是背包问题与树形 $\text{DP}$ 的结合。
在此之前需要了解基本的**背包模型**和**背包的合并**。
> Attention:
> 树上背包问题代码时间复杂度是 $O(n^{2})$ 的。
### 例题：[P2014 [CTSC1997] 选课](https://www.luogu.com.cn/problem/P2014)
给出 $n$ 个点的森林，每个点有权值 $a_{i}$，要求选了⼀个点必然要选其父亲。求出选择 $m$ 个点能得到的最⼤权值和。
数据范围：$1 \le n,m \le 300$。

可以加 $1$ 个点编号为 $0$，将森林变为一棵树。
考虑背包问题解法为设当前取了多少个元素。可以借鉴此方法，设 $f_{u,i}$ 为以 $u$ 为根的子树选了 $i$ 个节点的最大权值和。一个点如果选了，则它的父亲节点必定选了，那么每个节点的初始值为 $1$。接着考虑每个背包的合并。

可得状态转移方程为：$f_{u,i+j} = \max \limits_{1 \le i \le \min(siz_{u},m+1),1 \le j \le siz_{v},i + j \le m+1} (f_{u,i+j},f_{u,i}+f_{v,j})$。
```cpp
#include<bits/stdc++.h>
using namespace std;
const int N=3e2+5;
struct node{int to,next;}edge[N<<1];
int n,m,w[N],head[N],cnt,f[N][N],g[N],siz[N];
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
inline void bag(const int u,const int v){
    for(int i=1;i<=siz[u];i++){
        for(int j=0;j<=siz[v];j++){
            g[i+j]=max(g[i+j],f[u][i]+f[v][j]);
        }
    }
    siz[u]+=siz[v];
    for(int i=1;i<=siz[u];i++) f[u][i]=g[i],g[i]=0;
}
inline void dfs(const int u){
    f[u][1]=w[u],siz[u]=1;
    for(int i=head[u];i;i=edge[i].next){
        int v=edge[i].to;dfs(v);
        bag(u,v);
    }
}
signed main(){
    n=read(),m=read();m++;
    for(int i=1;i<=n;i++){
        int k=read();w[i]=read();
        add(k,i);
    }
    dfs(0);
    print(f[0][m],'\n');
    return 0;
}
```
### [P11363 [NOIP2024] 树的遍历](https://www.luogu.com.cn/problem/P11363)
题意详见原题。

首先考虑 $k=1$ 的答案。已经知道开始边，对于每一条边是从一条边转移过来，在以任意顺序遍历它的子树，则答案就是：$\prod{(deg_i-1)!}$。
接着考虑 $k=2$ 的答案。将两边连成一条链显然答案为 $(deg_i-2)!$。
![](https://cdn.luogu.com.cn/upload/image_hosting/hxos5ogw.png)
上图中，红边为可能为起始边的边，蓝边为其中一种遍历方法。

然后，思考若起始边一定是一条从叶子节点出发去往叶子节点的一条链。证明：考虑一个点的周围全是黑边，这些边内部的蓝边一定为一条链，对于一条链来说，起始边必然为链的一端。当一条链确定是答案为：$\prod{(deg_i-1)!} \times \prod{(deg_u-1)^{-1}}$，$i$ 为所有点，$u$ 为链上的节点。

现在问题转化为：**有一棵边权为 $0/1$ 的树，点有点权，求所有叶子到叶子的链，满足链上有一条 $1$ 的边，点的权值乘积的和**。

对于这个问题可以取一个非叶子节点做根，记录每个子树内有无 $1$ 总和为 $dp_{u,0/1}$，计算贡献即可。
```cpp
#include<bits/stdc++.h>
#define int long long
using namespace std;
const int N=1e5+5,mod=1e9+7;
struct node{int to,next,flag;}edge[N<<1];
int n,k,head[N],cnt,chose[N],du[N],u[N],v[N],ans,f[N][2],inv[N];
inline void add(const int u,const int v,const int flag){
    edge[++cnt].next=head[u];
    edge[cnt].to=v;
    edge[cnt].flag=flag;
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
inline void dfs(const int u,const int fa){
    f[u][1]=f[u][0]=0;int val=0;
    for(int i=head[u];i;i=edge[i].next){
        int v=edge[i].to,flag=edge[i].flag;if(fa==v) continue;dfs(v,u);
        if(flag) f[v][1]+=f[v][0],f[v][0]=0;
        val=(val+f[v][1]*(f[u][0]+f[u][1])+f[v][0]*f[u][1])%mod;
        f[u][0]=(f[u][0]+f[v][0])%mod,f[u][1]=(f[u][1]+f[v][1])%mod;
    }
    int INV=inv[du[u]];ans=(ans+val*INV)%mod;if(!du[u]) f[u][0]++;
    f[u][0]=(f[u][0]*INV)%mod;
    f[u][1]=(f[u][1]*INV)%mod;
}
inline void init(){for(int i=1;i<=n;i++) head[i]=0,du[i]=-1,chose[i]=0;cnt=0,ans=0;}
inline void solve(){
    n=read(),k=read();init();
    for(int i=1;i<n;i++){u[i]=read(),v[i]=read();du[u[i]]++,du[v[i]]++;}
    for(int i=1;i<=k;i++){int x=read();chose[x]=1;}
    if(n==2) return print(1,'\n'),void(0);
    for(int i=1;i<n;i++) add(u[i],v[i],chose[i]),add(v[i],u[i],chose[i]);
    int rt=0;for(int i=1;i<=n;i++) if(du[i]) rt=i;dfs(rt,0);
    for(int i=1;i<=n;i++) for(int j=1;j<=du[i];j++) ans=(ans*j)%mod;
    print(ans,'\n');
}
signed main(){
    inv[0]=inv[1]=1;
    for(int i=2;i<=N;i++) inv[i]=inv[mod%i]*(mod-mod/i)%mod;
    int c=read(),T=read();
    while(T--) solve();
    return 0;
}
```
## 换根 $\text{DP}$
树形换根 $\text{DP}$ 问题又称为*二次扫描*，通常不会指定树的根，且随着根的变换某些值也会发生改变，如子节点深度和、点权值和。
通常进行两次 $\text{DFS}$，第一次 $\text{DFS}$ 求出子树内的值，第二次 $\text{DFS}$ 进行换根操作。
### 例题：[P3478 [POI 2008] STA-Station](https://www.luogu.com.cn/problem/P3478)
给定一个 $n$ 个点的树，请求出一个结点，使得以这个结点为根时，所有结点的深度之和最大。
一个结点的深度之定义为该节点到根的简单路径上边的数量。
对于全部的测试点，保证 $1 \le n \le 10^{6},1 \le u,v \le n$，给出的是一棵树。

很明显换根 $\text{DP}$。对于第一次 $\text{DFS}$ 求出以 $1$ 为根的 每个子树的深度和&每个子树的大小，将每个子树的深度加入 $f_{1}$。对于第二次 $\text{DFS}$ 考虑换根，将根为 $u$ 转换为 $v$，则根为 $v$ 的子树的深度 $-1$，其他 $+1$，转移方程为：$f_{v}=f_{u}+n-2 \times siz_{v}$。最后将所有的 $f_{i}$ 最大值输出即可。

```cpp
#include<bits/stdc++.h>
#define int long long
using namespace std;
const int N=1e6+5;
struct node{int to,next;}edge[N<<1];
int n,head[N],cnt,siz[N],dep[N],f[N],ans,maxn;
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
inline void dfs_init(const int u,const int fa){
    siz[u]=1,dep[u]=dep[fa]+1;
    for(int i=head[u];i;i=edge[i].next){
        int v=edge[i].to;
        if(fa==v) continue;
        dfs_init(v,u);siz[u]+=siz[v];
    }
}
inline void dfs_do(const int u,const int fa){
    for(int i=head[u];i;i=edge[i].next){
        int v=edge[i].to;
        if(fa==v) continue;
        f[v]=f[u]+n-2*siz[v];
        dfs_do(v,u);
    }
}
signed main(){
    n=read();
    for(int i=1;i<n;i++){
        int u=read(),v=read();
        add(u,v),add(v,u);
    }
    dfs_init(1,0);for(int i=1;i<=n;i++) f[1]+=dep[i];dfs_do(1,0);
    for(int i=1;i<=n;i++) if(maxn<f[i]) maxn=f[i],ans=i;
    print(ans,'\n');
    return 0;
}
```
---
# 状压 $\text{DP}$
状压 $\text{DP}$ 是动态规划的一种，通过将状态压缩为整数来达到优化转移的目的。是利用计算机二进制的性质来描述状态的一种 $\text{DP}$ 方式。

状压 $\text{DP}$ 其实就是将状态压缩成 $2$ 进制来保存 其特征就是看起来有点像搜索，每个格子的状态只有 $1$ 或 $0$，是另一类非常典型的动态规划。

为了更好的理解状压 $\text{DP}$，首先介绍**位运算**相关的知识。

- `&`符号，$x \& y$，会将两个十进制数在二进制下进行与运算（都 $1$ 为 $1$，其余为 $0$） 然后返回其十进制下的值。例如$3(11)\&2(10)=2(10)$。
- `|`符号，$x | y$，会将两个十进制数在二进制下进行或运算（都0为0，其余为1） 然后返回其十进制下的值。例如 $3(11) | 2(10)=3(11)$。
- `^`符号，$x \  \^{} \ y$，会将两个十进制数在二进制下进行异或运算（不同为1，其余 为0）然后返回其十进制下的值。例如 $3(11)\ \^{} \ 2(10)=1(01)$。
- `~`符号，$\~{} \ x$，按位取反。例如 $\~{} \ 101=010$。
- `<<`符号，左移操作，$x<<2$，将 $x$ 在二进制下的每一位向左移动两位，最右边用 $0$ 填充，$x<<2$ 相当于让 $x$ $\times 4$。
- `>>`符号，是右移操作，$x>>1$ 相当于给 $x/2$，去掉 $x$ 二进制下的最右一位

1. 判断一个数字 $x$ 二进制下第 $i$ 位是不是等于 $1$。（最低第 $1$ 位）
方法：`if(((1<<(i−1))&x)>0)` 将 $1$ 左移 $i-1$ 位，相当于制造了一个只有第 $i$ 位上是 $1$，其他位上都是 $0$ 的二进制数。然后与 $x$ 做与运算，如果结果 $>0$， 说明 $x$ 第 $i$ 位上是 $1$，反之则是 $0$。
2. 将 $x$ 的第i位更改成 $1$。
方法：`x|=(1<<(i−1))`证明方法与 $1$ 类似。
3. 将 $x$ 的第 $i$ 位更改成$0$。
方法：`x&=(~(1<<(i−1)))`
4. 将 $x$ 最靠右的 $1$ 去掉。
方法：`x=x&(x−1)`
5. 取出 $x$ 的第 $i$ 位。
方法：`(x>>(i-1))&1`
6. 将 $x$ 的第 $i$ 位取反。
方法：`x^=((1<<(i-1))`
7. 取出 $x$ 最靠右的 $1$。
方法：`x&(-x)`
8. 判断是否有两个连续的 $1$。
方法：`if(x&(x<<1))`
9. 枚举子集。
方法：`for(int x=sta;x;x=((x-1)&sta) cout<<x;`


### 例题1：[P1896 [SCOI2005] 互不侵犯](https://www.luogu.com.cn/problem/P1896)
在 $N \times N$ 的棋盘里面放 $K$ 个国王，使他们互不攻击，共有多少种摆放方案。国王能攻击到它上下左右，以及左上左下右上右下八个方向上附近的各一个格子，共 $8$ 个格子。
对于全部数据，$1 \le N \le 9，0  \le K \le N \times N$。

首先只考虑一行，此时这一行的国王的状态只与上一行和这一行的国王有关。
![](https://oi-wiki.org/dp/images/SCOI2005-%E4%BA%92%E4%B8%8D%E4%BE%B5%E7%8A%AF.png)
以上这个例子中国王的状态可以用二进制表示为 $101001_{(2)}$。
于是我们有了三个状态：第几行 $i$、此行的状态 $j$、已经使用的国王数 $s$。
考虑状态转移。先预处理出每个状态 $sit_x$，其中包含了二进制的 $1$ 的个数，及这行放的国王个数 $cnt_x$，于是就有状态转移方程：$f_{i,j,s} = \sum \limits_{2 \le i \le n,1 \le j \le tot,1 
\le k \le tot} f_{i-1,k,s-cnt_{j}}$。
接着考虑国王的合法情况，运用位运算来判断两个状态在同一个或相邻位置是否有国王：
- `if(sit[j]&sit[k])`(上下有重复的国王)
- `if((sit[j]<<1)&sit[k])`(左上右下有重复的国王)
- `if(sit[j]&(sit[k]<<1))`(右上左下有重复的国王)

这样就将不符合题意的状态去掉。
```cpp
#include<bits/stdc++.h>
#define int long long
using namespace std;
const int N=2e3+5;
int n,k,f[10][N][105]={0},sit[N],cnt[N],tot=0,ans=0;
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
inline void dfs(const int h,const int sum,const int step){
    if(step>=n){
        sit[++tot]=h;
        cnt[tot]=sum;
        return;
    }
    dfs(h,sum,step+1);
    dfs(h+(1<<step),sum+1,step+2);
}
signed main(){
    n=read(),k=read();dfs(0,0,0);
    for(int i=1;i<=tot;i++) f[1][i][cnt[i]]=1;
    for(int i=2;i<=n;i++){
        for(int j=1;j<=tot;j++){
            for(int l=1;l<=tot;l++){
                if((sit[j]&sit[l])||((sit[j]<<1)&sit[l])||(sit[j]&(sit[l]<<1))) continue;
                for(int s=k;s>=cnt[j];s--) f[i][j][s]+=f[i-1][l][s-cnt[j]];
            }
        }
    }
    for(int i=1;i<=tot;i++) ans+=f[n][i][k];
    print(ans,'\n');
    return 0;
}
```

### 例题2：[P3959 [NOIP 2017 提高组] 宝藏](https://www.luogu.com.cn/problem/P3959)
题面详见原题。

### 例题3：[CF1767E](https://www.luogu.com.cn/problem/CF1767E) [Algebra Flash](https://codeforces.com/problemset/problem/1767/E)
给出⼀个 $n \le 40$ 个点的图，每个点有权值，求其最大权独立集。

---
# 数位 $\text{DP}$
此类问题的特征比较明显，常见的形式是数 $[l,r]$ 内满足某个条件的数字个数，这个数字可能很大。

考虑人类计数的⽅式，最朴素的计数就是从小到大开始依次加⼀。但我们发现对于位数比较多的数，这样的过程中有许多重复的部分。
例如，从 $7000$ 数到 $7999$ 从 $8000$ 数到 $8999$、和从 $9000$ 数到 $9999$ 的过程⾮常相似，它们都是后三位从 $000$ 变到 $999$，不⼀样的地⽅只有千位这⼀位，所以我们可以把这些过程合并起来，⽤ $\text{DP}$ 的⽅式进⾏状态转移。

我们可以用 $f ( n )$ 表示 $[ 0 , n ]$ 的所有满足条件的个数，那么对于 $[ l , r ]$ 我们就可以用 $[ l , r ] \iff f ( r ) − f ( l − 1 )$，前缀和思想。那么也就是说我们只要求出 $f ( n )$ 即可。那么数位 $\text{DP}$ 关键的思想就是从树的角度来考虑。将数拆分成位，从高位到低位开始枚举。我们可以视 $N$ 为 $n$ 位数，那么我们拆分$N:a_{n}、a_{n-1}...a_1$。那么我们就可以开始分解建树，如下。之后我们就可以预处理再求解 $f ( n )$ 了。
![](https://i-blog.csdnimg.cn/blog_migrate/e4e4bdb49dde528bc9e22713b7fde44a.png)

### 例题1：[P2602 [ZJOI2010] 数字计数](https://www.luogu.com.cn/problem/P2602)
给定两个正整数 $a$ 和 $b$，求在 $[a,b]$ 中的所有整数中，每个数码各出现了多少次。
对于 $100 \%$ 的数据，保证 $1 \le a \le b \le 10^{12}$。 

首先差分⼀下，变成求解 $[1,r]$ 的答案。
发现唯⼀的⼀个问题是前导零和当前是否顶着 $r$ 的上界，记录这两者即可。常见的实现方法是记忆化搜索。

```cpp
#include<bits/stdc++.h>
#define int long long
using namespace std;
int f[20][20],num[20],a,b;
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
inline int dp(const int pos,const int flag,const int sum,const int d,const int qdl){
    int res=0,up=9;//flag为1表示有限制，lead为0表示有前导0
    if(pos==0) return sum;//边界条件
    if(!flag&&qdl&&f[pos][sum]!=-1) return f[pos][sum];//记忆化
    if(flag) up=num[pos];
    for(int i=0;i<=up;i++){
        res+=dp(pos-1,(i==up&&flag),sum+((i||qdl)&&(i==d)),d,qdl||i);
    }
    if(!flag&&qdl) f[pos][sum]=res;
    return res;
}
inline int solve(int x,const int d){
    memset(f,-1,sizeof(f));
    int len=0;
    while(x){
        num[++len]=x%10;//最高位在第一位 
        x/=10;
    }
    return dp(len,1,0,d,0);
}
signed main(){
    a=read(),b=read();
    for(int i=0;i<=9;i++) print(solve(b,i)-solve(a-1,i),' ');
    return 0;
}
```
---
# 概率 $\text{DP}$ 和期望 $\text{DP}$
前置知识：概率和期望，高斯消元法。
由于概率和期望联系紧密，且常常以期望 $\text{DP}$ 的形式出现，所以下面会多讲⼀点期望相关。虽然随机变量的期望在大纲中是超纲的，但是平时运用还是非常广泛的。

## 概率 $\text{DP}$
这类题目采用顺推，也就是从初始状态推向结果。
和⼀般的 $\text{DP}$ 类似，难点依然是对状态转移方程的刻画，只是这类题目经过了概率论知识的包装。
### 例题：[CF148D](https://codeforces.com/problemset/problem/148/D) [Bag of mice](https://www.luogu.com.cn/problem/CF148D)
袋子里有 $w$ 只白鼠和 $b$ 只黑鼠 ，$A$ 和 $B$ 轮流从袋子里抓，谁先抓到白色谁就赢。$A$ 每次随机抓一只，$B$ 每次随机抓完一只之后会有另一只随机老鼠跑出来。如果两个人都没有抓到白色则 $B$ 赢。$A$ 先抓，问 $A$ 赢的概率。
范围：$0 \le w ,b \le 1000$。

设 $f_{i,j}$ 表示当前有 $i$ 只白鼠，$j$ 只黑鼠时 $A$ 的获胜概率。
考虑一论中的情况：
 - 先手摸到白鼠，直接获胜。
 - 先手摸到黑鼠，后手摸到白鼠，直接失败。
 - 先手摸到黑鼠，后手摸到黑鼠，跑出白鼠。通过 $f_{i-1,j-2}$ 转移。
 - 先手摸到黑鼠，后手摸到黑鼠，跑出黑鼠。通过 $f_{i,j-3}$ 转移。

```cpp
#include<bits/stdc++.h>
#define int long long
using namespace std;
const int N=1005;
int w,b;double f[N][N];
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
signed main(){
    w=read(),b=read();
    for(int i=1;i<=w;i++) f[i][0]=1.0,f[i][1]=1.0*i/(i+1);
    if(!b||b==1) return cout<<fixed<<setprecision(9)<<f[w][b]<<'\n',0;
    for(int i=1;i<=w;i++){
        for(int j=2;j<=b;j++){
            f[i][j]=1.0*i/(i+j);
            f[i][j]+=1.0*j/(i+j)*(j-1)/(i+j-1)*i/(i+j-2)*f[i-1][j-2];
            if(j^2) f[i][j]+=1.0*j/(i+j)*(j-1)/(i+j-1)*(j-2)/(i+j-2)*f[i][j-3];
        }
    }
    cout<<fixed<<setprecision(9)<<f[w][b]<<'\n';
    return 0;
}
```
## 期望 $\text{DP}$
下面的题目都带有“期望”。
常见的离散期望可以表示为某个事件的权值乘发生的概率之和。
⼀些期望题就是符合条件的方案数除以总方案数。
另⼀些考察期望线性性的题就比较难了，需要合理的拆分期望。
### 例题1：[AT_dp_j](https://atcoder.jp/contests/dp/tasks/dp_j) [Sushi](https://www.luogu.com.cn/problem/AT_dp_j)
现有 $N$ ($1 \le N \le 300$)个盘子，编号为 $1,2,3,…,N$。第 $i$ 个盘子中放有 $a_i$ ($1 \le a_i \le 3$)个寿司。接下来每次执行以下操作，直至吃完所有的寿司。从第 $1,2,3,…,N$ 个盘子中任选一个盘子，吃掉其中的一个寿司。若没有寿司则不吃。若将所有寿司吃完，请问此时操作次数的数学期望是多少？
范围：$1 \le N \le 300$，$1 \le a_i \le 3$。

设 $f_{i,j,k}$ 表示有 $i$ 个盘子有 $1$ 个寿司，$j$ 个盘子有 $2$ 个寿司，$k$ 个盘子有 $3$ 个寿司时吃完所有寿司的期望值。显然 $0$ 个的有 $n-i-j-k$ 个。
考虑转移。枚举到那个数，则 $f_{i,j,k}$ 为以下四项之和：
- 枚举到 $0$，$\dfrac{n-i-j-k}n(f_{i,j,k}+1)$。
- 枚举到 $1$，$\dfrac in(f_{i-1,j,k}+1)$。
- 枚举到 $2$，$\dfrac jn(f_{i+1,j-1,k}+1)$。
- 枚举到 $3$，$\dfrac kn(f_{i,j+1,k-1}+1)$。
合并即是：$f_{i,j,k}=\dfrac{(n-i-j-k)f_{i,j,k}+if_{i-1,j,k}+jf_{i+1,j-1,k}+kf_{i,j+1,k-1}+n}n$。
将以上式子化简得：$f_{i,j,k}=\dfrac{if_{i-1,j,k}+jf_{i+1,j-1,k}+kf_{i,j+1,k-1}+n}{i+j+k}$。

```cpp
#include<bits/stdc++.h>
using namespace std;
const int N=305;
int n,a[10];double f[N][N][N];
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
signed main(){
    n=read();
    for(int i=1;i<=n;i++){
        int x=read();
        a[x]++;
    }
    for(int k=0;k<=n;k++){
        for(int j=0;j<=n;j++){
            for(int i=0;i<=n;i++){
                if(!i&&!j&&!k) continue;
                f[i][j][k]=n;
                if(i) f[i][j][k]+=i*f[i-1][j][k];
                if(j) f[i][j][k]+=j*f[i+1][j-1][k];
                if(k) f[i][j][k]+=k*f[i][j+1][k-1];
                f[i][j][k]/=i+j+k;
            }
        }
    }
    cout<<fixed<<setprecision(10)<<f[a[1]][a[2]][a[3]]<<'\n';
    return 0;
}
```

## 待定系数法
设 $f_i$ 表⽰从 $i$ 开始走到终点的期望步数。
那么 $f_i$ 可以用 $k \times f_0 +b$ 来表⽰，最后解出 $f_0$ 即可。

---
# $\text{DP}$ 方法
## 排列方法
通常是不给出排列，形如求满足某条件的所有排列的权值之和的问题。
### 逐步生成
- 从左往右依次确定绝对值
- 从小到大依次确定绝对位置
- 从左往右依次确定相对大小(在前缀中的排名)
- 从小到大依次插入序列中
### 例题1：[AT_dp_t](https://atcoder.jp/contests/dp/tasks/dp_t) [Permutation](https://www.luogu.com.cn/problem/AT_dp_t)
有一个长为 $N$ 的正整数排列。给定一个由 $<$ 和 $>$ 组成长为 $N−1$ 的的字符串。 对于任意满足 $1 \le i \le N−1$ 的字符 $s_i$，如果 $s_i$ 是 $<$ 则 $P_i<P_{i+1}$ 如果 $s_i$ 是 $>$ 则 $P_i>P_{i+1}$。求满足这样的性质的排列 $P$ 的方案数。答案对 $10^9+7$ 取模。
范围：$2 \le N \le 3000$。

这里采用 *从左往右依次确定相对大小(在前缀中的排名)* 的方法求解。
首先设 $f_{i,j}$ 表示在前 $i$ 个位置上填入 $1 \to i$，且最后一位为 $j$ 的方案数，显然边界为 $f_{1,1}=1$。接下来考虑转移。我们可以将前 $i-1$ 中 $\geq j$ 都 $+1$ 以保证是排列，枚举第 $i-1$ 个数是多少，我们就得到了转移方程：
$$ f(x)=\left\{\begin{aligned}{\textstyle \sum_{j-1}^{k=1}} f_{i-1,k}，s_i="<" \\{\textstyle \sum_{i-1}^{k=1}} f_{i-1,k}，s_i=">"\end{aligned}\right.$$

```cpp
#include<bits/stdc++.h>
#define int long long
using namespace std;
const int N=3005,mod=1e9+7;
int n,f[N][N],sum[N][N];char s[N];
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
signed main(){
    n=read();for(int i=1;i<=n;i++) s[i]=getchar();f[1][1]=1;
    for(int i=1;i<=n;i++) sum[1][i]=1;
    for(int i=2;i<=n;i++){
        for(int j=1;j<=i;j++){
            if(s[i-1]=='<') f[i][j]=sum[i-1][j-1]%mod;
            if(s[i-1]=='>') f[i][j]=(sum[i-1][i-1]-sum[i-1][j-1]+mod)%mod;
            sum[i][j]=(sum[i][j-1]+f[i][j])%mod;
        }
    }
    print(sum[n][n]%mod,'\n');
    return 0;
}
```

### 例题2：[CF1806D](https://codeforces.com/contest/1806/problem/D) [DSU Master](https://www.luogu.com.cn/problem/CF1806D)
给出序列 $a$。对于一个长度为 $m−1$ 的排列 $p$，定义它的价值如下：有一个初始为森林的并查集，按照 $p_1...p_m-1$ 的顺序合并并查集 $p_i$ 和 $p_{i+1}$，如果 $a_{p_{i}}=1$，那么将 $p_{i}+1$ 所在的并查集的根并到 $p_i$ 所在的并查集的根上，否则将 $p_i$ 并所在并查集到 $p_i+1$ 所在的并查集的根上，进行完所有操作后 $1$ 的儿子的个数。你需要对于所有 $k \in [1,n−1]$ 求出长度为 $k$ 的 $k!$ 中排列顺序的价值和，对 $998244353$ 取模。

根据连边方式，⼀个连通块始终是值域上的⼀个区间。
首先拆贡献，考虑 $p_i=x$ 什么时候会产生贡献，首先要 $a_x=0$，然后连 $(x,x+1)$，要求是 $1 \to x$ 已经连通，也就是在 $p_1,p_2,...,p_{i-1}$ 中出现了 $1 \to x-1$，$a_x=1$ 时满足这个条件会消除后续的所有贡献。
设 $ans_i$ 表示 $1 \to i$ 所有排列的答案，$f_i$ 表示若 $a_{i+1}=0$ 额外的贡献，考虑用**从小到大依次插入序列中**的方法。
转移时考虑枚举 $i$ 的位置，显然放前 $i-1$ 个空隙中不影响答案，$a_i=0$ 时放在最后有额外的贡献，否则将贡献清空。这样状态转移方程就写出来了：
$$
\begin{cases}
f_i=f_{i-1}\cdot i,\ \ \ \ \ \ \ \ \ \ \ \ ans_i=ans_{i-1}\cdot i+f_{i-1}&a_i=0\\
f_i=f_{i-1}\cdot(i-1),\ \ ans_i=ans_{i-1}\cdot i&a_i=1
\end{cases}
$$

```cpp
#include<bits/stdc++.h>
#define int long long
using namespace std;
const int N=5e5+5,mod=998244353;
int n,a[N],f[N],ans[N];
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
inline void solve(){
    n=read();
    for(int i=1;i<n;i++) a[i]=read();
    f[0]=1;
    for(int i=1;i<n;i++){
        if(a[i]==0) f[i]=f[i-1]*i%mod;
        else f[i]=f[i-1]*(i-1)%mod;
    }
    ans[0]=0;
    for(int i=1;i<n;i++){
        ans[i]=(ans[i-1]*i%mod+(a[i]==0)*f[i-1])%mod;
        print(ans[i],' ');
    }
    puts("");
}
signed main(){
    int T=read();
    while(T--) solve();
    return 0;
}
```

## 括号序列问题
解决这类问题，考虑几个对括号序列经典的刻画。
- 将左括号看成 $1$，右括号看成 $-1$，一个括号序列合法当且仅当前缀和 $\le 0$ 且总和为 $0$。
- 将上述过程画在折线统计图。
- 递归定义，空串是合法序列，若 $S1,S2$ 是合法序列，则 $(S1),(S2),S1S2$ 均为合法序列。

## Slope Trick
这是管理连续凸函数 $f:R \to R$ 的技巧，注意和斜率优化区分开来。
下面从分段函数入手。
一个连续的分段函数的每一段斜率范围应为：$[l,l+1,l+2,...r-1,r]$。
此处要求斜率均为整数。可存在斜率为 $0$ 的线段。

