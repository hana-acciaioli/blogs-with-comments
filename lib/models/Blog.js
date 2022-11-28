const pool = require('../utils/pool');
const { Comment } = require('./Comment');

class Blog {
  id;
  title;
  body;
  comments;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.body = row.body;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from blogs;');
    return rows.map((row) => new Blog(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * from blogs WHERE id = $1;', [
      id,
    ]);
    if (!rows) return null;
    return new Blog(rows[0]);
  }

  async addComments() {
    const { rows } = await pool.query(
      'SELECT * from comments where blog_id = $1',
      [this.id]
    );
    this.comments = rows.map((row) => new Comment(row));
  }
}

module.exports = { Blog };
