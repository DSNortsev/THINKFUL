const db = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

const tableName = "reviews";
async function destroy(review_id) {
  // TODO: Write your code here
  return db(tableName).where( { review_id }).del();
}

async function list(movie_id) {
  // TODO: Write your code here
  const reviews = await db("reviews")
      .join("critics", "critics.critic_id", "reviews.critic_id")
      .select(
          'reviews.*',
          'critics.critic_id as critic.critic_id',
          'critics.preferred_name as critic.preferred_name',
          'critics.surname as critic.surname',
          'critics.organization_name as critic.organization_name',
          'critics.created_at as critic.created_at',
          'critics.updated_at as critic.updated_at'
      )
      .where({ "reviews.movie_id": movie_id });

  return reviews.map(review => ({
    ...review,
    critic: {
      critic_id: review['critic.critic_id'],
      preferred_name: review['critic.preferred_name'],
      surname: review['critic.surname'],
      organization_name: review['critic.organization_name'],
      created_at: review['critic.created_at'],
      updated_at: review['critic.updated_at'],
    },
  }));
}

async function read(review_id) {
  // TODO: Write your code here
  return db(tableName).select("*").where({ review_id}).first();
  
}

async function readCritic(critic_id) {
  return db("critics").where({ critic_id }).first();
}

async function setCritic(review) {
  review.critic = await readCritic(review.critic_id);
  return review;
}

async function update(review) {
  return db(tableName)
    .where({ review_id: review.review_id })
    .update(review, "*")
    .then(() => read(review.review_id))
    .then(setCritic);
}

module.exports = {
  destroy,
  list,
  read,
  update,
};
