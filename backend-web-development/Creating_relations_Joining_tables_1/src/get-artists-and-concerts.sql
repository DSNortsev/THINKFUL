SELECT artists.artist_name, concerts.concert_name, concerts.concert_date, artists_concerts.scheduled_start_at, artists_concerts.scheduled_end_at
FROM artists
JOIN artists_concerts ON artists.artist_id = artists_concerts.artist_id
JOIN concerts ON artists_concerts.concert_id = concerts.concert_id