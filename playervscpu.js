function paintButtons (thead, columns) {
    const tr = document.createElement('tr');
    for(let j= 0; j< columns; j++){
        const th= document.createElement('th');
        tr.appendChild(th);

        th.classList.add('color-th');
        const btn= document.createElement('button');
        btn.setAttribute('id', `btn${j}`);
        btn.classList.add("btnStyle");
        btn.textContent ='Drop';
        th.appendChild(btn);

    }
    thead.appendChild(tr)

}
function createBoard (tbody, rows, columns) {
    for (let x= 0; x <rows; x++){
        const tr = document.createElement('tr');
        for(let y =0; y <columns; y++){
            const td= document.createElement('td');
            const div = document.createElement('div');
            td.appendChild(div);
            tr.appendChild(td);
            td.classList.add('color-td');
            div.setAttribute("id",`cell${x}_${y}`);
        }
    tbody.appendChild(tr);
    }

}
function checkH(y,x,cellClass) {
        let contHorizontal = 1;
        b = x+1;
        while(contHorizontal <= 4 && b<columns && document.querySelector(`#cell${y}_${b}`).classList.contains(cellClass)) {
            contHorizontal++;
            b++;
        }
        b = x-1;
        while(contHorizontal <= 4 && b> -1 && document.querySelector(`#cell${y}_${b}`).classList.contains(cellClass)) {
            contHorizontal++;
            b--;
        }
    return contHorizontal >= 4;
}
function checkV(y,x,cellClass) {
        let contVertical = 0;
        while (y<rows && document.querySelector(`#cell${y}_${x}`).classList.contains(cellClass)) {
            contVertical++;
            y++;
        }
    return contVertical >= 4;    
}
function checkDiagAsc(y,x,cellClass){
    a = y+1;
    b = x+1;
    let contDiagAsc = 1;
    while(contDiagAsc <= 4 && a<rows && b<columns && document.querySelector(`#cell${a}_${b}`).classList.contains(cellClass)) {
        contDiagAsc++;
        b++;
        a++;
    }
    a = y-1;
    b = x-1;
    while(contDiagAsc <= 4 && b>-1 && a>-1 && document.querySelector(`#cell${a}_${b}`).classList.contains(cellClass)) {
        contDiagAsc++;
        b--;
        a--;
    }
    return contDiagAsc >= 4;
}
function checkDiagDesc(y,x,cellClass){
    a = y-1;
    b = x+1;
    contDiagDesc = 1;
    while(contDiagDesc <= 4 && a>-1 && b<columns && document.querySelector(`#cell${a}_${b}`).classList.contains(cellClass)) {
        contDiagDesc++;
        b++;
        a--;
    }
    a = y+1;
    b = x-1;
    while(contDiagDesc <= 4 && a<rows && b>-1 && document.querySelector(`#cell${a}_${b}`).classList.contains(cellClass)) {
        contDiagDesc++;
        b--;
        a++;
    }
    return contDiagDesc >=4;
}

function checkConnect4(y,x,cellClass) {
    const victoryH = checkH(y,x,cellClass);
    const victoryV = checkV(y,x,cellClass);
    const victoryDiagAsc = checkDiagAsc(y,x,cellClass);
    const victoryDiagDesc = checkDiagDesc(y,x,cellClass);
    const victory = victoryH || victoryV || victoryDiagAsc || victoryDiagDesc;
    
    return victory;
}

function checkTie(rows, columns) {
    const numCells = rows*columns;
    let contPaintedCells = 0;
    for(let y=0; y<rows; y++) {
        for(let x=0; x<columns; x++) {
            const cell = document.querySelector(`#cell${y}_${x}`);
            if(cell.classList.length!=0) {
                contPaintedCells++;
            }
        }
    }
    return contPaintedCells == numCells;
}

