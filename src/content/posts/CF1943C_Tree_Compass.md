---
title: CF1943C_Tree_Compass
published: 2025-06-13
description: ''
image: ''
tags: [题解]
category: '题解'
draft: false 
lang: ''
series: 'CF'
---
[洛谷题目](https://www.luogu.com.cn/problem/CF1943C)
[CF题目](https://codeforces.com/problemset/problem/1943/C)

---

### 题意

给出一棵 $n$ 个点的树，初始时所有的点都是白色的，每次你可以选择一个点 $x$ 和一个非负整数半径 $r$，将树上所有与 $x$ 距离为 $r$ 的点染成黑色，求把所有点染成黑色的最少操作次数，并给出一组方案。

范围：$1 \le n \le 2 \times 10^{3} $。

---

### Solution

首先大胆猜测 $x$ 可能为树的中心。

证明：设树的直径长度为 $l$。对于一条直径上的点，每次至多染两个点。

- 若 $l$ 为奇数，取中心操作，则对直径的操作次数显然为 $\lceil \frac{l}{2} \rceil$，达到最小。
- 若 $l$ 为偶数，重复对两个中心操作。继续分类讨论，发现 $l \bmod 4 = 0$ 时操作次数为 $\frac{l}{2}$，$l \bmod 4 = 2$ 时操作次数为 $\frac{l}{2}+1$，也达到最小。

由此可以证明对于直径树的中心操作的次数最少，再根据直径为树中最长的链可得树的中心即为操作的点 $x$。由此得证。

时间复杂度：$O(n)$。


---


### Code


```cpp
#include<bits/stdc++.h>
using namespace std;
const int N=2e3+5;
struct node{int to,next;}edge[N<<1];
int n,head[N],cnt,len,ans,res[N],dis[N],num;bool vis[N];
inline void add(const int u,const int v){//加边
    edge[++cnt].next=head[u];
    edge[cnt].to=v;
    head[u]=cnt;
}
namespace rw{//快读快写
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
inline void dfs(const int u,const int dep){
    if(vis[u]) return;vis[u]=1;
    if(dep>len) ans=u,len=dep;//len即为直径的长度
    for(int i=head[u];i;i=edge[i].next){
        int v=edge[i].to;
        dfs(v,dep+1);
    }
}
inline void dfs2(const int u,const int dep){
    if(dis[u]) return;dis[u]=dep;
    for(int i=head[u];i;i=edge[i].next){
        int v=edge[i].to;
        dfs2(v,dep+1);
    }
}
inline void dfs3(const int u){
    res[++num]=u;//记录答案
    for(int i=head[u];i;i=edge[i].next){
        int v=edge[i].to;
        if(dis[v]==dis[u]-1) return dfs3(v),void(0);
    }
}
inline void outit(){//输出答案
    if(len%4==0){
        print(len>>1,'\n');
        for(int i=1;i<<1<=len;i+=2) cout<<res[len>>1]<<" "<<i<<'\n'<<res[(len>>1)+1]<<" "<<i<<'\n';
    }
    else if(len%4==2){
        print((len>>1)+1,'\n');
        for(int i=1;i<<1<=len;i+=2) cout<<res[len>>1]<<" "<<i<<'\n'<<res[(len>>1)+1]<<" "<<i<<'\n';
    }
    else{
        print((len>>1)+1,'\n');
        for(int i=0;i<<1<len;i++) cout<<res[(len>>1)+1]<<" "<<i<<'\n';
    }
}
//初始化
inline void init(){for(int i=1;i<=n;i++) head[i]=0,dis[i]=0;cnt=0;num=0;}
inline void init2(){for(int i=1;i<=n;++i) vis[i]=0;len=0;}
inline void solve(){
    n=read();init();
    for(int i=1;i<n;i++){
        int u=read(),v=read();
        add(u,v),add(v,u);
    }
    init2();dfs(1,1);init2();
    int s=ans;dfs(s,1);//找出直径
	int t=ans;dfs2(t,1);
	dfs3(s);outit();
}
signed main(){
    int T=read();
    while(T--) solve();
    return 0;
}
```
---