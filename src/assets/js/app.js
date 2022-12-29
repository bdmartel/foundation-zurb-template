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


$(document).foundation();


// START TOP-NAV-DESKTOP PLUGIN
// ----------------------

// Select the element that you want to listen for
var element = $('header');

// Select the element that you want to add the class to
var target = $('.scrollhide-nav');

$(window).scroll(function() {
  // Get the distance from the top of the window to the element
  var elementTop = element.offset().top;
  // Get the height of the element
  var elementHeight = element.height();
  // Get the current scroll position of the window
  var scrollTop = $(window).scrollTop();

  // If the element is not visible (distance from top + height is less than scroll position), remove the class to the target element
  if (elementTop + elementHeight < scrollTop) {
    target.removeClass('hidden');
  } else {
    // Otherwise, add the class from the target element
    target.addClass('hidden');
  }
});

// END TOP-NAV-DESKTOP PLUGIN
// ----------------------

