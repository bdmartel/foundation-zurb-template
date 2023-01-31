import $ from "jquery";
import "what-input";

// Foundation JS relies on a global variable. In ES6, all imports are hoisted
// to the top of the file so if we used `import` to import Foundation,
// it would execute earlier than we have assigned the global variable.
// This is why we have to use CommonJS require() here since it doesn't
// have the hoisting behavior.
window.jQuery = $;
require("foundation-sites");

// FONTAWESOME - social icons
require("@fortawesome/fontawesome-free/js/fontawesome");
require("@fortawesome/fontawesome-free/js/brands");

// FONTSOURCE - integrated google fonts
import "@fontsource/roboto/300.css"; // Weight 300.
import "@fontsource/roboto/400.css"; // Weight 400.
import "@fontsource/roboto/700.css"; // Weight 700.

// Change Orbit behavior defaults
Foundation.Orbit.defaults.animInFromRight = "fade-in";
Foundation.Orbit.defaults.animOutToRight = "fade-out";
Foundation.Orbit.defaults.animInFromLeft = "fade-in";
Foundation.Orbit.defaults.animOutToLeft = "fade-out";

// Run through foundation componants
$(document).foundation();

// Custom functions
const separateSlidesMobile = () => {
  // Select all elements with class "separate-slides"
  const separateSlides = document.querySelectorAll(".separate-slides");

  // Loop through each element and modify its classes and content
  separateSlides.forEach((slide) => {
    // Select the element with class "text" within the current slide
    const text = slide.querySelector(".text");
    // Select the element with class "orbit-image" within the current slide
    const img = slide.querySelector(".orbit-image");
    // Add the "separate-slides" class to the current slide
    slide.classList.add("separate-slides");

    // Create a new list item element with class "orbit-slide"
    const newSlide = document.createElement("li");
    newSlide.classList.add("orbit-slide");
    newSlide.classList.add("separate-slides");

    // Create a new div element with class "flexbox-slide"
    const newFlexbox = document.createElement("div");
    newFlexbox.classList.add("flexbox-slide");

    // Add the "flexbox-slide" div as a child of the new list item
    newSlide.appendChild(newFlexbox);

    // Add the text as a child of the "flexbox-slide" div
    newFlexbox.appendChild(text);

    // Insert the new list item before the next sibling of the current slide
    slide.parentElement.insertBefore(newSlide, slide.nextSibling);
  });
};

function setHeight() {
  const orbitContainer = document.querySelectorAll(
    ".flexbox-slide, .orbit-container"
  );
  let orbitContainerHeight = (window.innerHeight / 5) * 3;
  orbitContainerHeight =
    orbitContainerHeight > 600 ? 600 : orbitContainerHeight;
  orbitContainer.forEach((element) => {
    element.style.height = `${orbitContainerHeight}px`;
  });
}
function StickyMobile() {
  $(document.body).css("margin-top", $("header.sticky").height());
}
function hideSlideMobile() {
  const hideMobile = document.querySelectorAll(".hide-mobile");
  for (let i = 0; i < hideMobile.length; i++) {
    hideMobile[i].parentNode.removeChild(hideMobile[i]);
  }
}
function initializeOrbit() {
  var element = $("#rts-slideshow");
  var options = {};
  var orbit = new Foundation.Orbit(element, options);
}
function scrollToRts() {
  const header = document.querySelector("header");
  const nav = document.querySelector("nav");
  const logo = document.querySelector("nav #svg-contents");

  const elementTop = header.offsetTop;
  const elementHeight = header.offsetHeight;
  const scrollTop = window.pageYOffset;

  if (elementTop + elementHeight < scrollTop) {
    nav.classList.remove("hidden");
    logo.classList.remove("animate-out");
    logo.classList.add("animate-in");
  } else {
    logo.classList.remove("animate-in");
    logo.classList.add("animate-out");
    nav.classList.add("hidden");
  }
}
window.addEventListener("load", () => {
  setHeight();
  if (window.innerWidth < 600) {
    hideSlideMobile();
    separateSlidesMobile();
  }
    initializeOrbit();
});
window.addEventListener("resize", () => {
  setHeight();
  stickyMobile();
});
window.addEventListener("scroll", () => {
  scrollToRts();
});
