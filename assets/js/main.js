document.addEventListener('DOMContentLoaded', function () {
    // Variabler til HTML-indhold
    const nuDisplayDiv = document.getElementById('nuDisplay');
    const footerInfo = document.getElementById('info-footer');
    const topBar = document.getElementById('topBar');
    const tandhjulContainer = document.getElementById('tandhjulContainer');
    const region = 'DK2';

    // INNER HTML
    tandhjulContainer.innerHTML = ' <a href="#"><i id="fas" class="fas fa-gear" style="color: #55EC20;"></i></a><h2>ELPRISEN LIGE NU</h2';
    topBar.innerHTML = `
        <div class="left">
            <img src="assets/appIcons/mainIcon.ico" alt="Logo">
        </div>
        <div class="right">
            <ul>
                <li><a href="#">OVERSIGT</a></li>
                <li><a href="#" class="active">LIGE NU</a></li>
                <li><a href="#">HISTORIK</a></li>
            </ul>
        </div>
    `;

    // Find alle navigationslinks
    const navigationLinks = document.querySelectorAll('#topBar .right ul li a');

    // Event listener til at håndtere klik på navigationslinkene
    navigationLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            // Forhindrer standardlinkadfærd
            event.preventDefault();

            // Fjern "active" klassen fra alle links
            navigationLinks.forEach(link => {
                link.classList.remove('active');
            });

            // Tilføj "active" klassen til det aktive link
            this.classList.add('active');

            // Implementer den relevante handling baseret på det aktive link her
            if (this.textContent === 'OVERSIGT') {
                // Gør noget når OVERSIGT linket klikkes
            } else if (this.textContent === 'LIGE NU') {
                // Gør noget når LIGE NU linket klikkes
            } else if (this.textContent === 'HISTORIK') {
                // Gør noget når HISTORIK linket klikkes
            }
        });
    });

    nuDisplayDiv.innerHTML = `
        <div id="cirkelPris">
            <h2>pris</h2>
            <h5>PR. KWH</h5>
        </div>
        <p>klokkeslet</p
    `;

    // Funktion til at opdatere teksten baseret på region
    function opdaterInfoFooter(region) {
        let locationTekst;

        // Tjekker værdien af region
        if (region === 'DK1') {
            locationTekst = 'Vest Danmark';
        } else if (region === 'DK2') {
            locationTekst = 'Øst Danmark';
        } else {
            locationTekst = 'Ukendt område';
        }
        footerInfo.innerHTML = `<p>Priserne er <span>ex. moms</span> og afgifter</p> <p>Du vises lige nu priserne for<span style="color: #55EC20;"> ${locationTekst}</span></p`;
    }
    // Kald funktionen for at opdatere teksten i info-footer baseret på region
    opdaterInfoFooter(region);

    // Variabler til data-hentning:
    const iDag = new Date();
    const år = iDag.getFullYear();
    const måned = (iDag.getMonth() + 1).toString().padStart(2, '0');
    const dag = iDag.getDate().toString().padStart(2, '0');

    // URL til API'en
    const apiUrl = `https://www.elprisenligenu.dk/api/v1/prices/${år}/${måned}-${dag}_${region}.json`;

    // Funktion til at formatere prisen med 3 decimaler
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
                    const tidNu = new Date();
                    const tidsstart = new Date(tidNu);
                    const tidsslut = new Date(tidNu);

                    // Opdater h2-elementet med den aktuelle pris og p-elementet med tidsspændet
                    nuDisplayH2.textContent = `${formateretPris} KR`;
                    // Opdater p-elementet med tidsintervallet
                    tidsstart.setMinutes(0);
                    tidsstart.setSeconds(0);
                    tidsstart.setMilliseconds(0);

                    tidsslut.setMinutes(0);
                    tidsslut.setSeconds(0);
                    tidsslut.setMilliseconds(0);
                    tidsslut.setHours(tidsslut.getHours() + 1);

                    const tidsstartString = `${tidsstart.getHours().toString().padStart(2, '0')}:00`;
                    const tidsslutString = `${tidsslut.getHours().toString().padStart(2, '0')}:00`;
                    nuDisplayTid.textContent = `${tidsstartString}-${tidsslutString}`;
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

    // "HISTORIK"
    const historikLink = document.querySelector('#topBar .right ul li:nth-child(3) a');

    // Tilføj en eventlistener til "HISTORIK" linket
    historikLink.addEventListener('click', function (event) {
        event.preventDefault();

        // Opdater nuDisplayDiv med historikindhold
        nuDisplayDiv.innerHTML = `
            <div class="search-bar">
                <div class="search-input">
                    <input type="text" id="selected-date" placeholder="Vælg en dato">
                </div>
                <div class="calendar-icon">
                    <i class="fa-solid fa-calendar-days" style="color: #55EC20;"></i>
                </div>
            </div>
        `;

        // Gem en reference til calendarIcon
        const calendarIcon = document.querySelector('.calendar-icon i');

        // Opdater h2-teksten til "HISTORIK"
        tandhjulContainer.querySelector('h2').textContent = 'HISTORIK';

        // Gem en reference til calendarModal
        const calendarModal = document.getElementById('calendar-modal');

        // Tilføj en eventlistener til calendarIcon
        calendarIcon.addEventListener('click', function () {
            // Åbn modalen ved at ændre display-stilen
            calendarModal.style.display = 'block';
        });

        // Luk modalen, når der klikkes uden for modalindholdet
        window.addEventListener('click', function (event) {
            if (event.target === calendarModal) {
                calendarModal.style.display = 'none';
            }
        });

    });

    // "LIGE NU"
    const ligeNuLink = document.querySelector('#topBar .right ul li:nth-child(2) a');

    // Funktion til at genindlæse siden
    function genindlæsSiden() {
        location.reload();
    }

    // Event listener til at håndtere klik på "LIGE NU" og genindlæse siden
    ligeNuLink.addEventListener('click', function (event) {
        event.preventDefault(); // Forhindrer standardlinkadfærd
        genindlæsSiden();
    });

    // "OVERSIGT"
    const oversigtLink = document.querySelector('#topBar .right ul li:nth-child(1) a');
    oversigtLink.addEventListener('click', function (event) {
        event.preventDefault();
        // Opdater nuDisplayDiv med oversigtindhold
        nuDisplayDiv.innerHTML = `
            <div id="dato">
                <div id="datoSøgefelt"></div>
                <p>oversigt</p>
            </div>
            <div id="gamle-timer">
                <table>
                    <!-- Her kan du tilføje tabellens indhold for historik -->
                </table>
            </div>
        `;
        // Opdater h2-teksten til "HISTORIK"
        tandhjulContainer.querySelector('h2').textContent = 'OVERSIGT';
    });

    //INDSTILLINGER
    const indstillinger = document.getElementById('fas');
    indstillinger.addEventListener('click', function (event) {
        event.preventDefault();
        // Opdater nuDisplayDiv med oversigtindhold
        nuDisplayDiv.innerHTML = `
            <div id="valgBox">
                <div id="moms"><p>PRISER INKL. MOMS</p><label class="switch">
                <input type="checkbox">
                <span class="slider round"></span>
                </label></div>

                <div id="moms"><p>LAVESTE PRIS ALARM</p><label class="switch">
                <input type="checkbox">
                <span class="slider round"></span>
                </label></div>

                <div id="moms">
                    <p>VÆLG REGION</p>
                    <select id="regionSelect">
                        <option value="vest" class="regValg">VEST DANMARK</option>
                        <option value="øst" class="regValg">ØST DANMARK</option>
                    </select>
                </div>
            </div>
        `;

        // Opdater h2-teksten til "indstillinger"
        tandhjulContainer.querySelector('h2').textContent = 'INDSTILLINGER';
    });
});
