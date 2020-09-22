const db = require('../data/db-config')

module.exports = {
    add,
    get,
    findBy,
    findById,
    update,
    remove,
    getHowToSteps
};

function get() {
    return db("howto")
}

function findBy(filter) {
    return db("howto as h")       
        .where(filter)
        .select("h.id", "h.username", "h.password")
        .orderBy("h.id");
}

async function add(howto) {
    try {
        const [id] = await db("howto").insert(howto, "id");

        return findById(id);
    } catch (error) {
        throw error;
    }
}

function findById(id) {
    return db("howto").where({ id }).first();
}

function update(id, changes) {
    return db("howto")
      .where("id", id)
      .update(changes)
      .then(count => (count > 0 ? get(id) : null));
  }

function remove(id) {
    return db("howto")
      .where("id", id)
      .del();
  }

  function getHowToSteps(howToId) {
    return db("steps")
      .where("howto_id", howToId)
      
  }