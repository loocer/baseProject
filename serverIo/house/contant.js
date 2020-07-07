const house = require('./data') 
const houseType = new Map([
    [
        house.POWER,
        {}
    ],
    [
        house.BARRACKS,
        {}
    ],
    [
        house.ARSENAL,
        {}
    ],
    [
        house.RADAR,
        {}
    ]
])
const pas = []
module.exports = {houseType,pas}