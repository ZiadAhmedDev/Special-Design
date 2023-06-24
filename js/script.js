// check local storage
let localStorageColor = window.localStorage.getItem("--main-color");
let localStorageBg = window.localStorage.getItem("bg-opt");
let backgroundChange = true;
let colorLi = document.querySelectorAll(".settings .color ul li");
let changeBg = document.querySelectorAll(".settings .random-background span");
let localStorageNavBullet = window.localStorage.getItem("showNav");
let navOpt = document.querySelectorAll(
  ".settings-container .bullet-toggle span"
);
let navParent = document.querySelector(".nav-bullets");

if (localStorageColor !== null) {
  document.documentElement.style.setProperty("--main-color", localStorageColor);
  colorLi.forEach((li) => {
    li.classList.remove("active");
    if (li.dataset.color === localStorageColor) {
      li.classList.add("active");
    }
  });
}
if (localStorageBg !== null) {
  if (localStorage.getItem("bg-opt") === "true") backgroundChange = true;
  else backgroundChange = false;

  changeBg.forEach((span) => {
    span.classList.remove("active");
  });
  if (localStorageBg === "true") changeBg[0].classList.add("active");
  else changeBg[1].classList.add("active");
}

if (localStorageNavBullet !== null) {
  if (localStorageNavBullet === "yes") {
    navParent.style.display = "block";
    navOpt.forEach((span) => {
      span.classList.remove("active");
    });
    document.querySelector('[data-Bullet="yes"]').classList.add("active");
  } else {
    navParent.style.display = "none";
    navOpt.forEach((span) => {
      span.classList.remove("active");
    });
    document.querySelector('[data-Bullet="no"]').classList.add("active");
  }
}

// Handle Active class
function activateChildElement(childElements) {
  childElements.forEach((child) => {
    child.addEventListener("click", (e) => {
      childElements.forEach((span) => {
        span.classList.remove("active");
      });
      e.target.classList.add("active");
    });
  });
}

let landingPage = document.querySelector(".Landing-page");

// Images list
let images = [
  "../imgs/01.jpg",
  "../imgs/02.jpg",
  "../imgs/03.jpg",
  "../imgs/04.jpg",
  "../imgs/05.jpg",
  "../imgs/06.png",
  "../imgs/07.jpg",
  "../imgs/08.jpg",
  "../imgs/09.jpg",
  "../imgs/10.jpg",
];

// Change image

let backgroundInterval;
function ChangeBackground() {
  if (backgroundChange === true) {
    backgroundInterval = setInterval(() => {
      let randomImage = images[Math.floor(Math.random() * images.length)];
      landingPage.style.backgroundImage = `url("${randomImage}")`;
    }, 1000);
  }
}
ChangeBackground();
// Settings

// show Settings
let settings = document.querySelector(".settings");
let settingToggle = document.querySelector(".setting-toggle");

settingToggle.addEventListener("click", () => {
  settings.classList.toggle("active");
});

// Change color
colorLi.forEach((li) => {
  activateChildElement(colorLi);
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    window.localStorage.setItem("--main-color", e.target.dataset.color);
  });
});

// change bg-options

changeBg.forEach((bg) => {
  activateChildElement(changeBg);
  bg.addEventListener("click", (e) => {
    if (e.target.dataset.background === "yes") {
      backgroundChange = true;
      ChangeBackground();
      localStorage.setItem("bg-opt", true);
    } else {
      backgroundChange = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("bg-opt", false);
    }
  });
});

// animation progress
window.onscroll = () => {
  let ourSkills = document.querySelector(".our-skills");
  let skillsOffset = ourSkills.offsetTop;
  let windowScroll = this.scrollY;
  if (windowScroll > skillsOffset - 700) {
    document.querySelectorAll(".our-skills .skill span").forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// Images pop-ups

let imgs = document.querySelectorAll(".our-gallery .img-boxes img");

imgs.forEach((img) => {
  img.addEventListener("click", (e) => {
    // create overlay
    let overlay = document.createElement("div");
    overlay.classList.add("overlay");
    document.body.appendChild(overlay);

    let boxImage = document.createElement("div");
    boxImage.className = "popUp-box";

    // add alt
    if (e.target.alt !== null) {
      let altText = document.createElement("p");
      altText.innerHTML = e.target.alt;
      boxImage.appendChild(altText);
    }

    // create image
    let img = document.createElement("img");
    img.src = e.target.src;
    boxImage.appendChild(img);
    document.body.appendChild(boxImage);

    // close
    let close = document.createElement("div");
    close.className = "close";
    close.innerHTML = "&times;";
    boxImage.appendChild(close);
  });
});

document.addEventListener("click", (e) => {
  if (e.target.className === "overlay" || e.target.className === "close") {
    document.querySelector(".overlay").remove();
    document.querySelector(".popUp-box").remove();
  }
});

// bullet nav

let navBullets = document.querySelectorAll(".nav-bullets .bullet");
let navLinks = document.querySelectorAll(".Landing-page .header ul li");

// link nav
function nav(ele) {
  ele.forEach((e) => {
    e.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

nav(navBullets);
nav(navLinks);

// toggle bullets nav

navOpt.forEach((span) => {
  activateChildElement(navOpt);

  span.addEventListener("click", (e) => {
    if (e.target.dataset.bullet === "yes") {
      navParent.style.display = "block";
      localStorage.setItem("showNav", "yes");
    } else {
      navParent.style.display = "none";
      localStorage.setItem("showNav", "no");
    }
  });
});

// Reset the options

document.querySelector(".resetBtn").onclick = () => {
  localStorage.clear();
  window.location.reload();
};
