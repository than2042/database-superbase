CREATE TABLE  users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL
)

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    image BYTEA,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    users_id INTEGER REFERENCES users(id)
)


INSERT INTO 
users(name, email, password) 
VALUES('sue', 'sue@gmail.com', '5678');

INSERT INTO 
posts (title, content, users_id) 
VALUES('First Post', 'this is a first post', 1);