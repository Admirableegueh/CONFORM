// middleware/books/addBookReview.js
const mysql = require('mysql2');
const connection = require('../../database');

module.exports = (req, res) => {
  const { id } = req.params;
  const { userId, note, commentaire } = req.body;
  if (!userId || !note) return res.status(400).json({ error: true, message: 'Champs manquants' });
  // Vérifier que le livre existe
  connection.query('SELECT id FROM livres WHERE id = ?', [id], (err, rows) => {
    if (err) return res.status(500).json({ error: true, message: 'Erreur SQL' });
    if (!rows || rows.length === 0) return res.status(404).json({ error: true, message: 'Livre introuvable' });
    // Si le livre existe, insérer l'avis
    connection.query(
      'INSERT INTO avis_livres (livreId, userId, note, commentaire, date) VALUES (?, ?, ?, ?, NOW())',
      [id, userId, note, commentaire],
      (err, result) => {
        if (err) {
          console.error('Erreur SQL lors de l\'insertion d\'un avis:', err);
          return res.status(500).json({ error: true, message: 'Erreur SQL', details: err });
        }
        res.json({ success: true });
      }
    );
  });
};
