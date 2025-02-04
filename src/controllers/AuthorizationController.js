const connection = require('../database/connection');

module.exports = {
    async authenticate(request, response) {
        const { cpfCnpj, password } = request.body;

        try {
            const user = await connection
                .select('id')
                .from('users')
                .where('cpfCnpj', cpfCnpj)
                .andWhere('password', password)
                .first();

            if (!user) {
                return response.status(401).json({ 
                    error: 'Credenciais inválidas',
                    message: 'Usuário ou senha incorretos'
                });
            }

            return response.json({
                id: user.id,
                cpfCnpj: user.cpfCnpj,
                name: user.name,
                image: user.image,
                message: 'Autenticação realizada com sucesso'
            });
            
        } catch (err) {
            console.error(err);
            return response.status(400).json({ 
                error: 'Erro na autenticação',
                message: `Ocorreu um erro ao tentar autenticar: ${String(err)}`
            });
        }
    }

};

