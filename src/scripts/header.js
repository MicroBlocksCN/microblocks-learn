//
// Headere related functions 
//

var menuToggle = function() {

  let toggleButton = document.querySelector('.menu-toggle');
  let menu = document.querySelector('.menu');
  var menuVisible = false;

  toggleButton.addEventListener('click', function(e) {
    
    e.preventDefault();

    if (menuVisible == true) {
      menu.setAttribute('aria-expanded', 'false');
      menuVisible = false;
    } else {
      menu.setAttribute('aria-expanded', 'true');
      menuVisible = true;
    }

    toggleButton.classList.toggle('menu-toggle--is-visible');
    menu.classList.toggle('menu--is-visible');
    
  });

}
