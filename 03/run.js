import fs from "node:fs/promises";

const input = await fs.readFile('/Users/jzielinski/IdeaProjects/personal/aoc/03/input.txt', 'utf-8');

const r = /\d+/g

function isSymbol(char) {
    return isNaN(char) && char !== '.';
}

const test = '467..114..\n' +
    '...*......\n' +
    '..35..633.\n' +
    '......#...\n' +
    '617*......\n' +
    '.....+.58.\n' +
    '..592.....\n' +
    '......755.\n' +
    '...$.*....\n' +
    '.664.598..';
const split = input.split('\n');

let sum = 0;
for (let i = 1; i < split.length - 1; i++) {
    for (const match of split[i].matchAll(r)) {
        let isPartNumber = false;
        if (match.index > 0) {
            // check left
            for (let k = i - 1; k <= i + 1; k++) {
                isPartNumber = isPartNumber || isSymbol(split[k][match.index - 1]);
            }
        }
        // check up and down
        for (let k = match.index; k < match[0].length + match.index; k++) {
            if (i > 0) {
                isPartNumber = isPartNumber || isSymbol(split[i-1][k]);
            }
            if (i < split.length - 1) {
                isPartNumber = isPartNumber || isSymbol(split[i+1][k]);
            }
        }
        if (match.index + match[0].length < split[i].length) {
            //check right
            for (let k = i + 1; k >= i - 1; k--) {
                isPartNumber = isPartNumber || isSymbol(split[k][match.index + match[0].length]);
            }
        }
        if (isPartNumber) {
            sum+= parseInt(match[0]);
        }
        
    }
}
// first line
for (const match of split[0].matchAll(r)) {
    let isPartNumber = false;
    if (match.index > 0) {
        // check left
        for (let k = 0; k <= 1; k++) {
            isPartNumber = isPartNumber || isSymbol(split[k][match.index - 1]);
        }
    }
    // check up
    for (let k = match.index; k < match[0].length + match.index; k++) {
        isPartNumber = isPartNumber || isSymbol(split[1][k]);
    }
    if (match.index + match[0].length < split[0].length) {
        //check right
        for (let k = 1; k >= 0; k--) {
            isPartNumber = isPartNumber || isSymbol(split[k][match.index + match[0].length]);
        }
    }
    if (isPartNumber) {
        sum+= parseInt(match[0]);
    }
}

for (const match of split[split.length - 1].matchAll(r)) {
    let isPartNumber = false;
    if (match.index > 0) {
        // check left
        for (let k = split.length - 2; k <= split.length - 1; k++) {
            isPartNumber = isPartNumber || isSymbol(split[k][match.index - 1]);
        }
    }
    // down
    for (let k = match.index; k < match[0].length + match.index; k++) {
        isPartNumber = isPartNumber || isSymbol(split[split.length - 2][k]);
    }
    if (match.index + match[0].length < split[split.length - 1].length) {
        //check right
        for (let k = split.length - 1; k >= split.length - 2; k--) {
            isPartNumber = isPartNumber || isSymbol(split[k][match.index + match[0].length]);
        }
    }
    if (isPartNumber) {
        sum+= parseInt(match[0]);
    }
}

// gear ratios
const pos = Array.from({length: split.length}).map(el => []);
split.forEach((line, row) => {
    for (const match of line.matchAll(r)) {
        for (let i = match.index; i <= match.index + match[0].length; i++) {
            pos[row][i] = match[0];
        }
    }
})

const dirs = [
    [[-1, -1], [-1, 0], [-1, 1]],
    [[0, -1]],
    [[0, 1]],
    [[1, -1], [1, 0], [1,1]]
];

function isNumber(a) {
    return !Number.isNaN(Number(a));
}


let ratio = 0;
for (const [row, line] of split.entries()) {
    for (const [col, char] of line.split('').entries()) {
        if (char === '*') {
            const nf = [];
            for (const pass of dirs) {
                let inNumber = false;
                for (const dir of pass) {
                    const y = row + dir[0];
                    const x = col + dir[1];
                    if (isNumber(split[y]?.[x]) && !inNumber) {
                        inNumber = true;
                        nf.push(pos[y][x]);
                    } else if (!isNumber(split[y]?.[x])) {
                        inNumber = false
                    }
                }
            }
            if (nf.length > 2) {
                console.log('found more than 2 numbers', row, col, nf);
            }
            if (nf.length === 2) {
                ratio += parseInt(nf[0]) * parseInt(nf[1]);   
            }
        }
    }
}
console.log('gear ratio is', ratio);

console.log('sum is', sum);


