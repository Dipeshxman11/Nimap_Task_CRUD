const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
    try {
      const { name } = req.body;
  
      // Check if the category already exists
      const existingCategory = await Category.findOne({ where: { name } });
      if (existingCategory) {
        return res.status(400).json({ error: 'Category already exists' });
      }
  
      // Create a new category if it doesn't exist
      const category = await Category.create({ name });
      res.status(201).json(category);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    await Category.update({ name }, { where: { id } });
    res.json({ message: 'Category updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.destroy({ where: { id } });
    res.json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
