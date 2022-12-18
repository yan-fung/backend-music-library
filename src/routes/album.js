const express = require('express')

const albumRouter = express.Router();

const albumController = require('../controllers/album')

albumRouter.post('/:artistId/album', albumController.createAlbum)
albumRouter.get('/', albumController.readAlbum)
albumRouter.get('/:albumId', albumController.getAlbumbyId)
albumRouter.put('/:albumId', albumController.putAlbumbyId)
albumRouter.patch('/:albumId', albumController.patchAlbumById)
albumRouter.delete('/:albumId', albumController.deleteAlbumById)


module.exports = albumRouter;