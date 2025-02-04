const connection = require('../database/connection');

module.exports = {
   
    async create(request, response) {
        const payload = request.body;

        try {
            const accounts = payload.map(({ cpfCnpj, bank, account_number, agency, digit }) => ({
                cpfCnpj,
                bank,
                account_number,
                agency,
                digit
            }));
            const ids = await connection('accounts').insert(accounts);

            return response.json({ 
                ids,
                message: 'Contas criadas com sucesso'
            });
        } catch (err) {
            console.error(err);
            return response.status(400).json({
                error: 'Erro ao criar conta',
                message: `Ocorreu um erro ao tentar criar a conta: ${String(err)}`
            });
        }
    },

    async index(request, response) {
        const { cpfCnpj } = request.query;

        try {
            const accounts = await connection('accounts')
            .select('accounts.*')
            .leftJoin('transactions', function() {
                this.on('accounts.cpfCnpj', '=', 'transactions.cpfCnpj')
                    .andOn('accounts.bank', '=', 'transactions.bank')
                    .andOn('accounts.account_number', '=', 'transactions.account_number')
                    .andOn('accounts.agency', '=', 'transactions.agency')
                    .andOn('accounts.digit', '=', 'transactions.digit')

            })
            .where('accounts.cpfCnpj', cpfCnpj)
            .sum(connection.raw('CASE WHEN transaction_type_id IN (1,2) THEN -amount ELSE amount END'))
            .groupBy('accounts.id',);


            if (!accounts || accounts.length === 0) {
                return response.status(404).json({
                    error: 'Nenhuma conta encontrada',
                    message: 'Não foi possível encontrar contas para o usuário especificado'
                });
            }

            return response.json(accounts);
        } catch (err) {
            console.error(err);
            return response.status(400).json({
                error: 'Erro ao buscar contas',
                message: `Ocorreu um erro ao tentar buscar as contas: ${String(err)}`
            });
        }
    },

    async show(request, response) {
        const { id } = request.params;

        try {
            const account = await connection('accounts')
                .select('accounts.*')
                .leftJoin('transactions', function() {
                    this.on('accounts.cpfCnpj', '=', 'transactions.cpfCnpj')
                        .andOn('accounts.bank', '=', 'transactions.bank')
                        .andOn('accounts.account_number', '=', 'transactions.account_number')
                        .andOn('accounts.agency', '=', 'transactions.agency')
                        .andOn('accounts.digit', '=', 'transactions.digit')
    
                })
                .where('accounts.id', id)
                .sum(connection.raw('CASE WHEN transaction_type_id IN (1,2) THEN -amount ELSE amount END'))
                .groupBy('accounts.id')
                .first();

            if (!account) {
                return response.status(404).json({
                    error: 'Conta não encontrada',
                    message: 'Não foi possível encontrar a conta especificada'
                });
            }

            return response.json(account);
        } catch (err) {
            console.error(err);
            return response.status(400).json({
                error: 'Erro ao buscar conta',
                message: `Ocorreu um erro ao tentar buscar a conta: ${String(err)}`
            });
        }
    },

    async update(request, response) {
        const { id } = request.params;
        const {     
             bank,
             account_number,
            agency,
            digit } = request.body;

        try {
            const account = await connection('accounts')
                .where('id', id)
                .first();

            if (!account) {
                return response.status(404).json({
                    error: 'Conta não encontrada',
                    message: 'Não foi possível encontrar a conta especificada'
                });
            }

            await connection('accounts')
                .where('id', id)
                .update({
                    bank,
                    account_number,
                    agency,
                    digit
                });

            return response.json({
                message: 'Conta atualizada com sucesso'
            });
        } catch (err) {
            console.error(err);
            return response.status(400).json({
                error: 'Erro ao atualizar conta',
                message: `Ocorreu um erro ao tentar atualizar a conta: ${String(err)}`
            });
        }
    },


    async delete(request, response) {
        const { id } = request.params;

        try {
            const account = await connection('accounts')
                .where('id', id)
                .first();

            if (!account) {
                return response.status(404).json({
                    error: 'Conta não encontrada',
                    message: 'Não foi possível encontrar a conta especificada'
                });
            }

            await connection('accounts')
                .where('id', id)
                .delete();

            return response.json({
                message: 'Conta deletada com sucesso'
            });
        } catch (err) {
            console.error(err);
            return response.status(400).json({
                error: 'Erro ao deletar conta',
                message: `Ocorreu um erro ao tentar deletar a conta: ${String(err)}`
            });
        }
    }
};


