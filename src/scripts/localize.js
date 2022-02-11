function localize () {
    var key = arguments[0],
        params = [].slice.call(arguments, 1),
        localized = locale[key];

    if (!localized) {
        // missing locale string, return the key itself
        localized = key;
    }

    params.forEach((param, index) => {
        localized = localized.replace(`@${index + 1}`, param);
    });

    return localized;
};
