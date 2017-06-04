'use strict';

var expect = require('chai').expect;
var Psychobabble = require('../../game/psychobabble');
var builder = Psychobabble().builder;
var valid = Psychobabble().valid;

const WORDS = {
  the: { type: 'word', root: 'the' },
  quick: { type: 'word', root: 'quick' },
  brown: { type: 'word', root: 'brown' },
  fox: { type: 'word', root: 'fox', s: 'foxes' },
  jump: { type: 'word', root: 'jump' },
  over: { type: 'word', root: 'over' },
  lazy: {
    type: 'word',
    root: 'lazy',
    ly: 'lazily',
    ed: 'lazed',
    ing: 'lazing',
  },
  dog: { type: 'word', root: 'dog' },
  is: { type: 'word', root: 'is' },
};

const MODIFIERS = {
  s: { type: 'modifier', root: 's' },
  ed: { type: 'modifier', root: 'ed' },
  ly: { type: 'modifier', root: 'ly' },
  en: { type: 'modifier', root: 'en' },
  ing: { type: 'modifier', root: 'ing' },
};

const BuilderTestCases = [
  {
    expected: 'the quick brown fox jumps over the lazy dog',
    words: [
      WORDS.the,
      WORDS.quick,
      WORDS.brown,
      WORDS.fox,
      WORDS.jump,
      MODIFIERS.s,
      WORDS.over,
      WORDS.the,
      WORDS.lazy,
      WORDS.dog,
    ],
  },
  {
    expected: 'ingens foxing brownly',
    words: [
      MODIFIERS.ing,
      MODIFIERS.en,
      MODIFIERS.s,
      WORDS.fox,
      MODIFIERS.ing,
      WORDS.brown,
      MODIFIERS.ly,
    ],
  },
  {
    expected: 'lazing foxes is quick lazing dog',
    words: [
      WORDS.lazy,
      MODIFIERS.ing,
      WORDS.fox,
      MODIFIERS.s,
      WORDS.is,
      WORDS.quick,
      WORDS.lazy,
      MODIFIERS.ing,
      WORDS.dog,
    ],
  },
];

function idfy(word, i) {
  var dup = Object.assign({}, word);
  dup.id = i;
  return dup;
}

describe('Psychobabble Logic', function() {
  describe('builder', function() {
    BuilderTestCases.forEach(function(test) {
      it('should build ' + test.expected, function() {
        expect(builder(test.words)).to.be.eq(test.expected);
      });
    });
  });

  describe('valid', function() {
    var words = [WORDS.the, WORDS.quick, WORDS.brown, WORDS.fox].map(idfy);

    it('should be true if input words and words are the same', function() {
      expect(valid(words, words)).to.be.true;
    });

    it('should be true if words are less than input words', function() {
      var inputWords = words.slice();
      inputWords.pop();

      expect(valid(words, inputWords)).to.be.true;
    });

    it('should be false if there are duplicated words', function() {
      var inputWords = [words[0], words[0]];

      expect(valid(words, inputWords)).to.be.false;
    });

    it('should be false if there are new words', function() {
      var newWord = idfy(WORDS.dog, 999);

      expect(valid(words, [newWord])).to.be.false;
    });
  });
});
