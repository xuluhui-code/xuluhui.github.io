---
title: template-input
published: 2025-09-18
description: ''
image: ''
tags: [C++,模板]
category: C++
draft: false 
lang: ''
---
```cpp
#include<bits/stdc++.h>
using namespace std;
namespace fast_IO{
    namespace input{									//input
    template<typename T>
    inline T read(){
        if constexpr (std::is_same_v<T,int>){
            int tot=0,t=1;char ch=getchar();
            while(!isdigit(ch)){if(ch=='-') t=-1;ch=getchar();}
            while(isdigit(ch)){tot=tot*10+ch-'0';ch=getchar();}
            return tot*t;
        }
        else if constexpr (std::is_same_v<T,char>){
            char ch=getchar();
            while(isspace(ch)) ch=getchar();
            return ch;
        }
        else if constexpr (std::is_same_v<T,std::string>){
            std::string s;char ch=getchar();
            while(isspace(ch)) ch=getchar();
            while(!isspace(ch)&&ch!=EOF) s+=ch,ch=getchar();
            return s;
        }
        else if constexpr (std::is_same_v<T,double>){
            char ch=getchar();int sign=1;double tot=0.0;
            while(isspace(ch)) ch=getchar();
            if(ch=='-') sign=-1,ch=getchar();
            else if(ch=='+') ch=getchar();
            while(isdigit(ch)) tot=tot*10.0+(ch-'0')*1.0,ch=getchar();
            if(ch=='.'){
                ch=getchar();
                double val=0.0,fac=1.0;
                while(isdigit(ch)){
                    val=val*10.0+(ch-'0')*1.0;
                    fac*=10.0;ch=getchar();
                }
                tot+=1.0*val/fac;
            }
            if(ch=='e'||ch=='E'){
                ch=getchar();int exp_sign=1;
                if(ch=='-') exp_sign=-1,ch=getchar();
                else if(ch=='+') ch=getchar();
                double val=0.0;
                while(isdigit(ch)){
                    val=val*10.0+(ch-'0')*1.0;
                    ch=getchar();
                }
                tot*=std::pow(10.0,exp_sign*val);
            }
            return 1.0*sign*tot;
        }
    }
    inline char read_upper(){
        char ch=getchar();
        while(!isupper(ch)) ch=getchar();
        return ch;
    }                                                         
    inline char read_lower(){
        char ch=getchar();
        while(!islower(ch)) ch=getchar();
        return ch;
    }
    inline char read_num(){
        char ch=getchar();
        while(!isdigit(ch)) ch=getchar();
        return ch;
    }
    }using namespace input;
    namespace output{                                    //output
    template<typename T>
    inline void print(T x){
        if(x<0) putchar('-'),x=-x;
        static int sta[35];int top=0;
        do{sta[top++]=x%10,x/=10;}while(x);
        while(top) putchar(sta[--top]+'0');
    }
    inline char print(const char &x){return putchar(x);}
    template<typename T>
    inline void print(T *x){while(*x) putchar(*(x++));}
    inline void print(const string &x){for(int i=0;i<(int)x.size();i++) putchar(x[i]);}
    inline std::string floor(double x,int pot){
        std::string s="";if(x<0) s+='-';
        int t=(int)x;s+=std::to_string(t)+'.';x-=1.0*t;
        while(pot) x*=10.0,s+=(((int)x)%10+'0'),pot--;
        return s;
    }
    template<typename T,typename...Ts>
    inline void print(const T &x,const Ts&...y){print(x),print(y...);}
    }using namespace output;
}using namespace fast_IO;
signed main(signed argc,char* argv[]){

	return 0;
}
```