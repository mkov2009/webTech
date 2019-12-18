/*var startX = window.innerWidth / 2 - 320 - 50;
document.getElementById('blue ').style.left = startX + 'px';*/

var path = anime.path('path');

var blueCar = anime({
    targets: 'img.car ',
    translateX: path('x'),
    translateY: path('y'),
    rotate: path('angle'),
    easing: 'linear',
    autoplay: false,
    duration: 1500,
});

document.querySelector('.car').onclick = blueCar.play;

var currentImage = 0;
var images = [
    'http://147.175.121.202/~xkovalak/Egzamin/sprites/Cars/bluecar.png',
    'http://147.175.121.202/~xkovalak/Egzamin/sprites/Cars/bluecar-right.png'
];
var imageElement = document.getElementById('blue ');

function nextImage() {
    currentImage = (currentImage + 1) % images.length;
    imageElement.src = images[currentImage];
}

var timeoutId = setTimeout(nextImage, 500);