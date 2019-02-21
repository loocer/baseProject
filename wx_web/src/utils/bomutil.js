export const RAF = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    function requestTimeOut(callback) { window.setTimeout(callback, 1000 / 60); };
