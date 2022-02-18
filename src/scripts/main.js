// ==============================================
// main.js - Scripts entry points
// ==============================================

function autorun(){

  console.log('Website is ready!');

  const body = document.getElementsByTagName('body')[0];

  /* if (window.innerWidth > 767) {
    console.log("JS - Window > 767px");
  } else {
    console.log("JS - Window < 767px");
  } */

  menuToggle();

  if ( body.classList.contains('v_home') ) {
    filtersResponsiveness();
  }

  // until browsers add support for :has in css...
  // document.querySelectorAll('.caption').forEach(
  //   span => span.parentElement.classList.add('captioned')
  // );

  // Captions are wrapped in a <span> element,
  // that have a minimum width styles with CSS.
  // The picture is set to block, and the 
  // common parent <p> is set to inline-block.
  // The <p> then gets the pictures' CSS width. 
    /*
  document.querySelectorAll('.caption').forEach(
    span => {
      let parentWidth = span.parentElement.offsetWidth;
      span.parentElement.classList.add('captioned');

      //////// Not Working, async or whatever
      // console.log(parentWidth);
      // console.log(span);
      // span.style.width = parentWidth +'px';
      // span.setAttribute('style','width:'+parentWidth);

      /////// Needs an extra div, so it's better to just create a proper element
      let newDiv = document.createElement('div');
      newDiv.classList.add('caption');
      newDiv.innerHTML = span.innerHTML;
      span.parentElement.replaceChild(newDiv, span);
    }
  );*/


};

if (document.addEventListener) document.addEventListener("DOMContentLoaded", autorun, false);
else if (document.attachEvent) document.attachEvent("onreadystatechange", autorun);
else window.onload = autorun;
