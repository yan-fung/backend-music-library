const { expect } = require('chai')
const request = require('supertest')
const db = require('../src/db')
const app = require('../src/app')

describe('Update Albums', () => {
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

  describe('PUT /albums/{id}', () => {
    it('replaces the albums and returns the updated record', async () => {
      const { status, body } = await request(app).put(`/albums/${album.id}`).send({ album_name: 'something different', year: 1984, artistId: 1 })
      console.log(`/albums/${artist.id}`)
      console.log(body)

      expect(status).to.equal(200)

      expect(body).to.deep.equal({ id: album.id, album_name: 'something different', year: 1984, artistid: 1 })
    })
  });

  describe('PATCH /albums/{id}', () => {
    it('updates the album and returns the updated record', async () => {
      const { status, body } = await request(app).patch(`/albums/${album.id}`).send({ album_name: 'Enchanted', year: 1984, artistId: 1 })
      console.log(`/albums/${album.id}`)
      console.log(body)


      expect(status).to.equal(200)


      expect(body).to.deep.equal({ id: album.id, album_name: 'Enchanted', year: 1984, artistid: artist.id })
    })

    it('returns a 404 if the artist does not exist', async () => {
      const { status, body } = await request(app).patch('/albums/999999999').send({ album_name: 'something different' })

      expect(status).to.equal(404)
      expect(body.message).to.equal('album 999999999 does not exist')
    })
  })
})