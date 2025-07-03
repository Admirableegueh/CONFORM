var jwt = require('jsonwebtoken'); 
var config = require('../config'); 



const verifyToken  = async (req, res, next) => {
	
	try {
		

		// Correction : req.headers peut être undefined dans certains contextes, on sécurise l'accès
		let token = (req.body && req.body.token) || (req.query && req.query.token) || (req.headers && req.headers['token']);
		console.log('TOKEN RECU:', token);
		if (token) {
			// verify secret and checks exp
			jwt.verify(token, config.secret, function (err, currUser) {
				if (err) {
					console.log('ERREUR JWT:', err);
					return res.status(401).json({ error: true, message: 'Token invalide', details: err });
				} else {
					// decoded object
					console.log('CURRUSER DECODE:', currUser);
					req.currUser = currUser;
					next();
				}
			});
		}
		else {
			console.log('AUCUN TOKEN FOURNI');
			res.status(401).send("Invalid Access");
		}
		

} catch (error) {
    console.log('ERREUR GENERALE:', error);
    res.json({"Error" : true, "Message" : error });

}

};
module.exports=verifyToken;