window.onload = function () {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  const MAX_GRID_SIZE = 20;
  let rows = 0;
  let columns = 0;

  if (viewportWidth > viewportHeight) {
    columns = MAX_GRID_SIZE;
    const squareHeight = viewportWidth / columns;
    rows = Math.ceil(viewportHeight / squareHeight);
  }
  else {
    rows = MAX_GRID_SIZE;
    const squareWidth = viewportHeight / rows;
    columns = Math.ceil(viewportWidth / squareWidth);
  }

  const totalElements = rows * columns;
  const gridEl = document.querySelector('.grid');
  const gridFragment = document.createDocumentFragment();

  for (let i = 0; i < totalElements; i++) {
    const squareEl = document.createElement('div');
    squareEl.classList.add('square');
    gridFragment.appendChild(squareEl);
  }

  gridEl.appendChild(gridFragment);

  const animeGrid = {
    targets: '.grid .square',
    scale: [
      { value: 0.1, duration: 0 },
      { value: 0, easing: 'easeOutBounce', duration: 500 },
      { value: 0.4, easing: 'easeInOutQuad', duration: 250 },
      { value: 0, easing: 'easeOutSine', duration: 250 },
    ],
    delay: anime.stagger(200, { grid: [columns, rows], from: 'center', direction: 'reverse' })
  };

  const animeOutlineLogo = {
    targets: '.outline-logo path',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: 3000,
    delay: function (el, i) { return i * 250 },
    direction: 'alternate',
  };

  const animeFilledLogo = {
    targets: '.filled-logo path',
    opacity: [0, 1],
    easing: 'easeOutSine',
    duration: 1000
  };

  const tl = anime.timeline();

  tl
    .add(animeGrid)
    .add(animeOutlineLogo)
    .add(animeFilledLogo, '-=2000');
}