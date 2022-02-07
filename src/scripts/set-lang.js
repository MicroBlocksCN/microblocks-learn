function setLang (langCode) {
    location.href = `${location.protocol}//${location.host}/${langCode}${location.pathname.substring(3)}`
};