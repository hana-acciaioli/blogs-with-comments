-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS comments;

DROP TABLE IF EXISTS blogs;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email VARCHAR,
  password_hash VARCHAR NOT NULL,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL
);

CREATE TABLE blogs (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title VARCHAR NOT NULL,
  body VARCHAR NOT NULL
);

CREATE TABLE comments (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id BIGINT,
  blog_id BIGINT,
  detail VARCHAR NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (blog_id) REFERENCES blogs(id)
);

INSERT INTO
  users (email, password_hash, first_name, last_name)
VALUES
  (
    'alvin@example.com',
    'notarealpasswordhash',
    'Alvin',
    'A'
  ),
  (
    'bob@example.com',
    'notarealpasswordhash',
    'Bob',
    'B'
  ),
  (
    'carole@example.com',
    'notarealpasswordhash',
    'Carole',
    'C'
  );

INSERT INTO
  blogs (title, body)
VALUES
  (
    'Underwater Basket Weaving - the new trend sweeping the nation',
    'Freegan hot chicken small batch, copper mug mustache pug JOMO. Kickstarter waistcoat actually ethical lo-fi, butcher hella stumptown. Roof party bitters woke chambray.'
  ),
  (
    'My Thoughts',
    'Shotgun approach. What are the expectations gain traction criticality dunder mifflin.'
  ),
  (
    'What you need to know about Crypto',
    'I have printed it out, but the animated gif is not moving could you do an actual logo instead of a font'
  );

INSERT INTO
  comments (user_id, blog_id, detail)
VALUES
  (1, 1, 'Awesome blog!'),
  (2, 1, 'This is a terrible take.'),
  (3, 1, 'Love it!');