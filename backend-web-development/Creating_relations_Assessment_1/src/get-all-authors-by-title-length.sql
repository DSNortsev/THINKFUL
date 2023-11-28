SELECT authors.*, books.*
FROM authors
JOIN books ON authors.author_id = books.author_id
WHERE LENGTH(books.title) > 25;