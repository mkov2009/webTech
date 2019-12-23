/*var startX = window.innerWidth / 2 - 320 - 50;
document.getElementById('blue ').style.left = startX + 'px';*/

var order = [];
var correctOrder = ["blue", "green", "red"];
var numberOfVehicles = 3;
var count = 0;

var pathBlue = anime.path(document.getElementById('bluepath'));
var pathRed = anime.path(document.getElementById('redpath'));
var pathGreen = anime.path(document.getElementById('greenpath'));

var blueCar = anime({
    targets: document.getElementById('blue '),
    translateX: pathBlue('x'),
    translateY: pathBlue('y'),
    rotate: pathBlue('angle'),
    easing: 'linear',
    autoplay: false,
    duration: 1500,
    begin: function(anim) {
        if (anim.began) {
            check("blue");
        }
    }

});

var redCar = anime({
    targets: document.getElementById('red '),
    translateX: pathRed('x'),
    translateY: pathRed('y'),
    rotate: pathRed('angle'),
    easing: 'linear',
    autoplay: false,
    duration: 1500,
    begin: function(anim) {
        if (anim.began) {
            check("red");
        }
    }

})

var greenCar = anime({
    targets: document.getElementById('green '),
    translateX: pathGreen('x'),
    translateY: pathGreen('y'),
    rotate: pathGreen('angle'),
    easing: 'linear',
    autoplay: false,
    duration: 1500,
    begin: function(anim) {
        if (anim.began) {
            check("green");
        }
    }
})

//0 - blue, 1 - green, 2 - red
var cars = document.querySelectorAll(".car ");
cars[0].onclick = blueCar.play;
cars[1].onclick = greenCar.play;
cars[2].onclick = redCar.play;


function check(car) {
    count++;
    order.push(car);
    if (count == numberOfVehicles) {
        if (!compare()) {
            alert("zle");
        }
    }
}

bool

function compare() {
    for (var i = 0; i < numberOfVehicles; i++) {
        if (order[i] != correctOrder[i]) {
            return false;
        }
    }
    return true;
}

function reset() {

    blueCar.restart();
    blueCar.pause();
    greenCar.restart();
    greenCar.pause();
    redCar.restart();
    redCar.pause();
    order = [];
    count = 0;
}