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

var roundContinue = true

// Function to determine the winner of each round
function roundWinner(roundData) {
    let winner;

    
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

    // declaring same suite variables 
    let playerOneSameSuite;
    let playerTwoSameSuite;

    // looping through playerOneCardSuites to determine if all the cards are the same suite
    for (let i = 0; i < playerOneCardSuites.length; i++) {
        if (i < 4) {
            if (playerOneCardSuites[i] === playerOneCardSuites[i + 1]) {
                playerOneSameSuite = true
            }
            else {
                playerOneSameSuite = false
                break
            }
        }
        else {
            if (playerOneCardSuites[i] === playerOneCardSuites[i - 1]) {
                playerOneSameSuite = true
            }
            else {
                playerOneSameSuite = false
                break
            }
        }
    }

    // repeats above for player two
    for (let i = 0; i < playerTwoCardSuites.length; i++) {
        if (i < 4) {
            if (playerTwoCardSuites[i] === playerTwoCardSuites[i + 1]) {
                playerTwoSameSuite = true
            }
            else {
                playerTwoSameSuite = false
                break
            }
        }
        else {
            if (playerTwoCardSuites[i] === playerTwoCardSuites[i - 1]) {
                playerTwoSameSuite = true
            }
            else {
                playerTwoSameSuite = false
                break
            }
        }
    }




    // creating a while loop to allow the code to break when a winner is decided
    while (roundContinue){
        // ----------------------------------------------------------------
    // Determining Royal Flush Winner
        // declaring variables for royal flush
        let playerOneRFNumbers;
        let playerOneRF;

        // ticker to determine if the users highest card is an ace
        var ticker = 14;

        // loops through the users cards to determine if the user has an ace, king, queen, jack and 10 (cards are already in
        // descending order)
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
        
        // if the player has both the right cards all of the same suite, they are devlared the winner and the round ends
        if (playerOneSameSuite && playerOneRFNumbers) {
            playerOneRF = true
            winner = 'playerOne'
            roundContinue = false
        }
        else {
            playerOneRF = false
        }


        // above code repeats for player two
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

        if (playerTwoSameSuite && playerTwoRFNumbers) {
            playerTwoRF = true
            winner = 'playerTwo'
            roundContinue = false
        }
        else {
            playerTwoRF = false
        }

        // -------------------------------------------------------
        // Determining straight flush

        let playerOneStraight;
        let playerOneSF;

        // determining if player one has a straight
        for (let i = 0; i < playerOneCardNumbers.length; i++) {
            if (i < 4) {
                if (playerOneCardNumbers[i] === playerOneCardNumbers[i + 1] + 1) {
                    playerOneStraight = true
                }
                else {
                    playerOneStraight = false
                    break
                }
            }
        }

        // determining if player one has a straight flush by seeing if they have both a straight and all cards of the same suit
        if (playerOneStraight && playerOneSameSuite) {
            playerOneSF = true
        } else {
            playerOneSF = false
        }

        // repeats above for player two
        let playerTwoStraight;
        let playerTwoSF;

        for (let i = 0; i < playerTwoCardNumbers.length; i++) {
            if (i < 4) {
                if (playerTwoCardNumbers[i] === playerTwoCardNumbers[i + 1] + 1) {
                    playerTwoStraight = true
                }
                else {
                    playerTwoStraight = false
                    break
                }
            }
        }

        if (playerTwoStraight && playerTwoSameSuite) {
            playerTwoSF = true
        } else {
            playerTwoSF = false
        }

        // If one player has a SF and the other doesnt, the one with it wins 
        if (playerOneSF && !playerTwoSF) {
            winner = 'playerOne'
            roundContinue = false
        }

        if (!playerOneSF && playerTwoSF) {
            winner = 'playerTwo'
            roundContinue = false
        }

        // if both players have a SF, the player with the highest SF wins
        if (playerOneSF && playerTwoSF) {
            if (playerOneCardNumbers > playerTwoCardNumbers) {
                winner = 'playerOne'
                roundContinue = false
            }
            else if (playerOneCardNumbers < playerTwoCardNumbers) {
                winner = 'playerTwo'
                roundContinue = false
            }
        }

        // ------------------------------------------------------------------

        // Determining four of a kind
        const playerOneFourCards = {}
        let playerOneFourOfAKind; 
        var playerOneFourOfKindCard = 0

        // goes through player ones cards and sorts it into what card numbers they have, and how many they have, into an object
        // object will look like this {'1': 4, '5', 1} as an example, with the string being the card number, and the int
        // being the number of times that card is in the hand
        playerOneCardNumbers.forEach(function(duplicates) {
            playerOneFourCards[duplicates] = (playerOneFourCards[duplicates] || 0) + 1
        })

        // this sorts the above object into an array, with each item being in its on array within the array
        const playerOneSortedDuplicateCards = Object.entries(playerOneFourCards)

        // this determines whether the player has any card that appears four times
        if (playerOneSortedDuplicateCards.length === 2) {
            playerOneFourOfAKind = true
            for (let i = 0; i < playerOneSortedDuplicateCards.length; i++) {
                if (playerOneSortedDuplicateCards[i][1] === 4) {
                    playerOneFourOfKindCard = parseInt(playerOneSortedDuplicateCards[i][0])
                }
            }
        }

        // above code repeats for player two
        const playerTwoFourCards = {}
        let playerTwoFourOfAKind; 
        var playerTwoFourOfKindCard = 0

        playerTwoCardNumbers.forEach(function(duplicates) {
            playerTwoFourCards[duplicates] = (playerTwoFourCards[duplicates] || 0) + 1
        })

        const playerTwoSortedDuplicateCards = Object.entries(playerTwoFourCards)

        if (playerTwoSortedDuplicateCards.length === 2) {
            playerTwoFourOfAKind = true
            for (let i = 0; i < playerTwoSortedDuplicateCards.length; i++) {
                if (playerTwoSortedDuplicateCards[i][1] === 4) {
                    playerTwoFourOfKindCard = parseInt(playerTwoSortedDuplicateCards[i][0])
                }
            }
        }

        // determines who wins based on who has a four of a kind
        // if both players have one, the highest four of a kind wins
        // if no four of a kind, the round will continue
        if (playerOneFourOfAKind && !playerTwoFourOfAKind) {
            winner = 'playerOne'
            roundContinue = false

        }

        else if (!playerOneFourOfAKind && playerTwoFourOfAKind) {
            winner = 'playerTwo'
            roundContinue = false

        }

        else if (playerOneFourOfAKind && playerTwoFourOfAKind) {
            if (playerOneFourOfKindCard > playerTwoFourOfKindCard) {
                winner = 'playerOne'
                roundContinue = false

            }
            else if (playerOneFourOfKindCard < playerTwoFourOfKindCard) {
                winner = 'playerTwo'
                roundContinue = false

            }
        }

        // -----------------------------------------------------------
        
        






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


