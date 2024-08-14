const knex = require("../db/connection");

async function create(post) {
  return await knex("posts")
    .insert(post)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

async function read(postId) {
  return knex("posts").select("*").where({ post_id: postId }).first();
}

async function update(updatedPost) {  
    return await knex("posts")
    .select("*")
    .where({ post_id: updatedPost.post_id })
    .update(updatedPost, "*")
    .then((updatedRecords) => updatedRecords[0]);
}

async function destroy(post_id) {
  return await knex("posts").where({ post_id }).del();
}

module.exports = {
  create,
  read,
  update,
  delete: destroy,
};
