function convertMinsToHHMM(mins) {
    var displayTime;
    var hours;
    var minutes;

    hours = Math.trunc(mins / 60);
    minutes = mins % 60 > 9 ? mins % 60 : `0${mins % 60}`;

    displayTime = `${hours}:${minutes}`;

    return displayTime;
}

export default convertMinsToHHMM;