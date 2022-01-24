window.onload = function () {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  const MAX_GRID_SIZE = 20;
  let rows = 0;
  let columns = 0;

  const isLandscape = viewportWidth > viewportHeight ? true : false;

  if (isLandscape) {
    columns = MAX_GRID_SIZE;
    const squareHeight = viewportWidth / columns;
    rows = Math.floor(viewportHeight / squareHeight);
  } else {
    rows = MAX_GRID_SIZE;
    const squareWidth = viewportHeight / rows;
    columns = Math.floor(viewportWidth / squareWidth);
  }

  const totalElements = rows * columns;
  const gridEl = document.querySelector(".grid");
  const gridFragment = document.createDocumentFragment();

  for (let i = 0; i < totalElements; i++) {
    const squareEl = document.createElement("div");
    squareEl.classList.add("square");

    if (isLandscape) {
      squareEl.classList.add("landscape");
    } else {
      squareEl.classList.add("portrait");
    }

    gridFragment.appendChild(squareEl);
  }

  gridEl.appendChild(gridFragment);

  const staggeringGrid = {
    targets: ".grid .square",
    scale: [
      { value: 0.1, duration: 0 },
      { value: 0, easing: "easeOutBounce", duration: 500 },
      { value: 0.4, easing: "easeInOutQuad", duration: 250 },
      { value: 0, easing: "easeOutSine", duration: 250 },
    ],
    delay: anime.stagger(150, {
      grid: [columns, rows],
      from: "center",
      direction: "reverse",
    }),
  };

  const lineDrawLogo = {
    targets: ".outline-logo path",
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: "easeInOutSine",
    duration: 1500,
    delay: function (el, i) {
      return i * 250;
    },
    direction: "alternate",
  };

  const fadeInLogo = {
    targets: ".filled-logo path",
    opacity: [0, 1],
    easing: "easeOutSine",
    duration: 500,
  };

  const moveLogo = {
    targets: [".outline-logo", ".filled-logo"],
    translateY: {value: -48, duration: 500},
    easing: "easeOutSine",
  };

  const fadeInLinkedinIcon = {
    targets: ".linkedin-icon",
    translateX: { value: -48, duration: 0 },
    translateY: 48,
    opacity: [0, 1],
    easing: "easeOutSine",
    duration: 500,
  };

  const fadeInGithubIcon = {
    targets: ".github-icon",
    translateX: { value: 48, duration: 0 },
    translateY: 48,
    opacity: [0, 1],
    easing: "easeOutSine",
    duration: 500,
  };

  const tl = anime.timeline();

  tl.add(staggeringGrid)
    .add(lineDrawLogo)
    .add(fadeInLogo, "-=500")
    .add(moveLogo)
    .add(fadeInLinkedinIcon, "-=500")
    .add(fadeInGithubIcon, "-=500");
};
