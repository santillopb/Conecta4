const thead = document.querySelector('thead');
function pintarBotones (thead, columnas) {
    const tr = document.createElement('tr');
    for(let j= 0; j< columnas; j++){
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

function empate(filas, columnas) {
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
    return contCeldasPintadas == numCeldas;
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
<<<<<<< HEAD
                
                // Reemplazamos la clase al h4
                h4.classList.replace("jugador-humano", "cpu");
                h4.textContent = "Turno CPU"
=======
                if (comprobar4(y,x,"jugador-humano")) {
                    setTimeout(function () {alert("Gana rojo!")}, 500);
                    ganador = true;
                } else {
                    turnoJugador = 2
                    // Reemplazamos la clase al h4
                    h4.classList.replace("jugador-humano", "cpu");
                    h4.textContent = "Turno CPU"
                }
>>>>>>> f10c19339686ea7e1f0ddd90a389aa3031728aa2
                pintado = true;
            } 
            // Preguntamos por el turno de la cpu y si el div de la celda no esta pintada (no tiene clase)
            else if (turnoJugador == 2 && (celda.classList.length == 0)) {
                // Pintamos la celda amarillo
                celda.classList.add("cpu");
<<<<<<< HEAD
                h4.classList.replace("cpu", "jugador-humano");
                h4.textContent = "Turno jugador"
                pintado = true;
            }
            
            y--;
        }
        
        
=======
                if (comprobar4(y,x,"cpu")) {
                    setTimeout(function () {alert("Gana amarillo!")}, 500);
                    ganador = true;
                } else {
                    turnoJugador = 1;
                    h4.classList.replace("cpu", "jugador-humano");
                    h4.textContent = "Turno jugador"
                }
                pintado = true;
            }
            y--;
        }

        if(empate(filas,columnas)) setTimeout(function () {alert("Empate")}, 500);
        if(empate(filas,columnas) || ganador) {
            document.querySelectorAll("thead button").forEach((boton) => {
                boton.setAttribute("disabled",false);
            });
            // Creamos boton jugar de nuevo
            
            const container = document.querySelector("#container");
            const btnVolverJugar= document.createElement('button');
            btnVolverJugar.textContent ='Volver a jugar';
            btnVolverJugar.classList.add("btnStyle");
            btnVolverJugar.setAttribute("id",`btnVolverJugar`);
            container.appendChild(btnVolverJugar);

            //al clicar limpia las clases de las celdas(divs)
            btnVolverJugar.addEventListener("click", () => {
                // Recorrer celdas
                document.querySelectorAll("tbody div").forEach((div) => {
                    // Quitamos clase a cada div
                    div.classList.remove("jugador-humano","cpu");
                });
            })
            // Y habilitamos lo botones cabecera

            //Los contadores se tienen que reiniciar
        }
>>>>>>> f10c19339686ea7e1f0ddd90a389aa3031728aa2
    });

});
//Recorrer filas columnas comprobación 4 en raya

/*for(let x=0; x<filas; x++){
    for(let y=0; y<columnas; y++){
        const celda = document.querySelector(`#celda${x}_${y}`);
        
        if(x+3<filas){
            const celdaMasUnoHorizontal = document.querySelector(`#celda${x+1}_${y}`);
            const celdaMasDosHorizontal = document.querySelector(`#celda${x+2}_${y}`);
            const celdaMasTresHorizontal = document.querySelector(`#celda${x+3}_${y}`);
            console.log( "entra en " + celdaMasUnoHorizontal.getAttribute("id"));
            console.log( "entra en " + celdaMasDosHorizontal.getAttribute("id"));
            console.log( "entra en " + celdaMasTresHorizontal.getAttribute("id"));
            console.log( "------------------------------------------");
            if ((celda.classList.contains("jugador-humano")) && (celdaMasUnoHorizontal.classList.contains("jugador-humano"))  
            && (celdaMasDosHorizontal.classList.contains("jugador-humano"))
            && (celdaMasTresHorizontal.classList.contains("jugador-humano"))){

                alert("Jugador, has ganado")
            }
        }
    }
}

// Comprobamos ganador horizontal
/*if (x < 3) {
    const celdaMasUnoHorizontal = document.querySelector(`#celda${y}_${x+1}`);
    const celdaMasDosHorizontal = document.querySelector(`#celda${y}_${x+2}`);
    const celdaMasTresHorizontal = document.querySelector(`#celda${y}_${x+3}`);
    console.log(celdaMasUnoHorizontal.getAttribute("id"));
    console.log(celdaMasDosHorizontal.getAttribute("id"));
    console.log(celdaMasTresHorizontal.getAttribute("id"));
    console.log(x);
    if(celda.classList.contains("jugador-humano") && celdaMasUnoHorizontal.classList.contains("jugador-humano") && 
        celdaMasDosHorizontal.classList.contains("jugador-humano") && celdaMasTresHorizontal.classList.contains("jugador-humano")) {
            alert("Jugador humano ha ganado!");
        }
    }*/



