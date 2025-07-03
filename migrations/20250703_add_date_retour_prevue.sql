-- Ajout du champ date_retour_prevue à la table emprunts
ALTER TABLE emprunts ADD COLUMN date_retour_prevue DATETIME NOT NULL DEFAULT (CURRENT_TIMESTAMP + INTERVAL 14 DAY);
