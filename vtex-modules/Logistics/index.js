const fetch = require('node-fetch')
const helper = require('../../helper')

async function ListReservationById(settings, parameters){
    if(!parameters || !parameters.id ){
        throw new Error('LOGISTICS (ListByReservationId): The parameter "id" is required')
    }

    if(typeof parameters.id !== 'string' ){
        throw new Error('LOGISTICS (ListByReservationId): The parameter "id" must be a string')
    }

    const [key, token] = helper.extractCredentials(settings)
    const listReservationUrl = `https://${settings.store}.${settings.env}/api/logistics/pvt/inventory/reservations/${parameters.id}`
    const options = {
        method: 'GET',
        headers: {
            'x-vtex-api-appkey'   : key,
            'x-vtex-api-apptoken' : token,
            'Accept'              : 'application/json'
        }
    }

    let responseError = false
    const response = await fetch(listReservationUrl, options)

    if(!response.ok){
        responseError = response.statusText
    }

    const json = await response.json()

    if(responseError){
        throw new Error(`LOGISTICS (ListByReservationId): ${responseError} - ${json.Message}`)
    }

    return json
}

module.exports = {
    ListReservationById
}