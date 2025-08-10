const express = require('express');
const router = express.Router();
const livreControlleur = require('../controlleur/livreControlleur');

// Ajouter un livre 
router.post('/livres', livreControlleur.ajoutlivre);

// Afficher tous les livres
router.get('/livres', livreControlleur.affichagelivre);

// Afficher un livre spécifique
router.get('/livres/:id', livreControlleur.afficherLivreId);

// Modifier un livre
router.put('/livres/:id', livreControlleur.updateLivre);

// Supprimer un livre
router.delete('/livres/:id', livreControlleur.deleteLivre);

module.exports = router;
