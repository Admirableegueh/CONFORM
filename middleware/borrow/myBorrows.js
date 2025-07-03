// Voir mes emprunts
const mysql = require('mysql2');
const connection = require('../../database');

module.exports = (req, res) => {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ error: true, message: 'userId manquant' });
    connection.query('SELECT e.*, l.titre, l.auteur, u.nom, u.prenom FROM emprunts e JOIN livres l ON e.livreId = l.id JOIN utilisateurs u ON e.userId = u.id WHERE e.userId = ? ORDER BY e.date_emprunt DESC', [userId], (err, rows) => {
        if (err) return res.status(500).json({ error: true, message: 'Erreur SQL' });
        // On renvoie date_retour_prevue ET date_retour
        res.json(rows.map(row => ({
            id: row.id,
            livre_id: row.livreId,
            titre: row.titre,
            date_emprunt: row.date_emprunt,
            date_retour_prevue: row.date_retour_prevue,
            date_retour: row.date_retour,
            statut: row.date_retour ? (new Date(row.date_retour) <= new Date(row.date_retour_prevue) ? 'Retourné' : 'En retard') : (new Date() > new Date(row.date_retour_prevue) ? 'En retard' : 'En cours')
        })));
    });
};
