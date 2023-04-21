const cursorInner = document.getElementById("circle-cursor--inner");
const cursorOuter = document.getElementById("circle-cursor--outer");
const hover = document.getElementById("hover");
const scrollText = document.querySelectorAll(".scroll-text");
const nameHero = document.getElementById("home");
const work = document.getElementById("work");
const asthetic = document.getElementById("asthetic");
const contact = document.getElementById("contact");

const scrollTextAnimate = () => {
  let posX = 0;
  window.setInterval(() => {
    if (posX <= -100) {
      posX = 0;
    }
    posX -= 0.3;
    scrollText.forEach((element) => {
      element.style.transform = `translateX(${posX}%)`;
    });
  }, 1);
};

const locator = (e, element) => {
  let offSets = element.getBoundingClientRect();
  let topElem = offSets.top,
    bottomElem = offSets.bottom,
    leftElem = offSets.left,
    rightElem = offSets.right;

  if (
    e.clientX >= leftElem &&
    e.clientX <= rightElem &&
    e.clientY >= topElem &&
    e.clientY <= bottomElem
  ) {
    return true;
  } else {
    return false;
  }
};

const opacitor = (element, bool) => {
  const content = element.querySelector(".content");
  const animated = element.querySelector(".animated");

  if (bool) {
    content.style.opacity = "0";
    animated.style.opacity = "1";
  } else {
    content.style.opacity = null;
    animated.style.opacity = null;
    cursorInner.style.width = null;
    cursorInner.style.height = null;
  }
};
window.onmousemove = (e) => {
  console.log(locator(e, work));
  let cursorX = e.clientX,
    cursorY = e.clientY;

  if (locator(e, nameHero)) {
    cursorInner.style.width = "200px";
    cursorInner.style.height = "200px";
  } else {
    if (locator(e, work)) {
      opacitor(work, true);
    } else {
      opacitor(work, false);
    }

    if (locator(e, asthetic)) {
      opacitor(asthetic, true);
    } else {
      opacitor(asthetic, false);
    }
    if (locator(e, contact)) {
      opacitor(contact, true);
    } else {
      opacitor(contact, false);
    }
  }

  if (cursorY + window.scrollY < 60) {
    cursorInner.classList.add("cursor-link-hover");
  } else {
    cursorInner.classList.remove("cursor-link-hover");
  }

  cursorOuter.style.animationTimingFunction = "cubic-bezier(0, .9, .1, 1)";
  cursorInner.style.animationTimingFunction = "cubic-bezier(0, .9, .1, 1)";
  cursorOuter.animate(
    {
      transform: `translate(${cursorX - 16}px,${cursorY - 16}px)`,
    },
    {
      duration: 1000,
      fill: "forwards",
    }
  );
  cursorInner.animate(
    {
      transform: `translate(${cursorX - cursorInner.offsetWidth / 2}px,${
        cursorY - cursorInner.offsetHeight / 2
      }px)`,
    },
    {
      duration: 500,
      fill: "forwards",
    }
  );
};
