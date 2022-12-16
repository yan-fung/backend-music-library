const express = require('express');

const artistRouter = express.Router();

const artistController = require('../controllers/artist');

artistRouter.post('/', artistController.createArtist)
artistRouter.get('/', artistController.readArtist)


module.exports = artistRouter;
