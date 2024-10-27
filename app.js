const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const sequelize = require('./utils/database');
const cors = require('cors');



const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the public directory

app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

// Route for serving category management page
app.get('/categories', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'views', 'category.html'));
});

// Route for serving product management page
app.get('/products', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'views', 'product.html'));
});

sequelize.sync().then(() => {
  app.listen(3000, () => console.log('Server running on http://localhost:3000'));
}).catch(error => console.log('Database sync error:', error));
