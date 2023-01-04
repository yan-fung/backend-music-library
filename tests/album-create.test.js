//tests/album-create.js
const { expect } = require('chai');
const request = require('supertest');
const db = require('../src/db/index')
const app = require('../src/app');

describe('create album', () => {
  describe('/albums', () => {
    describe('POST', () => {
    let artist
    beforeEach(async () => {
        const { rows } = await db.query('INSERT INTO Artists (name, genre) VALUES( $1, $2) RETURNING *', [
        'Queen',
        'rock',
        ])
    
        artist = rows[0]
        console.log(artist)
    })

      it('creates a new album in the database', async () => {
        console.log(`/artists/${artist.id}/album`)
        const { status, body } = await request(app).post(`/artists/${artist.id}/album`).send({
          album_name: 'A Night at the Opera',
          year: 1974,
          artistId: `${artist.id}`
        })

        expect(status).to.equal(201);
        expect(body.album_name).to.equal('A Night at the Opera');
        expect(body.year).to.equal(1974);
        expect(body.artistid).to.equal(artist.id);

        const { rows: [ albumData ] } = await db.query(
          `SELECT * FROM Albums WHERE id = ${body.id}`
        )
        expect(albumData.album_name).to.equal('A Night at the Opera')
      });
    });
  });
});