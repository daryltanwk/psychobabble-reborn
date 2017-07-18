'use strict';

var expect = require('chai').expect;
var Lobby = require('../../game/lobby');

const testPlayers = ['0', '1', '2'];

describe('Psychobabble Lobby', function() {
  describe('initializer', function() {
    it('should return an object', function() {
      var lobby = Lobby(testPlayers[0]);
      expect(lobby).to.be.an('object');
    });

    it('should populate the host accordingly', function() {
      var lobby = Lobby(testPlayers[0]);
      expect(lobby.host()).to.eq(testPlayers[0]);
    });
  });

  describe('addPlayer', function() {
    it('should increase the number of players', function() {
      var lobby = Lobby(testPlayers[0]);
      expect(lobby.players()).to.have.lengthOf(1);

      lobby.addPlayer(testPlayers[1]);

      expect(lobby.players()).to.have.lengthOf(2);
      expect(lobby.players()).to.include(testPlayers[0]);
      expect(lobby.players()).to.include(testPlayers[1]);
    });

    it('should not add the same player again', function() {
      var lobby = Lobby(testPlayers[0]);
      lobby.addPlayer(testPlayers[1]);

      lobby.addPlayer(testPlayers[1]);

      expect(lobby.players()).to.have.lengthOf(2);
      expect(lobby.players()).to.include(testPlayers[0]);
      expect(lobby.players()).to.include(testPlayers[1]);
    });
  });

  describe('removePlayer', function() {
    it('should decrease the number of players', function() {
      var lobby = Lobby(testPlayers[0]);
      lobby.addPlayer(testPlayers[1]);
      lobby.addPlayer(testPlayers[2]);

      lobby.removePlayer(testPlayers[1]);

      expect(lobby.players()).to.have.lengthOf(2);
      expect(lobby.players()).to.include(testPlayers[0]);
      expect(lobby.players()).to.include(testPlayers[2]);
    });

    it('should do nothing if player does not exist', function() {
      var lobby = Lobby(testPlayers[0]);

      lobby.removePlayer(testPlayers[1]);

      expect(lobby.players()).to.have.lengthOf(1);
      expect(lobby.players()).to.include(testPlayers[0]);
    });

    it('should not be allowed to remove the host', function() {
      var lobby = Lobby(testPlayers[0]);
      lobby.addPlayer(testPlayers[1]);

      lobby.removePlayer(testPlayers[0]);

      expect(lobby.players()).to.include(testPlayers[0]);
      expect(lobby.players()).to.include(testPlayers[1]);
    });
  });

  describe('start', function() {
    it('should return false if there are not enough players', function() {
      var lobby = Lobby(testPlayers[0]);
      lobby.addPlayer(testPlayers[1]);

      expect(lobby.start()).to.be.false;
    });

    it('should return true if there are at least 3 players', function() {
      var lobby = Lobby(testPlayers[0]);
      lobby.addPlayer(testPlayers[1]);
      lobby.addPlayer(testPlayers[2]);

      expect(lobby.start()).to.be.true;
    });
  });

  describe('currentRound', function() {
    it('should return undefined if the game has not started', function() {
      var lobby = Lobby(testPlayers[0]);
      lobby.addPlayer(testPlayers[1]);
      lobby.addPlayer(testPlayers[2]);

      expect(lobby.currentRound()).to.be.undefined;
    });

    it('should return a round if the game has started', function() {
      var lobby = Lobby(testPlayers[0]);
      lobby.addPlayer(testPlayers[1]);
      lobby.addPlayer(testPlayers[2]);

      lobby.start();

      expect(lobby.currentRound()).to.be.an('object');
    });
  });
});
