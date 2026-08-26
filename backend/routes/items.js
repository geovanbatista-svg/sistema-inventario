const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// GET
router.get('/', async (req, res) => {

  try {

    const items = await Item.getAll();

    res.json(items);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: 'Erro ao buscar itens'
    });

  }

});

// POST
router.post('/', async (req, res) => {

  try {

    const { name, category, quantity } = req.body;

    const item = await Item.create({
      name,
      category,
      quantity
    });

    res.status(201).json(item);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: 'Erro ao criar item'
    });

  }

});

// DELETE
router.delete('/:id', async (req, res) => {

  try {

    await Item.delete(req.params.id);

    res.json({
      success: true
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: 'Erro ao deletar item'
    });

  }

});

module.exports = router;
