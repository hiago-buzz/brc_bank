const connection = require('../database/connection');

module.exports = {

    async create(request, response) {
        const {    
            cpfCnpj,        
            transaction_type_id,
            amount,
            bank,
            account_number,
            agency,
            digit
        } = request.body;

        try {
            await connection('transactions').insert({
                cpfCnpj,        
                transaction_type_id,
                amount,
                transaction_date: new Date(),
                bank,
                account_number,
                agency,
                digit
            });


            return response.json({
                message: 'Transação realizada com sucesso'
            });
        } catch (err) {
            console.error(err);
            return response.status(400).json({
                error: 'Erro ao realizar transação',
                message: `Ocorreu um erro ao tentar realizar a transação: ${String(err)}`
            });
        }
    },

    async index(request, response) {
        const { page = 1, limit = 10, cpfCnpj, transaction_type_id, startDate, endDate, orderBy = 'transaction_date', order = 'desc' } = request.query;
        const offset = (page - 1) * limit;
        console.log(request);
        try {
            const query = connection('transactions')
                .select('transactions.*', 'transaction_types.name as transaction_type')
                .leftJoin('transaction_types', 'transactions.transaction_type_id', 'transaction_types.id')
                .where('transactions.cpfCnpj', cpfCnpj)
                .limit(limit)
                .offset(offset)
                .orderBy(orderBy, order);
            
            if (transaction_type_id) {
                query.where('transactions.transaction_type_id', transaction_type_id);
            }

            if (startDate && endDate) {
                query.whereBetween('transaction_date', [startDate, endDate]);
            }

            const [count] = await connection('transactions').count();
            const transactions = await query;

            response.header('X-Total-Count', count['count(*)']);
            response.header('X-Total-Pages', Math.ceil(count['count(*)'] / limit));

            if (!transactions || transactions.length === 0) {
                return response.status(404).json({
                    error: 'Nenhuma transação encontrada',
                    message: 'Não foi possível encontrar transações com os filtros especificados'
                });
            }

            return response.json(transactions);
        } catch (err) {
            console.error(err);
            return response.status(400).json({
                error: 'Erro ao buscar transações',
                message: `Ocorreu um erro ao tentar buscar as transações: ${String(err)}`
            });
        }
    }
};
