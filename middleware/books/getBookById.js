// Récupérer un livre par son id (public)
const mysql = require('mysql2');
const connection = require('../../database');

module.exports = (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM livres WHERE id = ?', [id], (err, rows) => {
        if (err) return res.status(500).json({ error: true, message: 'Erreur SQL' });
        if (!rows || rows.length === 0) return res.status(404).json({ error: true, message: 'Livre introuvable' });
        res.json(rows[0]);
    });
};
