CREATE TABLE songs (
    song_id INTEGER PRIMARY KEY generated by default AS identity,
    song_name VARCHAR(100) DEFAULT 'no song title',
    album_name VARCHAR(100) DEFAULT 'no album title',
    artist INTEGER REFERENCES artists(artist_id)
--     FOREIGN KEY (artist_id) REFERENCES artists(artist_id)
);