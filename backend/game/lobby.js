'use strict';

var Round = require('./round');

function Lobby(host) {
  var _host = host;
  var _players = [_host];
  var _rounds = [];
  var _currentRound = -1;

  var playerExist = function(id) {
    var player = _players.find(p => p === id);
    return player !== undefined;
  };

  var addPlayer = function(player) {
    if (!playerExist(player)) {
      _players.push(player);
    }
  };

  var removePlayer = function(player) {
    if (player == _host) return;

    var index = _players.indexOf(player);
    if (index > -1) {
      _players.splice(index, 1);
    }
  };

  var start = function() {
    if (_players.length <= 2) return false;
    if (_currentRound != -1) return false;

    var round = Round(null, _players.slice(0));
    _rounds[++_currentRound] = round;

    return true;
  };

  return {
    addPlayer: addPlayer,
    removePlayer: removePlayer,
    start: start,
    players: () => {
      return _players.slice();
    },
    host: () => {
      return _host;
    },
    currentRound: () => {
      if (_currentRound+1 < _rounds.length) return undefined;

      return _rounds[_currentRound];
    },
  };
}

exports = module.exports = Lobby;
