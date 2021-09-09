function highCard(playerOneCardNumbers, playerTwoCardNumbers, winner) {
  for (let i = 0; i < playerOneCardNumbers.length; i++) {
    if (playerOneCardNumbers[i] > playerTwoCardNumbers[i]) {
      winner = 'playerOne';
      roundContinue = false;
      break;
    } else if (playerOneCardNumbers[i] < playerTwoCardNumbers[i]) {
      winner = 'playerTwo';
      roundContinue = false;
      break;
    }
    if (i === 4) {
      if (roundContinue) {
        if (playerOneCardNumbers[i] === playerTwoCardNumbers[i]) {
          winner = 'Split Pot';
          roundContinue = false;
          break;
        }
      }
    }
  }
  return [winner, roundContinue];
}

module.exports = { highCard };
