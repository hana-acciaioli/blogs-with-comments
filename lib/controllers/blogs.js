const { Router } = require('express');
const { Blog } = require('../models/Blog');

module.exports = Router()
  .get('/', async (req, res, next) => {
    res.json([]);
  })
  .get('/:id', async (req, res, next) => {
    res.json({});
  });
