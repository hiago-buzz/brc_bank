exports.up = function(knex) {
    return knex.schema.createTable('accounts', table => {
        table.increments('id').primary();
        table.string('cpfCnpj',14).notNullable();
        table.string('bank',4).notNullable(); 
        table.string('account_number',20).notNullable();
        table.string('agency',4).notNullable();
        table.string('digit',1).notNullable();
        table.foreign('cpfCnpj').references('cpfCnpj').inTable('users');
        table.timestamps(true, true);

    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('accounts');
};

