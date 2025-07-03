// Gérer les étudiants (admin) : lister, supprimer, modifier
const mysql = require('mysql2');
const connection = require('../../database');

exports.list = (req, res) => {
    connection.query('SELECT * FROM utilisateurs', (err, rows) => {
        if (err) return res.status(500).json({ error: true, message: 'Erreur SQL' });
        res.json(rows);
    });
};

exports.delete = (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM utilisateurs WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: true, message: 'Erreur SQL' });
        res.json({ success: true, message: 'Utilisateur supprimé' });
    });
};

exports.update = (req, res) => {
    const { id } = req.params;
    const { nom, prenom, email, telephone } = req.body;
    if (!nom || !prenom || !email || !telephone) return res.status(400).json({ error: true, message: 'Champs manquants' });
    connection.query('UPDATE utilisateurs SET nom = ?, prenom = ?, email = ?, telephone = ? WHERE id = ?', [nom, prenom, email, telephone, id], (err) => {
        if (err) return res.status(500).json({ error: true, message: 'Erreur SQL' });
        res.json({ success: true, message: 'Utilisateur modifié' });
    });
};

// Ajout d'un étudiant (admin)
exports.add = (req, res) => {
    const { nom, prenom, email } = req.body;
    if (!nom || !prenom || !email) return res.status(400).json({ error: true, message: 'Champs manquants' });
    connection.query('INSERT INTO utilisateurs (nom, prenom, email, role) VALUES (?, ?, ?, ?)', [nom, prenom, email, 'etudiant'], (err, result) => {
        if (err) return res.status(500).json({ error: true, message: 'Erreur SQL' });
        connection.query('SELECT * FROM utilisateurs WHERE id = ?', [result.insertId], (err2, rows) => {
            if (err2 || rows.length === 0) return res.status(500).json({ error: true, message: 'Erreur lors de la récupération' });
            res.json(rows[0]);
        });
    });
};
