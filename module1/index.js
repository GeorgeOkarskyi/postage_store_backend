function getRandomNumber() {
    return Math.floor(Math.random() * 1000) + 1;
}

module.exports = getRandomNumber;

console.log(getRandomNumber());