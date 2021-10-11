const express = require('express');
const router = express.Router();

const SeatController = require('../controllers/seats.controller');

router.get('/seats', SeatController.getAll);
router.get('/seats/:id', SeatController.getOneById);
router.post('/seats', SeatController.postOne);
router.put('/seats/:id', SeatController.putOneById);
router.delete('/seats/:id', SeatController.deleteById);

module.exports = router;
