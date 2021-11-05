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
    return contHorizontal >= 4;
}
function checkV(y,x,cellClass) {
        let contVertical = 0;
        while (y<rows && document.querySelector(`#cell${y}_${x}`).classList.contains(cellClass)) {
            contVertical++;
            y++;
        }
        console.log("Contador vertical: " + contVertical);
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
    console.log("Contador DiagAsc: " + contDiagAsc);
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
    console.log("Contador DiagDesc: " + contDiagDesc);
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
                //console.log("cells pintadas: " + contPaintedCells);
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
const h4 = document.querySelector("#infoTurn");
const h3 = document.querySelector("#infoWinner");
let winner = false;
let winnerRed = false;
let winnerYellow = false;
let tie = false;
let CPUThrow = 0;
const btnPlayAgain = document.querySelector("#btnPlayAgain");

paintButtons(thead, columns);
createBoard(tbody, rows, columns);

document.querySelectorAll("thead button").forEach((boton, x) => {

    boton.addEventListener("click", () => {
        // Recorremos las rows de la columna de 5 a 0
        let y=rows-1;
        let painted = false;
        CPUThrow = Math.floor(Math.random() * ((columns) - 0)) + 0;
        console.log(`---------------------------`);
        console.log(`Tirada CPU ${CPUThrow}`);
        while(y>=0 && !painted) {
            const cell = document.querySelector(`#cell${y}_${x}`);
            console.log("Id de la cell: " + cell.getAttribute("id"));
            
            // Preguntamos por el turno del jugador y si el div de la cell no esta pintada (no tiene clase)
            if (playerTurn == 1 && cell.classList.length == 0) {
                // Pintamos la cell rojo
                cell.classList.add("player");
                if (checkConnect4(y,x,"player")) {
                    //setTimeout(function () {alert("Gana rojo!")}, 500);
                    winner = true;
                    winnerRed = true;
                } else {
                    playerTurn = 2
                    // Reemplazamos la clase al h4
                    if (h4.classList.length == 0) {
                        h4.classList.add("cpu");
                    } else {
                        h4.classList.replace("player", "cpu");
                    }
                    
                    h4.textContent = "CPU turn!";
                }
                painted = true;
            } 
            // Preguntamos por el turno de la cpu y si el div de la cell no esta pintada (no tiene clase)
            if (playerTurn == 2) {
                // Declaramos vble y2
                let y2 = rows-1;
                // Preguntamos si la fila esta pintada 
                //sino se asigna la cell una posicion arriba de la fila

                let cellCPU = document.querySelector(`#cell${y2}_${CPUThrow}`);
               
                while (y2>0 && cellCPU.classList.length == 1) {
                    y2--;
                    cellCPU = document.querySelector(`#cell${y2}_${CPUThrow}`);
                }

                console.log("Y2: " + y2);
                console.log("Tirada X: " + CPUThrow);
                console.log("Id de la cell CPU: " + cellCPU.getAttribute("id"));
                
                while(document.querySelector(`#cell${0}_${CPUThrow}`).classList.length == 1) {
                    console.log("PASA MATH RANDOM");
                    CPUThrow = Math.floor(Math.random() * ((columns) - 0)) + 0;
                    console.log("Math random de nuevo: " + CPUThrow);
                    //cellCPU = document.querySelector(`#cell${y2}_${CPUThrow}`);
                    y2 = rows-1;
                    while (y2>=0 && cellCPU.classList.length == 1) {
                        cellCPU = document.querySelector(`#cell${y2}_${CPUThrow}`);
                        console.log("Y2 WHILE: " + y2);
                        y2--;                        
                    }
                    /*if (y2 == -1) {
                        y2 = 0;
                        console.log("El y2 era -1 y lo hemos pasado a 0");
                    }*/
                    y2++;
                    console.log("Sumamos +1 a la y2: " + y2);
                    console.log("Y2: " + y2);
                    console.log("Tirada X: " + CPUThrow);
                    //console.log("Id de la cell CPU: " + cellCPU.getAttribute("id"));
                    
                }
                // Pintamos la cell amarillo
                cellCPU.classList.add("cpu");
                if (checkConnect4(y2,CPUThrow,"cpu")) {
                    //setTimeout(function () {alert("Gana amarillo!")}, 1000);
                    winner = true;
                    winnerYellow = true;
                } else {
                    playerTurn = 1;
                    
                    setTimeout(function(){
                        h4.classList.replace("cpu", "player");
                        h4.textContent = "Player turn!";
                    },500);
                }
                //console.log("PASA CPU");
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
            document.querySelectorAll("thead button").forEach((boton) => {
                boton.setAttribute("disabled",true);
            });
            
            btnPlayAgain.setAttribute("style", "display: flex; justify-content: center");
            //al clicar limpia las clases de las cells(divs)
            btnPlayAgain.addEventListener("click", e => {
                
                // Recorrer cells
                document.querySelectorAll("tbody div").forEach((div) => {
                    // Quitamos clase a cada div
                    div.classList.remove("player","cpu");
                });
                // Y habilitamos los botones cabecera
                document.querySelectorAll("thead button").forEach((boton) => {
                    if (boton.getAttribute("disabled") == "true") {
                        boton.removeAttribute("disabled");
                    }
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
                playerTurn = 1;
            });
        }
    });
});