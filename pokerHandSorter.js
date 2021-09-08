const fs = require('fs');

// requiring readline in order to use stdin and stdout
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

// creating an empty array
const pokerRounds = []


// using readline to ask the user for the file path to the file they wish to sort
readline.question('What is the path to the poker hand file you wish to sort? ', filePath => {
// using fs to read the file
    const allHands = fs.readFileSync(filePath, 'utf-8');
    // pusing the data to the pokerRounds array, splitting them at each new line to distinguish between the rounds
    pokerRounds.push(allHands.split('\n'))
    for (let i = 0; i < pokerRounds[0].length; i++) {
        roundWinner(pokerRounds[0][i])
    }
    readline.close()
})



// Function to determine the winner of each round
function roundWinner(roundData) {
    
    // creating two empty arrays for each player's cards
    playerOneCards = []
    playerTwoCards = []

    // splitting the roundData and creating a new array for each card
    const stringSplit = roundData.split(' ')
    
    // placing the first 5 cards into playerOneCards and the last 5 into playerTwoCards
    for (let i = 0; i < stringSplit.length; i++) {
        if (i < 5) {
            playerOneCards.push(stringSplit[i])
        } else {
            playerTwoCards.push(stringSplit[i])
        }
    }

// -----------------------------------------------------------------
    // Sorting the cards and arranging from highest to lowest (by number)
    const playerOneCardNumbers = []
    const playerTwoCardNumbers = []

    for (let i = 0; i < playerOneCards.length; i++) {
        const cardSeperator = playerOneCards[i].split('')
        var cardNumber = cardSeperator[0]
        if (cardNumber === 'A') {
            cardNumber = 14
        }
        else if (cardNumber === 'K') {
            cardNumber = 13
        }
        else if (cardNumber === 'Q') {
            cardNumber = 12
        }
        else if (cardNumber === 'J') {
            cardNumber = 11
        }
        else if (cardNumber === 'T') {
            cardNumber = 10
        }
        else {
            cardNumber = parseInt(cardNumber)
        }
        playerOneCardNumbers.push(cardNumber)
    }
    playerOneCardNumbers.sort(function(a, b) {
        return b - a
    })

    for (let i = 0; i < playerTwoCards.length; i++) {
        const cardSeperator = playerTwoCards[i].split('')
        var cardNumber = cardSeperator[0]
        if (cardNumber === 'A') {
            cardNumber = 14
        }
        else if (cardNumber === 'K') {
            cardNumber = 13
        }
        else if (cardNumber === 'Q') {
            cardNumber = 12
        }
        else if (cardNumber === 'J') {
            cardNumber = 11
        }
        else if (cardNumber === 'T') {
            cardNumber = 10
        }
        else {
            cardNumber = parseInt(cardNumber)
        }
        playerTwoCardNumbers.push(cardNumber)
    }

    playerTwoCardNumbers.sort(function(a, b) {
        return b - a
    })


    // sorting card suite in alphabetical order
    const playerOneCardSuites = []
    const playerTwoCardSuites = []

    for (let i = 0; i < playerOneCards.length; i++) {
        const cardSeperator = playerOneCards[i].split('')
        var cardSuite = cardSeperator[1]
        playerOneCardSuites.push(cardSuite)
    }
    playerOneCardSuites.sort()

    for (let i = 0; i < playerTwoCards.length; i++) {
        const cardSeperator = playerTwoCards[i].split('')
        var cardSuite = cardSeperator[1]
        
        playerTwoCardSuites.push(cardSuite)
    }
    playerTwoCardSuites.sort()


    // declaring variable for the winner
    let winner;


    // ----------------------------------------------------------------
    // Determining Royal Flush Winner

    let playerOneRFSameSuite;
    let playerOneRFNumbers;
    let playerOneRF;

    var ticker = 14;

    for (let i = 0; i < playerOneCardNumbers.length; i++) {
        if (playerOneCardNumbers[i] === ticker) {
            playerOneRFNumbers = true
            ticker -= 1
        }
        else {
            playerOneRFNumbers = false
            break
        }
    }

    for (let i = 0; i < playerOneCardSuites.length; i++) {
        if (i < 4) {
            if (playerOneCardSuites[i] === playerOneCardSuites[i + 1]) {
                playerOneRFSameSuite = true
            }
            else {
                playerOneRFSameSuite = false
                break
            }
        }
        else {
            if (playerOneCardSuites[i] === playerOneCardSuites[i - 1]) {
                playerOneRFSameSuite = true
            }
            else {
                playerOneRFSameSuite = false
                break
            }
        }
    }

    if (playerOneRFSameSuite && playerOneRFNumbers) {
        playerOneRF = true
    }
    else {
        playerOneRF = false
    }


    let playerTwoRFSameSuite;
    let playerTwoRFNumbers;
    let playerTwoRF;

    var ticker = 14;

    for (let i = 0; i < playerTwoCardNumbers.length; i++) {
        if (playerTwoCardNumbers[i] === ticker) {
            playerTwoRFNumbers = true
            ticker -= 1
        }
        else {
            playerTwoRFNumbers = false
            break
        }
    }

    for (let i = 0; i < playerTwoCardSuites.length; i++) {
        if (i < 4) {
            if (playerTwoCardSuites[i] === playerTwoCardSuites[i + 1]) {
                playerTwoRFSameSuite = true
            }
            else {
                playerTwoRFSameSuite = false
                break
            }
        }
        else {
            if (playerTwoCardSuites[i] === playerTwoCardSuites[i - 1]) {
                playerTwoRFSameSuite = true
            }
            else {
                playerTwoRFSameSuite = false
                break
            }
        }
    }

    if (playerTwoRFSameSuite && playerTwoRFNumbers) {
        playerTwoRF = true
    }
    else {
        playerTwoRF = false
    }
    
    if (playerTwoRF === true) {
        console.log('Player Two Royal Flush!')
    }
    
// // -----------------------------------------------------------------
//     // Determining who wins if relying on high cards

//     // declaring the winner and winning cardValue variables

//     let winner;
//     let cardValue;

//     // looping through playerOneCardNumbers (already sorted from highest to lowest) and comparing with playerTwoCardNumbers
//     // if at any point the number of one player is higher than the other, they are declared the winner of the highest card
//     for (let i = 0; i < playerOneCardNumbers.length; i++) {
//         if (playerOneCardNumbers[i] > playerTwoCardNumbers[i]) {
//             winner = 'playerOne'
//             cardValue = playerOneCardNumbers[i]
//             break
//         }
//         else if (playerOneCardNumbers[i] < playerTwoCardNumbers[i]) {
//             winner = 'playerTwo'
//             cardValue = playerTwoCardNumbers[i]
//             break
//         }
//     }

//     console.log('high card winner is', winner, 'with a high card of', cardValue)
    
// // -----------------------------------------------------------------

// // -----------------------------------------------------------------
// // Determing pairs
//     // creating an empty array to fill with pairs
//     playerOnePairs = []

//     // looping through playerOneCardNumbers (already sorted in order of highest to lowest). If the current card...
//     // is equal to the next card that card number is added to the above array to be declared as a pair
//     for (let i = 0; i < playerOneCardNumbers.length; i++) {
//         if (playerOneCardNumbers[i] === playerOneCardNumbers[i + 1]) {
//             playerOnePairs.push(playerOneCardNumbers[i])
//         }
//     }

//     // above is repeated for player 2
//     playerTwoPairs = []
//     for (let i = 0; i < playerTwoCardNumbers.length; i++) {
//         if (playerTwoCardNumbers[i] === playerTwoCardNumbers[i + 1]) {
//             playerTwoPairs.push(playerTwoCardNumbers[i])
//         }
//     }

//     let pairWinner;
//     let pairValue;

//     // functions similarly to the highest card winner section, but adds an if statement so that a winner is declared...
//     // // even if a player has no pairs (which would result in undefined being returned otherwise)
//     if (playerOnePairs.length && playerTwoPairs.length) {
//         for (let i = 0; i < playerOnePairs.length; i++) {
        
//             if (playerOnePairs[i] > playerTwoPairs[i]) {
//                 pairWinner = 'playerOne'
//                 pairValue = playerOnePairs[i]
//                 break
//             }
//             else if (playerOnePairs[i] < playerTwoPairs[i]) {
//                 pairWinner = 'playerTwo'
//                 pairValue = playerTwoPairs[i]
//                 break
//             }
//             else if (playerOnePairs[i] === undefined && playerTwoPairs[i] !== undefined) {
//                 pairWinner = 'playerTwo'
//                 pairValue = playerTwoPairs[i]
//             }
//             else if (playerOnePairs[i] !== undefined && playerTwoPairs[i] === undefined) {
//                 pairWinner = 'playerTwo'
//                 pairValue = playerTwoPairs[i]
//             }
                
//         }
//     }

//     else if (playerOnePairs.length && !playerTwoPairs.length) {
//         pairWinner = 'playerOne'
//         pairValue = playerOnePairs[0]
//     }

//     else if (!playerOnePairs.length && playerTwoPairs.length) {
//         pairWinner = 'playerTwo'
//         pairValue = playerTwoPairs[0]
//     }

//     else {
//         console.log('no pairs')
//     }
   
//     console.log('one pair winner is', pairWinner, 'with a pair of', pairValue + "'s")

// // -----------------------------------------------------------------

//     // determining two pairs winner

//     let twoPairWinner;
//     let twoPairValue; 

//     if (playerOnePairs.length >= 2 && playerTwoPairs.length >= 2) {
//         for (let i = 0; i < playerOnePairs.length; i++) {
        
//             if (playerOnePairs[i] > playerTwoPairs[i]) {
//                 pairWinner = 'playerOne'
//                 pairValue = playerOnePairs[i]
//                 break
//             }
//             else if (playerOnePairs[i] < playerTwoPairs[i]) {
//                 pairWinner = 'playerTwo'
//                 pairValue = playerTwoPairs[i]
//                 break
//             }
//         }
//     }

 }

