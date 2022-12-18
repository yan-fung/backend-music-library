const db = require('../db/index')

exports.createAlbum = async (req, res) => {
    const id = req.params.artistId;
    const {album_name, year, artistId} = req.body;


    if (id) {
        try {
            const { rows: [ album ] } = await db.query('INSERT INTO Albums (album_name, year, artistId) VALUES ($1, $2, $3) RETURNING *', [album_name, year, artistId])
            res.status(201).json(album)
          } catch (err) {
            res.status(500).json(err.message)
          }
    }
  }
