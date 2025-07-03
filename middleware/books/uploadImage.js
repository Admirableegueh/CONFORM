const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Configurer le stockage des fichiers
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Correction : stocker dans le dossier uploads à la racine du projet, pas dans middleware/uploads
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname.replace(/\s/g, '_'));
  }
});

const upload = multer({ storage: storage });

// Route d'upload
router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: true, message: 'Aucun fichier envoyé' });
  // Retourne le chemin relatif à utiliser dans la base
  res.json({ success: true, imageUrl: '/uploads/' + req.file.filename });
});

module.exports = router;
