package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

// 12 red cubes, 13 green cubes, and 14 blue cubes
const red = 12
const green = 13
const blue = 14

func main() {
	input, _ := os.ReadFile("input.txt")
	var sum int
	var part2 int

	for _, s := range strings.Split(string(input), "\n") {
		m := map[string]int{"red": 0, "green": 0, "blue": 0}
		fmt.Println(s)
		game, score := func() (string, string) {
			x := strings.Split(s, ":")
			return x[0], x[1]
		}()

		for _, draw := range strings.Split(score, ";") {
			for _, color := range strings.Split(draw, ",") {
				c := strings.Fields(color)
				if val, _ := strconv.Atoi(c[0]); val > m[c[1]] {
					m[c[1]] = val
				}
			}
		}
		if red >= m["red"] && green >= m["green"] && blue >= m["blue"] {
			id := strings.Fields(game)
			n, _ := strconv.Atoi(id[1])
			sum += n
		}
		part2 += m["red"] * m["green"] * m["blue"]
	}
	fmt.Println(sum)
	fmt.Println(part2)
}
