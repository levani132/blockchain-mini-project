const assert = require('assert')
const chai = require('chai')
const service = require(__dirname + '/../service')

const should = chai.should()

// Single result test expected result
const expectedSingleResult = {
    "outputs": [
        {
            "value": 8991,
            "tx_hash": "233e8df5d077c71fbb47f6c033e321526430ee8089aee13f81d54fbaf66f9bdb",
            "output_idx": 1
        }
    ]
}

// Multiple result test expected result
const expectedMultiResult = {
    outputs: [
        {
            "value": 22052,
            "tx_hash": "8296861edae4e1a738dfb39f0e5a851d0462d9fc9d7d19483adfe100574f9c02",
            "output_idx": 1
        },
        {
            "value": 52061,
            "tx_hash": "24ce4082f85cf00c91c02faf362b3fb1d465b948da48d54abd58d09a166be0ec",
            "output_idx": 2
        }
    ]
}

// Constant addresses, to send requests to
const ONE_RESULT_ADDR = '19zfdQYYYp4ycMhArjnCofDxqvaXjzygSj'
const TWO_RESULT_ADDR = '1efs45wsKYTbFf1dmfAsGnPnqmJxgpmYp'
const NO_RESULT_ADDR = '1Aff4FgrtA1dZDwajmknWTwU2WtwUvfiXa'
const INCORRECT_ADDR = '1Aff4FgrtA1dZDwajmknWTwU2WtwUvfiXa1'

/* 
 * Test for app's service's getUnspentOutputs
 */
describe("Mini project service's getUnspentOutputs test", () => {
    /*
     * Test to find whether returned json format is correct or not (doesn't test exceptions)
     */
    it("Returned format test (doesn't test exceptions)", () => {
        return service.getUnspentOutputs(ONE_RESULT_ADDR).then(unspentOutputsResult => {
            let succeeded = false
            unspentOutputsResult.should.have.property('outputs')
            unspentOutputsResult.outputs.forEach(output => {
                output.should.have.property('value')
                output.should.have.property('tx_hash')
                output.should.have.property('output_idx')
            })
        }, error => {
            throw error
        })
    })

    /*
     * Test to find whether one normal result was correct or not (doesn't test exceptions)
     */
    it("Single result test (doesn't test exceptions)", () => {
        return service.getUnspentOutputs(ONE_RESULT_ADDR).then(unspentOutputsResult => {
            unspentOutputsResult.should.deep.equal(expectedSingleResult)
        }, error => {
            throw error
        })
    })

    /*
     * Test to find whether multiple normal results was correct or not (doesn't test exceptions)
     */
    it("Multi result test (doesn't test exceptions)", () => {
        return service.getUnspentOutputs(TWO_RESULT_ADDR).then(unspentOutputsResult => {
            unspentOutputsResult.should.deep.equal(expectedMultiResult)
        }, error => {
            throw error
        })
        
    })

    /*
     * Test to check for error, when address doesn't have unspent outputs
     */
    it("Error test, no unspent outputs", () => {
        return service.getUnspentOutputs(NO_RESULT_ADDR).then(unspentOutputsResult => {
            throw new Exception("Error wasn't thrown")
        }, error => {
            error.message.should.equal('No free outputs to spend')
        })
    })

    /*
     * Test to check for error, when address is invalid
     */
    it("Error test, invalid address", () => {
        return service.getUnspentOutputs(INCORRECT_ADDR).then(unspentOutputsResult => {
            throw new Exception("Error wasn't thrown")
        }, error => {
            error.message.should.equal('Invalid Bitcoin Address')
        })
    })

})