const fetch = require('node-fetch')
const helper = require('../../helper')
const { v4: uuidv4 } = require('uuid');

async function CreateGiftcard(settings,parameters){
    if(!parameters || !parameters.value){
        throw new Error('GIFTCARD (CREATE GIFTCARD): Parameter "value" is required')
    }

    //creating voucher

    const uniqueId = uuidv4()

    const createBody = JSON.stringify({
        expiringDate : parameters.expiringDate || '',
        caption : parameters.caption || 'Giftcard',
        restrictedToOwner : parameters.restrictedToOwner || false,
        multipleRedemptions : parameters.multipleRedemptions || false,
        multipleCredits : parameters.multipleCredits || false,
        profileId : parameters.profileId || `${uniqueId}@${Math.random().toString().replace('.','')}.vtex`
    })

    const [key, token] = helper.extractCredentials(settings)
    
    const createUrl = `https://api.vtex.com/${settings.store}/giftcards/`
    const createOptions = {
        method: 'POST',
        headers: {
            'x-vtex-api-appkey'   : key,
            'x-vtex-api-apptoken' : token,
            'Content-Type'        : 'application/json',
            'Accept'              : 'application/json',
        },
        body : createBody
    }

    let responseError = false
    const createResponse = await fetch(createUrl, createOptions)

    if(!createResponse.ok){
        responseError = response.statusText
    }

    const creationJson = await createResponse.json()

    if(responseError){
        throw new Error(`GIFTCARD (CREATE GIFTCARD): ${responseError} - ${creationJson.error.message}`)
    }

    //adding value to the voucher
    const valueBody = JSON.stringify({
        redemptionToken : creationJson.redemptionToken,
        operation : 'Credit',
        requestId : uniqueId,
        multipleRedemptions : parameters.multipleRedemptions || false,
        multipleCredits : parameters.multipleCredits || false,
        profileId : parameters.profileId || `${uniqueId}@${Math.random().toString().replace('.','')}.vtex`,
        restrictedToOwner : parameters.restrictedToOwner || false,
        multipleRedemptions : parameters.multipleRedemptions || false,
        multipleCredits : parameters.multipleCredits || false,
        value : parameters.value,
        expiringDate : parameters.expiringDate || '',
    })

    const valueUrl = `https://api.vtex.com/${settings.store}/giftcards/${creationJson.id}/transactions`
    const valueOptions = {
        method: 'POST',
        headers: {
            'x-vtex-api-appkey'   : key,
            'x-vtex-api-apptoken' : token,
            'Content-Type'        : 'application/json',
            'Accept'              : 'application/json',
        },
        body : valueBody
    }

    responseError = false
    const response = await fetch(valueUrl, valueOptions)

    if(!response.ok){
        responseError = response.statusText
    }

    const valueJson = await response.json()

    ///
    
    if(responseError){
        throw new Error(`GIFTCARD (CREATE GIFTCARD): ${responseError} - ${valueJson.error.message}`)
    }
    
    return creationJson.redemptionToken
}

module.exports = {
    CreateGiftcard
}