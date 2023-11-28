SELECT *
FROM books
LEFT JOIN authors ON books.author_id = authors.author_id
WHERE books.publication_year < 2005 AND authors.nationality <> 'United States of America';