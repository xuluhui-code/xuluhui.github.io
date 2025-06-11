---
title: 线段树
published: 2025-06-10
description: ''
image: ''
tags: [c++]
category: 'c++'
draft: true
lang: ''
---
对于区间(线段)的修改、维护，从 $O(n)$ 变为 $O(\log n)$。

---

# 构建

![](https://i-blog.csdnimg.cn/blog_migrate/97c81e47838bc3a2941aaf4c68933de0.png)
这是什么意思呢？ 如果你要表示线段的和，那么最上面的根节点的权值表示的是这个线段 $1 \sim 4$ 的和。根的两个儿子分别表示这个线段中 $1 \sim 2$ 的和，与 $3 \sim 4$ 的和。以此类推。

然后我们还可以的到一个性质：节点 $i$ 的权值 $=$ 她的左儿子权值 $+$ 她的右儿子权值。因为 $1 \sim 4$ 的和就是等于 $1 \sim 2$ 的和与 $2\sim 3$ 的和的和。

根据这个思路，我们就可以建树了，我们设一个结构体 `tree`，`tree[i].l` 与 `tree[i].r` 分别表示这个点代表的线段的左右下标，`tree[i].sum` 表示这个节点表示的线段和。

我们知道，一颗从 1 11 开始编号的二叉树，结点 i ii 的左儿子和右儿子编号分别是 $2 \times i$ 和 $2\times i + 1$。

再根据刚才的性质，得到式子：$tree[i].sum=tree [i∗2].sum+tree[i∗2+1 ].sum$; $tree[i].sum=tree[i*2].sum+tree[i*2+1].sum;tree[i].sum=tree[i∗2].sum+tree[i∗2+1].sum$; 就可以建一颗线段树了！代码如下：

```cpp
inline void build(const int p,const int l,const int r){
    tree[p].l=l,tree[p].r=r;
    if(l==r) return tree[p].sum=input[l],void(0);
    int mid=(l+r)>>1;
    build(p<<1,l,mid);
    build(p<<1|1,mid+1,r);
    tree[p].sum=tree[p<<1].sum+tree[p<<1|1].sum;
}
```

---

# 简单线段树

## 单点修改，区间查询

![](https://i-blog.csdnimg.cn/blog_migrate/22a46ac7055f8f700832ef014ed7a489.png)
然后我们要求 $1 \sim 3$ 的和，我们先从根节点开始查询，发现她的左儿子1-2这个区间和答案区间 $1 \sim 3$ 有交集，那么我们跑到左儿子这个区间。

然后，我们发现这个区间 $1 \sim 2$ 被完全包括在答案区间 $1 \sim 3$ 这个区间里面，那就把她的值 $3$ 返回。

我们回到了 $1 \sim 4$ 区间，发现她的右儿子 $3 \sim 4$ 区间和答案区间 $1 \sim 3$ 有交集，那么我们走到 $3\sim 4$ 区间。

到了 $3 \sim 4$ 区间，我们发现她并没有完全包含在答案区间 $1\sim 3$ 里面，但发现她的左儿子 $3\sim 3$ 区间和 $1\sim 3$ 区间又交集，那么久走到 $3\sim 3$ 区间。

到了 $3\sim 3$ 区间，发现其被答案区间完全包含，就返回她的值 $3$ 一直到最开始。

$3\sim 3$ 区间的 $3 + 1\sim 2$ 区间的 $3 = 6$，我们知道了 $1\sim 3$ 区间和为 $6$。

有人可能会说你这样是不是疯了，我拿脚都能算出 $1 + 2 + 3 = 6$，为什么这么麻烦？！

因为这才几个数，如果一百万个数，这样时间会大大增快。

我们总结一下，线段树的查询方法：

- 如果这个区间被完全包括在目标区间里面，直接返回这个区间的值。
- 如果这个区间的左儿子和目标区间有交集，那么搜索左儿子。
- 如果这个区间的右儿子和目标区间有交集，那么搜索右儿子。

代码如下：

```cpp
inline int ask(const int p,const int l,const int r){
    if(tree[p].r<l||r<tree[p].l) return 0;
    if(l<=tree[p].l&&tree[p].r<=r) return tree[p].sum;
    int res=0;
    if(tree[p<<1].r>=l) res+=ask(p<<1,l,r);
    if(tree[p<<1|1].l<=r) res+=ask(p<<1|1,l,r);
    return res;
}
```

关于那几个if的条件一定要看清楚，最好背下来，以防考场上脑抽推错。

然后,我们怎么修改这个区间的单点，其实这个相对简单很多，你要把区间的第 $dis$ 位加上 $k$。那么你从根节点开始，看这个 $dis$ 是在左儿子还是在右儿子，在哪往哪跑，然后返回的时候，还是按照$tree[i].sum=tree[i*2].sum+tree[i*2+1].sum$ 的原则，更新所有路过的点。

如果不理解，我还是画个图吧，其中深蓝色是去的路径，浅蓝色是返回的路径，回来时候红色的 $+$ 标记就是把这个点加上这个值。
![](https://i-blog.csdnimg.cn/blog_migrate/b0f6769ede881ffe60e77f38bec50400.png)

代码如下：

```cpp
inline void update(const int p,const int pos,const int num){
    if(tree[p].l==tree[p].r) return tree[p].sum+=num,void(0);//如果是叶子节点，那么说明找到了
    if(pos<=tree[p<<1].r) update(p<<1,pos,num);//在哪往哪跑
    else update(p<<1|1,pos,num);
    tree[p].sum=tree[p<<1].sum+tree[p<<1|1].sum;//返回更新
}
```

## 区间修改，单点查询

区间修改和单点查询，我们的思路就变为：如果把这个区间加上 $k$，相当于把这个区间涂上一个 $k$ 的标记，然后单点查询的时候，就从上跑到下，把沿路的标记加起来就好。

这里面给区间贴标记的方式与上面的区间查找类似，原则还是那三条，只不过第一条：如果这个区间被完全包括在目标区间里面，直接返回这个区间的值变为了如果这个区间如果这个区间被完全包括在目标区间里面，讲这个区间标记 $k$。

```cpp
inline void update(const int p,const int l,const int r,const int num){
    if(l<=tree[p].l&&tree[p].r<=r) return tree[p].sum+=num,void(0);
    int mid=(tree[p].l+tree[p].r)>>1;
    if(l<=mid) update(p<<1,l,r,num);
    if(r>mid) update(p<<1|1,l,r,num);
}
```

查询

```cpp
inline void ask(const int p,const int pos){
    ans+=tree[p].sum;
    if(tree[p].l==tree[p].r) return;
    int mid=(tree[p].l+tree[p].r)>>1;
    if(pos<=mid) ask(p<<1,pos);
    else ask(p<<1|1,pos);
}
```

### 区间修改单点查询完整代码

```cpp
#include<bits/stdc++.h>
using namespace std;
const int N=5e5+5;
int n,q,a[N],ans;
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
    inline void print(const int x,const char ch){return (write(x),putchar(ch)),void(0);}
}using namespace rw;
namespace SGT{
    struct node{int l,r,sum;}tree[N<<2];
    inline void build(const int p,const int l,const int r){
        tree[p].l=l,tree[p].r=r;
        if(l==r) return;
        int mid=(l+r)>>1;
        build(p<<1,l,mid);
        build(p<<1|1,mid+1,r);
    }
    inline void update(const int p,const int l,const int r,const int num){
        if(l<=tree[p].l&&tree[p].r<=r) return tree[p].sum+=num,void(0);
        if(tree[p<<1].r>=l) update(p<<1,l,r,num);
        if(tree[p<<1|1].l<=r) update(p<<1|1,l,r,num);
    }
    inline void ask(const int p,const int pos){
        ans+=tree[p].sum;
        if(tree[p].l==tree[p].r) return;
        if(tree[p<<1].r>=pos) ask(p<<1,pos);
        if(tree[p<<1|1].l<=pos) ask(p<<1|1,pos);
    }
}using namespace SGT;
signed main(){
    n=read(),q=read();
    for(int i=1;i<=n;i++) a[i]=read();
    build(1,1,n);
    while(q--){
        int op=read();
        if(op==1){
            int l=read(),r=read(),x=read();
            update(1,l,r,x);
        }
        if(op==2){
            ans=0;int x=read();ask(1,x);
            print(ans+a[x],'\n');
        }
    }
    return 0;
}
```

### 为什么需要把路上的 $\text{num}$ 加起来?

因为我们在进行区间修改的时候，若当前区间已经被完全包含在目标区间 $[ l , r ]$ 里，直接将该区间 $tree[i].num += k$，不需要再继续往下走了，类似 lazy 标记，所以单点查询的时候要再加上路径上的值（即原本的权值再加上经过的若干次修改的值才是这个单点的值）。

# 进阶线段树

区间修改、区间查询，你可能会认为，把上一章里面的这两个模块加在一起就好了，然后你就会发现你大错特错。

因为如果对于 $1\sim 4$ 这个区间，你把 $1\sim 3$ 区间 $+ 1$ ，相当于把节点 $1\sim 2$ 和 $3$ 标记，但是如果你查询 $2\sim 4$ 时，你会发现你加的时没有标记的 $2$节点和没有标记的 $3\sim 4$ 节点加上去，结果当然是错的。

那么我们应该怎么办？这时候 $\text{pushdown}$ 的作用就显现出来了。

你会想到，我们只需要在查询的时候，如果我们要查的 $2$ 节点在 $1\sim 2$ 区间的里面，那我们就可以把 $1\sim 2$ 区间标记的那个 $+ 1$ 给推下去这样就能顺利地加上了。
怎么记录这个标记呢？我们需要记录一个“懒标记” $\text{lazytage}$，来记录这个区间。

区间修改的时候，我们按照如下原则：

- 如果当前区间被完全覆盖在目标区间里，讲这个区间的 $sum+k \times (tree[i].r-tree[i].l+1)$。
- 如果没有完全覆盖，则先下传懒标记。
- 如果这个区间的左儿子和目标区间有交集，那么搜索左儿子。
- 如果这个区间的右儿子和目标区间有交集，那么搜索右儿子。

然后查询的时候，将这个懒标记下传就好了，下面图解一下：
如图，区间 $1\sim 4$ 分别是 $1 、 2 、 3 、 4$ ，我们要把 $1\sim 3$ 区间 $+ 1$ 。因为 $1\sim 2$ 区间被完全覆盖，所以将其 $+2$，并将紫色的 $\text{lazytage}+1$，$3$ 区间同理。
![](https://i-blog.csdnimg.cn/blog_migrate/b64f0efc922c03968527c0310317e7dc.png)
注意我们处理完这些以后，还是要按照$tree[i].sum=tree[i*2].sum+tree[i*2+1].sum$ 的原则返回，代码如下：

```cpp
inline void pushdown(const int p){
    if(tree[p].tag){
        tree[p<<1].tag+=tree[p].tag;
        tree[p<<1|1].tag+=tree[p].tag;
        int mid=(tree[p].l+tree[p].r)>>1;
        tree[p<<1].sum+=tree[p].tag*(mid-tree[p<<1].l+1);
        tree[p<<1|1].sum+=tree[p].tag*(tree[p<<1|1].r-mid);
        tree[p].tag=0;
    }
}
inline void update(const int p,const int l,const int r,const int num){
    if(l<=tree[p].l&&tree[p].r<=r){
        tree[p].sum+=num*(tree[p].r-tree[p].l+1);
        tree[p].tag+=num;
        return;
    }
    pushdown(p);
    if(tree[p<<1].r>=l) update(p<<1,l,r,num);
    if(tree[p<<1|1].l<=r) update(p<<1|1,l,r,num);
    pushup(p);//tree[p].sum=tree[p<<1].sum+tree[p<<1|1].sum;
}
```

查询的时候，和上一章的几乎一样，就是也要像修改一样加入 $\text{pushdown}$，这里用图模拟一下。我们要查询 $2\sim 4$ 区间的和，这是查询前的情况，所有紫色的代表 $\text{lazytage}$。
![](https://i-blog.csdnimg.cn/blog_migrate/5d01a871871b4f1393eeb3f3f333324c.png)
然后，我们查到区间 $1\sim 2$ 时，发现这个区间并没有被完全包括在目标区间里，于是我们就 $\text{pushdown}$，$\text{lazytage}$ 下传，并让每个区间 $sum$ 加上 $(r−l) \times lazytag(r-l)$。
![](https://i-blog.csdnimg.cn/blog_migrate/e56190e962a139b0760084236352fe90.png)
然后查到 $2\sim 2$ 区间，发现被完全包含，所以就返 $3$，再搜索到 $3\sim 4$ 区间，发现被完全包含，那么直接返回 $8$，最后 $3+8=1$ 就是答案

这里是代码实现：

```cpp
inline int ask(const int p,const int l,const int r){
    if(tree[p].r<l||r<tree[p].l) return 0;
    if(l<=tree[p].l&&tree[p].r<=r) return tree[p].sum;
    pushdown(p);int res=0;
    if(tree[p<<1].r>=l) res+=ask(p<<1,l,r);
    if(tree[p<<1|1].l<=r) res+=ask(p<<1|1,l,r);
    return res;
}
```

---

# 乘法（根号）线段树

## 乘法线段树

如果这个线段树只有乘法，那么直接加入 $\text{lazytag}$ 变成乘，然后 $tree[i].sum*=k$ 就好了。但是，如果我们是又加又乘，那就不一样了。

当 $\text{lazytag}$ 下标传递的时候，我们需要考虑，是先加再乘还是先乘再加。我们只需要对 $\text{lazytag}$ 做这样一个处理。

$\text{lazytag}$ 分为两种，分别是加法的 $\text{plz}$ 和乘法的 $\text{mlz}$。

$\text{mlz}$ 很简单处理，$\text{pushdown}$ 时直接 $\times$父亲的就可以了，那么加法呢？

我们需要把原先的 $\text{plz} \times$ 父亲的 $\text{mlz}$ 再 $+$ 父亲的$\text{plz}$。

```cpp
inline void pushdwon(const int p){
    int t1=tree[p].mlz,t2=tree[p].plz;
    tree[p<<1].sum=(tree[p<<1].sum*t1+t2*(tree[p<<1].r-tree[p<<1].l+1))%mod;
    tree[p<<1|1].sum=(tree[p<<1|1].sum*t1+t2*(tree[p<<1|1].r-tree[p<<1|1].l+1))%mod;
    tree[p<<1].mlz=(tree[p<<1].mlz*t1)%mod;
    tree[p<<1|1].mlz=(tree[p<<1|1].mlz*t1)%mod;
    tree[p<<1].plz=(tree[p<<1].plz*t1+t2)%mod;
    tree[p<<1|1].plz=(tree[p<<1|1].plz*t1+t2)%mod;
    tree[p].mlz=0,tree[p].plz=0;
}
```

然后加法和减法的函数同理，维护 $\text{lazytag}$ 的时候加法标记一定要记得现乘再加。

## 根号线段树

其实，根号线段树和除法线段树一样。她们乍眼一看感觉直接用 $\text{lazytag}$ 标记除了多少，但是实际上，会出现精度问题。

c++的除法是向下取整，很明显，$(a+b)/k \neq a/k+b/k$（在向下取整的情况下），而根号，很明显 $\sqrt{a}+ \sqrt{b} \neq \sqrt{a+b}$那么怎么办？

第一个想法就是暴力，对于每个要改动的区间l~r,把里面的每个点都单独除，但这样就会把时间复杂度卡得比大暴力都慢（因为多个常数），所以怎么优化？

我们对于每个区间，维护她的最大值和最小值，然后每次修改时，如果这个区间的最大值根号和最小值的根号一样，说明这个区间整体根号不会产生误差，就直接修改（除法同理）

其中，$\text{lazytag}$ 把除法当成减法，记录的是这个区间里每个元素减去的值。

下面是根号线段树的修改过程：

```cpp
inline void Sqrt(const int i,const int l,const int r){
    if(tree[i].r<l||tree[i].l>r)  return;
    if(tree[i].l>=l&&tree[i].r<=r&&(tree[i].minn-(long long)sqrt(tree[i].minn))
    ==(tree[i].maxx-(long long)sqrt(tree[i].maxx))){//如果这个区间的最大值最小值一样
        long long u=tree[i].minn-(long long)sqrt(tree[i].minn);//计算区间中每个元素需要减去的
        tree[i].lz+=u;
        tree[i].sum-=(tree[i].r-tree[i].l+1)*u;
        tree[i].minn-=u;
        tree[i].maxx-=u;
        return ;
    }
    push_down(i);
    if(tree[i<<1].r>=l) Sqrt(i<<1,l,r);
    if(tree[i<<1|1].l<=r) Sqrt(i<<1|1,l,r);
    tree[i].sum=tree[i<<1].sum+tree[i<<1|1].sum;
    tree[i].minn=min(tree[i<<1].minn,tree[i<<1|1].minn);
    tree[i].maxx=max(tree[i<<1].maxx,tree[i<<1|1].maxx);
}
```

然后 $\text{pushdown}$ 没什么变化，就是要记得 $tree[i].minn$、$tree[i].maxx$ 也要记得$- \text{lazytage}$。
