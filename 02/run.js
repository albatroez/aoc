import fs from 'node:fs/promises'

const input = await fs.readFile('/Users/jzielinski/IdeaProjects/personal/aoc/02/input.txt', 'utf-8');
const bag = {
    red: 12,
    green: 13,
    blue: 14
}

const rgb = /(\d+) (red|blue|green)/g


let red = 0, blue = 0, green = 0;
let sum = 0;
let power = 0;

for (const line of input.split('\n')) {
    const min = {
        red: 0,
        green: 0,
        blue: 0
    }
    const [game, draws] = line.split(':');
    if (!draws) continue;
    let impossible = false;
    for (const draw of draws.split(';')) {
        for (const score of draw.match(rgb)) {
            const [d, color] = score.split(' ');
            const dp = parseInt(d);
            if (bag[color] < dp) {
                impossible = true;
            }

            if (dp > min[color]) {
                min[color] = dp;
            }
        }
    }
    if (!impossible) {
        const [_, id] = game.split(' ');
        sum += parseInt(id);
    }
    power += min.green * min.red * min.blue;

}
console.log(sum);
console.log(power);