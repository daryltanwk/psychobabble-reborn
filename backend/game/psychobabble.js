'use strict';

function Psychobabble(wordBank) {
  return {
    builder: builder,
    generator: generator,
    valid: valid,
    wordBank: wordBank,
  };
}

function builder(words) {
  var build = function(words, results, currentWord) {
    if (words.length === 0) {
      if (currentWord) {
        results.push(currentWord.root);
      }
      return results.join(' ');
    }

    var word = words.shift();
    if (word.type === 'modifier') {
      var compoundWord = { type: 'compound', root: '' };

      if (word.root in currentWord) {
        compoundWord.root = currentWord[word.root];
      } else {
        compoundWord.root = currentWord.root + word.root;
      }

      return build(words, results, compoundWord);
    } else {
      results.push(currentWord.root);
      return build(words, results, word);
    }
  };

  words = words.slice();
  return build(words, [], words.shift());
}

function generator() {
  var wordCount = {
    noun: 5,
    verb: 2,
    adjective: 3,
    modifier: 3,
    determiner: 2,
    preposition: 3,
    conjunction: 2,
  };

  var words = [];
  for (var type in wordCount) {
    var count = wordCount[type];
    words = words.concat(this.wordBank[type](count));
  }

  words.map(function(word, i) {
    word.id = i;
  });

  return words;
}

function valid(words, inputWords) {
  var wordsAllowed = function(words, inputWords) {
    inputWords = new Set(inputWords.map(w => w.id));
    var roundWords = new Set(words.map(w => w.id));

    for (let w of inputWords) {
      if (!roundWords.has(w)) {
        return false;
      }
    }
    return true;
  };

  var hasDuplicate = function(inputWords) {
    var size = inputWords.length;
    var setSize = new Set(inputWords.map(w => w.id)).size;

    return size !== setSize;
  };

  return !hasDuplicate(inputWords) && wordsAllowed(words, inputWords);
}

exports = module.exports = Psychobabble;
