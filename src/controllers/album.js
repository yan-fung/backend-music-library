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

  exports.putAlbumbyId = async (req, res) => {
    try {
        const id = req.params.albumId;
        const {album_name, year, artistId} = req.body;
  
        const { rows: [ album ] } = await db.query(`UPDATE Albums SET album_name = $1, year = $2, artistId = $3 RETURNING *`, [ album_name, year, artistId ]);
  
        if (!album) {
          return res.status(404).json({ message: `album ${id} does not exist` });
        } 
  
        res.status(200).json(album);
    } catch (err) {
        res.status(500).json(err.message);
    }
  }

  exports.patchAlbumById = async (req, res) => {
    try {
        const id = req.params.albumId;
        const {album_name, year} = req.body;
        console.log(id)
        console.log(album_name)
        console.log(year)
  
        let query;
        let params;
  
        if (album_name && year) {
          query = `UPDATE Albums SET album_name = $1, year = $2 WHERE id = $3 RETURNING *`
          params = [album_name, year, id]
        } else if (album_name) {
          query = `UPDATE Albums SET album_name = $1 WHERE id = $2 RETURNING *`
          params = [album_name, id]
        } else if (year) {
          query = `UPDATE Albums SET year = $1 WHERE id = $2 RETURNING *`
          params = [year, id]
        }
  
        const { rows: [ album ] } = await db.query(query, params)
  
        if (!album) {
          return res.status(404).json({ message: `album ${id} does not exist` });
        } 
  
        res.status(200).json(album);
    } catch (err) {
        res.status(500).json(err.message);
    }
  }

  exports.deleteAlbumById = async (req, res) => {
    try {
        const id = req.params.albumId;

        const { rows: [ album ] } = await db.query(`DELETE FROM Albums WHERE id = $1 RETURNING *`, [ id ]);
  
        if (!album) {
          return res.status(404).json({ message: `album ${id} does not exist` });
        } 
  
        res.status(200).json(album);
    } catch (err) {
        res.status(500).json(err.message);
    }
  }