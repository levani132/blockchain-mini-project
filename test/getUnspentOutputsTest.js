const assert = require('assert')
const service = require(__dirname + '/../service')

/* 
 * Test for app's service's getUnspentOutputs
 */
describe("Mini project service's getUnspentOutputs test", () => {
    /*
     * Test to find whether returned json format is correct or not (doesn't test exceptions)
     */
    it("Test to find whether returned json format is correct or not (doesn't test exceptions)", () => {
        
        
        return service.getUnspentOutputs('19zfdQYYYp4ycMhArjnCofDxqvaXjzygSj').then(unspentOutputsResult => {
            let succeeded = false
            succeeded = unspentOutputsResult.hasOwnProperty('outputs')
            if(!succeeded){
                assert.ok(succeeded, "Result " + unspentOutputsResult + " doesn't have property outputs")
            }else{
                unspentOutputsResult.outputs.forEach(x => {
                    succeeded = succeeded && x.hasOwnProperty('value')
                    assert.ok(succeeded, "Output " + x + " doesn't have property 'value'")
                    succeeded = succeeded && x.hasOwnProperty('tx_hash')
                    assert.ok(succeeded, "Output " + x + " doesn't have property 'tx_hash'")
                    succeeded = succeeded && x.hasOwnProperty('output_idx')
                    assert.ok(succeeded, "Output " + x + " doesn't have property 'output_idx'")
                })
            }
        }, error => {
            assert.ok(false, error.message)
        })
    })

    /*
     * compares two outputs and asserts all properties
     */
    function assertEqualsJson(actual, expected){
        assert.strictEqual(actual.value, expected.value, 
                                "Output " + JSON.stringify(actual) + " doesn't have correct 'value'")
        assert.strictEqual(actual.tx_hash, expected.tx_hash, 
                                "Output " + JSON.stringify(actual) + " doesn't have correct 'tx_hash'")
        assert.strictEqual(actual.output_idx, expected.output_idx, 
                                "Output " + JSON.stringify(actual) + " doesn't have correct 'output_idx'")
        let succeeded = actual.value == expected.value &&
                        actual.tx_hash == expected.tx_hash &&
                        actual.output_idx == expected.output_idx
        return succeeded
    }

    /*
     * Test to find whether one normal result was correct or not (doesn't test exceptions)
     */
    it("Test to find whether one normal result was correct or not (doesn't test exceptions)", () => {
        let expected = {
            "value": 8991,
            "tx_hash": "233e8df5d077c71fbb47f6c033e321526430ee8089aee13f81d54fbaf66f9bdb",
            "output_idx": 1
        }
        return service.getUnspentOutputs('19zfdQYYYp4ycMhArjnCofDxqvaXjzygSj').then(unspentOutputsResult => {
            let succeeded = false
            succeeded = unspentOutputsResult.hasOwnProperty('outputs')
            if(!succeeded){
                assert.ok(succeeded, "Result " + unspentOutputsResult + " doesn't have property outputs")
            }else{
                let idx = 0
                unspentOutputsResult.outputs.forEach(actual => {
                    succeeded = succeeded && assertEqualsJson(actual, expected)
                })
                assert.ok(succeeded, 'Incorrect values')
            }
        }, error => {
            assert.ok(false, error.message)
        })
    })

    /*
     * Test to find whether multiple normal results was correct or not (doesn't test exceptions)
     */
    it("Test to find whether multiple normal results was correct or not (doesn't test exceptions)", () => {
        let expectedResult = {
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
        service.getUnspentOutputs('1efs45wsKYTbFf1dmfAsGnPnqmJxgpmYp').then(unspentOutputsResult => {
            let succeeded = false
            succeeded = unspentOutputsResult.hasOwnProperty('outputs')
            if(!succeeded){
                assert.ok(succeeded, "Result " + unspentOutputsResult + " doesn't have property outputs")
            }else{
                let idx = 0
                unspentOutputsResult.outputs.forEach(actual => {
                    let expected = expectedResult.outputs[idx++]
                    succeeded = succeeded && assertEqualsJson(actual, expected)
                })
            }
        }, error => {
            assert.ok(false, error.message)
        })
        
    })

    /*
     * Test to check for error, if address doesn't have unspent outputs
     */
    it("Test to check for error, if address doesn't have unspent outputs", () => {
        return service.getUnspentOutputs('1Aff4FgrtA1dZDwajmknWTwU2WtwUvfiXa').then(unspentOutputsResult => {
            assert.ok(false, "error wasn't thrown")
        }, error => {
            assert.strictEqual(error.message, 'No free outputs to spend', 'Incorrect error message')
        })
    })

})