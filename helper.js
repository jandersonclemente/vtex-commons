let defaults = require('./config/settings')

module.exports.constructorHelper = (userDefaults) => {
    let initialParameters = null

    if (userDefaults !== undefined && typeof userDefaults !== 'object'){
        throw new Error('Initialization parameters are invalid')
    } else if (typeof userDefaults === 'object') {
        if(!userDefaults.store){
            throw new Error('The parameter "store" is required')
        }
        
        initialParameters = Object.freeze({...defaults,...userDefaults})
    }else{
        throw new Error('The parameter "store" is required')
    }

    return initialParameters
}

module.exports.extractCredentials = (settings) => {
    if(!settings.credentials){
        return [key = process.env[settings.appKey], token = process.env[settings.appToken]]
    }else{
        return [key = settings.appKey, token = settings.appToken]
    }
}