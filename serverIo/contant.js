

const Init = require('./util/initPsition')
const Tools = require('./util/tools')
const common = {}
common.colorType = {
        '111': 'red',
        '222': 'green',
        '333': 'green'
}
common.init = () => {
        let init = new Init()
        common.positions = init.setPosition()
        common.graph = init.initEdge()
}


module.exports = common