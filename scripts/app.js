import memoryCards from './data.js';
import { setMultipleAttr } from './helpers.js'

const app = {};

const board = document.querySelector('.board');
const heading = document.querySelector('h2');
const score = document.querySelector('span');

app.selectedTiles = [];
app.selectedTilesID = [];
app.correctMatches = [];

app.createBoard = function() {
  // random array shuffling
  memoryCards.sort(() => 0.5 - Math.random());

  for (let i = 0; i < memoryCards.length; i++) {
    const card = document.createElement('img');

    // custom helper function to set multiple attributes in one go
    setMultipleAttr(card, {'src': './assets/defaultCard.jpg', 'data-id': i})
    card.addEventListener('click', app.flipCard)
    board.appendChild(card);
  }
}

app.flipCard = function(){
  const cardID = this.getAttribute('data-id');
  
  // pushing the src string for future comparison
  app.selectedTiles.push(memoryCards[cardID].src);
  app.selectedTilesID.push(cardID);

  setMultipleAttr(this, {'src': memoryCards[cardID].src, 'class': 'no-clicks'});

  if (app.selectedTiles.length === 2) {
    setTimeout(app.matchCheck, 350)
    this.setAttribute('class', '');
  }
}

app.matchCheck = function() {
  const allCards = document.querySelectorAll('img');

  const firstPick = app.selectedTiles[0]; // "./assets/card1.jpg"
  const secondPick = app.selectedTiles[1]; // "./assets/card2.jpg"

  // variables for img elements that match the selected IDs
  // to run the setAttribute method on
  const firstPickImg = allCards[app.selectedTilesID[0]];
  const secondPickImg = allCards[app.selectedTilesID[1]]


  if (firstPick === secondPick) {
    setMultipleAttr(firstPickImg, {'src': './assets/match.jpg','class': 'no-clicks'});
    setMultipleAttr(secondPickImg, {'src': './assets/match.jpg','class': 'no-clicks'});
    app.correctMatches.push(app.selectedTiles);
  } else {
    setMultipleAttr(firstPickImg, {'src': './assets/defaultCard.jpg','class': ''});
    setMultipleAttr(secondPickImg, {'src': './assets/defaultCard.jpg','class': ''});
  }

  app.selectedTiles = [];
  app.selectedTilesID = [];
  score.textContent = app.correctMatches.length;

  if (app.correctMatches.length === 6 ) {
    heading.textContent = '🦮 You Win 🦮';
  }
}

// init when Document and subresources are ready
if (document.readyState === 'complete') {
  app.createBoard();
} else {
  document.addEventListener('DOMContentLoaded', app.createBoard)
}

