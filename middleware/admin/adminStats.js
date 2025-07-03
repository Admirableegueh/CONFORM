// Statistiques globales pour le dashboard admin
const mysql = require('mysql2');
const connection = require('../../database');

module.exports = (req, res) => {
  const stats = {};
  connection.query('SELECT COUNT(*) as totalLivres FROM livres', (err, rows) => {
    if (err) return res.status(500).json({ error: true, message: 'Erreur SQL livres' });
    stats.totalLivres = rows[0].totalLivres;
    connection.query('SELECT COUNT(*) as totalEtudiants FROM utilisateurs WHERE role = "etudiant"', (err2, rows2) => {
      if (err2) return res.status(500).json({ error: true, message: 'Erreur SQL étudiants' });
      stats.totalEtudiants = rows2[0].totalEtudiants;
      connection.query('SELECT COUNT(*) as totalEmprunts FROM emprunts', (err3, rows3) => {
        if (err3) return res.status(500).json({ error: true, message: 'Erreur SQL emprunts' });
        stats.totalEmprunts = rows3[0].totalEmprunts;
        connection.query('SELECT COUNT(*) as enCours FROM emprunts WHERE date_retour IS NULL', (err4, rows4) => {
          if (err4) return res.status(500).json({ error: true, message: 'Erreur SQL en cours' });
          stats.empruntsEnCours = rows4[0].enCours;
          connection.query('SELECT COUNT(*) as retournes FROM emprunts WHERE date_retour IS NOT NULL', (err5, rows5) => {
            if (err5) return res.status(500).json({ error: true, message: 'Erreur SQL retournés' });
            stats.empruntsRetournes = rows5[0].retournes;
            res.json(stats);
          });
        });
      });
    });
  });
};
