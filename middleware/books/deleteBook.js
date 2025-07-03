// Supprimer un livre (admin)
const mysql = require('mysql2');
const connection = require('../../database');

module.exports = (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM livres WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: true, message: 'Erreur SQL' });
        res.json({ success: true, message: 'Livre supprimé' });
    });
};
