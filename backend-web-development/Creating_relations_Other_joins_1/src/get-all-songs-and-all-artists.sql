SELECT artists.artist_name as artist, songs.song_name, songs.album_name as album
FROM artists
FULL JOIN songs ON artists.artist_id = songs.artist;