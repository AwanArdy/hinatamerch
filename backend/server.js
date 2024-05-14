const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const products = require('./products.json')
const cors = require('cors')

app.use(cors());

app.use(express.static('public'));

app.use(express.json());

app.get('/products/api', (req, res) => {
    res.status(200).json(products);
});

app.listen(PORT, () => {
    console.log(`Server runing on http://localhost:${PORT}`);
});