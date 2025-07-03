// Ajouter un livre (admin)
const mysql = require('mysql2');
const connection = require('../../database');

module.exports = (req, res) => {
    const { titre, auteur, genre, quantite = 1, description = '', annee_publication = null, imageUrl = '' } = req.body;
    if (!titre || !auteur || !genre) {
        return res.status(400).json({ error: true, message: 'Champs manquants' });
    }
    const sql = `
        INSERT INTO livres (titre, auteur, genre, disponible, quantite, description, annee_publication, imageUrl)
        VALUES (?, ?, ?, 1, ?, ?, ?, ?)
    `;
    const params = [titre, auteur, genre, quantite, description, annee_publication, imageUrl];
    connection.query(sql, params, (err) => {
        if (err) return res.status(500).json({ error: true, message: 'Erreur SQL', details: err });
        res.json({ success: true, message: 'Livre ajouté' });
    });
};
