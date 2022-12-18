const express = require('express')

const albumRouter = express.Router();

const albumController = require('../controllers/album')

albumRouter.post('/:artistId/album', albumController.createAlbum)

module.exports = albumRouter;