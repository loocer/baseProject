const house = require('./data')
const houseType = [
    [
        house.MAINHOUSE,
        {
            showHouse: new Set(),
            hasHouse: new Set(),
        }
    ],
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
    ],
    [
        house.MAINHOUSE,
        {
            showHouse: new Set(),
            hasHouse: new Set(),
        }
    ],
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
const houseType2 = [
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
module.exports = { houseType,houseType2 }