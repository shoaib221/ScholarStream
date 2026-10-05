
const fs = require("fs");
let key = fs.readFileSync("./firebase-adminsdk.json", "utf8");

console.log(key)
console.log('')

const base64 = Buffer.from(key, "utf8").toString("base64");


console.log(base64)
console.log('')

key = Buffer.from(base64, "base64").toString("utf8");
console.log(key);
console.log('')

let key1 = JSON.parse(key);

console.log(key1);
console.log('');






