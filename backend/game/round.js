'use strict';

const STATE = {
  UNSTARTED: 10,
  BUILD_QUESTION: 20,
  VOTING: 30,
  ENDED: 40,
};

function Round(factory, players) {
  var _players = players.slice();
  var _state = STATE.UNSTARTED;
  var _words = [];
  var _sentences = {};
  var _votes = {};
  var _generator = factory.generator;
  var _builder = factory.builder;

  var changeState = function(newState) {
    _state = newState;
  };

  var wordsAllowed = function(inputWords) {
    inputWords = new Set(inputWords.map((w) => w.id));
    var roundWords = new Set(_words.map((w) => w.id));

    for (let w of inputWords) {
      if (!roundWords.has(w)) {
        return false;
      }
    }
    return true;
  };

  var hasDuplicate = function(inputWords) {
    var size = inputWords.length;
    var setSize = (new Set(inputWords.map((w) => w.id))).size;

    return size !== setSize;
  };

  var playerExist = function(id) {
    var player = _players.find(function(p) { return p === id; });
    return player !== undefined;
  };

  var start = function() {
    if (_state !== STATE.UNSTARTED) return;

    _words = _generator();
    _sentences = {};
    _votes = {};

    changeState(STATE.BUILD_QUESTION);
  };

  var sentence = function(inputWords) {
    if (_state !== STATE.BUILD_QUESTION) return;
    if (!wordsAllowed(inputWords)) return;
    if (hasDuplicate(inputWords)) return;

    return _builder(inputWords);
  };

  var submitSentence = function(id, inputWords) {
    if (_state !== STATE.BUILD_QUESTION) return;
    if (id in _sentences) return false;

    var s = sentence(inputWords);
    if (s === undefined) return false;

    _sentences[id] = s;

    if (Object.keys(_sentences).length === _players.length) {
      changeState(STATE.VOTING);
    }
    return true;
  };

  var words = function() {
    if (_state < STATE.BUILD_QUESTION) return;
    return _words.slice();
  };

  var sentences = function() {
    if (_state < STATE.VOTING) return;
    return Object.assign({}, _sentences);
  };

  var vote = function(id, votee) {
    if (_state !== STATE.VOTING) return;
    if (id in _votes) return false;
    if (!playerExist(votee)) return false;

    _votes[id] = votee;

    if (Object.keys(_votes).length === _players.length) {
      changeState(STATE.ENDED);
    }
    return true;
  };

  var results = function() {
    if (_state !== STATE.ENDED) return;

    var results = {};
    _players.forEach(function(player) {
      results[player] = [];
    });

    _players.forEach(function(player) {
      var votee = _votes[player];
      results[votee].push(player);
    });

    return results;
  };

  return {
    start: start,
    sentence: sentence,
    words: words,
    sentences: sentences,
    vote: vote,
    results: results,
    submitSentence: submitSentence,
    players: function() { return _players.slice(); },
    state: function() { return _state; },
  };
}

exports = module.exports = Round;
exports.STATE = STATE;
