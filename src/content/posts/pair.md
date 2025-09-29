---
title: pair
published: 2025-09-29
description: ''
image: ''
tags: [模板类]
category: C++
draft: false 
---
```cpp
#include<iostream>
template<typename T1, typename T2>
class pair {
public:
    T1 first;
    T2 second;
    
    pair() : first(T1()), second(T2()) {}

    pair(const T1 &a, const T2 &b) : first(a), second(b) {}

    template<typename U, typename V>
    pair(const pair<U, V> &p) : first(p.first), second(p.second) {}

    pair(T1 &&a, T2 &&b) : first(std::move(a)), second(std::move(b)) {}

    inline pair &operator=(const pair &other) {
        if (this != &other) {
            first = other.first;
            second = other.second;
        }
        return *this;
    }

    template<typename U, typename V>
    inline pair &operator=(const pair &other) {
        first = other.first;
        second = other.second;
        return *this;
    }

    inline void swap(pair &other) noexcept {
        pair tmp(std::move(*this));
        *this = std::move(other);
        other = std::move(tmp);
    }

    inline friend std::ostream &operator<<(std::ostream &os, pair<T1, T2> &pt) {
        return os << "(" << pt.first << "," << pt.second << ")";
    }
};

template<typename T1, typename T2>
inline void swap(pair<T1, T2> &a, pair<T1, T2> &b) noexcept {
    a.swap(b);
}

template<typename T1, typename T2>
inline bool operator==(const pair<T1, T2> &a, const pair<T1, T2> &b) {
    return a.first == b.first && a.second == b.second;
}

template<typename T1, typename T2>
inline bool operator!=(const pair<T1, T2> &a, const pair<T1, T2> &b) {
    return !(a == b);
}

template<typename T1, typename T2>
inline bool operator<(const pair<T1, T2> &a, const pair<T1, T2> &b) {
    return a.first < b.first || (!(b.first < a.first) && a.second < b.second);
}

template<typename T1, typename T2>
inline bool operator>(const pair<T1, T2> &a, const pair<T1, T2> &b) {
    return b < a;
}

template<typename T1, typename T2>
inline bool operator<=(const pair<T1, T2> &a, const pair<T1, T2> &b) {
    return !(b < a);
}

template<typename T1, typename T2>
inline bool operator>=(const pair<T1, T2> &a, const pair<T1, T2> &b) {
    return !(a < b);
}

template<typename T1, typename T2>
constexpr pair<typename std::__decay_and_strip<T1>::__type,
               typename std::__decay_and_strip<T2>::__type>
make_pair(T1 &&a, T2 &&b) {
    typedef typename std::__decay_and_strip<T1>::__type __ds_type1;
    typedef typename std::__decay_and_strip<T2>::__type __ds_type2;
    typedef pair<__ds_type1, __ds_type2> __pair_type;
    return __pair_type(std::forward<T1>(a), std::forward<T2>(b));
}
```