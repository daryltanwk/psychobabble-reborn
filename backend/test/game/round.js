'use strict';

var expect = require('chai').expect;
var Round = require('../../game/round');

function TestRound(players) {
  return Round(testFactory(), players);
}

function TestInvalidRound(players) {
  var factory = testFactory();
  factory.valid = function() {
    return false;
  };

  return Round(factory, players);
}

function testFactory() {
  var generator = function() {
    return [
      { id: 1, root: 'the' },
      { id: 2, root: 'quick' },
      { id: 3, root: 'brown' },
      { id: 4, root: 'fox' },
      { id: 5, root: 'jumps' },
      { id: 6, root: 'over' },
      { id: 7, root: 'the' },
      { id: 8, root: 'lazy' },
      { id: 9, root: 'dog' },
    ];
  };

  var builder = function(words) {
    return words.map(w => w.root).join(' ');
  };

  var valid = function() {
    return true;
  };

  return {
    generator: generator,
    builder: builder,
    valid: valid,
  };
}

const testPlayers = ['0', '1', '2'];

function ExpectStateChange(round, from, to, testFn) {
  expect(round.state()).to.eq(from);
  testFn();
  expect(round.state()).to.eq(to);
}

function ExpectSameState(round, state, testFn) {
  ExpectStateChange(round, state, state, testFn);
}

describe('Psychobabble Round', function() {
  describe('initializer', function() {
    it('should return an object', function() {
      var round = TestRound(testPlayers);

      expect(round).to.be.an('object');
    });

    it('should have round state of unstarted', function() {
      var round = TestRound(testPlayers);

      expect(round.state()).to.eq(Round.STATE.UNSTARTED);
    });
  });

  describe('start', function() {
    it('should transition the state to question building', function() {
      var round = TestRound(testPlayers);

      ExpectStateChange(
        round,
        Round.STATE.UNSTARTED,
        Round.STATE.BUILD_QUESTION,
        function() {
          round.start();
        }
      );
    });
  });

  describe('words', function() {
    it('should return a list of available words for the player', function() {
      var round = TestRound(testPlayers);
      round.start();

      var words = round.words();

      expect(words).to.be.an('array');
      expect(words).to.have.lengthOf(9);
      words.forEach(function(word) {
        expect(word.root).to.be.a('string');
        expect(word.id).to.be.a('number');
      });
    });

    it('should return undefined if round has not started yet', function() {
      var round = TestRound(testPlayers);

      expect(round.state()).to.eq(Round.STATE.UNSTARTED);
      expect(round.words()).to.be.undefined;
    });
  });

  describe('sentence', function() {
    it('should return the sentence that is constructed from the words', function() {
      var round = TestRound(testPlayers);
      round.start();
      var words = round.words();

      words.pop();
      var sentence = round.sentence(words);

      expect(sentence).to.be.a('string');
      expect(sentence).to.eq('the quick brown fox jumps over the lazy');
    });

    it('should return undefined if the input is not valid', function() {
      var round = TestInvalidRound(testPlayers);
      round.start();

      var sentence = round.sentence([{ root: 'abc', id: 123 }]);

      expect(sentence).to.be.undefined;
    });

    it('should return undefined if the round has not started yet', function() {
      var round = TestRound(testPlayers);

      var sentence = round.sentence([{ root: 'abc', id: 123 }]);

      expect(round.state()).to.eq(Round.STATE.UNSTARTED);
      expect(sentence).to.be.undefined;
    });
  });

  describe('submitSentence', function() {
    it('should return true if the sentence is valid', function() {
      var round = TestRound(testPlayers);
      round.start();
      var words = round.words();

      ExpectStateChange(
        round,
        Round.STATE.BUILD_QUESTION,
        Round.STATE.BUILD_QUESTION,
        function() {
          var submitted = round.submitSentence('0', words);

          expect(submitted).to.be.true;
        }
      );
    });

    it('should return false if another sentence was submitted', function() {
      var round = TestRound(testPlayers);
      round.start();
      var words = round.words();
      round.submitSentence('0', words);
      var t = words[1];
      words[1] = words[0];
      words[0] = t;

      ExpectSameState(round, Round.STATE.BUILD_QUESTION, function() {
        var submitted = round.submitSentence('0', words);

        expect(submitted).to.be.false;
      });
    });

    it('should return false if sentence is not valid', function() {
      var round = TestInvalidRound(testPlayers);
      round.start();

      ExpectSameState(round, Round.STATE.BUILD_QUESTION, function() {
        var submitted = round.submitSentence('0', [{ root: 'abc', id: 123 }]);

        expect(submitted).to.be.false;
      });
    });

    it('should transition to voting state once all sentence are submitted', function() {
      var round = TestRound(testPlayers);
      round.start();
      var words = round.words();

      ExpectStateChange(
        round,
        Round.STATE.BUILD_QUESTION,
        Round.STATE.VOTING,
        function() {
          round.submitSentence('0', words);
          round.submitSentence('1', words);
          round.submitSentence('2', words);
        }
      );
    });
  });

  describe('vote', function() {
    it('should return true when casting a vote', function() {
      var round = TestRound(testPlayers);
      round.start();
      var words = round.words();
      round.submitSentence('0', words);
      round.submitSentence('1', words);
      round.submitSentence('2', words);

      ExpectSameState(round, Round.STATE.VOTING, function() {
        expect(round.vote('0', '1')).to.be.true;
      });
    });

    it('should return false if casting vote for non player', function() {
      var round = TestRound(testPlayers);
      round.start();
      var words = round.words();
      round.submitSentence('0', words);
      round.submitSentence('1', words);
      round.submitSentence('2', words);

      ExpectSameState(round, Round.STATE.VOTING, function() {
        expect(round.vote('0', 'nonplayer')).to.be.false;
      });
    });

    it('should return false when casting multiple votes', function() {
      var round = TestRound(testPlayers);
      round.start();
      var words = round.words();
      round.submitSentence('0', words);
      round.submitSentence('1', words);
      round.submitSentence('2', words);
      round.vote('0', '1');

      ExpectSameState(round, Round.STATE.VOTING, function() {
        expect(round.vote('0', '1')).to.be.false;
      });
    });

    it('should transition to ended state once everyone has voted', function() {
      var round = TestRound(testPlayers);
      round.start();
      var words = round.words();
      round.submitSentence('0', words);
      round.submitSentence('1', words);
      round.submitSentence('2', words);

      ExpectStateChange(
        round,
        Round.STATE.VOTING,
        Round.STATE.ENDED,
        function() {
          round.vote('0', '1');
          round.vote('1', '1');
          round.vote('2', '1');
        }
      );
    });
  });

  describe('results', function() {
    it('should return the result of the round', function() {
      var round = TestRound(testPlayers);
      round.start();
      var words = round.words();
      round.submitSentence('0', words);
      round.submitSentence('1', words);
      round.submitSentence('2', words);
      round.vote('0', '1');
      round.vote('1', '1');
      round.vote('2', '0');

      var results = round.results();

      expect(results).to.be.an('object');
      expect(results['0']).to.eql(['2']);
      expect(results['1']).to.eql(['0', '1']);
      expect(results['2']).to.eql([]);
      expect(round.state()).to.eq(Round.STATE.ENDED);
    });
  });
});
