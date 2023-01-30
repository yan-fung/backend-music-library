# Music Library Express API

## Introduction

The music libary API built with NODE JS, Express, for PostgreSQL using Sequelize ORM. The user can create, retrieve, update and delete (CRUD operations) for both artist and album in database.

## Quick Start and Commands

1. Clone the repo:

```bash
git clone https://github.com/yan-fung/music-library-.git
```

2. Run the development server for the app. It listens on port 4000.

```bash
npm start
```

3. To test the codes in tests folder

```bash
npm test
```

4. Download Postman and pgAdmin and use them to check if the CRUD operations is working.

- [Postman](https://www.postman.com/downloads/)
- [pgAdmin](https://www.pgadmin.org/download/)

### Development Mode

The server side Express code will be served by a node server using [Nodemon](https://nodemon.io/) which helps in automatically restarting the server whenever server side code updates.

## API Endpoints and Methods

Artists endpoints and methods

| **Methods** |   **Urls**   |     **Actions**      |
| :---------- | :----------: | :------------------: |
| GET         |   /artists   |   get all artists    |
| GET         | /artists/:id |   get artist by id   |
| POST        |   /artists   |    add new artist    |
| PUT         | /artists/:id | update artist by id  |
| PATCH       | /artists/:id | update artists by id |
| DELETE      | /artists/:id | remove artists by id |

Albums endpoints and methods

| **Methods** |        **Urls**         |              **Actions**              |
| :---------- | :---------------------: | :-----------------------------------: |
| GET         |         /albums         |            get all albums             |
| GET         |       /albums/:id       |            get album by id            |
| POST        | /albums/:artistId/album | add new albums to the specific artist |
| PUT         |       /albums/:id       |          update album by id           |
| PATCH       |       /albums/:id       |          update album by id           |
| DELETE      |       /albums/:id       |          remove album by id           |
