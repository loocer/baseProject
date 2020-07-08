const house = require('./data')
const houseType = [
    [
        house.POWER,
        {
            showHouse: new Set([house.MAINHOUSE]),
            hasHouse: new Set(),
        }
    ],
    [
        house.BARRACKS,
        {
            showHouse: new Set([house.MAINHOUSE]),
            hasHouse: new Set(),
        }
    ],
    [
        house.ARSENAL,
        {
            showHouse: new Set([house.MAINHOUSE]),
            hasHouse:new Set(),
        }
    ],
    [
        house.RADAR,
        {
            showHouse: new Set([house.MAINHOUSE, house.POWER]),
            hasHouse:new Set(),
        }
    ]
]
const pas = []
module.exports = { houseType, pas }