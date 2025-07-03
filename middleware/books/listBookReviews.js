// middleware/books/listBookReviews.js
const mysql = require('mysql2');
const connection = require('../../database');

module.exports = (req, res) => {
  const { id } = req.params;
  // Vérifier que le livre existe
  connection.query('SELECT id FROM livres WHERE id = ?', [id], (err, rows) => {
    if (err) return res.status(500).json({ error: true, message: 'Erreur SQL' });
    if (!rows || rows.length === 0) return res.status(404).json({ error: true, message: 'Livre introuvable' });
    // Si le livre existe, retourner les avis
    connection.query(
      'SELECT r.id, r.livreId, r.userId, r.note, r.commentaire, r.date, u.nom, u.prenom FROM avis_livres r JOIN utilisateurs u ON r.userId = u.id WHERE r.livreId = ? ORDER BY r.date DESC',
      [id],
      (err, rows) => {
        if (err) return res.status(500).json({ error: true, message: 'Erreur SQL' });
        res.json(rows);
      }
    );
  });
};
