const calendar = require('./src/index.js');

// own API KEY
const apiKey = 'FrfJ9dHacz+F1C/eZu2y6H3/IkpYoXks9WESSb89+tGAKHSCoEPkVjMMbYpaklLevH92hAsOX/0RjxXiU8BTiw==';
let bOk = false;

// 1. solar to lunar
bOk = calendar.toLunar('2021', '06', '20', function(json){
    if (bOk) {
        console.log(json);
    }
}, apiKey);

// 2. lunar to solar
bOk = calendar.toSolar('2021', '06', '20', function(json){
    if (bOk) {
        console.log(json);
    }
}, apiKey);
