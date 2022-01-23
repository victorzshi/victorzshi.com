window.onload = function () {
  var GRID_WIDTH = 20;
  var GRID_HEIGHT = 10;

  var totalElements = GRID_WIDTH * GRID_HEIGHT;

  var gridEl = document.querySelector('.grid');
  var gridFragment = document.createDocumentFragment();

  for (var i = 0; i < totalElements; i++) {
    var squareEl = document.createElement('div');
    squareEl.classList.add('square');
    gridFragment.appendChild(squareEl);
  }

  gridEl.appendChild(gridFragment);

  var animeGrid = {
    targets: '.grid .square',
    scale: [
      { value: 0, easing: 'easeOutSine', duration: 500 },
      { value: 0.5, easing: 'easeInOutQuad', duration: 250 },
      { value: 0, easing: 'easeOutSine', duration: 250 },
    ],
    delay: anime.stagger(200, { grid: [GRID_WIDTH, GRID_HEIGHT], from: 'center', direction: 'reverse' })
  };

  var animeLogo = {
    targets: 'svg path',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: 3000,
    delay: function (el, i) { return i * 250 },
    direction: 'alternate',
    loop: false
  };

  var tl = anime.timeline();

  tl.add(animeGrid).add(animeLogo);
}