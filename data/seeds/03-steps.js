
exports.seed = function(knex, Promise) {
  return knex('steps').insert([
    { name: "Sit comfortably", howto_id: 3 }, 
    { name: "Take a few deep breathes", howto_id: 3 }, 
    { name: "Focus on your breathing", howto_id: 3 }
  ]);
};
