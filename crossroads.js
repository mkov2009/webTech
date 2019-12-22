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