SELECT artists.artist_name, songs.song_name, songs.album_name
FROM artists
JOIN songs ON artists.artist_id = songs.artist
WHERE UPPER(songs.song_name) LIKE 'THE%';