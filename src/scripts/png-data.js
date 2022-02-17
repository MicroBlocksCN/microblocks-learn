// Find "GP Script" inside all PNGs, and apply the "code" class to all the img
// tags that contain it.

// Rather than parsing the PNG file itself, I'm just converting the whole thing
// into an Uint8Array and joining it together as a string of comma-separated
// bytes in decimal, then doing the same for the string "GP Script" and checking
// whether the first contains the second.

function processImagesForCode () {
    document.querySelectorAll('img').forEach( img => checkForCode(img));
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
                    img.parentElement.classList.add('code');
                };
            }
        );
    }
};

Uint8Array.prototype.containsSubArray = function (subArray) {
    return this.join().includes(subArray.join());
};
