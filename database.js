const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',         // ✅ Bon hôte
  user: 'root',              // ✅ Bon utilisateur
  password: 'Admirable2006!',// ✅ Ton mot de passe
  database: 'conform',       // ✅ Nom de ta base
  port: 3306               // ✅ Très important : 3306, PAS 3000
});

connection.connect((err) => {
  if (err) {
    console.error('❌ Erreur de connexion MySQL :', err.message);
    return;
  }
  console.log('✅ Connecté à MySQL');
});

module.exports = connection;
