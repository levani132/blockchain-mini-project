const express = require('express')
const app = express()

app.get('/address/:bitcoin_addr', (req, res) => {
    res.send('bitcoin_addr: ' + req.params.bitcoin_addr)
})

app.listen(8080)