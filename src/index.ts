console.clear();
console.log('\x1b[36m', 'sometext', '\x1b[0m');

const data = [
    ['1', '2', '3', '4', '5'],
    ['\x1b[43m\x1b[33mXX\x1b[0m', '\x1b[33mX\x1b[0m', '\x1b[33mX\x1b[0m', '\x1b[33mX\x1b[0m', '\x1b[33mX\x1b[0m'],
    ['\x1b[33mX\x1b[0m', '\x1b[33mX\x1b[0m', '\x1b[33mX\x1b[0m', '\x1b[33mX\x1b[0m', '\x1b[33mX\x1b[0m'],
    ['\x1b[33mX\x1b[0m', '\x1b[33mX\x1b[0m', '\x1b[33mX\x1b[0m', '\x1b[33mX\x1b[0m', '\x1b[33mX\x1b[0m'],
    ['\x1b[33mX\x1b[0m', '\x1b[33mX\x1b[0m', '\x1b[33mX\x1b[0m', '\x1b[33mX\x1b[0m', '\x1b[33mX\x1b[0m'],
    ['\x1b[33mX\x1b[0m', '\x1b[33mX\x1b[0m', '\x1b[33mX\x1b[0m', '\x1b[33mX\x1b[0m', '\x1b[33mX\x1b[0m']
];

data.forEach((row) => {
    console.log(row.concat().toString());
})
