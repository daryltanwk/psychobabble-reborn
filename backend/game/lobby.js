'use strict';

function Lobby(host) {
  var _host = host;
  var _players = [_host];

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

  return {
    addPlayer: addPlayer,
    removePlayer: removePlayer,
    players: () => {
      return _players.slice();
    },
    host: () => {
      return _host;
    }
  };
}

exports = module.exports = Lobby;
