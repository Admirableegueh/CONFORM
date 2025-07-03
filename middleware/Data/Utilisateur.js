var mysql   = require("mysql");
var connection = require("../../database");


module.exports = async (req, res) => {
  // Renvoie uniquement l'utilisateur connecté (GET /api/user/me)
  const userId = req.user && req.user.user_id;
  if (!userId) return res.status(401).json({ error: 'Non authentifié' });

  const query = "SELECT id, nom, prenom, email, role FROM utilisateurs WHERE id = ?";
  connection.query(query, [userId], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Erreur MySQL' });
    if (!rows.length) return res.status(404).json({ error: 'Utilisateur non trouvé' });
    res.json(rows[0]);
  });
};