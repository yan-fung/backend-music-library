# Book Library Express API 

## Introduction
The book libary API built with NODE JS, Express, for PostgreSQL using Sequelize ORM. The user can create, retrieve, update and delete (CRUD operations) for both artist and album in database.

### Development mode
The server side Express code will be served by a node server using [Nodemon](https://nodemon.io/) which helps in automatically restarting the server whenever server side code updates.

## Project setup


## API endpoints and methods
Artists endpoints and methods

| **Methods**   |                        **Urls**                         |                       **Actions**                       |
|:--------------|:-------------------------------------------------------:|:-------------------------------------------------------:|
| GET           |                      /artists                           |                    get all artists                      | 
| GET           |                     /artists/:id                        |                   get artist by id                      |
| POST          |                     /artists                            |                    add new artist                       |
| PUT           |                    /artists/:id                         |                  update artist by id                    |
| PATCH         |                    /artists/:id                         |                  update artists by id                   |
| DELETE        |                    /artists/:id                         |                  remove artists by id                   |

Albums endpoints and methods

| **Methods**   |                        **Urls**                         |                       **Actions**                       |
|:--------------|:-------------------------------------------------------:|:-------------------------------------------------------:|
| GET           |                      /albums                            |                    get all albums                       | 
| GET           |                     /albums/:id                         |                   get album by id                       |
| POST          |                    /albums/:artistId/album              |            add new albums to the specific artist        |
| PUT           |                    /albums/:id                          |                  update album by id                     |
| PATCH         |                    /albums/:id                          |                  update album by id                     |
| DELETE        |                    /albums/:id                          |                  remove album by id                     |