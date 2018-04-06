const chai = require('chai')
const chaiHttp = require('chai-http')
const chaiJson = require('chai-json')
const app = require('../app')
const should = chai.should()

chai.use(chaiHttp)
chai.use(chaiJson)

/* 
 * Test for app's GET /address/:bitcoin_addr endpoint
 */
describe("Test for app's GET /address/:bitcoin_addr endpoint", () => {

    /* 
     * Test for correct address with zero unspent transactions
     */
    it("Should test correct address with 0 unspent transactions", done => {
        chai.request(app)
            .get('/address/1Aff4FgrtA1dZDwajmknWTwU2WtwUvfiXa')
            .end((err, res) => {
                res.should.have.status(500)
                res.text.should.be.a('string')
                res.text.should.be.equal('No free outputs to spend')
                done()
            })
    })

    /* 
     * Test for correct address with one unspent transactions
     */
    it("Should test correct address with one unspent transactions", done => {
        
        let expected  = {
            "outputs": [
                {
                    "value": 8991,
                    "tx_hash": "233e8df5d077c71fbb47f6c033e321526430ee8089aee13f81d54fbaf66f9bdb",
                    "output_idx": 1
                }
            ]
        }
        chai.request(app)
            .get('/address/19zfdQYYYp4ycMhArjnCofDxqvaXjzygSj')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.jsonObj()
                res.body.should.be.deep.equal(expected)
                done()
            })
    })

    /* 
     * Test for correct address with multiple unspent transactions
     */
    it("Should test correct address with multiple unspent transactions", done => {
        
        let expected  = {
            "outputs": [
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
        chai.request(app)
            .get('/address/1efs45wsKYTbFf1dmfAsGnPnqmJxgpmYp')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.jsonObj()
                res.body.should.be.deep.equal(expected)
                done()
            })
    })

    /* 
     * Test for incorrect address
     */
    it("Should incorrect address result", done => {
        chai.request(app)
            .get('/address/1Aff4FgrtA1dZDwajmknWTwU2WtwUvfiXa1')
            .end((err, res) => {
                res.should.have.status(500)
                res.text.should.be.a('string')
                res.text.should.be.equal('Invalid Bitcoin Address')
                done()
            })
    })

})