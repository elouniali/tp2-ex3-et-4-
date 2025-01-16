function productValidationMiddleware(req, res, next) {
    const { name, price } = req.body;

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
        const error = new Error("Erreur : le champ 'name' est obligatoire et doit contenir une chaîne de caractères non vide.");
        error.status = 400;
        next(error);
        return;
    }

    if (typeof price !== 'number' || price <= 0) {
        const error = new Error("Erreur : le champ 'price' est obligatoire et doit être un nombre positif.");
        error.status = 400;
        next(error);
        return;
    }

    next();
}

const express = require('express');
const app = express();

app.use(express.json());

app.post('/create-product', productValidationMiddleware, (req, res) => {
    res.status(201).json({
        message: "Produit enregistré avec succès.",
        produit: req.body
    });
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        erreur: err.message || "Une erreur interne s'est produite."
    });
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(Serveur actif sur le port ${PORT});
});