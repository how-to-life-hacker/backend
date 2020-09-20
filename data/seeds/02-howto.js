
exports.seed = function(knex, Promise) {
  return knex('howto').insert([
    { name: "Build a website", user_id: 3 }, 
    { name: "Get better sleep", user_id: 3 }, 
    { name: "Meditate", user_id: 4 }
  ]);
};
