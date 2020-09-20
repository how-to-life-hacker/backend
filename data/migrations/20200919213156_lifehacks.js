exports.up = function(knex) {
    return knex.schema
    .createTable('users', tbl => {
      tbl.increments();  
      tbl.string('username', 255).notNullable().unique();
      tbl.string('password', 255).notNullable();
      tbl.integer('role').notNullable();
    })

    .createTable('howto', tbl => {
        tbl.increments();
        tbl.string('name', 255).notNullable()
        tbl.integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete("RESTRICT") 
            .onUpdate("CASCADE");
    })

    .createTable('steps', tbl => {
        tbl.increments();
        tbl.string('name', 255).notNullable()
        tbl.integer('howto_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('howto')
            .onDelete("RESTRICT") 
            .onUpdate("CASCADE");
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema
        .dropTableIfExists('steps')
        .dropTableIfExists('howto')
        .dropTableIfExists('users')
  };