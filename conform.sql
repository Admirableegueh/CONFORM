CREATE DATABASE IF NOT EXISTS conform;
USE conform;

CREATE TABLE users (
                       id int NOT NULL,
                       nom varchar(50) DEFAULT NULL,
                       prenom varchar(50) DEFAULT NULL,
                       age int DEFAULT NULL
) ;




CREATE TABLE utilisateurs (
    id int NOT NULL AUTO_INCREMENT,
    nom varchar(50) DEFAULT NULL,
    prenom varchar(50) DEFAULT NULL,
    telephone varchar(50) DEFAULT NULL,
    email varchar(100) DEFAULT NULL,
    password varchar(255) DEFAULT NULL,
    useractive int NOT NULL DEFAULT '1',
    dateMAJ datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    role VARCHAR(20) NOT NULL DEFAULT 'user',
    PRIMARY KEY (id),
    UNIQUE KEY email (email)
);



CREATE TABLE access_token (
    access_token_id int NOT NULL AUTO_INCREMENT,
    user_id int DEFAULT NULL,
    access_token text,
    ip_address varchar(15) DEFAULT NULL,
    DateMAJ datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (access_token_id),
    KEY fk_access_token_1_idx (user_id),
    FOREIGN KEY (user_id) REFERENCES utilisateurs(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;




ALTER TABLE access_token
    ADD PRIMARY KEY (access_token_id),
    ADD KEY fk_access_token_1_idx (user_id);

--
-- Index pour la table users
--
ALTER TABLE users
    ADD PRIMARY KEY (id);

--
-- Index pour la table utilisateurs
--
ALTER TABLE utilisateurs
    ADD PRIMARY KEY (id),
    ADD UNIQUE KEY email (email);


CREATE TABLE livres (
    id INT NOT NULL AUTO_INCREMENT,
    titre VARCHAR(255) NOT NULL,
    auteur VARCHAR(100) NOT NULL,
    genre VARCHAR(100) NOT NULL,
    disponible BOOLEAN NOT NULL DEFAULT 1,
    quantite INT DEFAULT 1,
    description TEXT,
    annee_publication INT,
    imageUrl VARCHAR(255),
    PRIMARY KEY (id)
);

CREATE TABLE emprunts (
    id INT NOT NULL AUTO_INCREMENT,
    userId INT NOT NULL,
    livreId INT NOT NULL,
    date_emprunt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    date_retour DATETIME DEFAULT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES utilisateurs(id),
    FOREIGN KEY (livreId) REFERENCES livres(id)
);