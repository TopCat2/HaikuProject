/**
 * Created by Peter on 6/1/16.
 */
var haiku = require("./haiku");

// Read in the list of words
var wordlist = haiku.getWordList("./cmudict.txt");

// Print a 5-7-5 haiku and a randomly partitioned haiku
console.log(haiku.createHaiku([[5], [7], [5]], wordlist));
console.log()
console.log(haiku.createHaiku([partition(5), partition(7), partition(5)], wordlist));

// Utility function to partition a line length into potentially smaller words.
function partition(n) {
    var num,
        result = [];
    while (n > 0) {
        num = Math.floor(Math.random() * n) + 1;
        result.push(num);
        n -= num;
    }
    return result;
}
