function setScriptImageScale(img) {
    // Set scale for the given script image when it is loaded.
    img.style.width = Math.round(0.35 * img.naturalWidth) + 'px';

    // console.log('========================');
    // console.log(img);
    // console.log(img.naturalWidth);
}

window.onbeforeprint = function() {
    // Set scale of script images for printing.

	var scriptImages = Array.from(document.getElementsByClassName('scriptImg'));
    for (const img of scriptImages) {
        img.style.width = Math.round(0.22 * img.naturalWidth) + 'px';
    }
}

window.onafterprint = function() {
    // Set scale of script images for viewing in browser.

	var scriptImages = Array.from(document.getElementsByClassName('scriptImg'));
    for (const img of scriptImages) {
        setScriptImageScale(img);
    }
}
