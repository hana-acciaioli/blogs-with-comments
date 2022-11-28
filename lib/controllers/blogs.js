const { Router } = require('express');
const { Blog } = require('../models/Blog');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const blogs = await Blog.getAll();
      res.json(blogs);
    } catch (error) {
      next(error);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const blog = await Blog.getById(req.params.id);
      await blog.addComments();
      res.json(blog);
    } catch (e) {
      next(e);
    }
  });
