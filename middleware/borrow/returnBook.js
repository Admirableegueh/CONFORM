// Retourner un livre
const mysql = require('mysql2');
const connection = require('../../database');

module.exports = (req, res) => {
    const { userId, livreId } = req.body;
    if (!userId || !livreId) return res.status(400).json({ error: true, message: 'Champs manquants' });
    // Vérifier si l’emprunt existe
    connection.query('SELECT * FROM emprunts WHERE userId = ? AND livreId = ? AND date_retour IS NULL', [userId, livreId], (err, rows) => {
        if (err) return res.status(500).json({ error: true, message: 'Erreur SQL' });
        if (rows.length === 0) return res.status(400).json({ error: true, message: 'Aucun emprunt en cours pour ce livre' });
        // Marquer le retour
        connection.query('UPDATE emprunts SET date_retour = NOW() WHERE userId = ? AND livreId = ? AND date_retour IS NULL', [userId, livreId], (err2) => {
            if (err2) return res.status(500).json({ error: true, message: 'Erreur SQL' });
            // Marquer le livre comme disponible
            connection.query('UPDATE livres SET disponible = 1 WHERE id = ?', [livreId]);
            res.json({ success: true, message: 'Livre retourné' });
        });
    });
};
