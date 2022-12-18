-- migrations/02-create-album-table.sql
CREATE TABLE Albums (
    id SERIAL PRIMARY KEY,
    album_name VARCHAR(255) NOT NULL,
    year INT NOT NULL,
    artistId INT NOT NULL,
    FOREIGN KEY (artistId)
    REFERENCES Artists(id)  
);