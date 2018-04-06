const express = require('express')
const service = require('./service')
const app = express()

app.get('/address/:bitcoin_addr', async (req, res) => {
    try{
        unspentOutputs = await service.getUnspentOutputs(req.params.bitcoin_addr)
        res.json(unspentOutputs)
    }catch(error){
        res.status(500).send(error.message)
    }
})

app.listen(8080)