const { expect } = require('chai')
const request = require('supertest')
const db = require('../src/db')
const app = require('../src/app')

describe('Delete Album', () => {
    let artist
    let album
    beforeEach(async () => {
      const { rows } = await db.query('INSERT INTO Artists (id, name, genre) VALUES ($1, $2, $3) RETURNING *', [
        1,
        'Tame Impala',
        'rock',
      ])
  
      artist = rows[0]
      console.log(artist)
  
      const response = await db.query(`INSERT INTO Albums (album_name, year, artistId) VALUES ($1, $2, $3) RETURNING *`, [
          'A Night at the Opera',
          1975,
          1
        ])
  
      album = response.rows[0]
      console.log(album)
  
    })

  describe('DELETE /albums/{id}', () => {
    it('deletes the artist and returns the deleted data', async () => {
      const { status, body } = await request(app).delete(`/albums/${album.id}`).send()

      expect(status).to.equal(200)

      expect(body).to.deep.equal({ id: album.id, album_name: 'A Night at the Opera', year: 1975, artistid: 1 })
    })

    it('returns a 404 if the album does not exist', async () => {
      const { status, body } = await request(app).delete('/albums/999999999').send()

      expect(status).to.equal(404)
      expect(body.message).to.equal('album 999999999 does not exist')
    })
  })
})