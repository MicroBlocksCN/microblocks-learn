// Find "GP Script" inside all PNGs, and apply the "code" class to all the img
// tags that contain it.

// Rather than parsing the PNG file itself, I'm just converting the whole thing
// into an Uint8Array and joining it together as a string of comma-separated
// bytes in decimal, then doing the same for the string "GP Script" and checking
// whether the first contains the second.

// Besides this, images are exported from the IDE at a large size for a better quality,
// so we are applying a CSS width based on the image's natural pixels real size

function processImagesForCode () {
    document.querySelectorAll('img').forEach( (img) => {
        img.setAttribute('loading', 'lazy');

        img.addEventListener('load', () => {
            checkForCode(img);
        });
    });
};

function checkForCode (img) {
    if (img.src.endsWith('png')) {        
        fetch(img.src)
        .then(response => response.blob())
        .then(blob => blob.arrayBuffer())
        .then(buffer => {
            var data = new Uint8Array(buffer),
                check = ('GP Script').split('').map(c => c.charCodeAt(0));
            if (data.containsSubArray(check)) {
                img.parentElement.classList.add('script');
                
                // images are exported from the IDE at 0.34 their size,
                // for a better image quality, so they need to be reduced
                img.style.width = Math.round(0.34 * img.naturalWidth) + 'px';
            }
        });
    }
};

Uint8Array.prototype.containsSubArray = function (subArray) {
    return this.join().includes(subArray.join());
};
