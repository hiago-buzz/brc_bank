const connection = require('../database/connection');

module.exports = {
    async testUsers(request, response) {
        try {
            const users = await connection.select('*').from('users');
            return response.json(users);
        } catch (err) {
            return response.status(400).json({
                error: 'Erro ao buscar usuários',
                message: `Ocorreu um erro: ${String(err)}`
            });
        }
    },

    async testAccounts(request, response) {
        try {
            const accounts = await connection.select('*').from('accounts');
            return response.json(accounts);
        } catch (err) {
            return response.status(400).json({
                error: 'Erro ao buscar contas',
                message: `Ocorreu um erro: ${String(err)}`
            });
        }
    },

    async testTransactionTypes(request, response) {
        try {
            const transactionTypes = await connection.select('*').from('transaction_types');
            return response.json(transactionTypes);
        } catch (err) {
            return response.status(400).json({
                error: 'Erro ao buscar tipos de transação',
                message: `Ocorreu um erro: ${String(err)}`
            });
        }
    }
};
