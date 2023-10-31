// Variabler til HTML-indhold 
const prisElement = document.getElementById('pris');
const klokkenElement = document.getElementById('klokken');
const nuDisplayDiv = document.getElementById('nuDisplay');
//det der går igen på alle sider:
const footerInfo = document.getElementById('info-footer');
const topBar = document.getElementById('topBar');
const tandhjulContainer = document.getElementById('tandhjulContainer');
const region = 'DK2'; // Ændre dette efter behov
//INNER HTML
tandhjulContainer.innerHTML = '<i class="fas fa-gear" style="color: #55EC20;"></i><h2>ELPRISEN LIGE NU</h2>';
topBar.innerHTML = `
    <div class="left">
        <img src="assets/appIcons/mainIcon.ico" alt="Logo">
    </div>
    <div class="right">
        <ul>
            <li><a href="#">OVERSIGT</a></li>
            <li><a href="#">LIGE NU</a></li>
            <li><a href="#">HISTORIK</a></li>
        </ul>
    </div>
`;
footerInfo.innerHTML = `<p>Priserne er <span>ex. moms</span> og afgifter</p> <p>Du vises lige nu priserne for<span style="color: #55EC20;"> ${region}</span></p>`

nuDisplayDiv.innerHTML = `
<div id="cirkelPris">
    <h2>pris</h2>
    <h5>PR. KWH</h5>
</div>
<p>klokkeslet</p>`

//variabler til data-hentning:
const iDag = new Date();
const år = iDag.getFullYear();
const måned = (iDag.getMonth() + 1).toString().padStart(2, '0');
const dag = iDag.getDate().toString().padStart(2, '0');


// URL til API'en
const apiUrl = `https://www.elprisenligenu.dk/api/v1/prices/${år}/${måned}-${dag}_${region}.json`;

// Funktion til at formatere prisen med 4 decimaler
function formatPris(pris) {
    return parseFloat(pris).toFixed(3);
}

// Hent en reference til h2-elementet
const nuDisplayH2 = document.querySelector('#nuDisplay h2');
const nuDisplayTid = document.querySelector('#nuDisplay p');


// Funktion til at hente og opdatere elprisen
function hentOgOpdaterElpris() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data) && data.length > 0) {
                const aktuelPris = data[0].DKK_per_kWh;
                const formateretPris = formatPris(aktuelPris);

                // Hent tidsstart og tidsslut fra data
                const tidsstart = data[0].time_start;
                const tidsslut = data[0].time_end;

                // Opdater h2-elementet med den aktuelle pris og p-elementet med tidsspændet
                nuDisplayH2.textContent = `${formateretPris} KR`;
                nuDisplayTid.textContent = `${tidsstart} - ${tidsslut}`;
            } else {
                console.error('Ingen data blev fundet i JSON-responsen.');
            }
        })
        .catch(error => {
            console.error('Fejl ved hentning af elprisdata:', error);
        });
}

// Kald funktionen for at hente og opdatere elprisen
hentOgOpdaterElpris();















