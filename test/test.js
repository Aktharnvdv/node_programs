const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

describe('GET /api/greet', () => {
    it('it should GET a greeting message', (done) => {
        chai.request('http://localhost:3000')
            .get('/api/greet')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message').eql('Hello, World!');
                done();
            });
    });
});
