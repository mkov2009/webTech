var numberOfVehiclesMemory = 0;
var numberOfVehicles = 0;
var numberOfCorrectOrders = 0;
var order = [];
var correctOrder = [
    []
];
var count = 0;
var vehicleAnimation = [];
var p = 0;
//načítanie náhľadov križovatiek z JSON
function loadPreviews() {
    $.getJSON("crossroads_data.json", function(json) {
        console.log(json);

        for (var k = 0; k < json.crossroads.length; k++) {
            var previewElement = document.getElementById('crossroadPreview');
            var preview = document.createElement('img');
            preview.id = 'preview';
            preview.src = json.crossroads[k].srcSmall;
            preview.setAttribute('onclick', `openModal(); currentSlide(${k+1})`);
            previewElement.appendChild(preview);
        }
    });
}
//odstránenie dát z križovatiek 
function removedata() {

    var pathElement = document.getElementById('svg');
    while (pathElement.firstChild) {
        pathElement.removeChild(pathElement.firstChild);
    }
    var vehicleElement = document.getElementById('vehicles');
    while (vehicleElement.firstChild) {
        vehicleElement.removeChild(vehicleElement.firstChild);
    }

    document.getElementById('explanation').innerText = "";

}

//načítavanie konkrétnej križovatky z JSON
function loaddata(k) {

    $.getJSON("crossroads_data.json", function(json) {
        console.log(json);
        numberOfVehiclesMemory += numberOfVehicles;
        numberOfVehicles = json.crossroads[k].vehicles.length;
        correctOrder = json.crossroads[k].correctOrder;
        numberOfCorrectOrders = json.crossroads[k].correctOrder.length;
        //loading path
        var pathElement = document.getElementById('svg');
        for (var i = 0; i < numberOfVehicles; i++) {
            var newContent = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            newContent.id = json.crossroads[k].vehicles[i].pathId;
            newContent.setAttribute('d', json.crossroads[k].vehicles[i].path);
            newContent.className = 'paths';
            pathElement.appendChild(newContent);
        }
        //loading vehicles
        var vehicleElement = document.getElementById('vehicles');
        for (var i = 0; i < numberOfVehicles; i++) {
            var newContent = document.createElement('img');
            newContent.className = 'car ';
            newContent.id = json.crossroads[k].vehicles[i].id;
            newContent.src = json.crossroads[k].vehicles[i].src;
            vehicleElement.appendChild(newContent);
        }
        // loading crossroad
        var crossroadElement = document.getElementById('cross');
        var newCrossroad = document.createElement('img');
        newCrossroad.className = 'crossroad';
        newCrossroad.src = json.crossroads[k].src;
        crossroadElement.appendChild(newCrossroad);

        var explanationElement = document.getElementById('explanation');
        var newHeadline = document.createElement('h3');
        newHeadline.innerText = "";
        newHeadline.id = 'expHeadline';
        explanationElement.appendChild(newHeadline);
        var newExpl = document.createElement('p');
        newExpl.innerText = json.crossroads[k].explanation;
        explanationElement.appendChild(newExpl);

        init();
    });
}
//inicializačná funkcia na pridanie animácie na objekty
function init() {

    var paths = document.querySelectorAll("path");
    var cars = document.querySelectorAll(".car ");

    for (var i = 0; i < numberOfVehicles; i++) {
        var path = anime.path(paths[i]);
        vehicleAnimation[i] = anime({
            targets: cars[i],
            translateX: path('x'),
            translateY: path('y'),
            rotate: path('angle'),
            easing: 'linear',
            autoplay: false,
            duration: 1500,
            begin: function(anim) {
                if (anim.began) {
                    runned(this.id);
                }
            }

        })
        cars[i].onclick = vehicleAnimation[i].play;
    }

}

//funkcia, ktorá pridá do zoznamu ID vozidla, na ktoré bolo kliknuté
function runned(car) {
    count++;
    order.push(car);
}

//funkcia na kontrolu správnosti
function check() {
    if (count == numberOfVehicles) {
        if (!compare()) {
            explHeadline(false);
        } else {
            explHeadline(true);
        }
        document.getElementById('explanation').style.color = 'white';
    }
}

//zobrazenie Správne, Nesprávne po kontrole
function explHeadline(bool) {
    var headline = document.getElementById('expHeadline');
    if (bool) {
        headline.style.color = 'green';
        headline.innerText = 'Správne';
    } else {
        headline.style.color = 'red';
        headline.innerText = 'Nesprávne';
    }
}


//Demo správneho prejdenia križovatky
function demo() {
    setTimeout(function() {
        vehicleAnimation[correctOrder[0][p]].play();
        p++;
        if (p < numberOfVehicles) {
            demo();
        } else {
            document.getElementById('explanation').style.color = 'white';
        }
    }, 1000)
}


//porovnanie zoznamu spustených áut so správnym poradím
function compare() {
    var tmp = 0;
    for (var j = 0; j < numberOfCorrectOrders; j++) {
        for (var i = 0; i < numberOfVehicles; i++) {
            if ((order[i] - numberOfVehiclesMemory) == correctOrder[j][i]) {
                tmp++;
            }
        }
        if (tmp == numberOfVehicles) {
            return true;
        }
        tmp = 0;
    }

    return false;
}

//resetovacia funckia križovatky
function reset() {
    p = 0;
    for (var i = 0; i < numberOfVehicles; i++) {
        vehicleAnimation[i].restart();
        vehicleAnimation[i].pause();
    }
    order = [];
    count = 0;
    document.getElementById('explanation').style.color = 'black';
    document.getElementById('expHeadline').style.color = 'black';
}

//otvorenie križovatky
function openModal() {
    document.getElementById("myModal").style.display = "block";
}
//zatvorenie križovatky
function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

function currentSlide(n) {
    removedata();
    loaddata(n - 1);
    reset();
}