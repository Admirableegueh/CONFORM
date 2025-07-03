// Emprunter un livre
const mysql = require('mysql2');
const connection = require('../../database');

module.exports = (req, res) => {
    const { userId, livreId } = req.body;
    if (!userId || !livreId) return res.status(400).json({ error: true, message: 'Champs manquants' });
    // Vérifier si le livre est disponible
    connection.query('SELECT * FROM livres WHERE id = ? AND disponible = 1', [livreId], (err, rows) => {
        if (err) return res.status(500).json({ error: true, message: 'Erreur SQL' });
        if (rows.length === 0) return res.status(400).json({ error: true, message: 'Livre non disponible' });
        // Créer l’emprunt avec date_retour_prevue à J+14
        connection.query('INSERT INTO emprunts (userId, livreId, date_emprunt, date_retour_prevue) VALUES (?, ?, NOW(), DATE_ADD(NOW(), INTERVAL 14 DAY))', [userId, livreId], (err2) => {
            if (err2) return res.status(500).json({ error: true, message: 'Erreur SQL' });
            // Marquer le livre comme non disponible
            connection.query('UPDATE livres SET disponible = 0 WHERE id = ?', [livreId]);
            res.json({ success: true, message: 'Emprunt enregistré' });
        });
    });
};
