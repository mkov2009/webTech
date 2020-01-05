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


    let request = new XMLHttpRequest();
    request.open("GET", "meniny.xml", false);
    request.send();
    let xml = request.responseXML;
    let entryDate = xml.getElementsByTagName("den");
    let entryName = xml.getElementsByTagName("SKd");
    let firstNameIndex;

    for (let i = 0; i < entryDate.length; i++) {
        let mystring = entryDate[i].childNodes[0].nodeValue;
        if ((month + 1) == mystring.substring(0, 2)) {
            firstNameIndex = i;
            break;
        }
    }

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
                let cellText;

                cellText = document.createTextNode(date + "\n" + entryName[firstNameIndex].childNodes[0].nodeValue);

                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.style.backgroundColor = "rgba(174, 246, 152, 0.52)";
                }
                if (date == inDay) {
                    cell.style.backgroundColor = "rgba(152, 224, 246, 0.52)";
                }
                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
                firstNameIndex++;

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
    let inputDate = document.getElementById("userDate").value;
    inputDate = inputDate.split('.'), inDay = inputDate[0], currentMonth = inputDate[1] - 1;

    showCalendar(inDay, currentMonth, currentYear);
}

/* https://www.pcforum.sk/odstranenie-diakritiky-vt25925.html?fbclid=IwAR0nAfNg7USfmqNnJE73JrW0elnfErcIfTQIrAUx6Je5Jc0purGCVL0P8xk */

var dia = "áäčďéíľĺňóôŕšťúýÁČĎÉÍĽĹŇÓŠŤÚÝŽ";
var nodia = "aacdeillnoorstuyACDEILLNOSTUYZ";

function diaConvert(text) {
    var convertText = "";
    for (i = 0; i < text.length; i++) {
        if (dia.indexOf(text.charAt(i)) != -1) {
            convertText += nodia.charAt(dia.indexOf(text.charAt(i)));
        } else {
            convertText += text.charAt(i);
        }
    }
    return convertText;
}
/* ------------------------------------------------------------------------------------------------------------------------------ */
function findName() {
    let inputName = document.getElementById("userName").value;
    inputName = inputName.toLowerCase(inputName);
    inputName = diaConvert(inputName);

    let request = new XMLHttpRequest();
    request.open("GET", "meniny.xml", false);
    request.send();
    let xml = request.responseXML;
    let entryDate = xml.getElementsByTagName("den");
    let entryName = xml.getElementsByTagName("SKd");

    for (let i = 0; i < entryName.length; i++) {
        let names = entryName[i].childNodes[0].nodeValue;
        names = names.toLocaleLowerCase();
        names = diaConvert(names);
        if (names.includes(inputName)) {
            currentMonth = entryDate[i].childNodes[0].nodeValue.substring(0, 2) - 1;
            inDay = entryDate[i].childNodes[0].nodeValue.substring(4, 2);

            showCalendar(inDay, currentMonth, currentYear);
        }
    }
}