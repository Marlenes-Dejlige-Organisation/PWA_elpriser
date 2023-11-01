        // Kalenderkoden
        const calendarDates = document.getElementById('calendar-dates');
        const prevMonthButton = document.getElementById('prev-month');
        const nextMonthButton = document.getElementById('next-month');
        const calendarMonthYear = document.getElementById('calendar-month-year');

        // Initial måned
        const currentDate = new Date();

        function generateCalendar(year, month) {
            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0);

            // Opdater kalendermånedsåret
            calendarMonthYear.textContent = `${firstDay.toLocaleString('default', { month: 'long' })} ${year}`;

            // Fjern tidligere datoer
            calendarDates.innerHTML = '';

            // Opret celler til datoer
            for (let i = 1; i <= lastDay.getDate(); i++) {
                const dateCell = document.createElement('div');
                dateCell.classList.add('calendar-date');
                dateCell.textContent = i;
                calendarDates.appendChild(dateCell);
            }
        }

        // Initial kalendergenerering
        generateCalendar(currentDate.getFullYear(), currentDate.getMonth());

        // Klik på "Næste" knap
        nextMonthButton.addEventListener('click', function () {
            currentDate.setMonth(currentDate.getMonth() + 1);
            generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
        });

        // Klik på "Forrige" knap
        prevMonthButton.addEventListener('click', function () {
            currentDate.setMonth(currentDate.getMonth() - 1);
            generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
        });
        
   // Funktion til at håndtere valgt dato og hente priser fra API
function handleSelectedDate(selectedDate) {
    // Gør noget med den valgte dato, f.eks. hent priser fra API
    console.log(`Valgt dato: ${selectedDate}`);
}