package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
	"unicode"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func main() {
	nums := map[string]int{
		"one":   1,
		"two":   2,
		"three": 3,
		"four":  4,
		"five":  5, "six": 6, "seven": 7, "eight": 8, "nine": 9,
	}
	fi, err := os.Open("input.txt")
	check(err)
	defer func() {
		if err := fi.Close(); err != nil {
			panic(err)
		}
	}()
	sum := 0
	scanner := bufio.NewScanner(fi)
	for scanner.Scan() {
		var first, last rune
		found := false
		line := scanner.Text()
		for pos, char := range line {
			for str, val := range nums {
				if strings.HasPrefix(line[pos:], str) {
					if !found {
						first = rune(strconv.Itoa(val)[0])
						found = true
					} else {
						last = rune(strconv.Itoa(val)[0])
					}
				}
			}
			if unicode.IsDigit(char) {
				if !found {
					first = char
					found = true
				}
				last = char
			}
		}
		if val, err := strconv.Atoi(string(first) + string(last)); err == nil {
			sum += val
		}

	}
	fmt.Println(sum)
}
