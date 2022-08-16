-- DROP TABLE songs IF EXISTS;

CREATE TABLE songs (
	id int NOT NULL PRIMARY KEY,
	song_title text NOT NULL,
	notes varchar NOT NULL,
	artist varchar,
	genre varchar
);

INSERT INTO songs (id, song_title, notes) 
VALUES (1, 'Ode to Joy (Dubstep Remix)', 'E4 E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 E4 D4 D4');

INSERT INTO songs (id, song_title, notes, artist, genre) 
VALUES (2, 'Smoke on the Water (csr5321)', 'G5 B5 C5 B5 B5 D5 C5 G5 B5 C5 B5 G5 G5 F5 G5','Deep Purple', 'rock');

INSERT INTO songs (id, song_title, notes, artist, genre) 
VALUES (3, 'Fur Elise (fjama)', 'C7 D7 A4 B4 C7 D7 A4 B4 C7 D7 A4 B4 C7 D7 A4 B4','Beethoven', 'classical');

INSERT INTO songs (id, song_title, notes, artist, genre) 
VALUES (4, 'Allegro (anniednavarro)', 'C3 D6 D4 B4 D6 C3 G4 A4 C3 D6 D4 C4 D6 C4 B4 B4','Mozart', 'classical');

INSERT INTO songs (id, song_title, notes, artist, genre) 
VALUES (5, 'Mary Had a Little Lamb (dutton)', 'E4 E4 E4 G4 G4 G4 E4 E4 E4 C4 C4 C4 D4 D4 D4 G4 G4', 'artist5', 'genre5');
