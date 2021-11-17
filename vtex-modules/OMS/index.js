const fetch = require('node-fetch')
const helper = require('../../helper')

async function LoadOrder(settings,parameters){
    if(!parameters || !parameters.orderId ){
        throw new Error('OMS (LOAD ORDER): The parameter "orderId" is required')
    }

    const [key, token] = helper.extractCredentials(settings)
    const loadOrderUrl = `https://${settings.store}.${settings.env}/api/oms/pvt/orders/${parameters.orderId}`
    const options = {
        method: 'GET',
        headers: {
            'x-vtex-api-appkey'   : key,
            'x-vtex-api-apptoken' : token,
            'Content-Type'        : 'application/json',
            'Accept'              : 'application/json'
        }
    }

    const response = await fetch(loadOrderUrl, options)
    
    let responseError = false
    if(!response.ok){
        responseError = response.statusText
    }

    const json = await response.json()

    if(responseError){
        throw new Error(`OMS (LOAD ORDER): ${responseError} - ${json.error.message}`)
    }

    return json
}

async function ListOrders(settings,parameters){
    if(!parameters || !parameters.filter ){
        throw new Error('OMS (LIST ORDER): The parameter "filter" is required')
    }

    const [key, token] = helper.extractCredentials(settings)
    const loadOrderUrl = `https://${settings.store}.${settings.env}/api/oms/pvt/orders?${parameters.filter}`
    const options = {
        method: 'GET',
        headers: {
            'x-vtex-api-appkey'   : key,
            'x-vtex-api-apptoken' : token,
            'Content-Type'        : 'application/json',
            'Accept'              : 'application/json'
        }
    }

    const response = await fetch(loadOrderUrl, options)
    
    let responseError = false
    if(!response.ok){
        responseError = response.statusText
    }

    const json = await response.json()

    if(responseError){
        throw new Error(`OMS (LOAD ORDER): ${responseError} - ${json.error.message}`)
    }

    return json
}

async function CancelOrder(settings, parameters){
    if(!parameters || !parameters.orderId ){
        throw new Error('OMS (CANCEL ORDER): The parameter "orderId" is required')
    }

    const [key, token] = helper.extractCredentials(settings)
    const cancelOrderUrl = `https://${settings.store}.${settings.env}/api/oms/pvt/orders/${parameters.orderId}/cancel`
    const options = {
        method: 'POST',
        headers: {
            'x-vtex-api-appkey'   : key,
            'x-vtex-api-apptoken' : token,
            'Content-Type'        : 'application/json',
            'Accept'              : 'application/json'
        }
    }

    const response = await fetch(cancelOrderUrl, options)
    let responseError = false
    if(!response.ok){
        responseError = response.statusText
    }
    
    const json = await response.json()

    if(responseError){
        throw new Error(`OMS (CANCEL ORDER): ${responseError} - ${json.error.message}`)
    }

    return json
}

module.exports = {
    LoadOrder,
    ListOrders,
    CancelOrder
}