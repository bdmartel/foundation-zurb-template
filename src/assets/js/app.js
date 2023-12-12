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
// require("@fortawesome/fontawesome-free/js/fontawesome");
// require("@fortawesome/fontawesome-free/js/brands");

// FONTSOURCE - integrated google fonts
// import "@fontsource/roboto/300.css"; // Weight 300.
// import "@fontsource/roboto/400.css"; // Weight 400.
// import "@fontsource/roboto/700.css"; // Weight 700.

// Change Orbit behavior defaults
Foundation.Orbit.defaults.animInFromRight = "fade-in";
Foundation.Orbit.defaults.animOutToRight = "fade-out";
Foundation.Orbit.defaults.animInFromLeft = "fade-in";
Foundation.Magellan.defaults.offset = "60";


// Run through foundation componants
$(document).foundation();

import "/src/assets/js/building-blocks/tumblr.js";

// CUSTOM JS // GLOBALS

// Set the value of "mobileSize" to either true or false depending on the screen width
const mobileSize = window.innerWidth <= 600;  
const desktopSize = window.innerWidth > 600;

// CUSTOM JS // FUNCTIONS
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
// Function to set the height of the ".flexbox-slide" and ".orbit-container" elements
function setHeight() {
  // Select all elements with class ".flexbox-slide" and ".orbit-container"
  const orbitContainer = document.querySelectorAll(".orbit-container");
  let orbitContainerHeight = (window.innerHeight / 100) * 65;

  // Check if the screen width is 600px or below (i.e. "mobileSize" is true)
  if (mobileSize) {
  } else {
    // If the screen width is above 600px, set the height to the maximum of 600px and the computed value
    // orbitContainerHeight = Math.min(orbitContainerHeight, 600);
  }

  // Set the height of each selected element to the computed value
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

// function fixeddesktopNav () {
//   var scrollPos = $(window).scrollTop();
//   var slideshowPos = $('#rts-slideshow').offset().top;
//   if (scrollPos > slideshowPos) {
//     $('#offCanvas').foundation('open', null, null);
//   } else {
//     $('#offCanvas').foundation('close', null, null);
//   }
// }
function setSpacerHeight() {
  var nav = document.getElementById("desk-nav");
  console.log("'desk-nav' identified as a variable: 'nav");

  if (!nav) {
    console.error("Unable to find element with ID 'desk-nav'");
    return;
  }
  var navHeight = window.getComputedStyle(nav).height;
  var spacer = document.getElementById("header-spacer");
  console.log("'header-spacer' identified as a variable: 'nav");

  if (!spacer) {
    console.error("Unable to find element with ID 'header-spacer'");
    return;
  }
  spacer.style.height = navHeight;
}


    


// // LOADER THAT WORKS
// // Get all the slides in the Orbit slideshow
// var slides = document.querySelectorAll('.orbit-image');

// // Create an array to store the Image objects
// var images = [];

// // Keep track of the number of images that have finished loading
// var imagesLoaded = 0;
// // Get all the slides in the Orbit slideshow
// var slides = document.querySelectorAll('.orbit-image');

// // Create an array to store the Image objects
// var images = [];

// // Keep track of the number of images that have finished loading
// var imagesLoaded = 0;

// // Loop through the slides
// for (var i = 0; i < slides.length; i++) {
//   // Create a new Image object for each slide
//   images[i] = new Image();

//   // Get the src attribute of the current slide
//   var src = slides[i].getAttribute("src");

//   // Set the src property of the Image object to the src attribute of the slide
//   images[i].src = src;

//   // Listen to the onload event of the Image object
//   images[i].onload = function() {
//     // Increment the imagesLoaded counter when an image has finished loading
//     imagesLoaded++;

//     // Check if all the images have finished loading
//     if (imagesLoaded === slides.length) {
//       // Get the #loader div
//       var loader = document.getElementById("loader");

//       // Set the display property of the #loader div to none
//       loader.style.display = "none";
//     }
//   };
// }



window.addEventListener("load", () => {

  setHeight();
  if (mobileSize) {
    hideSlideMobile();
    separateSlidesMobile();
  } else {
    // setSpacerHeight();
  }
  // initializeOrbit();
  
  // hideLoader()
});

// $(window).scroll(function() {
//   fixeddesktopNav ();
// });








