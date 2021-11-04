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
        console.log("Contador horizontal: " + contHorizontal);
    return contHorizontal == 4;
}
function checkV(y,x,cellClass) {
        let contVertical = 0;
        while (y<rows && document.querySelector(`#cell${y}_${x}`).classList.contains(cellClass)) {
            contVertical++;
            y++;
        }
        console.log("Contador vertical: " + contVertical);
    return contVertical == 4;    
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
    console.log("Contador DiagAsc: " + contDiagAsc);
    return contDiagAsc == 4;
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
    console.log("Contador DiagDesc: " + contDiagDesc);
    return contDiagDesc ==4;
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
                console.log("cells pintadas: " + contPaintedCells);
            }
        }
    }
    return contPaintedCells == numCells;
}

const rows = 6;
const columns = 7;
let playerTurn = 0;
const thead = document.querySelector('thead');
const tbody = document.querySelector('tbody');
const h4 = document.querySelector("#infoTurn");
const h3 = document.querySelector("#infoWinner");
let winner = false;
let winnerRed = false;
let winnerYellow = false;
let tie = false;
const btnRandomTurn = document.querySelector("#btnRandomTurn");
const btnPlayAgain = document.querySelector("#btnPlayAgain");
paintButtons(thead, columns);
createBoard(tbody, rows, columns);


btnRandomTurn.addEventListener("click", e => {
    e.target.setAttribute("style", "display: none");
    playerTurn = Math.floor(Math.random() * (3 - 1)) + 1;
    console.log(playerTurn);
    if (playerTurn == 1) {
        h4.textContent = "Red player turn!"
        h4.classList.add("player");
    } else {
        h4.textContent = "Yellow player turn!"
        h4.classList.add("cpu");
    }
    // Y habilitamos los buttones cabecera
    document.querySelectorAll("thead button").forEach((button) => {
        if (button.getAttribute("disabled") == "true") {
            button.removeAttribute("disabled");
        }
    });
});
document.querySelectorAll("thead button").forEach((button, x) => {

    button.addEventListener("click", () => {
        // Recorremos las rows de la columna de 5 a 0
        let y=rows-1;
        let painted = false;
        
        while(y>=0 && !painted) {
            const cell = document.querySelector(`#cell${y}_${x}`);
            console.log("Id de la cell: " + cell.getAttribute("id"));
            
            // Preguntamos por el turno del jugador y si el div de la cell no esta pintada (no tiene clase)
            if (playerTurn == 1 && (cell.classList.length == 0)) {
                // Pintamos la cell rojo
                cell.classList.add("player");
                if (checkConnect4(y,x,"player")) {
                    winner = true;
                    winnerRed = true;
                } else {
                    playerTurn = 2
                    // Reemplazamos la clase al h4
                    h4.classList.replace("player", "cpu");
                    h4.textContent = "Yellow player turn!";
                }
                painted = true;
            } 
            // Preguntamos por el turno de la cpu y si el div de la cell no esta pintada (no tiene clase)
            else if (playerTurn == 2 && (cell.classList.length == 0)) {
                // Pintamos la cell amarillo
                cell.classList.add("cpu");
                if (checkConnect4(y,x,"cpu")) {
                    winner = true;
                    winnerYellow = true;
                } else {
                    playerTurn = 1;
                    h4.classList.replace("cpu", "player");
                    h4.textContent = "Red player turn!";
                }
                painted = true;
            }
            y--;
        }
        tie = checkTie(rows,columns);
        if(tie) {
            h3.setAttribute("style","display:flex;");
            h3.textContent = "Tie!"
        }
        if(winnerRed) {
            h3.setAttribute("style","display:flex;");
            h3.innerHTML = "<span>Red</span> &nbsp; wins!"
            document.querySelector("h3 span").setAttribute("style", "color: red");
            //h3.textContent = "Red wins!"
            
        }
        if(winnerYellow) {
            h3.setAttribute("style","display:flex;");
            h3.innerHTML = "<span>Yellow </span> &nbsp; wins!"
            document.querySelector("h3 span").setAttribute("style", "color: yellow");
            //h3.textContent = "Yellow wins!"
            
        }
        if(tie || winner) {
            document.querySelectorAll("thead button").forEach((button) => {
                button.setAttribute("disabled",true);
            });
            
            btnPlayAgain.setAttribute("style", "display: flex; justify-content: center");
            //al clicar limpia las clases de las cells(divs)
            btnPlayAgain.addEventListener("click", (e) => {
                
                // Recorrer cells
                document.querySelectorAll("tbody div").forEach((div) => {
                    // Quitamos clase a cada div
                    div.classList.remove("player","cpu");
                });
                
                // Ponemos invisible al h3
                h3.setAttribute("style","display: none")
                //Reiniciamos vbles booleanas a false
                winner = false;
                tie = false;
                // Borramos btnPlayAgain
                e.target.setAttribute("style", "display: none");
                // Info cadena vacia y le quitamos las clases
                h4.textContent = "";
                h4.classList.remove("player","cpu");
                // Mostrar button sortear
                btnRandomTurn.setAttribute("style", "display: flex; justify-content: center");
            });
        }
    });
});



