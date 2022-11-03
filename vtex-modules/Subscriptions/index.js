const fetch  = require('node-fetch')
const helper = require('../../helper')

async function List(settings, parameters = null){
    const [key, token] = helper.extractCredentials(settings)
    const query        = parameters?.rule ? `?${parameters.rule}` : ''
    const listUrl      = `https://${settings.store}.${settings.env}/api/rns/pub/subscriptions${query}`

    const options = {
        method: 'GET',
        headers: {
            'x-vtex-api-appkey'   : key,
            'x-vtex-api-apptoken' : token,
            'Content-Type'        : 'application/json',
            'Accept'              : 'application/json',
        }
    }

    let responseError = false
    const response = await fetch(listUrl, options)

    if(!response.ok){
        responseError = response.statusText
    }
    
    const json = await response.json()
    
    if(responseError){
        throw new Error(`SUBSCRIPTIONS (LIST): ${responseError} - ${json.Message}`)
    }
    
    return json
}

module.exports = {
    List
}