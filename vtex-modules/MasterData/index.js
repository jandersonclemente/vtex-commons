const fetch = require('node-fetch')
const helper = require('../../helper')

async function Search(settings, parameters){
    if(!parameters || !parameters.entity || !parameters.rule || !parameters.fields){
        throw new Error('MASTER DATA (SEARCH): The parameters "entity", "rule" and "fields" are required')
    }

    const cacheKiller = Date.now()
    const [key, token] = helper.extractCredentials(settings)
    const searchUrl = `https://${settings.store}.${settings.env}/api/dataentities/${parameters.entity}/search?_where=(${encodeURI(parameters.rule)})&_fields=${encodeURI(parameters.fields)}&_v=${cacheKiller}`
    const options = {
        method: 'GET',
        headers: {
          'x-vtex-api-appkey'   : key,
          'x-vtex-api-apptoken' : token,
          'Content-Type'        : 'application/json',
          'Accept'              : 'application/vnd.vtex.ds.v10+json',
          'REST-Range'          : `resources=${parameters.range || '0-10'}`
        }
    }

    let responseError = false
    const response = await fetch(searchUrl, options)

    if(!response.ok){
        responseError = response.statusText
    }
    
    const json = await response.json()
    
    if(responseError){
        throw new Error(`MASTER DATA (SEARCH): ${responseError} - ${json.Message}`)
    }
    
    return json
}

async function Post(settings, parameters){
    if(!parameters || !parameters.entity || !parameters.data){
        throw new Error('MASTER DATA (POST): The parameters "entity" and "data" are required')
    }

    const [key, token] = helper.extractCredentials(settings)
    const postUrl = `https://${settings.store}.${settings.env}/api/dataentities/${parameters.entity}/documents`

    let body = parameters.data
    if(typeof body === 'object'){
        body = JSON.stringify(body)
    }

    const options = {
        method : 'POST',
        headers: {
            'x-vtex-api-appkey'   : key,
            'x-vtex-api-apptoken' : token,
            'Content-Type'        : 'application/json',
            'Accept'              : 'application/vnd.vtex.ds.v10+json',
        },
        body : body
    }

    let responseError = false
    const response = await fetch(postUrl, options)

    if(!response.ok){
        responseError = response.statusText
    }

    const json = await response.json()
    
    if(responseError){
        console.error({
            message: `MASTER DATA (POST): ${responseError} - ${json.Message}`,
            payload: JSON.stringify(body)
        })

        throw new Error(`MASTER DATA (POST): ${responseError} - ${json.Message}`)
    }
    
    return json
}

async function Delete(settings, parameters){
    if(!parameters || !parameters.entity || !parameters.id){
        throw new Error('MASTER DATA (DELETE): The parameters "entity" and "id" are required')
    }

    const [key, token] = helper.extractCredentials(settings)
    const deleteUrl = `https://${settings.store}.${settings.env}/api/dataentities/${parameters.entity}/documents/${parameters.id}`

    if(typeof body === 'object'){
        body = JSON.stringify(body)
    }

    const options = {
        method : 'DELETE',
        headers: {
            'x-vtex-api-appkey'   : key,
            'x-vtex-api-apptoken' : token,
            'Content-Type'        : 'application/json',
            'Accept'              : 'application/vnd.vtex.ds.v10+json',
        }
    }

    let responseError = false
    const response = await fetch(deleteUrl, options)

    if(!response.ok){
        throw new Error(`MASTER DATA (DELETE): ${response.statusText}`)
    }
    
    return {message : 'The register has been deleted'}
}

async function Patch(settings, parameters){
    if(!parameters || !parameters.entity || !parameters.data || !parameters.id){
        throw new Error('MASTER DATA (POST): The parameters "entity", "data" and "id" are required')
    }

    const [key, token] = helper.extractCredentials(settings)
    const patchUrl = `https://${settings.store}.vtexcommercestable.com.br/api/dataentities/${parameters.entity}/documents/${parameters.id}`

    let body = parameters.data
    if(typeof body === 'object'){
        body = JSON.stringify(body)
    }

    const options = {
        method : 'PATCH',
        headers: {
            'x-vtex-api-appkey'   : key,
            'x-vtex-api-apptoken' : token,
            'Content-Type'        : 'application/json',
            'Accept'              : 'application/vnd.vtex.ds.v10+json',
        },
        body : body
    }

    let responseError = false
    const response = await fetch(patchUrl, options)
    
    if(!response.ok){
        console.error({
            message: `MASTER DATA (PATCH): ${response.statusText}`,
            payload: JSON.stringify(body)
        })
        throw new Error(`MASTER DATA (PATCH): ${response.statusText}`)
    }

    return {message : 'The register has been updated'}
}

module.exports = {
    Search,
    Post,
    Delete,
    Patch
}