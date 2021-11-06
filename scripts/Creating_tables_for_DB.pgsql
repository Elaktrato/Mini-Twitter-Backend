drop table messages;
drop table users;

CREATE TABLE users (
    id serial primary key,
    name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    PASSWORD varchar(255) NOT NULL,
    image_url varchar(255)
);

CREATE TABLE messages (
    id serial PRIMARY KEY,
    message text NOT NULL, 
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_user int references users(id),
    image_url varchar(255)
);

