function straightFlush(
  winner,
  roundContinue,
  playerOneCardNumbers,
  playerOneStraight,
  playerOneSameSuite,
  playerTwoCardNumbers,
  playerTwoStraight,
  playerTwoSameSuite
) {
  var playerOneSF = false;

  // determining if player one has a straight
  for (let i = 0; i < playerOneCardNumbers.length; i++) {
    if (i < 4) {
      if (playerOneCardNumbers[i] === playerOneCardNumbers[i + 1] + 1) {
        playerOneStraight = true;
      } else {
        playerOneStraight = false;
        break;
      }
    }
  }

  // determining if player one has a straight flush by seeing if they have both a straight and all cards of the same suit
  if (playerOneStraight && playerOneSameSuite) {
    playerOneSF = true;
  } else {
    playerOneSF = false;
  }

  // repeats above for player two

  var playerTwoSF = false;

  for (let i = 0; i < playerTwoCardNumbers.length; i++) {
    if (i < 4) {
      if (playerTwoCardNumbers[i] === playerTwoCardNumbers[i + 1] + 1) {
        playerTwoStraight = true;
      } else {
        playerTwoStraight = false;
        break;
      }
    }
  }

  if (playerTwoStraight && playerTwoSameSuite) {
    playerTwoSF = true;
  } else {
    playerTwoSF = false;
  }

  // If one player has a SF and the other doesnt, the one with it wins
  if (playerOneSF && !playerTwoSF) {
    winner = 'playerOne';
    roundContinue = false;
  }

  if (!playerOneSF && playerTwoSF) {
    winner = 'playerTwo';
    roundContinue = false;
  }
  // if both players have a SF, the player with the highest SF wins
  if (playerOneSF && playerTwoSF) {
    if (playerOneCardNumbers[0] > playerTwoCardNumbers[0]) {
      winner = 'playerOne';
      roundContinue = false;
    } else if (playerOneCardNumbers[0] < playerTwoCardNumbers[0]) {
      winner = 'playerTwo';
      roundContinue = false;
    }
  }

  return [winner, roundContinue, playerOneStraight, playerTwoStraight];
}

module.exports = { straightFlush };
