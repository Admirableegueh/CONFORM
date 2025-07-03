var express = require("express");
var mysql   = require("mysql");
var cors = require('cors');
var bodyParser  = require("body-parser");



var verifyToken = require('./middleware/verifyToken');
var addNewUser = require('./middleware/addNewUser');
var userLoginCheck = require('./middleware/userLoginCheck');


var welcome = require('./middleware/welcome');
 var Utilisateur = require('./middleware/Data/Utilisateur');


// Importation des nouveaux middlewares
var listBooks = require('./middleware/books/listBooks');
var addBook = require('./middleware/books/addBook');
var updateBook = require('./middleware/books/updateBook');
var deleteBook = require('./middleware/books/deleteBook');
var borrowBook = require('./middleware/borrow/borrowBook');
var returnBook = require('./middleware/borrow/returnBook');
var myBorrows = require('./middleware/borrow/myBorrows');
var manageStudents = require('./middleware/admin/manageStudents');
var listAllBorrows = require('./middleware/borrow/listAllBorrows');
var adminStats = require('./middleware/admin/adminStats');
var listBookReviews = require('./middleware/books/listBookReviews');
var addBookReview = require('./middleware/books/addBookReview');
var getBookById = require('./middleware/books/getBookById');
var uploadImage = require('./middleware/books/uploadImage');


const port = process.env.PORT ||  4000;   

  
////  Routes  principales  

var app  = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/uploads', express.static(__dirname + '/uploads'));

app.get('/', welcome);
app.post('/signup', addNewUser);
app.post('/userlogin', userLoginCheck);


////  Sous-Routes avec Token

var apiRoutes = express.Router();
apiRoutes.use(bodyParser.urlencoded({ extended: true }));
apiRoutes.use(bodyParser.json());

// Livres (public)
apiRoutes.get('/livres', listBooks); // Lister les livres (avec filtres)
apiRoutes.get('/livres/:id', getBookById); // Récupérer un livre par id

// Middleware d'authentification pour les routes suivantes
apiRoutes.use(verifyToken);
apiRoutes.get('/Utilisateur', Utilisateur);

// Livres
apiRoutes.post('/livres', addBook); // Ajouter un livre (admin)
apiRoutes.put('/livres/:id', updateBook); // Modifier un livre (admin)
apiRoutes.delete('/livres/:id', deleteBook); // Supprimer un livre (admin)

// Emprunts
apiRoutes.post('/emprunter', borrowBook); // Emprunter un livre
apiRoutes.post('/retourner', returnBook); // Retourner un livre
apiRoutes.get('/mes-emprunts', myBorrows); // Voir mes emprunts
apiRoutes.get('/admin/emprunts', listAllBorrows); // Voir tous les emprunts (admin)

// Admin - gestion des étudiants
apiRoutes.get('/admin/utilisateurs', manageStudents.list); // Lister étudiants
apiRoutes.post('/admin/utilisateurs', manageStudents.add); // Ajouter étudiant
apiRoutes.delete('/admin/utilisateurs/:id', manageStudents.delete); // Supprimer étudiant
apiRoutes.put('/admin/utilisateurs/:id', manageStudents.update); // Modifier étudiant

// Admin - statistiques globales
apiRoutes.get('/admin/stats', adminStats); // Vue d'ensemble admin

// Route pour récupérer l'utilisateur connecté (GET /api/user/me)
const jwt = require('jsonwebtoken');
const config = require('./config');
const connection = require('./database');

apiRoutes.get('/user/me', (req, res) => {
  // Utilise req.currUser défini par verifyToken
  console.log('ROUTE /user/me req.currUser:', req.currUser);
  const currUser = req.currUser;
  if (!currUser || !currUser.user_id) return res.status(401).json({ error: true, message: 'Token invalide ou utilisateur non authentifié', currUser });
  connection.query('SELECT id, nom, prenom, email, role FROM utilisateurs WHERE id = ?', [currUser.user_id], (err, rows) => {
    if (err || rows.length === 0) return res.status(401).json({ error: true, message: 'Utilisateur non trouvé', err });
    res.json(rows[0]);
  });
});

// Avis sur les livres
apiRoutes.get('/livres/:id/avis', listBookReviews); // Liste des avis d'un livre
apiRoutes.post('/livres/:id/avis', addBookReview); // Ajouter un avis sur un livre

app.use('/api', apiRoutes);
app.use('/api/upload', uploadImage);

app.listen( port , () => {
    console.log('Démarrage et écoute sur le port  ' +port);
});
