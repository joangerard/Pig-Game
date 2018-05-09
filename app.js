/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var activePlayer, currentScores, scores, lastRandomNumber;

init();

document.querySelector('.btn-roll').addEventListener('click', function(){
	var randomNumber = generateRandomNumber();
	var randomNumber2 = generateRandomNumber();
	showDice('.dice', randomNumber);
	showDice('.dice2', randomNumber2);
	if (randomNumber === 1 || randomNumber2 === 1) {
		changePlayer();
	} else if(lastRandomNumber === 6 && randomNumber === 6){
		deleteAllScore();
		changePlayer();
	} else {
		currentScores[activePlayer] += randomNumber + randomNumber2;
		document.querySelector('#current-'+activePlayer).textContent = currentScores[activePlayer];
	}
	lastRandomNumber = randomNumber;
});

document.querySelector('.btn-hold').addEventListener('click', function() {
	scores[activePlayer] += currentScores[activePlayer];
	document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];
	var maxScore = document.querySelector('#max-score').value || 100;
	if (scores[activePlayer] >= maxScore){
		document.querySelector('#name-'+activePlayer).textContent = 'Winner!';
		document.querySelector('.dice').style.display = 'none';
		document.querySelector('.dice2').style.display = 'none';
		document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
		document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
		setDisplayButtons('none');
	} else {
		changePlayer();
	}
});

document.querySelector('.btn-new').addEventListener('click', function() {
	resetPlayerNames();
	init();
	setDisplayButtons('block');
});

function generateRandomNumber() {
	return Math.floor(Math.random() *6) + 1;
}

function showDice(diceClass, number){
	document.querySelector(diceClass).style.display = 'block';
	document.querySelector(diceClass).src = 'dice-' + number + '.png';
}

function resetPlayerNames () {
	document.querySelector('#name-'+activePlayer).textContent = 'Player '+(activePlayer+1);
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.add('active');
}

function setDisplayButtons (display) {
	document.querySelector('.btn-roll').style.display = display;
	document.querySelector('.btn-hold').style.display = display;
}

function changePlayer(){
	resetScoreFor(activePlayer);
	activePlayer = activePlayer === 0? 1:0;
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');
}

function resetScoreFor(activePlayer){
	currentScores[activePlayer] = 0;
	document.querySelector('#current-'+activePlayer).textContent = 0;
}

function resetGlobalScoreFor(activePlayer){
	scores[activePlayer] = 0;
	document.querySelector('#score-'+activePlayer).textContent = 0;
}

function init() {
	activePlayer = 0;
	currentScores = [0,0];
	scores = [0,0];
	lastRandomNumber = 0;

	document.querySelector('.dice').style.display = 'none';
	document.querySelector('.dice2').style.display = 'none';
	document.querySelector('#current-1').textContent = '0';
	document.querySelector('#current-0').textContent = '0';
	document.querySelector('#score-1').textContent = '0';
	document.querySelector('#score-0').textContent = '0';
}

function deleteAllScore(){
	resetScoreFor(activePlayer);
	resetGlobalScoreFor(activePlayer);
}