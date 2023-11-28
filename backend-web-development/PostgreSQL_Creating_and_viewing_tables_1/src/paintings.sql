CREATE TABLE paintings (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    medium VARCHAR(255) NOT NULL,
    description TEXT
);