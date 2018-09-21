-- Drops the todolist if it exists currently --
DROP DATABASE IF EXISTS movie_db;
-- Creates the "todolist" database --
CREATE DATABASE movie_db;

-- Create the table plans.
CREATE TABLE movies
(
  id int NOT NULL AUTO_INCREMENT,
  title varchar(50) NOT NULL,
  video varchar(10) NOT NULL,
  duration integer(500),
  release integer CHECK (release > 1800 AND release < 2100),
  rating decimal(2,1) CHECK (rating >= 0 AND rating <=5),
  PRIMARY KEY (id)
);