const db = require('../db/index')

exports.createArtist = async (req, res) => {
    const { name, genre } = req.body
  
    try {
      const { rows: [ artist ] } = await db.query('INSERT INTO Artists (name, genre) VALUES ($1, $2) RETURNING *', [name, genre])
      // const databaseResponse = await db.query(`INSERT INTO Artists (name, genre) VALUES ('${name}', '${genre}') RETURNING *`)
      // console.log(databaseResponse)
      // const artist = databaseResponse.rows[0]   
      res.status(201).json(artist)
    } catch (err) {
      res.status(500).json(err.message)
    }
  }

exports.readArtist = async (_req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM Artists')
    res.status(200).json(rows)
  } catch (err) {
    res.status(500).json(err.message)
  }
}


exports.getArtistById = async (req, res) => {
  try {
      console.log(req.params);
      const id = req.params.artistId;
      console.log(id);

      const { rows: [ artist ] } = await db.query(`SELECT * FROM Artists WHERE id = $1`, [ id ]);

      if (!artist) {
        return res.status(404).json({ message: `artist ${id} does not exist` });
      }

      res.status(200).json(artist);
  } catch (err) {
      res.status(500).json(err.message);
  }
}

exports.putArtistById = async (req, res) => {
  try {
      const id = req.params.artistId;
      const name = req.body.name;
      const genre = req.body.genre;

      const { rows: [ artist ] } = await db.query(`UPDATE Artists SET name = $1, genre = $2 WHERE id = $3 RETURNING *`, [ name, genre, id ]);

      if (!artist) {
        return res.status(404).json({ message: `artist ${id} does not exist` });
      } 

      res.status(200).json(artist);
  } catch (err) {
      res.status(500).json(err.message);
  }
}

exports.patchArtistById = async (req, res) => {
  try {
      const id = req.params.artistId;
      const name = req.body.name;
      const genre = req.body.genre;

      let query;
      let params;

      if (name && genre) {
        query = `UPDATE Artists SET name = $1, genre = $2 WHERE id = $3 RETURNING *`
        params = [name, genre, id]
      } else if (name) {
        query = `UPDATE Artists SET name = $1 WHERE id = $2 RETURNING *`
        params = [name, id]
      } else if (genre) {
        query = `UPDATE Artists SET genre = $1 WHERE id = $2 RETURNING *`
        params = [genre, id]
      }

      const { rows: [ artist ] } = await db.query(query, params)

      if (!artist) {
        return res.status(404).json({ message: `artist ${id} does not exist` });
      } 

      res.status(200).json(artist);
  } catch (err) {
      res.status(500).json(err.message);
  }
}


exports.deleteArtistById = async (req, res) => {
  try {
      const id = req.params.artistId;

      const { rows: [ artist ] } = await db.query(`DELETE FROM Artists WHERE id = $1 RETURNING *`, [ id ]);

      if (!artist) {
        return res.status(404).json({ message: `artist ${id} does not exist` });
      } 

      res.status(200).json(artist);
  } catch (err) {
      res.status(500).json(err.message);
  }
}