'use strict'
const GHOSTPINK = '<img src="images/phost-pink.png">';
const GHOSTDEAD = '<img src="images/dead-ghost.png">';

var ghstPic = [
    { id: 0, colrr: 'Green', htmltext: '<img src="images/ghost-green.png">' },
    { id: 1, colrr: 'red', htmltext: '<img src="images/ghost-red.png">' }
    , { id: 2, colrr: 'yellow', htmltext: '<img src="images/ghost-yellow.png">' }
]

var crrGhostColor
crrGhostColor = ghstPic[getRandomIntInt(0, 3)].htmltext
var gGhosts = []
var gIntervalGhosts;



function createGhost(board) {
    var ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        color: getRandomColor(),
        originalColor: '',
        isAlive: true
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = crrGhostColor
    // grainMax --
    // console.log('grainMax : (ghost)' ,grainMax)
}

function createGhosts(board) {
    gGhosts = [];
    createGhost(board)
    createGhost(board)
    createGhost(board)
    gIntervalGhosts = setInterval(moveGhosts, 1000)
    // console.log('gGhosts ',gGhosts)

}
function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        if (gGhosts[i].isAlive === true){
            var ghost = gGhosts[i];
            // console.log('ghost',ghost)
            moveGhost(ghost)            
        }else{
        console.log('gost ',i , 'not alive ')    
        }
    }
}

function moveGhost(ghost) {
    var moveDiff = getMoveDiff();
    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    if (nextCell === WALL) return;
    if (nextCell === crrGhostColor) return;
    if (nextCell === PacmanCrrPic) {
        gameOver();
        return;
    }

    // model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // dom
    renderCell(ghost.location, ghost.currCellContent)

    // model
    ghost.location = nextLocation;
    ghost.currCellContent = gBoard[ghost.location.i][ghost.location.j]
    gBoard[ghost.location.i][ghost.location.j] = crrGhostColor;
    // dom
    renderCell(ghost.location, getGhostHTML(ghost))
}

function getMoveDiff() {
    var randNum = getRandomIntInt(0, 100);
    if (randNum < 25) {
        return { i: 0, j: 1 }
    } else if (randNum < 50) {
        return { i: -1, j: 0 }
    } else if (randNum < 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}


function getGhostHTML(ghost) {
    return `<span>${crrGhostColor}</span>`
}


function killGhost(index){
    gGhosts[index].isAlive = false
    renderCell(gGhosts[index].location,getGhostHTML())
            
 }
 //render ghost ? 

 function reviveGhosts(){
    // console.log('reviv is on ')
    crrGhostColor = ghstPic[getRandomIntInt(0, 3)].htmltext
    for(var k = 0 ;gGhosts.length>k;k++){
        gGhosts[k].isAlive = true
        renderCell(gGhosts[k].location,getGhostHTML())
        
    }
    gPacman.isSuper = false
}
