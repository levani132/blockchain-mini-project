const axios = require('axios')


const BLOCKCHAIN_API = 'https://blockchain.info/'

/*
 * Service object, that will return items from blockchain.info API
 */
var service = {
    /*
     * Returns unspent transaction outputs of this address
     */
    getUnspentOutputs: async address => {
        try{
            let response = await axios.get(BLOCKCHAIN_API + 'unspent?active=' + address)
            let startData = response.data
            let idx = 0
            let resultData = startData.unspent_outputs.map(x => {
                return {
                    value: x.value,
                    tx_hash: x.tx_hash,
                    output_idx: ++idx
                }
            })
            return {
                outputs: resultData
            }
        }catch(error){
            throw new Error(error.response.data)
        }
    }
}

module.exports = service