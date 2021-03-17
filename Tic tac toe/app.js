const cells = document.querySelectorAll('[data-cell]');
const grid = document.getElementById('grid');
const restartBtn = document.getElementById('btn')
const winHeader = document.getElementById('header')
const CLASSX = 'classX';
const CLASSC = 'classC';
let circleTurn;
const winCombo = [
    [0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]
];
const celAr = Array.from(cells);


const playerMove = (e)=>{
    const cell = e.target
    const currentClass = circleTurn ? CLASSC : CLASSX;
    //place mark
    placeMark(cell, currentClass);
    //check for draw
    if(checkDraw()){
        document.getElementById('modal').classList.add('show');
        winHeader.innerHTML = `It's a DRAW !!`;
    };
    //check for win
   if(checkWin(currentClass)){
       //show modal
       document.getElementById('modal').classList.add('show');
        winHeader.innerHTML = `${circleTurn ? 'O\'s' : 'X\'s'} Win!!!`
   }
    //swap turns
    circleTurn = !circleTurn
    setGridClass();
}


function placeMark(cell, currentClass){
    cell.classList.add(currentClass);
}

startGame();

function startGame(){
    cells.forEach(cell =>{
    cell.addEventListener('click', playerMove, {once: true});
    })
    setGridClass();
}

function setGridClass(){
    grid.classList.remove('classX')
    grid.classList.remove('classC')
    if(circleTurn){
        grid.classList.add('classC')
    }else(grid.classList.add('classX'))
}

function checkWin(currentClass){
    return winCombo.some(combo =>{
        return combo.every(index =>{
            return cells[index].classList.contains(currentClass);
        })
    })
}

function checkDraw(){
    return celAr.every(el=>{
        return el.classList.contains(CLASSC) || el.classList.contains(CLASSX)
    })
}

restartGame = ()=>{
    document.querySelector('.modal').classList.remove('show');
    cells.forEach(cell =>{ cell.classList.remove(CLASSC);
                            cell.classList.remove(CLASSX)})
    startGame()
}

restartBtn.addEventListener('click', restartGame);