// ==============================================
// main.js - Scripts entry points
// ==============================================

function autorun(){

  console.log('Website is ready!');
  const body = document.getElementsByTagName('body')[0];

  menuToggle();

  if ( body.classList.contains('v_home') ) {
    filtersResponsiveness();
    homeHero();
  }

  // until browsers add support for :has in css...
  document.querySelectorAll('.caption').forEach(
    span => span.parentElement.classList.add('captioned')
  );

};

if (document.addEventListener) document.addEventListener("DOMContentLoaded", autorun, false);
else if (document.attachEvent) document.attachEvent("onreadystatechange", autorun);
else window.onload = autorun;
