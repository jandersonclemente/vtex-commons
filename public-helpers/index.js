const {v4 : uuidv4, v1: uuidv1} = require('uuid')

function uuid(v = 4){
    switch (v){
        case 1:
            return uuidv1()
        default:
            return uuidv4()
    }
}

module.exports = {
    uuid
}