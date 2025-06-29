const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");
const connection = require("../database");

const userLoginCheck = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: true, message: "Email et mot de passe requis." });
    }

    const query = "SELECT * FROM ?? WHERE ?? = ? AND useractive = 1";
    const table = ["utilisateurs", "email", email];
    const formattedQuery = mysql.format(query, table);

    connection.query(formattedQuery, async (err, rows) => {
      if (err) {
        console.error("Erreur MySQL :", err);
        return res.status(500).json({ error: true, message: "Erreur interne du serveur" });
      }

      if (rows.length === 0) {
        return res.status(401).json({ error: true, message: "Email ou mot de passe incorrect" });
      }

      const user = rows[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ error: true, message: "Email ou mot de passe incorrect" });
      }

      // Génération du token JWT avec payload
      const payload = {
        user_id: user.user_id,
        email: user.email,
      };

      const token = jwt.sign(payload, config.secret, { expiresIn: "1h" });

      // Insertion du token dans la table access_token
      const data = {
        user_id: user.user_id,
        access_token: token,
      };

      const insertQuery = "INSERT INTO ?? SET ?";
      const insertTable = ["access_token", data];
      const formattedInsert = mysql.format(insertQuery, insertTable);

      connection.query(formattedInsert, (insertErr) => {
        if (insertErr) {
          console.error("Erreur lors de l'insertion du token :", insertErr);
          return res.status(500).json({ error: true, message: "Erreur lors de la sauvegarde du token" });
        }

        return res.status(200).json({
          success: true,
          message: "Connexion réussie",
          currUser: user.user_id,
          email: user.email,
          token: token,
        });
      });
    });
  } catch (error) {
    console.error("Erreur inattendue :", error);
    return res.status(500).json({ error: true, message: "Erreur inattendue côté serveur" });
  }
};

module.exports = userLoginCheck;
