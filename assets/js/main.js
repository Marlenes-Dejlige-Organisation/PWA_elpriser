document.addEventListener('DOMContentLoaded', function () {
    // Variabler til HTML-indhold
    const nuDisplayDiv = document.getElementById('nuDisplay');
    const footerInfo = document.getElementById('info-footer');
    const topBar = document.getElementById('topBar');
    const tandhjulContainer = document.getElementById('tandhjulContainer');
    const region = 'DK1';

    // INNER HTML
    tandhjulContainer.innerHTML = ' <a href="#"><i id="fas" class="fas fa-gear" style="color: #55EC20;"></i></a><h2>ELPRISEN LIGE NU</h2>';
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
        <p>klokkeslet</p>
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
        footerInfo.innerHTML = `<p>Priserne er <span>ex. moms</span> og afgifter</p> <p>Du vises lige nu priserne for <span style="color: #55EC20;"> ${locationTekst}</span></p>`;
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

    // "HISTORIK"------------------------------
    const historikLink = document.querySelector('#topBar .right ul li:nth-child(3) a');

    // Tilføj en eventlistener til "HISTORIK" linket
    historikLink.addEventListener('click', function (event) {
        event.preventDefault();

        // Opdater nuDisplayDiv med historikindhold
        nuDisplayDiv.innerHTML = `
            <div class="search-bar">
                <div class="search-input">
                    <input type="text" id="her" placeholder="vælg en dato">
                </div>
                <div class="calendar-icon">
                    <i class="fa-solid fa-calendar-days" style="color: #55EC20;"></i>
                </div>
            </div>
            <p id="her2"></p>
            <div id="timePriser"></div>
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
   // Indsæt følgende kode, hvor kalenderen skal vises (inden for modal-content i din HTML):
const calendarModal = document.getElementById('calendar-modal');
const calendarModalContent = document.querySelector('.modal-content');

calendarModalContent.innerHTML = `
  <div id="calendar">
    <div id="calendar-header">
      <span id="prev-month" class="calendar-nav">&#8249;</span>
      <h3 id="calendar-month-year"></h3>
      <span id="next-month" class="calendar-nav">&#8250;</span>
    </div>
    <div id="calendar-body">
      <div class="weekdays">
        <div>Søn</div>
        <div>Man</div>
        <div>Tir</div>
        <div>Ons</div>
        <div>Tor</div>
        <div>Fre</div>
        <div>Lør</div>
      </div>
      <div id="calendar-dates"></div>
    </div>
  </div>
`;
// kalender:

const calendarMonthYear = document.getElementById('calendar-month-year');
const calendarDates = document.getElementById('calendar-dates');
const prevMonthButton = document.getElementById('prev-month');
const nextMonthButton = document.getElementById('next-month');

let currentDate = new Date(); // Den aktuelle dato
let selectedDate = null; // Datoen, som brugeren vælger

// Funktion til at opdatere kalenderen
function updateCalendar(date) {
  // Nulstil kalenderens indhold
  calendarDates.innerHTML = '';

  // Opret en kopi af den aktuelle dato
  const currentMonth = new Date(date);
  currentMonth.setDate(1); // Sæt til første dag i måneden

  // Indstil måneds- og årsoplysninger i headeren
  calendarMonthYear.textContent = `${currentMonth.toLocaleString('default', { month: 'long' })} ${currentMonth.getFullYear()}`;

  // Find den første dag i ugen for den aktuelle måned
  const firstDay = currentMonth.getDay();

  // Få antallet af dage i den aktuelle måned
  const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  // Opret dato-elementer for hver dag i måneden
  for (let i = 0; i < firstDay; i++) {
    const emptyDate = document.createElement('div');
    calendarDates.appendChild(emptyDate);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateElement = document.createElement('div');
    dateElement.textContent = day;

    // Tilføj et klikhåndterer til hver dato
    dateElement.addEventListener('click', () => {
        selectedDate = new Date(date);
        selectedDate.setDate(day);
        // Her kan du gemme eller bruge den valgte dato, f.eks. selectedDate
        console.log('Valgt dato:', selectedDate);
        hentOgVisTimePriser(selectedDate); // TimePRISER
        // Formater datoen som "dd-mm-yyyy"
        const formattedDate = `${String(day).padStart(2, '0')}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${selectedDate.getFullYear()}`;
      
        // Indsæt den formaterede dato i inputfeltet
        const myInput = document.getElementById('her');
        myInput.value = formattedDate;

         // Indsæt teksten "ELPRISERNE FOR" foran formattedDate
  const fullText = `ELPRISERNE FOR D. ${formattedDate}`;

  // Indsæt den fulde tekst i p-tagget
  const myp = document.getElementById('her2');
  myp.textContent = fullText;
      
        // Skjul modalen ved at ændre dens display-stil til "none"
        const calendarModal = document.getElementById('calendar-modal');
        calendarModal.style.display = 'none';
      });
      

    calendarDates.appendChild(dateElement);
  }
}

// Opdater kalenderen med den aktuelle dato
updateCalendar(currentDate);

// Klikhåndterere for at skifte måneder
prevMonthButton.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  updateCalendar(currentDate);
});

nextMonthButton.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  updateCalendar(currentDate);
});

// Luk modalen ved at klikke uden for kalenderen
calendarModal.addEventListener('click', (e) => {
  if (e.target === calendarModal) {
    calendarModal.style.display = 'none';
  }
});

//----------------timepris

function hentOgVisTimePriser(selectedDate) {
    const timePriserDiv = document.getElementById('timePriser');
    timePriserDiv.innerHTML = ''; // Ryd tidligere priser, hvis der er nogen
  
    // Hent året, måneden og dagen fra den valgte dato
    const år = selectedDate.getFullYear();
    const måned = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
    const dag = selectedDate.getDate().toString().padStart(2, '0');
    const prisklasse = region;
    const apiUrl2 = `https://www.elprisenligenu.dk/api/v1/prices/${år}/${måned}-${dag}_${prisklasse}.json`; // Erstat DIN_API_URL med den faktiske URL
  
    fetch(apiUrl2)
      .then(response => response.json()) // Konverter JSON-responsen til et JavaScript-objekt
      .then(data => {
// Loop gennem data og opret HTML-elementer for hver timepris
for (const entry of data) {
    const time_start = new Date(entry.time_start).toLocaleTimeString('da-DK', { hour: '2-digit', minute: '2-digit' });
    const pris = entry.DKK_per_kWh;

    // Opret en container til hver timepris
    const timeprisContainer = document.createElement('div');
    timeprisContainer.classList.add('overblik'); // Du kan tilføje CSS-klasser efter behov

    // Opret og tilføj p-elementer med tid og pris
    const tidElement = document.createElement('p');
    tidElement.textContent = `kl. ${time_start}`;
    const prisElement = document.createElement('p');
    prisElement.textContent = `${pris} kr/kWh`;

    // Tilføj tid og pris til timepriscontaineren
    timeprisContainer.appendChild(tidElement);
    timeprisContainer.appendChild(prisElement);

    // Tilføj timepriscontaineren til overbliksContainer
    timePriser.appendChild(timeprisContainer);
}
      })
      .catch(error => {
        console.error('Fejl ved hentning af timepriser:', error);
      });
  }
  
  //------------------------------

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
        <div id="lavHoj">
         <div id="lav">
            <div id="lavPris">
            <h2 id="lavh2">pris</h2>
            <h5>PR. KWH</h5>
            </div>
            <p>LAVESTE PRIS</p>
         </div>
         <div id="hoj">
            <div id="hojPris">
            <h2 id="hojh2"></h2>
            <h5>PR. KWH</h5>
            </div>
            <p>HØJESTE PRIS</p>
         </div>    
        </div>
        <div id="overbliksContainer">
        </div>
        `;
        // Vis dagens timepriser i overbliksContainer
    visDagensTimepriser(apiUrl);
        // Opdater h2-teksten til "oversigt"
        tandhjulContainer.querySelector('h2').textContent = 'OVERSIGT';
    });
    function visDagensTimepriser(apiUrl) {
        // Find det overordnede container-element for timepriser
        const overbliksContainer = document.getElementById('overbliksContainer');
    
        // Hent data fra API'en
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Loop gennem data og opret HTML-elementer for hver timepris
                for (const entry of data) {
                    const time_start = new Date(entry.time_start).toLocaleTimeString('da-DK', { hour: '2-digit', minute: '2-digit' });
                    const pris = entry.DKK_per_kWh;
    
                    // Opret en container til hver timepris
                    const timeprisContainer = document.createElement('div');
                    timeprisContainer.classList.add('overblik'); // Du kan tilføje CSS-klasser efter behov
    
                    // Opret og tilføj p-elementer med tid og pris
                    const tidElement = document.createElement('p');
                    tidElement.textContent = `kl. ${time_start}`;
                    const prisElement = document.createElement('p');
                    prisElement.textContent = `${pris} kr/kWh`;
    
                    // Tilføj tid og pris til timepriscontaineren
                    timeprisContainer.appendChild(tidElement);
                    timeprisContainer.appendChild(prisElement);
    
                    // Tilføj timepriscontaineren til overbliksContainer
                    overbliksContainer.appendChild(timeprisContainer);
                }
            })
            .catch(error => {
                console.error('Fejl ved hentning af timepriser:', error);
            });
                // Funktion til at finde den højeste og laveste timepris
function findHojesteOgLavestePris(priser) {
    let hojestePris = priser[0].DKK_per_kWh;
    let lavestePris = priser[0].DKK_per_kWh;

    for (const pris of priser) {
        const aktuelPris = pris.DKK_per_kWh;

        if (aktuelPris > hojestePris) {
            hojestePris = aktuelPris;
        }

        if (aktuelPris < lavestePris) {
            lavestePris = aktuelPris;
        }
    }

    return { hojestePris, lavestePris };
}

// Hent timepriser og opdater hoj og lav
function hentOgOpdaterTimePriser() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data) && data.length > 0) {
                const priser = data;
                const { hojestePris, lavestePris } = findHojesteOgLavestePris(priser);

                // Opdater "hoj" og "lav" h2-tags med de fundne priser
                const hojPrisH2 = document.getElementById('hojh2');
                const lavPrisH2 = document.getElementById('lavh2');
                hojPrisH2.textContent = `${hojestePris.toFixed(3)} KR`;
                lavPrisH2.textContent = `${lavestePris.toFixed(3)} KR`;
            } else {
                console.error('Ingen data blev fundet i JSON-responsen.');
            }
        })
        .catch(error => {
            console.error('Fejl ved hentning af timepriser:', error);
        });
}

// Kald funktionen for at hente og opdatere timepriserne
hentOgOpdaterTimePriser();
    }



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