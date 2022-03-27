// ==============================================
// main.js - Scripts entry points
// ==============================================

function autorun(){

  console.log('Website is ready!');
  const body = document.getElementsByTagName('body')[0];

  menuToggle();

  // Page Home
  if ( body.classList.contains('v_home') ) {
    filtersResponsiveness();
    homeHero();
  }

  // Page has WYSIWYG elements
  if ( document.querySelector('.wysiwyg') ) {
    wysiwyg();
  }

};

if (document.addEventListener) document.addEventListener("DOMContentLoaded", autorun, false);
else if (document.attachEvent) document.attachEvent("onreadystatechange", autorun);
else window.onload = autorun;
