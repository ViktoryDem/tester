"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // Animation on scroll
  const the_animation = document.querySelectorAll(".animated");
  if (the_animation.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("scroll-animation");
          observer.unobserve(entries[0].target);
        } else {
          return;
        }
      });
    });
    for (let i = 0; i < the_animation.length; i++) {
      const elements = the_animation[i];
      observer.observe(elements);
    }
  }
});

window.addEventListener("load", function () {
  var scrolling;
  var position = 0;
  var delta = 5;
  var header = document.querySelector(".pml-header");
  var docHeight = document.documentElement.scrollHeight;
  var winHeight = window.innerHeight;

  window.addEventListener("scroll", function (event) {
    scrolling = true;
  });

  setInterval(function () {
    if (scrolling) {
      scrollFunction();
      scrolling = false;
    }
  }, 250);

  function scrollFunction() {
    var currentScrollPosition =
      window.pageYOffset || document.documentElement.scrollTop;

    if (Math.abs(position - currentScrollPosition) <= delta) return;

    if (
      currentScrollPosition > position &&
      currentScrollPosition > header.offsetHeight
    ) {
      header.classList.add("hide");
    } else {
      if (currentScrollPosition + winHeight < docHeight) {
        header.classList.remove("hide");
      }
    }
    position = currentScrollPosition;
  }
});

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};
