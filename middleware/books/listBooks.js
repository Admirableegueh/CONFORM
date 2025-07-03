// Lister les livres avec filtres (exemple simple)
const mysql = require('mysql2');
const connection = require('../../database');

module.exports = (req, res) => {
    let { titre, auteur, genre, disponible } = req.query;
    let query = 'SELECT * FROM livres WHERE 1=1';
    let params = [];
    if (titre) {
        query += ' AND titre LIKE ?';
        params.push(`%${titre}%`);
    }
    if (auteur) {
        query += ' AND auteur LIKE ?';
        params.push(`%${auteur}%`);
    }
    if (genre) {
        query += ' AND genre LIKE ?';
        params.push(`%${genre}%`);
    }
    if (disponible === '1') {
        query += ' AND disponible = 1';
    }
    connection.query(query, params, (err, rows) => {
        if (err) return res.status(500).json({ error: true, message: 'Erreur SQL' });
        res.json(rows);
    });
};
