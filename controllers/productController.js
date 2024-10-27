const Product = require('../models/Product');
const Category = require('../models/Category');

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { name, categoryId } = req.body;
    const product = await Product.create({ name, categoryId });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get products with pagination
exports.getProducts = async (req, res) => {
    try {
      // Parse pagination parameters
      const page = parseInt(req.query.page) || 1; // Current page, defaults to 1
      const pageSize = parseInt(req.query.pageSize) || 10; // Items per page, defaults to 10
      const offset = (page - 1) * pageSize; // Calculate offset for pagination
  
      // Fetch products with associated categories
      const { count, rows } = await Product.findAndCountAll({
        include: {
          model: Category,
          attributes: ['id', 'name'], // Only fetch 'id' and 'name' fields from Category
        },
        limit: pageSize,
        offset: offset,
      });
  
      // Calculate total pages
      const totalPages = Math.ceil(count / pageSize);
  
      // Respond with paginated data
      res.json({
        totalItems: count,
        products: rows,
        currentPage: page,
        totalPages: totalPages,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, categoryId } = req.body;
    await Product.update({ name, categoryId }, { where: { id } });
    res.json({ message: 'Product updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.destroy({ where: { id } });
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
