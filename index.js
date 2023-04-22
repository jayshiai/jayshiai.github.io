const cursorInner = document.getElementById("circle-cursor--inner");
const cursorOuter = document.getElementById("circle-cursor--outer");
const hover = document.getElementById("hover");
const scrollText = document.querySelectorAll(".scroll-text");
const nameHero = document.getElementById("home");
const work = document.getElementById("work");
const asthetic = document.getElementById("asthetic");
const contact = document.getElementById("contact");
const expertise = document.getElementById("expertise");
const cypherWrapper = document.getElementById("wrapper");
const wrapper = document.getElementById("carasoul-wrapper");
const cat_carasoul = document.getElementById("cat_carasoul");
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

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

const mouse_trail = () =>
  (window.onmousemove = (e) => {
    let cursorX = e.clientX,
      cursorY = e.clientY;

    if (locator(e, cat_carasoul)) {
      cursorInner.style.width = "25px";
      cursorInner.style.height = "25px";
    } else if (locator(e, expertise)) {
      cursorInner.style.width = "200px";
      cursorInner.style.height = "200px";
    } else if (locator(e, nameHero)) {
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
        duration: 2000,
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
        duration: 1000,
        fill: "forwards",
      }
    );
  });

mouse_trail();
let mouseOver = false;
cypherWrapper.onmouseover = async (e) => {
  if (mouseOver) return;

  mouseOver = true;
  console.log("GOT IT");
  const text = e.target.innerText;
  console.log(text);
  let iterations = 0;
  const interval = setInterval(() => {
    e.target.innerText = e.target.innerText
      .split("")
      .map((letter, index) => {
        if (index < iterations) return text[index];
        return letters[Math.floor(Math.random() * 26)];
      })
      .join("");
    if (text.length <= iterations) {
      mouseOver = false;
      clearInterval(interval);
    }
    iterations += 1;
  }, 50);
};

cat_carasoul.onmousedown = (e) => {
  wrapper.dataset.mouseDownAt = e.clientX;

  cat_carasoul.onmousemove = (e) => {
    if (wrapper.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(wrapper.dataset.mouseDownAt) - e.clientX,
      maxDelta = window.innerWidth / 2;
    const unper =
      (mouseDelta / maxDelta) * -100 +
      parseFloat(wrapper.dataset.prevPercentage);

    const per = Math.max(Math.min(unper, 50), -100);
    wrapper.dataset.percentage = per;
    wrapper.animate(
      {
        transform: `translate(${per}%, 50%)`,
      },
      {
        duration: 1200,
        fill: "forwards",
      }
    );

    const imgPer = ((per + 100) / 150) * 100;
    for (const image of wrapper.getElementsByClassName("slide")) {
      image.animate(
        {
          objectPosition: `${Math.max(Math.min(imgPer, 100), 0)}% center`,
        },
        {
          duration: 1200,
          fill: "forwards",
        }
      );
    }
  };
  cat_carasoul.onmouseup = () => {
    wrapper.dataset.mouseDownAt = "0";
    wrapper.dataset.prevPercentage = wrapper.dataset.percentage;
  };
};
