const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
  const id = req.params.id;
  const obj = db.seats.find(el => el.id === parseInt(id));

  res.json(obj);
});

router.route('/seats').post((req, res) => {
  const { day, seat, client, email } = req.body;

  if(typeof(day) === 'number' &&
    typeof(seat) === 'number' && 
    typeof(client) === 'string' && 
    (typeof(email) === 'string')
  ) {
    const id = uuidv4();
    const obj = { 
      id: id, 
      day: day, 
      seat: seat, 
      client: client,
      email: email,
    };

    const validate = db.seats.some(el => (el.day === obj.day) && (el.seat === obj.seat));

    if(validate){
      res.status(409).json({ message: 'This seat is already booked. Please select another one.' });
    } else {
      db.seats.push(obj);
      res.json({ message: 'OK' });
    }
    
  } else {
    res.json({ message: 'Something went wrong' });
  }
});

router.route('/seats/:id').put((req, res) => {
  const { day, seat, client, email } = req.body;
  const id = req.params.id;

  if(typeof(day) === 'number' &&
    typeof(seat) === 'number' && 
    typeof(client) === 'string' && 
    (typeof(email) === 'string')
  ) {
    const newData = { 
      id: id, 
      day: day, 
      seat: seat, 
      client: client,
      email: email,
    };
    const objIndex = db.seats.findIndex((obj => obj.id == id));
    db.seats[objIndex] = newData;

    res.json({ message: 'OK' });
  } else {
    res.json({ message: 'Something went wrong' });
  }
});

router.route('/seats/:id').delete((req, res) => {
  const id = req.params.id;

  const objIndex = db.seats.findIndex((obj => obj.id == id));
  db.seats.splice(objIndex, 1);

  res.json({ message: 'OK' });
});

module.exports = router;
