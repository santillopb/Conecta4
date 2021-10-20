
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
            tr.appendChild(td);
            td.classList.add('color-td');
        }
    tbody.appendChild(tr);
    }

}

pintarBotones(thead, columnas);
crearTablero(tbody, filas, columnas);