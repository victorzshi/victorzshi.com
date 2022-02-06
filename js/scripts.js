window.onload = function () {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  const MAX_GRID_SIZE = 20;
  let orientation = '';
  let rows = 0;
  let columns = 0;

  if (viewportWidth > viewportHeight) {
    orientation = "landscape";
    columns = MAX_GRID_SIZE;
    const squareHeight = viewportWidth / columns;
    rows = Math.floor(viewportHeight / squareHeight);
  } else {
    orientation = "portrait";
    rows = MAX_GRID_SIZE;
    const squareWidth = viewportHeight / rows;
    columns = Math.floor(viewportWidth / squareWidth);
  }

  const totalElements = rows * columns;
  const gridEl = document.querySelector(".grid");
  const gridFragment = document.createDocumentFragment();

  for (let i = 0; i < totalElements; i++) {
    const squareEl = document.createElement("div");
    squareEl.classList.add("square", orientation);
    gridFragment.appendChild(squareEl);
  }

  gridEl.appendChild(gridFragment);

  const staggeringGrid = {
    targets: ".grid .square",
    scale: [
      { value: 0, duration: 0 },
      { value: 0.1, duration: 250 },
      { value: 0, easing: "easeOutBounce", duration: 250 },
      { value: 0.4, easing: "easeInOutQuad", duration: 250 },
      { value: 0, easing: "easeOutSine", duration: 250 },
    ],
    delay: anime.stagger(150, {
      grid: [columns, rows],
      from: "center",
      direction: "reverse",
    }),
  };

  const fadeInOutlineLogo = {
    targets: ".outline",
    opacity: 1,
    duration: 0,
  };

  const lineDrawOutlineLogo = {
    targets: ".outline path",
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: "easeInOutSine",
    duration: 1500,
    delay: function (el, i) {
      return i * 250;
    },
    direction: "alternate",
  };

  const fadeInFilledLogo = {
    targets: ".filled",
    opacity: 1,
    easing: "easeInOutSine",
    duration: 500,
  };

  const moveLogo = {
    targets: ".logo",
    translateY: -100,
    easing: "easeOutSine",
    duration: 500,
  };

  const fadeInLinkedin = {
    targets: ".linkedin",
    translateX: -100,
    scale: 2,
    opacity: 1,
    easing: "easeOutSine",
    duration: 500,
  };

  const fadeInGithub = {
    targets: ".github",
    scale: 2,
    opacity: 1,
    easing: "easeOutSine",
    duration: 500,
  };

  const fadeInTwitter = {
    targets: ".twitter",
    translateX: 100,
    scale: 2,
    opacity: 1,
    easing: "easeOutSine",
    duration: 500,
  };

  const fadeInAbout = {
    targets: ".about",
    translateY: 100,
    scale: 1.5,
    opacity: 1,
    easing: "easeOutSine",
    duration: 500,
  };

  const tl = anime.timeline();

  tl.add(staggeringGrid)
    .add(fadeInOutlineLogo)
    .add(lineDrawOutlineLogo)
    .add(fadeInFilledLogo, "-=1000")
    .add(moveLogo, "-=500")
    .add(fadeInLinkedin, "-=500")
    .add(fadeInGithub, "-=500")
    .add(fadeInTwitter, "-=500")
    .add(fadeInAbout, "-=500");

  // Source code: https://www.w3resource.com/javascript-exercises/fundamental/javascript-fundamental-exercise-11.php
  const randomColor = () => {
    let n = (Math.random() * 0xfffff * 1000000).toString(16);
    return "#" + n.slice(0, 6);
  };

  function wave(color) {
    return anime({
      targets: ".grid .square",
      scale: [
        { value: 0, duration: 0 },
        { value: 0.3, easing: "easeOutBounce", duration: 250 },
        { value: 0.6, easing: "easeInOutQuad", duration: 250 },
        { value: 0, easing: "easeOutSine", duration: 250 },
      ],
      backgroundColor: color,
      delay: anime.stagger(150, {
        grid: [columns, rows],
        from: "center",
      }),
      autoplay: false,
    });
  }

  document.querySelector("#space-invader").onclick = wave(randomColor).play;
};
