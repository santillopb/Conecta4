
const columnas = 7;
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
const filas = 6;
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
function comprobar(i,j, claseFicha) {

    let cont = 1;
    let a = j+1;
    console.log(i);
    console.log(j);
    console.log(document.querySelector(`#celda${i}_${j}`));
    while(a<=j+4 && a<columnas && document.querySelector(`#celda${i}_${a}`).classList.contains(claseFicha)) {
        cont++;
        a++;
    }
    a = j-1;
    while(a>=j-4 && a> -1 && document.querySelector(`#celda${i}_${a}`).classList.contains(claseFicha)) {
        cont++;
        a--;
    }
    console.log("Cont: " +cont);
    return cont == 4;
}

pintarBotones(thead, columnas);
crearTablero(tbody, filas, columnas);


const jugador = 1;
const cpu = 2;
const h4 = document.querySelector("#infoTurno");
const ganador = false;
h4.textContent = "Turno jugador";
// Recorremos colección botones
document.querySelectorAll("thead button").forEach((boton, x) => {
    boton.addEventListener("click", () => {
        console.log(boton.getAttribute("id"));
        console.log("Indice columna: " + x);
        // Recorremos las filas de la columna de 5 a 0
        let y=filas-1;
        let pintado = false;
        while(y>=0 && !pintado) {
            const celda = document.querySelector(`#celda${y}_${x}`);
            console.log("Id de la celda: " + celda.getAttribute("id"));
            
            // Preguntamos por el turno del jugador y si el div de la celda no esta pintada (no tiene clase)
            if (h4.classList.contains("jugador-humano") && (celda.classList.length == 0)) {
                // Pintamos la celda rojo
                celda.classList.add("jugador-humano");
                
                // Reemplazamos la clase al h4
                h4.classList.replace("jugador-humano", "cpu");
                h4.textContent = "Turno CPU"
                pintado = true;
            } 
            // Preguntamos por el turno de la cpu y si el div de la celda no esta pintada (no tiene clase)
            if (h4.classList.contains("cpu") && (celda.classList.length == 0)) {
                // Pintamos la celda amarillo
                celda.classList.add("cpu");
                h4.classList.replace("cpu", "jugador-humano");
                h4.textContent = "Turno jugador"
                pintado = true;
            }
            
            y--;
        }
        
        
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



