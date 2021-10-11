const express = require('express');
const router = express.Router();

const ConcertController = require('../controllers/concerts.controller');

router.get('/concerts', ConcertController.getAll);
router.get('/concerts/:id', ConcertController.getOneById);
router.post('/concerts', ConcertController.postOne);
router.put('/concerts/:id', ConcertController.putOneById);
router.delete('/concerts/:id', ConcertController.deleteById);

module.exports = router;