const rows = 6;
const columns = 7;
let playerTurn = 1;
const thead = document.querySelector('thead');
const tbody = document.querySelector('tbody');
const infoTurn = document.querySelector("#infoTurn");
const infoWinner = document.querySelector("#infoWinner");
let winner = false;
let winnerRed = false;
let winnerYellow = false;
let tie = false;
let CPUThrow = 0;
const btnPlayAgain = document.querySelector("#btnPlayAgain");

paintButtons(thead, columns);
createBoard(tbody, rows, columns);

document.querySelectorAll("thead button").forEach((button, x) => {
    button.addEventListener("click", () => {
        let y=rows-1;
        let painted = false;
        CPUThrow = Math.floor(Math.random() * ((columns) - 0)) + 0;
        while(y>=0 && !painted) {
            const cell = document.querySelector(`#cell${y}_${x}`);
            if (playerTurn == 1 && cell.classList.length == 0) {
                cell.classList.add("player");
                if (checkConnect4(y,x,"player")) {
                    winner = true;
                    winnerRed = true;
                } else {
                    playerTurn = 2
                    if (infoTurn.classList.length == 0) {
                        infoTurn.classList.add("cpu");
                    } else {
                        infoTurn.classList.replace("player", "cpu");
                    }
                    infoTurn.textContent = "CPU turn!";
                }
                painted = true;
            } 
            if (playerTurn == 2) {
                let y2 = rows-1;
                let cellCPU = document.querySelector(`#cell${y2}_${CPUThrow}`);
                while (y2>0 && cellCPU.classList.length == 1) {
                    y2--;
                    cellCPU = document.querySelector(`#cell${y2}_${CPUThrow}`);
                }
                while(document.querySelector(`#cell${0}_${CPUThrow}`).classList.length == 1) {
                    CPUThrow = Math.floor(Math.random() * ((columns) - 0)) + 0;
                    y2 = rows-1;
                    while (y2>0 && cellCPU.classList.length == 1) {
                        y2--;
                        cellCPU = document.querySelector(`#cell${y2}_${CPUThrow}`);                                                
                    }
                }
                cellCPU.classList.add("cpu");
                if (checkConnect4(y2,CPUThrow,"cpu")) {
                    winner = true;
                    winnerYellow = true;
                } else {
                    playerTurn = 1;
                    setTimeout(function(){
                        infoTurn.classList.replace("cpu", "player");
                        infoTurn.textContent = "Player turn!";
                    },500);
                }
                painted = true;
            }
            y--;
        }      
        tie = checkTie(rows,columns);
        if(tie) {
            infoWinner.setAttribute("style","display:flex;");
            infoWinner.textContent = "Tie!"
        }
        if(winnerRed) {
            infoWinner.setAttribute("style","display:flex;");
            infoWinner.innerHTML = "<span>Red</span> &nbsp; wins!"
            document.querySelector("#infoWinner span").setAttribute("style", "color: red");            
        }
        if(winnerYellow) {
            infoWinner.setAttribute("style","display:flex;");
            infoWinner.innerHTML = "<span>Yellow </span> &nbsp; wins!"
            document.querySelector("#infoWinner span").setAttribute("style", "color: yellow");
        }
        if(tie || winner) {
            document.querySelectorAll("thead button").forEach((button) => {
                button.setAttribute("disabled",true);
            });
            btnPlayAgain.setAttribute("style", "display: flex; justify-content: center");
            btnPlayAgain.addEventListener("click", e => {
                document.querySelectorAll("tbody div").forEach((div) => {
                    div.classList.remove("player","cpu");
                });
                document.querySelectorAll("thead button").forEach((button) => {
                    if (button.getAttribute("disabled") == "true") {
                        button.removeAttribute("disabled");
                    }
                });
                infoWinner.setAttribute("style","display: none")
                winner = false;
                winnerRed = false;
                winnerYellow = false;
                tie = false;
                e.target.setAttribute("style", "display: none");
                infoTurn.textContent = "";
                infoTurn.classList.remove("player","cpu");
                playerTurn = 1;
            });
        }
    });
});