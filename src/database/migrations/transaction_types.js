exports.up = function(knex) {
    return knex.schema.createTable('transaction_types', table => {
        table.increments('id').primary();
        table.string('name',50).notNullable();
        table.timestamps(true, true);
    }).then(() => {
        console.log('Tabela de tipos de transação criada com sucesso');
        const transaction_types = [
            { name: 'saque' },
            { name: 'transferência' }, 
            { name: 'depósito' }
        ]
        return knex('transaction_types').insert(transaction_types);
    }).then(() => {
        console.log('Tipos de transação inseridos com sucesso');
    }).catch(err => {
        console.error('Erro ao criar tabela de tipos de transação:', err);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('transaction_types');
};
