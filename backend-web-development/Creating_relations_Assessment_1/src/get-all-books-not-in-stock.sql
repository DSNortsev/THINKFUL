SELECT *
FROM books
JOIN authors ON books.author_id = authors.author_id
WHERE books.in_stock = false;