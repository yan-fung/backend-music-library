const express = require('express');

const artistRouter = express.Router();

const artistController = require('../controllers/artist');


artistRouter.post('/', artistController.createArtist)
artistRouter.get('/', artistController.readArtist)
artistRouter.get('/:artistId', artistController.getArtistById)
artistRouter.put('/:artistId', artistController.putArtistById)
artistRouter.patch('/:artistId', artistController.patchArtistById)
artistRouter.delete('/:artistId', artistController.deleteArtistById)

module.exports = artistRouter;
