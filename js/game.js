'use strict'
'use strict'
const WALL = '🔶'
const FOOD = '<img src="images/dots.png">';
const SUPER_FOOD = '🍬';
const CHERRY = '🍒';
const EMPTY = '';
const  SIZE = 10;
var gBoard;
var gGame = {
    score: 0,
    scoreTime: hr + ':' + min + ':' + 0,
    isOn: false,
}

// localStorage.setItem('players',JSON.stringify(gGame));

var gFoodCount = 0;
var grainMax = 0;
var privetScore = 0;
var gCherryInterval
const timer = document.getElementById('stopwatch');





function init() {
    console.log('hello')
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container')
    gGame.isOn = true;
    gCherryInterval = setInterval(createCherry, 15000)
    hide('.restartBtn');
    hide('.gameOverMsg');
    hide('.gameOverMsgLost');
    startTimer();

}




function buildBoard() {
    var board = [];
   for (var i = 0; i < SIZE; i++) {
       board.push([]);
       for (var j = 0; j < SIZE; j++) {
           board[i][j] = FOOD;
           if (i === 0 || i === SIZE - 1 ||
               j === 0 || j === SIZE - 1 ||
               (j === 3 && i > 4 && i < SIZE - 2)) {
               board[i][j] = WALL;
           } else {
               if ((i === 1 && j === 1) ||
                   (i === 1 && j === 8) ||
                   (i === 8 && j === 1) ||
                   (i === 8 && j === 8)) {
                   board[i][j] = SUPER_FOOD
               }
               grainMax++
            //    console.log('grainMax',grainMax,'\n i:',i,'| j:',j)
           }
       }
   }

   return board;
}


function updateScore(diff) {
    gGame.score += diff;
    privetScore += diff;

    document.querySelector('h2 span').innerText = gGame.score
}

function gameOver() {
    console.log('Game Over');
    gGame.isOn = false;
    clearInterval(gIntervalGhosts)
    clearInterval(gCherryInterval)
    show('.gameOverMsgLost')
    show('.restartBtn');
    stopTimer()
    gGame.scoreTime = hr + ':' + min + ':' + sec;
    console.log('game over :  grainMax :', grainMax, '|| grainSum :', gFoodCount, '')
}


function gameWin() {
    console.log('you  Win !!')
    gGame.isOn = false;
    clearInterval(gIntervalGhosts)
    clearInterval(gCherryInterval)
    show('.gameOverMsg');
    show('.restartBtn');
    stopTimer()
    gGame.scoreTime = hr + ':' + min + ':' + sec;
    saveToStorage('player',gGame)
    console.log(loadFromStorage('player'))
    
}

function createCherry() {
    // console.log('createCherry beafor')
    var emptyCells = getEmptyCells(gBoard)
    // console.log('emptyCell',emptyCells)
    if (!emptyCells) return
    var randomIdx = getRandomIntInt(0, emptyCells.length)
    var emptyCell = emptyCells[randomIdx]
    gBoard[emptyCell.i][emptyCell.j] = CHERRY
    renderCell(emptyCell, CHERRY)
    // console.log('createCherry after')

} 


function wincheck() {

    if (gFoodCount == grainMax) {
        gameWin()

    }
}

function getEmptyCells(board) {
    var emptyCells = []
    // console.log('bord',board.length)
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (board[i][j] === EMPTY) {
                emptyCells.push({
                    i: i,
                    j: j
                })
            }

        }
    }
    return emptyCells
}
// console.log(gBoard)

function restartButton() {
    document.querySelector('h2 span').innerText = '0'
    grainMax = 0
    gFoodCount = 0
    crrGhostColor = ghstPic[getRandomIntInt(0, 3)].htmltext
    resetTimer()
    init()
}

