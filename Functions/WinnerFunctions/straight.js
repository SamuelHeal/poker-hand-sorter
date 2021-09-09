function straight(
  winner,
  roundContinue,
  playerOneCardNumbers,
  playerOneStraight,
  playerTwoCardNumbers,
  playerTwoStraight
) {
  if (playerOneStraight && !playerTwoStraight) {
    winner = 'playerOne';
    roundContinue = false;
  } else if (!playerOneStraight && playerTwoStraight) {
    winner = 'playerTwo';
    roundContinue = false;
  } else if (playerOneStraight && playerTwoStraight) {
    if (playerOneCardNumbers[0] > playerTwoCardNumbers[0]) {
      winner = 'playerOne';
      roundContinue = false;
    } else if (playerOneCardNumbers[0] < playerTwoCardNumbers[0]) {
      winner = 'playerTwo';
      roundContinue = false;
    } else if (playerOneCardNumbers[0] === playerTwoCardNumbers[0]) {
      winner = 'Split Pot';
      roundContinue = false;
    }
  }
  return [winner, roundContinue];
}

module.exports = { straight };
