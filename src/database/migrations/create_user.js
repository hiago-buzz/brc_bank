exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('cpfCnpj',14).notNullable().unique();
        table.string('name',100).notNullable();
        table.string('email',100).notNullable().unique();
        table.string('phone',15).notNullable();
        table.string('image',255).notNullable();
        table.string('password',255).notNullable();
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};  
