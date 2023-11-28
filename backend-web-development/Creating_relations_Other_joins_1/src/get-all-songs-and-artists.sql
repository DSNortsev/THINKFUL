SELECT artists.artist_name, songs.song_name, songs.album_name
FROM artists
RIGHT JOIN songs ON artists.artist_id = songs.artist;