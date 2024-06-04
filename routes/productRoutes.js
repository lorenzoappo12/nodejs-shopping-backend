
const express = require('express');
const router = express.Router();
const { getRepository } = require('typeorm');
const Product = require('../entities/Product');
const { check, validationResult } = require('express-validator');

const validateProduct = [
  check('name').isLength({ min: 1 }).withMessage('Name is required'),
  check('description').isLength({ min: 1 }).withMessage('Description is required'),
  check('quantity').isInt({ min: 0 }).withMessage('Quantity must be a positive integer'),
];

router.get('/', async (req, res) => {
  try {
    const productRepository = getRepository(Product);
    const products = await productRepository.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/',validateProduct, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { name, description, quantity } = req.body;
    const productRepository = getRepository(Product);
    const newProduct = productRepository.create({ name, description, quantity });
    await productRepository.save(newProduct);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/:id',validateProduct, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { id } = req.params;
    const { name, description, quantity,completed } = req.body;
    console.log(id, name, description, quantity )
    const productRepository = getRepository(Product);
    console.log(productRepository,'productRepository')
    var product = await productRepository.findOne({ where: { id }});
    console.log(product,'product')
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    product = productRepository.merge(product, { name, description, quantity ,completed});
    await productRepository.save(product);
    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const productRepository = getRepository(Product);
    const product = await productRepository.findOne({ where: { id }});
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    await productRepository.delete(id);
    res.sendStatus(204);
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
