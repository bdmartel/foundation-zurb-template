import $ from 'jquery';
import 'what-input';

// Foundation JS relies on a global variable. In ES6, all imports are hoisted
// to the top of the file so if we used `import` to import Foundation,
// it would execute earlier than we have assigned the global variable.
// This is why we have to use CommonJS require() here since it doesn't
// have the hoisting behavior.
window.jQuery = $;
require('foundation-sites');

// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
//import './lib/foundation-explicit-pieces';


// // FONTAWESOME - social icons
// require('@fortawesome/fontawesome-free/js/fontawesome');
// require('@fortawesome/fontawesome-free/js/brands');

// // FONTSOURCE - integrated google fonts
// import "@fontsource/roboto/300.css"; // Weight 300.
// import "@fontsource/roboto/400.css"; // Weight 400.
// import "@fontsource/roboto/700.css"; // Weight 700.

// // Foundation.Orbit.defaults.animInFromRight = "fade-in";
// // Foundation.Orbit.defaults.animOutToRight = "fade-out";
// // Foundation.Orbit.defaults.animInFromLeft = "fade-in";
// // Foundation.Orbit.defaults.animOutToLeft = "fade-out";

$(document).foundation();

q
// let orbitContainer = document.querySelectorAll(".flexbox-slide, .orbit-container");
// let orbitContainerHeight;

// // Get the current window height and divide by 4 * 3, set a maximum height of 600px
// function setHeight() {
//     orbitContainerHeight = (window.innerHeight / 5) * 3;
//     if (orbitContainerHeight > 600) {
//         orbitContainerHeight = 600;
//     }
//     for (let i = 0; i < orbitContainer.length; i++) {
//         orbitContainer[i].style.height = orbitContainerHeight + "px";
//     }
// }

// // Set the height on load and on resize
// window.addEventListener("load", setHeight);
// window.addEventListener("resize", setHeight);






// take into account mobile 

// let orbitContainer = document.querySelectorAll(".flexbox-slide, .orbit-container");
// let orbitContainerHeight;

// function setHeight() {
//     orbitContainerHeight = (window.innerHeight / 4) * 3;
//     if (orbitContainerHeight > 600) {
//         orbitContainerHeight = 600;
//     }
//     for (let i = 0; i < orbitContainer.length; i++) {
//         orbitContainer[i].style.height = orbitContainerHeight + "px";
//     }
// }

// function setMobileHeight() {
//     orbitContainerHeight = (window.innerHeight * 0.8);
//     for (let i = 0; i < orbitContainer.length; i++) {
//         orbitContainer[i].classList.add("center-vertically");
//         orbitContainer[i].style.height = orbitContainerHeight + "px";
//     }
// }



// // Get the image element
// var image = document.querySelector(".slideshow-wrapper .slideshow .orbit .orbit-wrapper .orbit-container li.orbit-slide.is-active img");

// // Get the .orbit-container element
// var orbitContainer = document.querySelector(".slideshow-wrapper .slideshow .orbit .orbit-wrapper .orbit-container");

// // Function to set the height of the container
// function setContainerHeight() {
//   var imageHeight = image.clientHeight;
//   orbitContainer.style.height = imageHeight + "px";
// }

// // Call the function on page load
// setContainerHeight();

// // Call the function on window resize
// window.addEventListener("resize", setContainerHeight);



// // START TOP-NAV-DESKTOP PLUGIN
// // ----------------------

// // Select the element that you want to listen for
// var element = $('header');

// // Select the element that you want to add the class to
// var target = $('nav');
// var logo = $('nav #svg-contents');

// $(window).scroll(function() {
//   // Get the distance from the top of the window to the element
//   var elementTop = element.offset().top;
//   // Get the height of the element
//   var elementHeight = element.height();
//   // Get the current scroll position of the window
//   var scrollTop = $(window).scrollTop();

//   // If the element is not visible (distance from top + height is less than scroll position), remove the class to the target element
//   if (elementTop + elementHeight < scrollTop) {
//     target.removeClass('hidden'),
//     logo.removeClass('animate-out').addClass('animate-in');

//   } else {
//     // Otherwise, add the class from the target element
//     logo.removeClass('animate-in').addClass('animate-out'),
//     target.addClass('hidden');
//   }
// });

// add mobile class when mobile is in view

// const slide = document.querySelector('.flexbox-slide');
// const mobileWidth = 480;

// function updateSlideClass() {
//   if (window.innerWidth <= mobileWidth) {
//     slide.classList.add('mobile');
//     slide.classList.remove('desktop');
//   } else {
//     slide.classList.add('desktop');
//     slide.classList.remove('mobile');
//   }
// }

// window.addEventListener('resize', updateSlideClass);
// updateSlideClass();



// END TOP-NAV-DESKTOP PLUGIN
// ----------------------



// offset height
// $(window).resize(function() {
//   $(document.body).css("margin-top", $("header.sticky").height());
// }).resize();


