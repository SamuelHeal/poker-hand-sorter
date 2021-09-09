const fs = require('fs');
const { cardSorter } = require('./Functions/cardSorter');

// requiring readline in order to use stdin and stdout
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

// creating an empty array
const pokerRounds = [];

// using readline to ask the user for the file path to the file they wish to sort
readline.question(
  'What is the path to the poker hand file you wish to sort? ',
  (filePath) => {
    // using fs to read the file
    const allHands = fs.readFileSync(filePath, 'utf-8');
    // pusing the data to the pokerRounds array, splitting them at each new line to distinguish between the rounds
    pokerRounds.push(allHands.split('\n'));
    for (let i = 0; i < pokerRounds[0].length; i++) {
      roundWinner(pokerRounds[0][i]);
    }
    winsCounter();
    console.log('-------Total Hands Won-------');
    console.log('Player 1:', playerOneWins);
    console.log('Player 2:', playerTwoWins);
    // console.log('Total Split Pots:', splitPotTotal)

    readline.close();
  }
);

var winners = [];
var playerOneWins = 0;
var playerTwoWins = 0;
// There is the functionality to tally when a split pot occurs (when players have the exact same hand) as card suites are
// not being counted. To activate this just uncomment the console.log in the above function and the else if statement in the
// function below
var splitPotTotal = 0;

function winsCounter() {
  for (let i = 0; i < winners.length; i++) {
    if (winners[i] === 'playerOne') {
      playerOneWins += 1;
    } else if (winners[i] === 'playerTwo') {
      playerTwoWins += 1;
    }
    // else if (winners[i] === 'Split Pot') {
    //   splitPotTotal += 1
    // }
  }
}

// Function to determine the winner of each round
function roundWinner(roundData) {
  winners.push(cardSorter(roundData));
}
