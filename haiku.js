
// Build a dictionary of words, by syllable length.  The result
// is an array where the nth element is an array of words with n syllables.
function getWordList(dictFileName) {
    var fs = require('fs');
    var result = [];
    var syllables, word;
    var strings = fs.readFileSync(dictFileName).toString().split("\n");
    strings.forEach(function(line) {
        var syllables = numSyllables(line);
        var word = justWord(line);
        if (word !== undefined) {
            if (result[syllables] == null) {
                // First  word for that count; add to result
                result[syllables] = [justWord(line)];
            } else {
                // Add word to the array for that count
                result[syllables].push(justWord(line));
            }
        }
    });
    return result;
}

// Return the number of syllables by counting phonemes with a digit
function numSyllables(line) {
    // Note: The digit-without-preceding-paren pattern is because the dictionary uses
    // an "(n)" suffix when presenting more than one pronunciation for a word.  The
    // one-or-more pattern is to consume multi-digit numbers, which aren't actually in the file.
    var parsed = line.match(/[^(]\d+/g);
    // I REALLY, REALLY wish that match() returned a list of length zero when nothing is found.
    if (parsed !== null) {
        return parsed.length;
    } else {
        return 0;
    }
}

// Return just the word.  Remove phonemes and anything of the form (n).
function justWord(line) {
    var m = line.match(/^[^ (]+/);
    if (m === null) {
        return undefined;
    } else {
        return m[0];
    }
}

// Get a random word of length n
function randWord(wordlist, n) {
    list = wordlist[n];
    // Special case: I don't know a word of that many syllables.
    if (list == null || list.length == 0) {
        return undefined;
    };
    var rand = Math.floor(Math.random() * list.length);
    return list[rand];
}

function createHaiku(struct, wordlist) {
    var result = "";
    var linePrepend = "";
    var wordPrepend;
    for (var line = 0; line < struct.length; line++ ) {
        // Add newline if needed
        result += linePrepend;
        linePrepend = "\n";
        wordPrepend = "";
        var lineStruct = struct[line];
        for (var word = 0; word < lineStruct.length; word++) {
            result += wordPrepend + randWord(wordlist, lineStruct[word]);
            wordPrepend = " ";
        }
    }
    return result;
}

module.exports.createHaiku = createHaiku;
module.exports.getWordList = getWordList;