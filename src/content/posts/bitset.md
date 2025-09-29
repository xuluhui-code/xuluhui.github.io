---
title: bitset
published: 2025-09-29
description: ''
image: ''
tags: [模板类]
category: C++
draft: false 
lang: ''
---
```cpp
#include <climits>
#include <stdexcept>
#include <string>
#include <iostream>
#include <cctype>
#include <algorithm>

template<size_t N>
class bitset {
private:
    static constexpr size_t bits_per_word = sizeof(unsigned long) * CHAR_BIT;
    static constexpr size_t num_words = (N + bits_per_word - 1) / bits_per_word;

    unsigned long data[num_words] = {0};

    static constexpr unsigned long make_mask() {
        if constexpr (N % bits_per_word == 0) {
            return ~0UL;
        } else {
            return (1UL << (N % bits_per_word)) - 1;
        }
    }

    static constexpr unsigned long mask = make_mask();

    void check_position(size_t pos) const {
        if (pos >= N) {
            throw std::out_of_range("bitset position out of range");
        }
    }

    std::pair<size_t, size_t> get_position(size_t pos) const {
        return std::make_pair(pos / bits_per_word, pos % bits_per_word);
    }

    void trim_last_word() {
        if constexpr (N % bits_per_word != 0) {
            data[num_words - 1] &= mask; 
        }
    }

    static size_t find_lowest_bit(unsigned long word) noexcept {
        unsigned lowest_bit = word & -word;

        #if defined(__GNUC_) || defined(__clang)
            return __builtin_ctzl(lowest_bit);
        #else
            size_t pos = 0;
            while (lowest_bit != 0) {
                if (lowest_bit & 1) return pos;
                lowest_bit >>= 1;
                ++pos;
            }

            return 0;
        #endif
    }
public:
    constexpr bitset() noexcept = default;
    
    constexpr bitset(unsigned long val) noexcept {
        data[0] = val;
        trim_last_word();
    }

    template<class CharT, class Traits, class Alloc>
    explicit bitset(const std::basic_string<CharT, Traits, Alloc>& str,
                   typename std::basic_string<CharT, Traits, Alloc>::size_type pos = 0,
                   typename std::basic_string<CharT, Traits, Alloc>::size_type n = 
                   std::basic_string<CharT, Traits, Alloc>::npos,
                   CharT zero = CharT('0'), CharT one = CharT('1')) {
        if (pos > str.size()) {
            throw std::out_of_range("bitset string constructor position out of range");
        }
        
        size_t len = std::min(n, str.size() - pos);
        len = std::min(len, N);
        
        for (size_t i = 0; i < len; ++i) {
            CharT c = str[pos + len - 1 - i];
            if (Traits::eq(c, one)) {
                set(i);
            } else if (!Traits::eq(c, zero)) {
                throw std::invalid_argument("bitset string contains characters other than zero and one");
            }
        }
    }

    bitset& set() noexcept {
        for (size_t i = 0; i < num_words; ++i) {
            data[i] = ~0UL;
        }
        trim_last_word();
        return *this;
    }

    bitset& set(size_t pos, bool val = true) {
        check_position(pos);
        auto [word, bit] = get_position(pos);
        if (val) {
            data[word] |= (1UL << bit);
        } else {
            data[word] &= ~(1UL << bit);
        }
        return *this;
    }

    bitset& reset() noexcept {
        for (size_t i = 0; i < num_words; ++i) {
            data[i] = 0;
        }
        return *this;
    }

    bitset& reset(size_t pos) {
        return set(pos, false);
    }

    bitset& flip() noexcept {
        for (size_t i = 0; i < num_words; ++i) {
            data[i] = ~data[i];
        }
        trim_last_word();
        return *this;
    }

    bitset& flip(size_t pos) {
        check_position(pos);
        auto [word, bit] = get_position(pos);
        data[word] ^= (1UL << bit);
        return *this;
    }

    bool operator[](size_t pos) const {
        check_position(pos);
        auto [word, bit] = get_position(pos);
        return (data[word] >> bit) & 1;
    }

    bool test(size_t pos) const {
        return operator[](pos);
    }

    class reference {
        friend class bitset;
        unsigned long* word;
        unsigned long mask;

        reference(unsigned long* w, size_t b) : word(w), mask(1UL << b) {}
        
    public:
        reference& operator=(bool x) noexcept {
            if (x) {
                *word |= mask;
            } else {
                *word &= ~mask;
            }
            return *this;
        }

        reference& operator=(const reference& x) noexcept {
            if (x.mask & *x.word) {
                *word |= mask;
            } else {
                *word &= ~mask;
            }
            return *this;
        }

        bool operator~() const noexcept {
            return !(*word & mask);
        }

        operator bool() const noexcept {
            return *word & mask;
        }

        reference& flip() noexcept {
            *word ^= mask;
            return *this;
        }
    };

    reference operator[](size_t pos) {
        check_position(pos);
        auto [word, bit] = get_position(pos);
        return reference(&data[word], bit);
    }
    
    constexpr size_t size() const noexcept {
        return N;
    }

    size_t count() const noexcept {
        size_t cnt = 0;
        for (size_t i = 0; i < num_words; ++i) {
            unsigned long word = data[i];
            while (word) {
                cnt++;
                word &= word - 1;
            }
        }
        return cnt;
    }

    bool any() const noexcept {
        for (size_t i = 0; i < num_words; ++i) {
            if (data[i]) return true;
        }
        return false;
    }

    bool none() const noexcept {
        return !any();
    }

    bool all() const noexcept {
        for (size_t i = 0; i < num_words - 1; ++i) {
            if (data[i] != ~0UL) return false;
        }

        if constexpr (N % bits_per_word == 0) {
            return data[num_words - 1] == ~0UL;
        } else {
            return (data[num_words - 1] & mask) == mask;
        }
    }

    template<class CharT = char,
             class Traits = std::char_traits<CharT>,
             class Allocator = std::allocator<CharT>>
    std::basic_string<CharT, Traits, Allocator>
    to_string(CharT zero = CharT('0'), CharT one = CharT('1')) const {
        std::basic_string<CharT, Traits, Allocator> res;
        res.reserve(N);

        for (size_t i = N; i > 0; --i) {
            res.push_back((*this)[i - 1] ? one : zero);
        }

        return res;
    }

    unsigned long to_ulong() const {
        for (size_t i = 1; i < num_words; ++i) {
            if (data[i]) {
                throw std::overflow_error("bitset value too large for unsigned long");
            }
        }

        if constexpr (N > bits_per_word) {
            if (data[0] > (~0UL >> (bits_per_word - N))) {
                throw std::overflow_error("bitset value too large for unsigned long");
            }
        }

        return data[0];
    }

    unsigned long long to_ullong() const {
        constexpr size_t ull_bits = sizeof(unsigned long long) * CHAR_BIT;
        if (N > ull_bits) {
            for (size_t i = (ull_bits + bits_per_word - 1) / bits_per_word; i < num_words; ++i) {
                if (data[i]) {
                    throw std::overflow_error("bitset value too large for unsigned long long");
                }
            }
        }

        unsigned long long res = 0;
        size_t bits_to_copy = std::min(N, ull_bits);
        size_t words_to_copy = (bits_to_copy + bits_per_word - 1) / bits_per_word;

        for (size_t i = 0; i < words_to_copy; ++i) {
            res |= static_cast<unsigned long long>(data[i]) << (i * bits_per_word);
        }

        return res;
    }

    bitset& operator&=(const bitset& other) noexcept {
        for (size_t i = 0; i < num_words; ++i) {
            data[i] &= other.data[i];
        }
        return *this;
    }

    bitset& operator|=(const bitset& other) noexcept {
        for (size_t i = 0; i < num_words; ++i) {
            data[i] |= other.data[i];
        }
        return *this;
    }

    bitset& operator^=(const bitset& other) noexcept {
        for (size_t i = 0; i < num_words; ++i) {
            data[i] ^= other.data[i];
        }
        return *this;
    }

    bitset operator~() const noexcept {
        bitset res = *this;
        res.flip();
        return res;
    }

    bitset& operator<<=(size_t shift) noexcept {
        if (shift >= N) {
            return reset();
        }

        if (shift == 0) {
            return *this;
        }

        size_t word_shift = shift / bits_per_word;
        size_t bit_shift = shift % bits_per_word;

        if (word_shift > 0) {
            for (size_t i = num_words - 1; i >= word_shift; --i) {
                data[i] = data[i - word_shift];
            }
            for (size_t i = 0; i < word_shift; ++i) {
                data[i] = 0;
            }
        }

        if (bit_shift > 0) {
            for (size_t i = num_words - 1; i > 0; --i) {
                data[i] = (data[i] << bit_shift) |
                          (data[i - 1] >> (bits_per_word - bit_shift));
            }
            data[0] <<= bit_shift;
        }

        trim_last_word();
        return *this;
    }

    bitset& operator>>=(size_t shift) noexcept {
        if (shift >= N) {
            return reset();
        }

        if (shift == 0) {
            return *this;
        }

        size_t word_shift = shift / bits_per_word;
        size_t bit_shift = shift % bits_per_word;

        if (word_shift > 0) {
            for (size_t i = 0; i < num_words - word_shift; ++i) {
                data[i] = data[i + word_shift];
            }
            for (size_t i = num_words - word_shift; i < num_words; ++i) {
                data[i] = 0;
            }
        }

        if (bit_shift > 0) {
            for (size_t i = 0; i < num_words - 1; ++i) {
                data[i] = (data[i] >> bit_shift) |
                          (data[i + 1] << (bits_per_word - bit_shift));
            }
            data[num_words - 1] >>= bit_shift;
        }

        return *this;
    }

    bitset operator<<(size_t shift) const noexcept {
        bitset res = *this;
        res <<= shift;
        return res;
    }

    bitset operator>>(size_t shift) const noexcept {
        bitset res = *this;
        res >>= shift;
        return res;
    }

    bool operator==(const bitset& other) const noexcept {
        for (size_t i = 0; i < num_words; ++i) {
            if (data[i] != other.data[i]) {
                return false;
            }
        }
        return true;
    }

    bool operator!=(const bitset& other) const noexcept {
        return !(*this == other);
    }

    template <class CharT, class Traits>
    friend std::basic_istream<CharT, Traits>&
    operator>>(std::basic_istream<CharT, Traits>& is, bitset& bs) {
        std::basic_string<CharT, Traits> tmp;
        tmp.reserve(N);

        CharT zero = is.widen('0');
        CharT one = is.widen('1');

        typename std::basic_istream<CharT, Traits>::sentry sen(is);
        if (sen) {
            std::ios_base::iostate state = std::ios_base::goodbit;
            size_t extracted = 0;

            while (extracted < N) {
                typename Traits::int_type c = is.rdbuf()->sgetc();

                if (Traits::eq_int_type(c, Traits::eof())) {
                    state |= std::ios_base::eofbit;
                    break;
                }

                CharT ch = Traits::to_char_type(c);
                if (ch != zero && ch != one) {
                    break;
                }

                tmp.push_back(ch);
                is.rdbuf()->sbumpc();
                ++extracted;
            }

            if (extracted == 0) {
                state |= std::ios_base::failbit;
            }

            try {
                bs = bitset(tmp, 0, extracted, zero, one);
            } catch (...) {
                state |= std::ios_base::badbit;
            }

            if (state != std::ios_base::goodbit) {
                is.setstate(state);
            }
        }

        return is;
    }

    template <class CharT, class Traits>
    friend std::basic_ostream<CharT, Traits>&
    operator<<(std::basic_ostream<CharT, Traits>& os, const bitset& bs) {
        return os << bs.template to_string<CharT, Traits, std::allocator<CharT>>(
            os.widen('0'), os.widen('1'));
    }

    size_t _Find_first() const noexcept {
        for (size_t i=0; i < num_words; ++i) {
            if (data[i] != 0) {
                return i * bits_per_word + find_lowest_bit(data[i]);
            }
        }
        return N;
    }

    size_t _Find_next(size_t pos) const noexcept {
        if (pos >= N - 1) return N;
        
        size_t start_word = pos / bits_per_word;
        size_t start_bit = pos % bits_per_word + 1;

        if (start_bit < bits_per_word) {
            unsigned long mask = ~((1UL << start_bit) - 1);
            unsigned long word = data[start_word] & mask;

            if (word != 0) {
                return start_word * bits_per_word + find_lowest_bit(word);
            }
        }

        for (size_t i = start_word + 1; i < num_words; ++i) {
            if (data[i] != 0) {
                return i * bits_per_word + find_lowest_bit(data[i]);
            }
        }

        return N;
    }
};

template<size_t N>
bitset<N> operator&(const bitset<N>& lhs, const bitset<N>& rhs) noexcept {
    bitset<N> res = lhs;
    res &= rhs;
    return res;
}

template<size_t N>
bitset<N> operator|(const bitset<N>& lhs, const bitset<N>& rhs) noexcept {
    bitset<N> res = lhs;
    res |= rhs;
    return res;
}

template<size_t N>
bitset<N> operator^(const bitset<N>& lhs, const bitset<N>& rhs) noexcept {
    bitset<N> res = lhs;
    res ^= rhs;
    return res;
}
```