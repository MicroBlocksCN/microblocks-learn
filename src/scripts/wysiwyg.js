/**
 * WYSIWYG JS related functionalities
**/


function wysiwyg () {

  // Captions :
  // Add a CSS class to captions until browsers add support for :has in css...
  document.querySelectorAll('.caption').forEach(
    span => span.parentElement.classList.add('captioned')
  );
}