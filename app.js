const express = require('express')
const service = require('./service')
const app = express()

const PORT = 8080

// Will return pretified jsons
app.set('json spaces', 2)

/*
 * Endpoint /address/:bitcoin_addr returns all
 * unspent outputs of the :bitcoin_addr in json
 * list format like this
 * {
 *      "outputs": [
 *          {
 *              "value": (long long)value of the transaction
 *              "tx_hash": (string)"transaction hash",
 *              "output_idx": (int)index of the outputs
 *          }
 *      ]
 * }
 */
app.get('/address/:bitcoin_addr', async (req, res) => {
    try{
        unspentOutputs = await service.getUnspentOutputs(req.params.bitcoin_addr)
        res.json(unspentOutputs)
    }catch(error){
        res.status(500).send(error.message)
    }
})

app.listen(PORT, () => console.log('server started on ' + PORT)).on('error', console.log)

module.exports = app // For testing purposes