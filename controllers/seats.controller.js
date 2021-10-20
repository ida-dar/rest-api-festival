const Seat = require('../models/seat.model');
const sanitize = require('mongo-sanitize');

exports.getAll = async (req, res) => {
  try {
    res.json(await Seat.find({}));
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getOneById = async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if(!seat) res.status(404).json({ message: 'Not found...' });
    else res.json(seat);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.postOne = async (req, res) => {
  const { day, seat, client, email } = req.body;
  
  try {
    const cleanClient = await sanitize(client);
    const cleanEmail = await sanitize(email);

    const newSeat = new Seat({ 
      day: day,  
      seat: seat, 
      client: cleanClient, 
      email: cleanEmail, 
    });
    await newSeat.save();
    res.json({ message: 'OK' });
  } 
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.putOneById = async (req, res) => {
  const { day, seat, client, email } = req.body;

  try {
    const seats = await Seat.findById(req.params.id);
    if(seats) {
      seats.day = day, 
      seats.seat = seat, 
      seats.client = client, 
      seats.email = email,
      await seats.save();
      res.json(seats);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteById = async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if(seat) {
      await Seat.deleteOne({ _id: req.params.id });
      res.json(seat);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err){
    res.status(500).json({ message: err });
  }
};
