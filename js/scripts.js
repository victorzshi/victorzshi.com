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
    squareEl.classList.add(isLandscape ? "landscape" : "portrait");
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
    targets: ".outline path",
    stroke: "#fff",
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: "easeInOutSine",
    duration: 1500,
    delay: function (el, i) {
      return i * 250;
    },
    direction: "alternate",
  };

  const fadeInLogo = {
    targets: ".filled",
    fill: "#fff",
    opacity: [0, 1],
    easing: "easeOutSine",
    duration: 500,
  };

  const moveLogo = {
    targets: ".logo",
    translateY: -100,
    scale: 0.5,
    easing: "easeOutSine",
    duration: 500,
  };

  const fadeInLinkedin = {
    targets: ".linkedin",
    translateX: -100,
    scale: 1.5,
    color: "#fff",
    opacity: [0, 1],
    easing: "easeOutSine",
    duration: 500,
  };

  const fadeInGithub = {
    targets: ".github",
    scale: 1.5,
    color: "#fff",
    opacity: [0, 1],
    easing: "easeOutSine",
    duration: 500,
  };

  const fadeInEmail = {
    targets: ".email",
    translateX: 100,
    scale: 1.5,
    color: "#fff",
    opacity: [0, 1],
    easing: "easeOutSine",
    duration: 500,
  };

  const fadeInAbout = {
    targets: ".about",
    translateY: 100,
    scale: 1.5,
    color: "#fff",
    opacity: [0, 1],
    easing: "easeOutSine",
    duration: 500,
  };

  const tl = anime.timeline();

  tl.add(staggeringGrid)
    .add(lineDrawLogo)
    .add(fadeInLogo, "-=500")
    .add(moveLogo)
    .add(fadeInLinkedin, "-=500")
    .add(fadeInGithub, "-=500")
    .add(fadeInEmail, "-=500")
    .add(fadeInAbout, "-=500");
};
