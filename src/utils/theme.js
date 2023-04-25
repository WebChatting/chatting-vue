function switchTheme(currentMode) {
    const themePath = `/themes/${currentMode}.css`;
    let linkElem = document.querySelector(`link[href*="themes"]`);
    if (linkElem) {
        linkElem.setAttribute('href', themePath)
    } else {
        linkElem = document.createElement('link');
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('type', 'text/css');
        linkElem.setAttribute('href', themePath);
        document.head.appendChild(linkElem); // 添加到文档头部
    }
}

export default switchTheme;