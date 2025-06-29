
CREATE DATABASE IF NOT EXISTS conform;
USE conform;

CREATE TABLE users (
                       id int NOT NULL,
                       nom varchar(50) DEFAULT NULL,
                       prenom varchar(50) DEFAULT NULL,
                       age int DEFAULT NULL
) ;




CREATE TABLE utilisateurs (
                              id int NOT NULL,
                              nom varchar(50) DEFAULT NULL,
                              prenom varchar(50) DEFAULT NULL,
                              telephone varchar(50) DEFAULT NULL,
                              email varchar(100) DEFAULT NULL,
                              password varchar(255) DEFAULT NULL,
                              useractive int NOT NULL DEFAULT '1',
                              dateMAJ datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ;



CREATE TABLE access_token (
                              access_token_id int NOT NULL,
                              user_id int DEFAULT NULL,
                              access_token text,
                              ip_address varchar(15) DEFAULT NULL,
                              DateMAJ datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
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