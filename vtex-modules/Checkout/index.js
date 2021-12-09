const fetch = require('node-fetch')
const helper = require('../../helper')

async function LoadOrderformById(settings,parameters){
    if(!parameters || !parameters.orderformId ){
        throw new Error('Checkout (LOAD ORDERFORM): The parameter "orderformId" is required')
    }

    const [key, token] = helper.extractCredentials(settings)
    console.log(key,token)
    const loadOrderUrl = `https://${settings.store}.${settings.env}/api/checkout/pub/orderForm/${parameters.orderformId}`
    const options = {
        method: 'GET',
        headers: {
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
        throw new Error(`OMS (LOAD ORDER): ${responseError} - ${json?.error?.message}`)
    }

    return json
}

module.exports = {
    LoadOrderformById
}