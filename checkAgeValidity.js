function checkAgeValidity(req, res, next) {
    const { age } = req.body;

    if (typeof age !== 'undefined' && age < 0) {
        const error = new Error("Valeur invalide : l'âge ne peut pas être négatif.");
        error.status = 400;
        next(error);
        return;
    }

    next();
}

const express = require('express');
const app = express();

app.use(express.json());

app.post('/verify-age', checkAgeValidity, (req, res) => {
    res.status(200).json({ message: "Données acceptées.", details: req.body });
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: error.message || 'Problème interne au serveur.'
    });
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(Le serveur est opérationnel sur le port ${PORT});
});