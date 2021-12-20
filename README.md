# vtex-commons

Handy VTEX library for NodeJs  


Description
-----------
This module wrapps the most common used VTEX APIs requests. Currently containing:

* Master Data
    * Search
    * Post
    * Delete
    * Patch
* OMS
    * Load Order
    * List Orders
    * Cancel order
* Catalog
    * Load Product
    * Load Product by RefId
    * Load SKU
* Checkout
    * Load Orderform by Id
* Giftcard
    * Create Giftcard

   
How to install
--------------

```javascript
npm i vtex-commons
```

How to use it
-------------

Here's a example of how to use the Master Data's Search

```javascript
const VTEX = require('vtex-commons')

mondule.exports = async () => {
    vtex = new VTEX({
        store : 'dummystore'
    })

    const searchResult = await vtex.MasterData().Search({
        entity : 'CL',
        rule : 'email=imagooddeveloper@maybe.com',
        fields : '_all'
    })
}
```

You might be wondering: "Where are the key and token required to perform a private request? I can't see them in the code!"  
You're right, they aren't in the code. And if you keep your credentials within your code, you're going to Developers Hell. 

When you instanciate the module, it assumes you have at least two enviroment variables already set:
* APP_KEY
* APP_TOKEN

Therefore, there's no need to write them down in your code. If you need to use anothers name for this variables other then the provided,
you'll be able to overwrite the default ones. More on that in a minute.

Methods
-------

### MASTER DATA

#### ***Search***

This method requires an object with four parameters:
* entity (this is the acronym of the entity/table set in the Master Data admin)
* rule (this is the query you want to perform)
* fields (a string with comma separated field names or '_all' to get all the public fields)
* range (optional - a string with the desired range of results. Ex.: "0-30". Default: "0-10")

```javascript

vtex = new VTEX({
    store : 'dummystore'
})

const searchResult = await vtex.MasterData().Search({
    entity : 'CL',
    rule : 'email=imagooddeveloper@maybe.com',
    fields : '_all'
})

```

#### ***Post***

This method requires an object with two required parameters:
* entity (required - this is the acronym of the entity/table set in the Master Data admin)
* data (required - an object or stringified object with the data you want to post)

```javascript

vtex = new VTEX({
    store : 'dummystore'
})

const searchResult = await vtex.MasterData().Post({
    entity : 'CL',
    data : {name : 'Jane'} 
})

```

#### ***Delete***

This method requires an object with two parameters:
* entity (this is the acronym of the entity/table set in the Master Data admin)
* id (a string with the id of the register you want to delete (this id can be gotten with the search method))

```javascript

vtex = new VTEX({
    store : 'dummystore'
})

const searchResult = await vtex.MasterData().Delete({
    entity : 'CL',
    id : '54353fsdf-42342rfsfsfs-23rfdsfsdfds'
})

```

#### ***Patch***

This method requires an object with three parameters:
* entity (this is the acronym of the entity/table set in the Master Data admin)
* id (a string with the id of the register you want to delete (this id can be gotten with the search method))
* data (an object or stringified object with the data you want to update)

```javascript

vtex = new VTEX({
    store : 'dummystore'
})

const searchResult = await vtex.MasterData().Patch({
    entity : 'CL',
    data : {name : 'Jane'}
    id : '54353fsdf-42342rfsfsfs-23rfdsfsdfds'
})

```

### OMS

#### ***LoadOrder***

This method requires an object with one parameter:
* orderId (a string with the id from the order you want to load)

```javascript

vtex = new VTEX({
    store : 'dummystore'
})

const searchResult = await vtex.OMS().LoadOrder({
    orderId : '54353fsdf-01'
})

```

#### ***ListOrders***

