---
title: CF1413F_Roads_and_Ramen
published: 2025-06-13
description: ''
image: ''
tags: [题解]
category: '题解'
draft: false 
lang: ''
series: "CF"
---
[洛谷题目](https://www.luogu.com.cn/problem/CF1413F)
[CF题目](https://codeforces.com/problemset/problem/1413/F)

---

### 题意

给出一棵 $n$ 个点的树，每条边上有权值 $0/1$，定义路径的长度为路径上的边的数量。

$q$ 次修改，每次修改会改变一条边的权值，每次修改后回答最长的有偶数个 $1$ 的路径长度。

范围：$2 \le n \le 5 \times 10^{5}$，$1 \le q \le 5 \times 10^{5}$

---

### Solution

先随意定一个根，令点 $x$ 到根路径上的边权异或和为 $s_{x}$，那么一条路径 $\{x,y\}$ 上有偶数个 $1$ 当且仅当 $s_{x}=s_{y}$。

对于直径 $\{p,q\}$，如果 $s_{p}=s_{q}$，显然答案为直径的长度。

否则，对于任意的一个点 $u$，由于 $s_{p} \ne s_{q}$，必有 $s_{u}=s_{p}$ 或 $s_{u}=s_{q}$，所以答案的链的一个端点必然是直径的一个端点。

用线段树维护区间 $0/1$ 反转即可维护最长链，分类讨论直径两端并比较即可。

时间复杂度：$O(n+q\log n)$。


---

### Code

```cpp
#include<bits/stdc++.h>
using namespace std;
const int N=5e5+5;
struct E{int to,next;bool val;}edge[N<<1];
int n,q,head[N],cnt=1,dep[N];
inline void add(const int u,const int v,const bool w){
    edge[++cnt].next=head[u];
    edge[cnt].to=v;
    edge[cnt].val=w;
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
    inline void print(const int x,const char ch){return (write(x),putchar(ch)),void(0);}
}using namespace rw;
inline void dfs(const int u,const int fa){
    dep[u]=dep[fa]+1;
    for(int i=head[u];i;i=edge[i].next){
        int v=edge[i].to;
        if(fa==v) continue;
        dfs(v,u);
    }
}
struct Tree{
    int inx[N],in[N],out[N],dfn[N],dep[N],num;bool val[N];
    inline void dfs(const int u,const int fa){
        dep[u]=dep[fa]+1;dfn[++num]=u;in[u]=num;
        for(int i=head[u];i;i=edge[i].next){
            int v=edge[i].to;bool w=edge[i].val;
            if(fa==v){inx[i>>1]=u;continue;}
            val[v]=(val[u]^w);dfs(v,u);
        }
        out[u]=num;
    }
    struct node{int l,r,maxn[2];bool tag;}tree[N<<2];
    inline void pushup(const int p){
        tree[p].maxn[0]=max(tree[p<<1].maxn[0],tree[p<<1|1].maxn[0]);
        tree[p].maxn[1]=max(tree[p<<1].maxn[1],tree[p<<1|1].maxn[1]);
    }
    inline void swp(const int p){
        tree[p].tag^=1;
        swap(tree[p].maxn[0],tree[p].maxn[1]);
    }
    inline void pushdown(const int p){
        if(tree[p].tag){
            swp(p<<1),swp(p<<1|1);
            tree[p].tag=0;
        }
    }
    inline void build(const int p,const int l,const int r){
        tree[p].l=l,tree[p].r=r;
        if(l==r) return tree[p].maxn[val[dfn[l]]]=dep[dfn[l]],void(0);
        int mid=(l+r)>>1;
        build(p<<1,l,mid);
        build(p<<1|1,mid+1,r);
        pushup(p);
    }
    inline void upd(const int p,const int l,const int r){
        if(r<tree[p].l||tree[p].r<l) return;
        if(l<=tree[p].l&&tree[p].r<=r) return swp(p),void(0);
        pushdown(p);
        upd(p<<1,l,r);
        upd(p<<1|1,l,r);
        pushup(p);
    }
    inline int ask(){return tree[1].maxn[0];}
    inline void init(const int root){dfs(root,0);build(1,1,n);}
    inline void update(const int x){upd(1,in[inx[x]],out[inx[x]]);}
}T1,T2;
inline void ask(const int x){
    T1.update(x),T2.update(x);
    print(max(T1.ask(),T2.ask())-1,'\n');
}
signed main(){
    n=read();
    for(int i=1;i<n;i++){
        int u=read(),v=read(),w=read();
        add(u,v,w),add(v,u,w);
    }int tmp=1;
    dfs(tmp,0);for(int i=1;i<=n;i++) if(dep[i]>dep[tmp]) tmp=i;T1.init(tmp);
    dfs(tmp,0);for(int i=1;i<=n;i++) if(dep[i]>dep[tmp]) tmp=i;T2.init(tmp);
    q=read();while(q--) ask(read());
    return 0;
}
```


---