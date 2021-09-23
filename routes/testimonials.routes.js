const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
  const random = db.testimonials[Math.floor(Math.random() * db.testimonials.length)];

  res.json(random);
});

router.route('/testimonials/:id').get((req, res) => {
  const id = req.params.id;
  const obj = db.testimonials.find(el => el.id.toString() === id);

  res.json(obj);
});

router.route('/testimonials').post((req, res) => {
  const { author, text } = req.body;

  if(author && text) {
    const id = uuidv4();
    const obj = { id: id, author: author, text: text };
    db.testimonials.push(obj);
    
    res.json({ message: 'OK' });
  } else {
    res.json({ message: 'Something went wrong' });
  }
});

router.route('/testimonials/:id').put((req, res) => {
  const { author, text } = req.body;
  const id = req.params.id;

  if(author && text) {
    const newData = { id: id, author: author, text: text };
    const objIndex = db.testimonials.findIndex((obj => obj.id.toString() == id));
    db.testimonials[objIndex] = newData;

    res.json({ message: 'OK' });
  } else {
    res.json({ message: 'Something went wrong' });
  }
});

router.route('/testimonials/:id').delete((req, res) => {
  const id = req.params.id;

  const objIndex = db.testimonials.findIndex((obj => obj.id.toString() == id));
  db.testimonials.splice(objIndex, 1);

  res.json({ message: 'OK' });
});

module.exports = router;
