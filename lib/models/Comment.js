class Comment {
  id;
  user_id;
  detail;

  constructor(row) {
    this.id = row.id;
    this.user_id = row.user_id;
    this.detail = row.detail;
  }
}

module.exports = { Comment };
