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
function comprobar(i,j) {

    let cont = 1;
    let a = j+1;
    while(a<=j+4 && a<columnas && document.querySelector(`celda${i}_${j}`).classList.contains("jugador-humano")) {
        cont++;
        a++;
    }
    let a = j-1;
    while(a>=j-4 && a> -1 && document.querySelector(`celda${i}_${j}`).classList.contains("jugador-humano")) {
        cont++;
        a--;
    }
    return cont == 4;
}

pintarBotones(thead, columnas);
crearTablero(tbody, filas, columnas);


const jugador = 1;
const cpu = 2;
const h4 = document.querySelector("#infoTurno");
const ganador = false;
h4.textContent = "Turno jugador";

document.querySelectorAll("thead button").forEach((boton, x) => {

    boton.addEventListener("click", comprobar);
    
});