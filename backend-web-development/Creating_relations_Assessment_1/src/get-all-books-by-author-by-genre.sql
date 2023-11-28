SELECT books.*, authors.*, genres.*
FROM books_genres
JOIN genres ON books_genres.genre_id = genres.genre_id
JOIN books ON books_genres.book_id = books.book_id
JOIN authors ON books.author_id = authors.author_id
WHERE authors.author_name = 'Leo Tolstoy'
AND genres.genre_name IN ('autobiography', 'history');