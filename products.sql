CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    desc VARCHAR(255),
    quantity VARCHAR(255),
    completed BOOLEAN DEFAULT FALSE
);