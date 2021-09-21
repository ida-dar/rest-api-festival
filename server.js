const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(express.urlencoded({ extended: false }));

const db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
];

app.get('/testimonials', (req, res) => {
  res.json(db);
});

app.get('/testimonials/:id', (req, res) => {
  const id = req.params.id;

  for(let el of db){
    let stringId = el.id;
    if(stringId.toString() === id){
      res.json(el);
    }
  }
});

app.get('/testimonials/random', (req, res) => { // to do
  const random = db[Math.floor(Math.random() * db.length)];

  res.json(random);
});

app.post('/testimonials', (req, res) => {
  const { author, text } = req.body;

  if(author && text) {
    const id = uuidv4();
    const obj = { id: id, author: author, text: text };
    db.push(obj);
    
    res.json({ message: 'OK' });
  } else {
    res.json({ message: 'Something went wrong' });
  }
});

app.put('/testimonials/:id', (req, res) => {
  const { author, text } = req.body;
  const id = req.params.id;

  if(author && text) {
    const newData = { id: id, author: author, text: text };
    const objIndex = db.findIndex((obj => obj.id == id));
    db[objIndex] = newData;

    res.json({ message: 'OK' });
  } else {
    res.json({ message: 'Something went wrong' });
  }
});

app.delete('/testimonials/:id', (req, res) => {
  const id = req.params.id;

  for(let el of db){
    let stringId = el.id;
    if(stringId.toString() === id){
      db.splice(db.indexOf(el), 1);

      res.json({ message: 'OK' });
    }
  }
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
