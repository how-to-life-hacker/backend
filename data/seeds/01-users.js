
exports.seed = function(knex, Promise) {
  return knex('users').insert([
    { username: "Jdawg", password: "juhd77h", role: 1 }, 
    { username: "Jgrilla", password: "jusahd77h", role: 1 }, 
    { username: "Brobinson", password: "juhd3e77h", role: 2 }, 
    { username: "FrenchTeddy", password: "juhd7zdef7h", role: 2 }

  ]);
};
