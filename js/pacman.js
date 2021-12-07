'use strict'
const PACMANRIGHT = '<img src="images/pacman-right.png">'
const PACMANLEFT = '<img src="images/pacman-left.png">'
const PACMANUP = '<img src="images/pacman-up.png">'
const PACMANDOWN = '<img src="images/pacman-down.png">'

var PacmanCrrPic = '<img src="images/pacman-right.png">';

var gPacman;



function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PacmanCrrPic
    // grainMax--
    gFoodCount++
    // console.log('gFoodCount',gFoodCount)


}


function movePacman(ev) {

    if (!gGame.isOn) return;
    // console.log('ev', ev);
    var nextLocation = getNextLocation(ev)

    if (!nextLocation) return;
    // console.log('nextLocation', nextLocation);

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('NEXT CELL', nextCell);

    if (nextCell === WALL) return;

    if (nextCell === FOOD) {
        updateScore(1);
        // gFoodCount
        gFoodCount++
        // console.log('gFoodCount',gFoodCount)
        wincheck()
    }
    // if (nextCell === SUPER_FOOD && isSuprFood === false)
    // global var should start with a g.
    // use gPacman.isSuper , make super "state" true for 5 seconds.
    // j
    else if (nextCell === SUPER_FOOD) {
        if (gPacman.isSuper) return
        crrGhostColor = GHOSTPINK
        gPacman.isSuper = true
        // console.log('is supper is on ')
        moveGhosts()
        // setTimeout(function(){console.log('no more fun ')},5000)
        setTimeout(reviveGhosts, 5500)
        // updateScore(0);
        gFoodCount++
        // console.log('gFoodCount',gFoodCount)
        wincheck()
        // console.log('if super food gFoodCount (super is on) :', gFoodCount, '|| grainMax :', grainMax)

    } else if (nextCell === crrGhostColor && !gPacman.isSuper) {
        gameOver();
        renderCell(gPacman.location, EMPTY)
        return;

    } else if (nextCell === crrGhostColor ) {
        console.log('step 1 ')
        for (var k = 0; k < gGhosts.length; k++) {
            if (nextLocation.i === gGhosts[k].location.i && nextLocation.j === gGhosts[k].location.j) {
                killGhost(k);
                moveGhosts()
            }
        }
    } else if (nextCell === CHERRY) {
        updateScore(10)
    }



    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;

    // update the dom
    renderCell(gPacman.location, EMPTY);

    gPacman.location = nextLocation;

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = PacmanCrrPic;
    // update the dom
    renderCell(gPacman.location, PacmanCrrPic);


}


function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;
            PacmanCrrPic = PACMANUP
            break;
        case 'ArrowDown':
            nextLocation.i++;
            PacmanCrrPic = PACMANDOWN
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            PacmanCrrPic = PACMANLEFT
            break;
        case 'ArrowRight':
            nextLocation.j++;
            PacmanCrrPic = PACMANRIGHT
            break;
        default:
            return null;
    }
    // console.log('nextLocation :',nextLocation)
    return nextLocation;
}

