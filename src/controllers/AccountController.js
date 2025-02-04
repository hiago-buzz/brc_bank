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


    async show(request, response) {
        const { id } = request.params;

        try {
            const account = await connection('accounts')
                .select('accounts.*')
                .leftJoin('transactions', 'accounts.cpfCnpj', 'transactions.cpfCnpj')
                .where('accounts.id', id)
                .sum('transactions.amount as balance')
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


