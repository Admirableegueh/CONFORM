// Lister tous les emprunts (admin)
const mysql = require('mysql2');
const connection = require('../../database');

module.exports = (req, res) => {
    connection.query(
        `SELECT e.*, l.titre, l.auteur, u.nom, u.prenom, u.email
         FROM emprunts e
         JOIN livres l ON e.livreId = l.id
         JOIN utilisateurs u ON e.userId = u.id
         ORDER BY e.date_emprunt DESC`,
        (err, rows) => {
            if (err) return res.status(500).json({ error: true, message: 'Erreur SQL' });
            res.json(rows);
        }
    );
};
