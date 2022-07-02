CREATE TABLE person(
    id SERIAL PRIMARY KEY,
    avatar VARCHAR(255) NOT NULL DEFAULT 'https://t4.ftcdn.net/jpg/04/10/43/77/360_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg',
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE track(
    id SERIAL PRIMARY KEY,
    filt VARCHAR(255) NOT NULL,
    owners INTEGER ARRAY NOT NULL,
    audio VARCHAR(255) NOT NULL,
    cover VARCHAR(255) NOT NULL DEFAULT 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiC3Ba9xwS9m8DfRYSyhygOjmq1KHOExvj9yNkSidc7eSPnfj0y5yEvHkujqWmZceI15Y&usqp=CAU',
    title VARCHAR(255) NOT NULL,
    duration VARCHAR(255) NOT NULL DEFAULT '0:00'
);

CREATE TABLE playlist(
    id SERIAL PRIMARY KEY,
    audios INTEGER ARRAY NOT NULL,
    title VARCHAR(255) NOT NULL,
    cover VARCHAR(255) NOT NULL,
    owners INTEGER ARRAY NOT NULL,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE owner(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    audios INTEGER ARRAY,
    filts VARCHAR(255) ARRAY,
    avatar VARCHAR(255) NOT NULL DEFAULT 'https://www.kindpng.com/picc/m/97-979609_silhouette-male-photography-clip-art-man-head-silhouette.png'
    playlists INTEGER ARRAY
);

CREATE TABLE filt(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE follow(
    id SERIAL PRIMARY KEY,
    person_id INTEGER,
    FOREIGN KEY (person_id) REFERENCES person (id),
    tracks INTEGER ARRAY,
    playlists INTEGER ARRAY
);