CREATE TABLE artists (
    artist_id SERIAL PRIMARY KEY,
    artist_name VARCHAR NOT NULL UNIQUE,
    birthday DATE NOT NULL,
    birthplace VARCHAR NOT NULL,
    is_alive BOOLEAN NOT NULL DEFAULT true
);