This method requires an object with one parameter:
* filter (this is a string you can get filtering the order in the OMS admin. You'll nedd to copy everything begining from 'orderBy' Ex.: https://dummystore.myvtex.com/admin/checkout/#/orders/1176931852456-01?orderBy=creationDate,desc&page=1&q=jemail=imagooddeveloper@maybe.com&f_creationDate=creationDate:%5B2021-11-17T03:00:00.000Z%20TO%202021-11-18T02:59:59.999Z%5D -> orderBy=creationDate,desc&page=1&q=jemail=imagooddeveloper@maybe.com&f_creationDate=creationDate:%5B2021-11-17T03:00:00.000Z%20TO%202021-11-18T02:59:59.999Z%5D)

```javascript

vtex = new VTEX({
    store : 'dummystore'
})

const searchResult = await vtex.OMS().ListOrders({
    filter : 'orderBy=creationDate,desc&page=1&q=jemail=imagooddeveloper@maybe.com&f_creationDate=creationDate:%5B2021-11-17T03:00:00.000Z%20TO%202021-11-18T02:59:59.999Z%5D'
})

```

#### ***CancelOrder***

This method requires an object with one parameter:
* orderId (a string with the id from the order you want to load. ***Only not invoiced orders may be cancelled***)

```javascript

vtex = new VTEX({
    store : 'dummystore'
})

const searchResult = await vtex.OMS().CancelOrder({
    orderId : '54353fsdf-01'
})

```

### Catalog

#### ***GetSKU***

This method requires an object with one parameter:
* skuId (a number with the id from the SKU you want to load)

```javascript

vtex = new VTEX({
    store : 'dummystore'
})

const searchResult = await vtex.Catalog().GetSKU({
    skuId : 818
})

```

#### ***GetProduct***

This method requires an object with one parameter:
* skuId (a number with the id from the product you want to load)

```javascript

vtex = new VTEX({
    store : 'dummystore'
})

const searchResult = await vtex.Catalog().GetProduct({
    productId : 213
})

```

#### ***GetProductByRefId***

This method requires an object with one parameter:
* refId (a string with the refId from the product you want to load)

```javascript

vtex = new VTEX({
    store : 'dummystore'
})

const searchResult = await vtex.Catalog().GetProductByRefId({
    refId : 213
})

```

### Checkout

#### ***LoadOrderformById***
This method requires an object with one parameter:
* orderformId (a string with the id from the orderform object you want to load)

```javascript

vtex = new VTEX({
    store : 'dummystore'
})

const orderForm = await vtex.Checkout().LoadOrderformById({
    orderformId : 'hgcfgtr456yhef'
})

```
### Giftcard

#### ***CreateGiftcard***
This method requires an object with the following parameters:
* value (a number with the value that will be added to the giftcard)
* profileId (optional - client email or id. If an account is found with this email, the VTEX API will automatically look for the client's document. If this parameter is not passed, the voucher will be created with a fake address)
* multipleCredits (optional bool (default: false) - Defines if the giftcard balance can be changed)
* multipleRedemptions (optional bool (default: false) - Defines if the giftcard can be used to make new purchases until its value is completely used)
* restrictedToOwner (optional bool (default: false) - Defines if the giftcard can only be used for a specified client's id/email)
* caption (optional string (default: 'Giftcard') - Giftcard's caption)
* expiringDate (optional date (default: 9999-12-31T23:59:59.100Z) - Defines the giftcard's expiring date)

It returns the giftcard's redemption code.

```javascript

vtex = new VTEX({
    store : 'dummystore'
})

const giftcard = await vtex.Giftcard().CreateGiftcard({
    value : 1
})

```

Defaults
------------

These are the default values when you instanciate the module:

```javascript
{
    appKey : "APP_KEY",
    appToken : "APP_TOKEN",
    store : null, /*required*/
    env : "vtexcommercestable.com.br"
}
```
You can easily overwrite them:

```javascript
vtex = new VTEX({
    store : 'dummystore',
    appKey : 'STORE_KEY',
    appToken : 'STORE_TOKEN',
})
```

***REMEMBER: appKey AND appToken SHOULD NOT BE FILLED WITH YOUR CREDENTIALS, BUT WITH THE NAMES OF THE ENVIROMENT VARIABLES THAT CONTAIN THEM.***

Overwriting credentials behavior
------------
If you really need to provide the credentials directly to the contructor, say from a query result, you can do this using the following snippet:

```javascript
vtex = new VTEX({
    store : 'dummystore',
    appKey : 'vtexappkey-dummiestore-ABCDEF', //the real key
    appToken : 'REWREWRW5435435REWREW432RWFSGFDYTR543TGEGFDFDSREWr34TREGFDGDGDWSADWEFDSDFDSAFSADEFGEFD', //the real token
    credentials: true
})
```

Notes
-------------

Aways wrapp the request inside a *try catch*. The module will throw an error that will break the execution if something goes wrong with the request.

Fell free to improve this module. Pull requests will be welcome. Just try to keep the existing structure. 