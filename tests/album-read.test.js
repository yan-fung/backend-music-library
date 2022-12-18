// tests/album-read.test.js
const { expect } = require('chai')
const request = require('supertest')
const db = require('../src/db')
const app = require('../src/app')

describe('Read Album', () => {
  let albums
  let artists
  beforeEach(async () => {
    const artistresponses = await Promise.all([
        db.query('INSERT INTO Artists (id, name, genre) VALUES( $1, $2, $3) RETURNING *', [
          1,
          'Tame Impala',
          'rock',
        ]),
        db.query('INSERT INTO Artists (id, name, genre) VALUES( $1, $2, $3) RETURNING *', [
          2,
          'Kylie Minogue',
          'pop',
        ]),
        db.query('INSERT INTO Artists (id, name, genre) VALUES( $1, $2, $3) RETURNING *', [
          3,
          'Tame Antelope',
          'jazz',
        ]),
      ])
  
      artists = artistresponses.map(({ rows }) => rows[0])
      console.log(artists)

    const albums_responses = await Promise.all([
      db.query(`INSERT INTO Albums (album_name, year, artistId) VALUES( $1, $2, $3) RETURNING *`, [
        'A Night at the Opera',
        1975,
        1
      ]),
      db.query(`INSERT INTO Albums (album_name, year, artistId) VALUES( $1, $2, $3) RETURNING *`, [
        'Sheer Heart Attack',
        1974,
        2
      ]),
      db.query(`INSERT INTO Albums (album_name, year, artistId) VALUES( $1, $2, $3) RETURNING *`, [
        'A Day at the Races',
        1976,
        3
      ]),
    ])

    albums = albums_responses.map(({ rows }) => rows[0])
    console.log(albums)
  })

  describe('GET /albums', () => {
    it('returns all albums records in the database', async () => {
      const { status, body } = await request(app).get('/albums').send()

      expect(status).to.equal(200)
      expect(body.length).to.equal(3)
      console.log(status)
      console.log(body)

      body.forEach((albumRecord) => {
        const expected = albums.find((a) => a.id === albumRecord.id)

        expect(albumRecord).to.deep.equal(expected)
      })
    })
  })

  describe('GET /albums/{id}', () => {
    it('returns the album with the correct id', async () => {
      const { status, body } = await request(app).get(`/albums/${albums[0].id}`).send()

      expect(status).to.equal(200)
      expect(body).to.deep.equal(albums[0])
    })

    it('returns a 404 if the artist does not exist', async () => {
      const { status, body } = await request(app).get('/albums/999999999').send()

      expect(status).to.equal(404)
      expect(body.message).to.equal('album 999999999 does not exist')
    })
  })
});


