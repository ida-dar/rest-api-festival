const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Concert = require('../../../models/concert.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('DELETE /api/concerts', () => {

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

  it('"/:id" should delete chosen document and return success', async () => {
    const res = await request(server).delete('/api/concerts/5d9f1140f10a81216cfd4408');
    const deleted = await Concert.findOne({ performer: 'Performer #1' })
    expect(res.status).to.be.equal(200);
    expect(deleted).to.be.null;
  });

});
