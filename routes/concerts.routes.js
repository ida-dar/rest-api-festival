const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
  const id = req.params.id;
  const obj = db.concerts.find(el => el.id === parseInt(id));

  res.json(obj);
});

router.route('/concerts').post((req, res) => {
  const { performer, genre, price, day, image } = req.body;

  if(performer && genre && price && day && image) {
    const id = uuidv4();
    const obj = { 
      id: id, 
      performer: performer, 
      genre: genre, 
      price: price, 
      day: day, 
      image: image, 
    };
    db.concerts.push(obj);
    
    res.json({ message: 'OK' });
  } else {
    res.json({ message: 'Something went wrong' });
  }
});

router.route('/concerts/:id').put((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  const id = req.params.id;

  if(performer && genre && price && day && image) {
    const newData = { 
      id: id, 
      performer: performer, 
      genre: genre, 
      price: price, 
      day: day, 
      image: image,
    };
    const objIndex = db.concerts.findIndex((obj => obj.id == id));
    db.concerts[objIndex] = newData;

    res.json({ message: 'OK' });
  } else {
    res.json({ message: 'Something went wrong' });
  }
});

router.route('/concerts/:id').delete((req, res) => {
  const id = req.params.id;

  const objIndex = db.concerts.findIndex((obj => obj.id == id));
  db.concerts.splice(objIndex, 1);

  res.json({ message: 'OK' });
});

module.exports = router;
