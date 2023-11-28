SELECT artists.artist_id, artists.artist_name, songs.song_name
FROM artists
JOIN songs ON artists.artist_id = songs.artist;