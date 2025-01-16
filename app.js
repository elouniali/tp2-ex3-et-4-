const express = require('express');
const productRoutes = require('./routes/products');

const app = express();

app.use(express.json());
app.use('/products', productRoutes);

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        error: err.message || 'Erreur serveur.'
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});
