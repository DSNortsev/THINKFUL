CREATE TABLE artists_concerts (
    artist_id INT,
    concert_id INT,
    scheduled_start_at TIME,
    scheduled_end_at TIME,
    PRIMARY KEY (artist_id, concert_id),
    FOREIGN KEY (artist_id) REFERENCES artists(artist_id),
    FOREIGN KEY (concert_id) REFERENCES concerts(concert_id)
)