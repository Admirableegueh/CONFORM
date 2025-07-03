// Modifier un livre (admin)
const mysql = require('mysql2');
const connection = require('../../database');

// Correction de la modification d'un livre pour inclure tous les champs, y compris imageUrl, quantite, annee_publication, description
module.exports = (req, res) => {
    const { id } = req.params;
    const { titre, auteur, genre, quantite = 1, description = '', annee_publication = null, imageUrl = '' } = req.body;
    if (!titre || !auteur || !genre) return res.status(400).json({ error: true, message: 'Champs manquants' });
    connection.query('UPDATE livres SET titre = ?, auteur = ?, genre = ?, quantite = ?, description = ?, annee_publication = ?, imageUrl = ? WHERE id = ?', [titre, auteur, genre, quantite, description, annee_publication, imageUrl, id], (err) => {
        if (err) return res.status(500).json({ error: true, message: 'Erreur SQL' });
        res.json({ success: true, message: 'Livre modifié' });
    });
};
