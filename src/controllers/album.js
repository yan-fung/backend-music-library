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

  exports.readAlbum = async (_req, res) => {
    try {
      const { rows } = await db.query('SELECT * FROM Albums')
      res.status(200).json(rows)
    } catch (err) {
      res.status(500).json(err.message)
    }
  }

  exports.getAlbumbyId = async (req, res) => {
    try {
        const id = req.params.albumId;
  
        const { rows: [ album ] } = await db.query(`SELECT * FROM Albums WHERE id = $1`, [ id ]);
  
        if (!album) {
          return res.status(404).json({ message: `album ${id} does not exist` });
        }
  
        res.status(200).json(album);
    } catch (err) {
        res.status(500).json(err.message);
    }
  }