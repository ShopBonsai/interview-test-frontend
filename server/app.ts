import express from 'express';

import * as products from './routes/products';

const PORT = 8000;
const app = express();

// Pretty json output
app.set('json spaces', 2);

// API
app.get('/products', products.getProducts);

app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});
