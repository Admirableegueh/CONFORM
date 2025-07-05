"# CONFORM" 

Backend – CONFORM (avec Express et MySQL)
C’est la partie serveur qui gère les données, la logique, les vérifications, et envoie les bonnes infos au frontend.

server.js : point d’entrée de ton serveur Express.

middleware/books/ : dossiers contenant les fichiers qui gèrent :

les livres (livres.js)

les avis (avis.js)

les images de couverture (upload.js)

middleware/borrow/ : gère les emprunts et retours de livres.

database.js : fichier qui se connecte à ta base de données MySQL.

uploads/ : dossier où tu stockes les images des livres une fois uploadées.

Lors de la connexion l'utilisateur à la possibilité de se connecter en tant qu'utilisateur ou Administrateur.

Lorsqu'il se connecte comme utilisateur il aura accès à la page d'accueil c'est à dire une redirection et il verra au  iveau de la navbar catalogue ou sur la page catalogue lorsqu'il clique sur ça il aura une liste de livre affichée et il aura l'option emprunter et détails.Lorsqu'il fait l'emprunt il s'affichera un formulaire contenant le nom le livre la date d'emprunt et celui du retour qqui est pour un délai de 2 semaines et il suffira juste de cocher confirmer ou annuler . Pour l'option Détails , il aura à mettre les notations du livre et laisser des commentaires  et après appuyer sur déconnexion ce qui le ramène à la page d'accueil. Il peut aussi appuyer sur mes emprunts et pour voir les informations et là tu peux retourner les livres et donner ton avis.

Pour la partie administrateur, lorsque tu t'inscrire tu peux te connecter ça t'amène directement sur la page Administrateur là où tu peux avoir une vue d'ensemble sur la plateforme,gérer les livres en ajoutant de nouvelles , en modifiant en en supprimant aussi, gérer les étudiants et voir les différents emprunts . Après sur la barre de navigation de cette page tu peux appuyer sur accueil où tu vas accéder à la page d'accueil celui de l'administrateur. Si tu étais déjà connecter et inscrire, yu peux juste appuyer sur Admin dans la navbar et lorsque tu accèdes à la page d'accueil dédiée au administrateur tu te connectes en cliquant sur connecter . Grace à ça tu peux avoir l'accès au catalogue.

