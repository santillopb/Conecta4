
const thead = document.querySelector('thead');
function pintarBotones (thead, columnas) {
    const tr = document.createElement('tr');
    for(let j= 0; j< columnas; j++){
        const th= document.createElement('th');
        tr.appendChild(th);

        th.classList.add('color-th');
        const btn= document.createElement('button');
        btn.setAttribute('id', `btn${j}`);
        btn.textContent ='Drop';
        th.appendChild(btn);

    }
    thead.appendChild(tr)

}
const filas = 3;
const columnas = 4;
const tbody = document.querySelector('tbody');
function crearTablero (tbody, filas, columnas) {
    for (let x= 0; x <filas; x++){
        const tr = document.createElement('tr');
        for(let y =0; y <columnas; y++){
            const td= document.createElement('td');
            const div = document.createElement('div');
            td.appendChild(div);
            tr.appendChild(td);
            td.classList.add('color-td');
            div.setAttribute("id",`celda${x}_${y}`);
        }
    tbody.appendChild(tr);
    }

}
function comprobarH(y,x,claseFicha) {
        let contHorizontal = 1;
        b = x+1;
        while(contHorizontal <= 4 && b<columnas && document.querySelector(`#celda${y}_${b}`).classList.contains(claseFicha)) {
            contHorizontal++;
            b++;
        }
        b = x-1;
        while(contHorizontal <= 4 && b> -1 && document.querySelector(`#celda${y}_${b}`).classList.contains(claseFicha)) {
            contHorizontal++;
            b--;
        }
        console.log("Contador horizontal: " + contHorizontal);
    return contHorizontal == 4;
}
function comprobarV(y,x,claseFicha) {
        let contVertical = 0;
        while (y<filas && document.querySelector(`#celda${y}_${x}`).classList.contains(claseFicha)) {
            contVertical++;
            y++;
        }
        console.log("Contador vertical: " + contVertical);
    return contVertical == 4;    
}
function comprobarDiagAsc(y,x,claseFicha){
    a = y+1;
    b = x+1;
    let contDiagAsc = 1;
    while(contDiagAsc <= 4 && a<filas && b<columnas && document.querySelector(`#celda${a}_${b}`).classList.contains(claseFicha)) {
        contDiagAsc++;
        b++;
        a++;
    }
    a = y-1;
    b = x-1;
    while(contDiagAsc <= 4 && b>-1 && a>-1 && document.querySelector(`#celda${a}_${b}`).classList.contains(claseFicha)) {
        contDiagAsc++;
        b--;
        a--;
    }
    console.log("Contador DiagAsc: " + contDiagAsc);
    return contDiagAsc == 4;
}
function comprobarDiagDesc(y,x,claseFicha){
    a = y-1;
    b = x+1;
    contDiagDesc = 1;
    while(contDiagDesc <= 4 && a>-1 && b<columnas && document.querySelector(`#celda${a}_${b}`).classList.contains(claseFicha)) {
        contDiagDesc++;
        b++;
        a--;
    }
    a = y+1;
    b = x-1;
    while(contDiagDesc <= 4 && a<filas && b>-1 && document.querySelector(`#celda${a}_${b}`).classList.contains(claseFicha)) {
        contDiagDesc++;
        b--;
        a++;
    }
    console.log("Contador DiagDesc: " + contDiagDesc);
    return contDiagDesc ==4;
}

function comprobar4(y,x,claseFicha) {
    const victoriaHorizontal = comprobarH(y,x,claseFicha);
    const victoriaVertical = comprobarV(y,x,claseFicha);
    const victoriaDiagAsc = comprobarDiagAsc(y,x,claseFicha);
    const victoriaDiagDesc = comprobarDiagDesc(y,x,claseFicha);
    const victoria = victoriaHorizontal || victoriaVertical || victoriaDiagAsc || victoriaDiagDesc;
    
    return victoria;
}

pintarBotones(thead, columnas);
crearTablero(tbody, filas, columnas);


let turnoJugador = 1;
const cpu = 2;
const h4 = document.querySelector("#infoTurno");

h4.textContent = "Turno jugador";
let ganador = false;
document.querySelectorAll("thead button").forEach((boton, x) => {

    boton.addEventListener("click", () => {
        // Recorremos las filas de la columna de 5 a 0
        let y=filas-1;
        let pintado = false;
        
        while(y>=0 && !pintado) {
            const celda = document.querySelector(`#celda${y}_${x}`);
            console.log("Id de la celda: " + celda.getAttribute("id"));
            
            // Preguntamos por el turno del jugador y si el div de la celda no esta pintada (no tiene clase)
            if (turnoJugador == 1 && (celda.classList.length == 0)) {
                // Pintamos la celda rojo
                celda.classList.add("jugador-humano");
                /*if (comprobar(y,x, "jugador-humano")) {
                    setTimeout(function () {alert("He ganado")}, 500);
                }*/
                // Caso horizontal
                //if (comprobar(y,x,0,1,"jugador-humano")) setTimeout(function () {alert("He ganado")}, 500);
                if (comprobar4(y,x,"jugador-humano")) {
                    setTimeout(function () {alert("He ganado")}, 500);
                    ganador = true;
                }
                // Caso vertical
                //if (comprobar(y,x,1,0,"jugador-humano")) setTimeout(function () {alert("He ganado")}, 500);
                // Caso diagonal descendente
                //if (comprobar(y,x,1,-1,"jugador-humano")) setTimeout(function () {alert("He ganado")}, 500);
                //if (comprobar(y,x,1,1,"jugador-humano")) setTimeout(function () {alert("He ganado")}, 500);
                turnoJugador = 2
                // Reemplazamos la clase al h4
                h4.classList.replace("jugador-humano", "cpu");
                h4.textContent = "Turno CPU"
                pintado = true;
            } 
            // Preguntamos por el turno de la cpu y si el div de la celda no esta pintada (no tiene clase)
            else if (turnoJugador == 2 && (celda.classList.length == 0)) {
                // Pintamos la celda amarillo
                celda.classList.add("cpu");
                /*if (comprobar(y,x, "cpu")) {
                    setTimeout(function () {alert("Ha ganado el cpu")}, 500);
                    
                }*/
                if (comprobar4(y,x,"cpu")) {
                    setTimeout(function () {alert("He ganado")}, 500);
                    ganador = true;
                } 
                turnoJugador = 1;
                h4.classList.replace("cpu", "jugador-humano");
                h4.textContent = "Turno jugador"
                pintado = true;

            }
            y--;
        }
const numCeldas = filas*columnas;
let contCeldasPintadas = 0;
for(let y=0; y<filas; y++) {
    for(let x=0; x<columnas; x++) {
        const celda = document.querySelector(`#celda${y}_${x}`);
        if(celda.classList.length!=0) {
            contCeldasPintadas++;
            console.log("Celdas pintadas: " + contCeldasPintadas);
        }
    }
}

if(contCeldasPintadas == numCeldas) {
    setTimeout(function () {alert("Empate")}, 500);
}    

    });
    
});
