const Concert = require('../models/concert.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Concert.find({}));
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getByPerformer = async (req, res) => {
  try {
    const performer = req.params.performer.replace('-', ' ');
    const concert = await Concert.find({ performer: performer });
    if(!concert) res.status(404).json({ message: 'Not found...' });
    else res.json(concert);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}; 

exports.getByGenre = async (req, res) => {
  try {
    const concert = await Concert.find({ genre: req.params.genre });
    if(!concert) res.status(404).json({ message: 'Not found...' });
    else res.json(concert);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getByPrice = async (req, res) => {
  try {
    const priceMin = parseInt(req.params.price_min);
    const priceMax = parseInt(req.params.price_max);

    const concert = await Concert.find({ price: { $gte: priceMin, $lte: priceMax } });
    if(!concert) res.status(404).json({ message: 'Not found...' });
    else res.json(concert);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getByDay = async (req, res) => {
  try {
    const day = parseInt(req.params.day);
    const concert = await Concert.find({ day: day });
    if(!concert) res.status(404).json({ message: 'Not found...' });
    else res.json(concert);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getOneById = async (req, res) => {
  try {
    const concert = await Concert.findById(req.params.id);
    if(!concert) res.status(404).json({ message: 'Not found...' });
    else res.json(concert);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.postOne = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;
  
  try {
    const newConcert = new Concert({ 
      performer: performer, 
      genre: genre, 
      price: price, 
      day: day, 
      image: image
    });
    await newConcert.save();
    res.json({ message: 'OK' });
  } 
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.putOneById = async (req, res) => {
  try {
    const { performer, genre, price, day, image } = req.body;
    const concert = await Concert.findById(req.params.id);
    if(concert) { 
      await Concert.updateOne({ _id: req.params.id }, { $set: {
        performer: performer,
        genre: genre, 
        price: price, 
        day: day, 
        image: image 
      }});
      res.json(concert);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteById = async (req, res) => {
  try {
    const id = req.params.id;
    const concert = await Concert.findById(id);
    if(concert) {
      await Concert.deleteOne({ _id: id });
      res.json(concert);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err){
    res.status(500).json({ message: err });
  }
};
