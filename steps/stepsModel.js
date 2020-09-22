const db = require('../data/db-config')

module.exports = {
    get,
    insert,
    update,
    remove,
  };
  
  function get(id) {
    let query = db('steps');
  
    if (id) {
      return query
        .where('id', id)
        .first()
        .then((step) => {
          if (step) {
            return step
          } else {
            return null;
          }
        });
    } else {
      return query.then((steps) => {
        return steps
      });
    }
  }
  
  function insert(step) {
    return db('steps')
      .insert(step, 'id')
      .then(([id]) => get(id));
  }
  
  function update(id, changes) {
    return db('steps')
      .where('id', id)
      .update(changes)
      .then((count) => (count > 0 ? get(id) : null));
  }
  
  function remove(id) {
    return db('steps').where('id', id).del();
  }
  