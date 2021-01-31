
exports.up = function(knex) {
  return knex.schema
  .createTable("roles", tbl => {
    tbl.increments();

    tbl.string("name", 200).notNullable();
  })
  .createTable("users", tbl =>{
    tbl.increments();
    
    tbl.string("username", 128).notNullable().unique().index();
    tbl.string("password", 256).notNullable();
    tbl
    .integer("role")
    .unsigned()
    .references("roles.id")
    .onDelete("CASCADE")
    .onUpdate("CASCADE");
  });
  
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("roles").dropTableIfExists("users");
};
