function getTime(time) {
    let res = "0:00";
    let minutes, seconds = 0;

    seconds = Math.floor(time % 60);
    minutes = Math.floor((time / 60) % 60);

    res = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;

    return res;
};

module.exports = getTime;