'use strict';
var userScoreSpan = document.getElementById('user-score');
var computerScoreSpan = document.getElementById('computer-score');
var scoreBoradDiv = document.getElementById('score-board');
var resultDiv = document.getElementById('resultEnd');
var buttons = document.getElementsByClassName('player-move')
var output = document.getElementById('greeter-output');
var restartGame = document.getElementById('restart');
var newGame = document.getElementById('new-game');
var winnerLast = document.getElementById('winner-last');
var modals = document.getElementsByClassName('modal');
var closeButtons = document.querySelectorAll('.modal .close');
var tableModal = document.getElementById('table-modal');
var params = {
  roundsNumber: 0,
  pastRound: 0,
  userScore: 0,
  computerScore: 0,
  player: '',  
  computerChoice: '',
  progress: [],
}

//Computer random choice
function getComputerChoice() {
  var choices = ['rock', 'paper','scissors'];
  var randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber];                         
}

//User choice
function playerMove(userChoice) {
  if (params.pastRound < params.roundsNumber ) {
    params.pastRound++;
     params.player = userChoice;
     params.computerChoice = getComputerChoice();
      whoWins(params.player, params.computerChoice);
      showScore();
      showWinner();
      addRecord();
      createTable()
    }
}
 
 //Three sets of nested if-else statements for when user picks rock, paper, or scissors
function whoWins() {
  if (params.player === params.computerChoice ) {
  resultDiv.innerHTML = "You choose " + params.player + " Computer: " + params.computerChoice + " . It's a tie!"; 
  } else if (((params.player === 'rock') && (params.computerChoice === 'scissors')) || ((params.player === 'paper') && (params.computerChoice === 'rock')) || ((params.player === 'scissors') && (params.computerChoice === 'paper'))) {
  resultDiv.innerHTML = "You choose " + params.player + " Computer: " + params.computerChoice + " . You win!";
  params.userScore++;
  } else {
  resultDiv.innerHTML = "You choose " + params.player + " Computer: " + params.computerChoice + " . Computer wins!";
  params.computerScore++;
  } 
}
  
function showScore() {
    userScoreSpan.innerHTML = params.userScore;
    computerScoreSpan.innerHTML = params.computerScore;
    newGame.innerHTML = params.pastRound + '/' + params.roundsNumber;
}

function showWinner() {
  if (params.pastRound == params.roundsNumber) {
    if (params.userScore > params.computerScore) {
      winnerLast.innerHTML = "You win! Game is over";
    } else if (params.userScore < params.computerScore) {
      winnerLast.innerHTML = "Computer wins! Game is over";
    } else {
      winnerLast.innerHTML = "It is a draw! Game is over";
    }
    showModal();
  }
}

//Show modal after final round
function showModal() {
  document.querySelector('#modal-overlay').classList.add('show');
}

//Close modal function
var hideModal = function(event) {
  event.preventDefault();
  document.querySelector('#modal-overlay').classList.remove('show');
};

for (var i = 0; i < closeButtons.length; i++) {
  closeButtons[i].addEventListener('click', hideModal);
}

document.querySelector('#modal-overlay').addEventListener('click', hideModal);

//Propagation modals
for (var i = 0; i < modals.length; i++) {
  modals[i].addEventListener('click', function(event) {
    event.stopPropagation();
  });
};

//Reset game when player clicks 'New game' button
function resetGame() {
   params.pastRound = 0;
   params.userScore = 0;
   params.computerScore = 0;
   userScoreSpan.innerHTML = params.userScore;
   computerScoreSpan.innerHTML = params.computerScore;
   output.innerHTML = 'Click one of the buttons and start!';
   resultDiv.innerHTML = 'Result:';
   newGame.innerHTML = params.pastRound + '/';
   winnerLast.innerHTML = "New game";
   params.progress = [];
};

//Connection to button "New game" and display window.prompt with nr of rounds.
restartGame.addEventListener('click', function(){
  params.roundsNumber = window.prompt('Set number of rounds.');
      if (params.roundsNumber != null) {
      newGame.innerHTML = params.pastRound + '/' + params.roundsNumber;
      }
      resetGame();
 });

//Connection to buttons: 'Paper', 'Rock', 'Scissors'
for( var i = 0; i < buttons.length; i++ ){
  buttons[i].addEventListener('click', function(event) {
    
    var buttonMove = event.target.getAttribute('data-move');
    playerMove(buttonMove);
});
}

function createTable() {
  var newHTML = '<table><thead><tr><th>Rounds</th><th>Your Move</th><th>Computer Move</th><th>Round Result</th></tr></thead><tbody>';
  for (i = 0; i < params.progress.length; i++) {
    newHTML += '<tr><td>' +
    params.progress[i].rounds + '</td><td>' + 
    params.progress[i].playerChoice + '</td><td>' + 
    params.progress[i].computerChoice + '</td><td>' +
    params.progress[i].playerScore + ' : ' + params.progress[i].compScore + '</td></tr>'
  }
    newHTML += '</tbody></table>';
    tableModal.innerHTML = newHTML;
}

function addRecord() {
  params.progress.push({
    rounds: (params.pastRound),
    playerScore: (params.userScore),
    compScore: (params.computerScore),
    playerChoice: (params.player),
    computerChoice: (params.computerChoice)
    }
  )
}

