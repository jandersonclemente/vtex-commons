const fetch = require('node-fetch')
const helper = require('../../helper')

async function GetSKU(settings, parameters){
    if(!parameters || !parameters.skuId ){
        throw new Error('CATALOG (GET SKU): The parameter "skuId" is required')
    }

    if(typeof parameters.skuId !== 'number' ){
        throw new Error('CATALOG (GET PRODUCT): The parameter "skuId" must be a number')
    }

    const [key, token] = helper.extractCredentials(settings)
    const getSkuUrl = `https://${settings.store}.${settings.env}/api/catalog/pvt/stockkeepingunit/${parameters.skuId}`
    const options = {
        method: 'GET',
        headers: {
            'x-vtex-api-appkey'   : key,
            'x-vtex-api-apptoken' : token,
            'Content-Type'        : 'application/json',
            'Accept'              : 'application/json'
        }
    }

    let responseError = false
    const response = await fetch(getSkuUrl, options)

    if(!response.ok){
        responseError = response.statusText
    }

    const json = await response.json()

    if(responseError){
        throw new Error(`CATALOG (GET SKU): ${responseError} - ${json.Message}`)
    }

    return json
}

async function GetProduct(settings, parameters){
    if(!parameters || !parameters.productId ){
        throw new Error('CATALOG (GET PRODUCT): The parameter "productId" is required')
    }

    if(typeof parameters.productId !== 'number' ){
        throw new Error('CATALOG (GET PRODUCT): The parameter "productId" must be a number')
    }

    const [key, token] = helper.extractCredentials(settings)
    const getProductUrl = `https://${settings.store}.${settings.env}/api/catalog/pvt/product/${parameters.productId}`
    const options = {
        method: 'GET',
        headers: {
            'x-vtex-api-appkey'   : key,
            'x-vtex-api-apptoken' : token,
            'Content-Type'        : 'application/json',
            'Accept'              : 'application/json'
        }
    }

    let responseError = false
    const response = await fetch(getProductUrl, options)

    if(!response.ok){
        responseError = response.statusText
    }

    const json = await response.json()

    if(responseError){
        throw new Error(`CATALOG (GET PRODUCT): ${responseError} - ${json.Message}`)
    }

    return json
}

async function GetProductByRefId(settings, parameters){
    if(!parameters || !parameters.refId ){
        throw new Error('CATALOG (GET PRODUCT BY REFID): The parameter "refId" is required')
    }
    
    if(typeof parameters.refId !== 'string' ){
        throw new Error('CATALOG (GET PRODUCT BY REFID): The parameter "refId" must be a string')
    }

    const [key, token] = helper.extractCredentials(settings)
    const getProductUrl = `https://${settings.store}.${settings.env}/api/catalog_system/pvt/products/productgetbyrefid/${parameters.refId}`
    const options = {
        method: 'GET',
        headers: {
            'x-vtex-api-appkey'   : key,
            'x-vtex-api-apptoken' : token,
            'Content-Type'        : 'application/json',
            'Accept'              : 'application/json'
        }
    }

    let responseError = false
    const response = await fetch(getProductUrl, options)

    if(!response.ok){
        responseError = response.statusText
    }

    const json = await response.json()

    if(responseError){
        throw new Error(`CATALOG (GET PRODUCT BY REFID): ${responseError} - ${json.Message}`)
    }

    return json
}

module.exports = {
    GetSKU,
    GetProduct,
    GetProductByRefId
}