const knex = require("../db/connection");

async function list() {
  return await knex("comments").select("*");
}

async function listCommenterCount() {
    const results = await knex("comments")
    .join("users", "comments.commenter_id", "users.user_id")
    .select("users.user_email as commenter_email")
    .count("comments.comment_id as count")
    .groupBy("users.user_email")
    .orderBy("users.user_email");

    return results.map(row => ({
      ...row,
      count: parseInt(row.count, 10)
    }));
    
}

async function read(commentId) {
  return await knex("comments")
    .join("users", "comments.commenter_id", "users.user_id")
    .join("posts", "comments.post_id", "posts.post_id")
    .select(
      "comments.comment_id",
      "comments.comment",
      "users.user_email as commenter_email",
      "posts.post_body as commented_post"
    )
    .where({ "comments.comment_id": commentId })
    .first();
}

module.exports = {
  list,
  listCommenterCount,
  read,
};
