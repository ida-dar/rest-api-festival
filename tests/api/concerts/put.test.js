const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Concert = require('../../../models/concert.model.js');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('PUT /api/concerts', () => {

  before(async () => {
    const testOne = new Concert({ 
      _id: '5d9f1140f10a81216cfd4408', 
      performer: 'Performer #1', 
      genre: 'Rock', 
      price: 25, 
      day: 1, 
      image: 'image' 
    });
    await testOne.save();
  });
  
  after(async () => {
    await Concert.deleteMany();
  });

  it('"/:id" should update chosen document and return success', async () => {
    const res = await request(server).put('/api/concerts/5d9f1140f10a81216cfd4408').send({ genre: 'Updated' });
    const updated = await Concert.findOne({ genre: 'Updated' });
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    expect(updated).to.not.be.null;
  });

});
