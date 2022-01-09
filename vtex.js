const helper        = require('./helper')
//////////////////////////////////////////////////////////
const MasterData    = require('./vtex-modules/MasterData')
const OMS           = require('./vtex-modules/OMS')
const Catalog       = require('./vtex-modules/Catalog')
const Checkout      = require('./vtex-modules/Checkout')
const Giftcard      = require('./vtex-modules/Giftcard')
//////////////////////////////////////////////////////////
const publicHelpers = require('./public-helpers') 

function Vtex(userDefaults = undefined) {
    this._settings = helper.constructorHelper(userDefaults)
}

Vtex.prototype.Catalog = function(parameters){
    const _settings = this._settings
    return{
        GetSKU : async function(parameters){
            return await Catalog.GetSKU(_settings, parameters)
        },
        GetProduct : async function(parameters){
            return await Catalog.GetProduct(_settings, parameters)
        },
        GetProductByRefId : async function(parameters){
            return await Catalog.GetProductByRefId(_settings, parameters)
        }
    }
}

Vtex.prototype.MasterData = function(){
    const _settings = this._settings
    return {
        Search : async function(parameters){
            return await MasterData.Search(_settings, parameters)
        },
        Post : async function(parameters){
            return await MasterData.Post(_settings, parameters)
        },
        Delete : async function(parameters){
            return await MasterData.Delete(_settings, parameters)
        },
        Patch : async function(parameters){
            return await MasterData.Patch(_settings, parameters)
        }
    }
}

Vtex.prototype.OMS = function(){
    const _settings = this._settings
    return {
        LoadOrder : async function(parameters){
            return await OMS.LoadOrder(_settings, parameters)
        },
        ListOrders : async function(parameters){
            return await OMS.ListOrders(_settings, parameters)
        },
        CancelOrder : async function(parameters){
            return await OMS.CancelOrder(_settings, parameters)
        }
    }
}

Vtex.prototype.Checkout = function(){
    const _settings = this._settings
    return {
        LoadOrderformById : async function (parameters){
            return await Checkout.LoadOrderformById(_settings, parameters)
        }
    }
}

Vtex.prototype.Giftcard = function(){
    const _settings = this._settings
    return {
        CreateGiftcard : async function (parameters){
            return await Giftcard.CreateGiftcard(_settings, parameters)
        }
    }
}

Vtex.prototype.settings = function(){
    return this._settings
}

Vtex.prototype.Utils = function(){
    return {
        uuid : function(v){
            return publicHelpers.uuid(v)
        }
    }
}

module.exports = Vtex