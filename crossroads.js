//
document.getElementById('explanation').style.width = (window.innerWidth / 2) - 330 + 'px';

var numberOfVehiclesMemory = 0;
var numberOfVehicles = 0;
var numberOfCorrectOrders = 0;
var order = [];
var correctOrder = [
    []
];
var count = 0;
var vehicleAnimation = [];

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
        var newExpl = document.createElement('p');
        newExpl.innerText = json.crossroads[k].explanation;
        explanationElement.appendChild(newExpl);

        init();
    });
}

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


function runned(car) {
    count++;
    order.push(car);
}

function check() {
    if (count == numberOfVehicles) {
        if (!compare()) {
            alert("zle");
        } else {
            alert("správne");
        }
        document.getElementById('explanation').style.color = 'white';
    }
}




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

function reset() {
    for (var i = 0; i < numberOfVehicles; i++) {
        vehicleAnimation[i].restart();
        vehicleAnimation[i].pause();
    }
    order = [];
    count = 0;
    document.getElementById('explanation').style.color = 'black';
}


//
// Open the Modal
function openModal() {
    document.getElementById("myModal").style.display = "block";
}

// Close the Modal
function closeModal() {
    document.getElementById("myModal").style.display = "none";
}


// Thumbnail image controls
function currentSlide(n) {
    removedata();
    loaddata(n - 1);
    reset();
}