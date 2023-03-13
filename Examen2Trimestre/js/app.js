var map = L.map('mapa').setView([36.72071131817986, -4.420041081375409], 19);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


fetch('https://raw.githubusercontent.com/FRomero999/ExamenDIW2022/main/rutas_arqueologicas.json')
    .then(res => res.json())
    .then(data => {

        const tbody = document.querySelector("#localizaciones");

        const grid = document.querySelector('#lista');

        for (let i = 0; i < data.length; i++) {

            const clone = grid.content.cloneNode(true);

            let nombreMonumento = clone.getElementById('nombreMonumento');
            let horario = clone.getElementById('horario');
            let localizacion = clone.getElementById('localizacion');
            let movil = clone.getElementById('movil');

            nombreMonumento.textContent = data[i].properties.nombre;
            horario.textContent = data[i].properties.horario;
            localizacion.textContent = data[i].properties.direccion;
            movil.textContent = data[i].properties.telefono;
            if (movil.textContent != "") {
                movil.classList.add('tarjeta')
            }
            tbody.appendChild(clone);

            var tag = L.marker([data[i].properties.x, data[i].properties.y]).addTo(map);
            tag.bindPopup(`<h2>${data[i].properties.nombre}</h2><p>${data[i].properties.direccion}</p>`);

        }


    })



