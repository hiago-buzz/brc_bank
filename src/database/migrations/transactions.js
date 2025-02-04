exports.up = function(knex) {
    return knex.schema.createTable('transactions', table => {
        table.increments('id').primary();
        table.string('cpfCnpj',14).notNullable();
        table.integer('transaction_type_id').notNullable();
        table.decimal('amount', 10, 2).notNullable();
        table.datetime('transaction_date').notNullable();
        table.string('bank',4).notNullable();
        table.string('account',20).notNullable();
        table.string('agency',4).notNullable();

        table.string('digit',1).notNullable();
        table.foreign('cpfCnpj').references('cpfCnpj').inTable('users');
        table.foreign('transaction_type_id').references('id').inTable('transaction_types');
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('transactions');
};
