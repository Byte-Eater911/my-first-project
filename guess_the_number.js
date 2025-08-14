// Import readline module
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function startGame() {
  const secretNumber = Math.floor(Math.random() * 100) + 1; // Random number between 1 and 100
  let attempts = 0;
  let gameOverride = true;

  function askForGuess() {
    rl.question('Enter your guess (1-100): ', (guess) => {
      // Convert guess to number and handle errors if not valid
      const numberGuess = parseInt(guess, 10);
      if (isNaN(numberGuess) || numberGuess < 1 || numberGuess > 100) {
        console.log("Invalid input. Please enter a number between 1 and 100.");
        askForGuess();
        return;
      }

      attempts++;
      if (numberGuess === secretNumber) {
        console.log(`Congratulations! You guessed the number ${secretNumber} in ${attempts} attempts.`);
        gameOverride = false; // End game loop
        playAgain();
      } else if (numberGuess < secretNumber) {
        console.log("Too low! Try again.");
        askForGuess();
      } else {
        console.log("Too high! Try again.");
        askForGuess();
      }
    });
  }

  function playAgain() {
    rl.question('Would you like to play again? (yes/no): ', (choice) => {
      const lowerChoice = choice.toLowerCase();
      if (lowerChoice === 'yes') {
        console.log('New game starting...');
        attempts = 0;
        startGame(); // Restart the game
      } else {
        console.log('Thanks for playing. Goodbye!');
        rl.close(); // Close readline interface
      }
    });
  }

  askForGuess(); // Initiate the first guess request
}

startGame();
