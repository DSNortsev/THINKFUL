CREATE TABLE artists (
    artist_id INTEGER PRIMARY KEY generated by default AS identity,
    artist_name VARCHAR(255),
    genre_name VARCHAR(100)
);