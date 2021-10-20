const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Concert = require('../../../models/concert.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {

  before(async () => {
    const testConcertOne = new Concert({ _id: '5d9f1140f10a81216cfd4408', performer: 'John Doe', genre: 'Rock', price: 25, day: 1, image: 'image' });
    await testConcertOne.save();
  
    const testConcertTwo = new Concert({ _id: '5d9f1159f81ce8d1ef2bee48', performer: 'Tom Cruise', genre: 'Rock', price: 25, day: 2, image: 'image' });
    await testConcertTwo.save();
  });
  
  after(async () => {
    await Concert.deleteMany();
  });

  it('"/" should return all concerts', async () => {
    const res = await request(server).get('/api/concerts');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
  });

  it('"/:id" should return one concert by :id', async () => {
    const res = await request(server).get('/api/concerts/5d9f1140f10a81216cfd4408');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.not.be.null;
  });

  it('"/performer/:performer" should return concert(s) filered by :performer', async () => {
    const res = await request(server).get('/api/concerts/performer/John-Doe');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.not.be.null;
  });

  it('"/genre/:genre" should return concert(s) filered by :genre', async () => {
    const res = await request(server).get('/api/concerts/genre/Rock');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.not.be.null;
  });

  it('"/price/:price_min/:price_max" should return one concert filered by :price', async () => {
    const res = await request(server).get('/api/concerts/price/25/55');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.not.be.null;
  });

  it('"/day/:day" should return concert(s) filered by :day', async () => {
    const res = await request(server).get('/api/concerts/day/2');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.not.be.null;
  });

});
