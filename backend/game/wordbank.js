'use strict';

const WORDS = {
  noun: [
    ['ball', ''],
    ['car', ''],
    ['tube', ''],
    ['memory', 'memories'],
    ['diver', ''],
    ['poker', ''],
    ['skate', ''],
    ['potato', 'potatoes'],
    ['tomato', 'tomatoes'],
    ['apple', ''],
  ],
  verb: [
    ['kick', '', '', '', ''],
    ['fly', 'flies', 'flew', '', 'flown'],
    ['count', '', '', '', ''],
    ['hold', '', 'held', '', 'held'],
    ['coax', 'coaxes', '', '', ''],
    ['needle', '', 'needled', 'needling', ''],
    ['donate', '', 'donated', 'donating', ''],
    ['give', '', 'gave', 'giving', 'given'],
  ],
  adjective: [
    'blue',
    'hot',
    'high',
    'bright',
    'eager',
    'green',
    'important',
    'small',
    'big',
    'casual',
    'fun',
    'crazy',
  ],
  determiner: ['a', 'the', 'some', 'few'],
  preposition: ['at', 'in', 'of', 'over', 'with'],
  conjunction: ['and', 'of', 'while', 'because', 'but', 'if'],
  modifier: ['s', 'ed', 'ing', 'en'],
};

function LocalWordBank() {
  var bank = {};

  ['conjunction', 'preposition', 'determiner', 'adjective'].forEach(type => {
    bank[type] = WordTypeFn(WORDS[type], function(word) {
      return {
        root: word,
        tag: [type],
        type: 'word',
      };
    });
  });

  bank['modifier'] = WordTypeFn(WORDS.modifier, function(word) {
    return {
      root: word,
      type: 'modifier',
    };
  });

  bank['verb'] = WordTypeFn(WORDS.verb, function(word) {
    var w = {
      root: word[0],
      type: 'word',
      tag: ['verb'],
    };

    if (word[1] != '') w.s = word[1];
    if (word[2] != '') w.ed = word[2];
    if (word[3] != '') w.ing = word[3];
    if (word[4] != '') w.en = word[4];
    return w;
  });

  bank['noun'] = WordTypeFn(WORDS.noun, function(word) {
    var w = {
      root: word[0],
      type: 'word',
      tag: ['noun'],
    };

    if (word[1] != '') w.s = word[1];
    return w;
  });

  return bank;
}

function WordTypeFn(wordList, wordFn) {
  wordList = wordList.map(w => wordFn(w));

  return function(count) {
    return getRandomArrayElements(wordList, count);
  };
}

// https://stackoverflow.com/a/7159251
function getRandomArrayElements(arr, count) {
  var shuffled = arr.slice(0),
    i = arr.length,
    min = i - count,
    temp,
    index;
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(min);
}

exports = module.exports = {};
exports.Local = LocalWordBank();
