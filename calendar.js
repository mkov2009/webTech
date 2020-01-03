$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
});

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Maj",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Okt",
    "Nov",
    "Dec"
];

let monthAndYear = document.getElementById("monthAndYear");



function startup() {

    showCalendar(0, currentMonth, currentYear);
}

function showCalendar(inDay, month, year) {
    let firstDay = (new Date(year, month)).getDay();
    if (firstDay === 0) { firstDay = 6 } else { firstDay = firstDay - 1; }

    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    let tbl = document.getElementById("calendar-body");

    tbl.innerHTML = "";

    monthAndYear.innerHTML = months[month] + " " + year;

    let date = 1;

    for (let i = 0; i < 6; i++) {
        let row = document.createElement('tr');

        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement('td');
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            } else if (date > daysInMonth) {
                break;
            } else {
                let cell = document.createElement("td");
                let cellText = document.createTextNode(date);
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.style.backgroundColor = "#17f5c8";
                }
                if (date == inDay) {
                    cell.style.backgroundColor = "#b3d9ff";
                }
                cell.appendChild(cellText);
                row.appendChild(cell);
                date++
            }

        }

        tbl.appendChild(row);
    }
}

function prev() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    showCalendar(0, currentMonth, currentYear);
}

function next() {
    currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(0, currentMonth, currentYear);
}

function findDate() {
    let inputDate = document.getElementById("usrDate").value;
    inputDate = inputDate.split('.'), inDay = inputDate[0], currentMonth = inputDate[1] - 1;

    showCalendar(inDay, currentMonth, currentYear);
}

function findName() {

}