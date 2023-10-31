// Hent en reference til de elementer, hvor du vil generere indholdet
const prisElement = document.getElementById('pris');
const klokkenElement = document.getElementById('klokken');
const footerInfo = document.getElementById('info-footer');
const topBar = document.getElementById('topBar');
const tandhjulContainer = document.getElementById('tandhjulContainer');
const nuDisplayDiv = document.getElementById('nuDisplay');

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

nuDisplayDiv.innerHTML = `
<div id="cirkelPris">
    <h2>pris</h2>
    <h5>PR. KWH</h5>
</div>
<p>klokkeslet</p>`

footerInfo.innerHTML = `<p>Priserne er <span>ex. moms</span> og afgifter</p> <p>Du vises lige nu priserne for<span style="color: #55EC20;"> ${location}</span></p>`












