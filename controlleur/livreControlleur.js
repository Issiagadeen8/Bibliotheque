const Livre = require('../models/livre');

// Ajout d'un livre
exports.ajoutlivre = async (req, res) => {
    try {
        const { titre, auteur, resume } = req.body;
        if (!titre || !auteur) {
            return res.status(400).json({ error: "Titre et auteur obligatoires" });
        }
        const nouveauLivre = new Livre({ titre, auteur, resume });
        await nouveauLivre.save();
        res.status(201).json({ message: "Le livre est ajouté avec succès", livre: nouveauLivre });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Affichage des livres avec pagination et tri
exports.affichagelivre = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const sortBy = req.query.sortBy || 'titre';
        const order = req.query.order === 'desc' ? -1 : 1;

        const skip = (page - 1) * limit;

        const livres = await Livre.find()
            .sort({ [sortBy]: order })
            .skip(skip)
            .limit(limit);

        const totalLivres = await Livre.countDocuments();

        res.status(200).json({
            currentPage: page,
            totalPages: Math.ceil(totalLivres / limit),
            totalLivres,
            livres
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Affichage d'un livre par ID
exports.afficherLivreId = async (req, res) => {
    try {
        const { id } = req.params;
        const livre = await Livre.findById(id);
        if (!livre) {
            return res.status(404).json({ error: 'Livre non trouvé' });
        }
        res.status(200).json(livre);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Modifier un livre
exports.updateLivre = async (req, res) => {
    try {
        const { id } = req.params;
        const livre = await Livre.findByIdAndUpdate(id, req.body, { new: true });
        if (!livre) {
            return res.status(404).json({ error: "Livre non trouvé" });
        }
        res.status(200).json({ message: "Livre modifié avec succès", livre });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Supprimer un livre
exports.deleteLivre = async (req, res) => {
    try {
        const { id } = req.params;
        const livre = await Livre.findByIdAndDelete(id);
        if (!livre) {
            return res.status(404).json({ error: "Livre non trouvé" });
        }
        res.status(200).json({ message: "Livre supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
