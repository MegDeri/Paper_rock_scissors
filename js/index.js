'use strict';
var userScore = 0;
var computerScore = 0;
var userScoreSpan = document.getElementById('user-score');
var computerScoreSpan = document.getElementById('computer-score');
var scoreBoradDiv = document.getElementById('score-board');
var resultDiv = document.getElementById('resultEnd');
var button1 = document.getElementById('paper');
var button2 = document.getElementById('rock');
var button3 = document.getElementById('scissors');
var output = document.getElementById('greeter-output');
var restartGame = document.getElementById('restart');
var newGame = document.getElementById('new-game');
var winnerLast = document.getElementById('winner-last');
var roundsNumber = 0; 
var pastRound = 0;

//Computer random choice
function getComputerChoice() {
  var choices = ['rock', 'paper','scissors'];
  var randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber];                         
}

//User choice
function playerMove(userChoice) {
  if (pastRound < roundsNumber ) {
     pastRound++;
     var player = userChoice;
     var computerChoice = getComputerChoice();
      whoWins(player, computerChoice);
      showScore();
      showWinner();
    }
}
 
 //Three sets of nested if-else statements for when user picks rock, paper, or scissors
    function whoWins(player, computerChoice) {
      if (player === computerChoice ) {
      resultDiv.innerHTML = "You choose " + player + " Computer: " + computerChoice + " . It's a tie!"; 
      } else if (((player === 'rock') && (computerChoice === 'scissors')) || ((player === 'paper') &&     (computerChoice === 'rock')) || ((player === 'scissors') && (computerChoice === 'paper'))) {
      resultDiv.innerHTML = "You choose " + player + " Computer: " + computerChoice + " . You win!";
      userScore++;
      } else  {
      resultDiv.innerHTML = "You choose " + player + " Computer: " + computerChoice + " . Computer wins!";
     computerScore++;
      } 
   }
  
function showScore() {
    userScoreSpan.innerHTML = userScore;
    computerScoreSpan.innerHTML = computerScore;
    newGame.innerHTML = pastRound + '/' + roundsNumber;
}

function showWinner() {
  if (pastRound == roundsNumber) {
    if (userScore > computerScore) {
      winnerLast.innerHTML = "You win! Game is over";
    } else if (userScore < computerScore) {
      winnerLast.innerHTML = "Computer wins! Game is over";
    } else {
      winnerLast.innerHTML = "It is a draw! Game is over";
    }
  }
}

//Reset game when player clicks 'New game' button
function resetGame() {
   pastRound = 0;
   userScore = 0;
   computerScore = 0;
   userScoreSpan.innerHTML = userScore;
   computerScoreSpan.innerHTML = computerScore;
   output.innerHTML = 'Click the button and start!';
   resultDiv.innerHTML = 'Result:';
   newGame.innerHTML = pastRound + '/';
   winnerLast.innerHTML = "New game";
};


//Connection to button "New game" and display window.prompt with nr of rounds.
restartGame.addEventListener('click', function(){
    roundsNumber = window.prompt('Set number of rounds. Max: 5');
      if (roundsNumber != null) {
      newGame.innerHTML = pastRound + '/' + roundsNumber;
      }
      resetGame();
 });

//Connection to buttons
  button1.addEventListener('click', function() {
       playerMove("paper");
       output.innerHTML = 'Hey you click on paper';
});

  button2.addEventListener('click', function() {
     playerMove("rock");
     output.innerHTML = 'Hey you click on rock';
});

  button3.addEventListener('click', function() {
      playerMove("scissors");
      output.innerHTML = 'Hey you click on scissors';
});