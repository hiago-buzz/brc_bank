const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { cpfCnpj, name, email, phone, image, password } = request.body;

        try {
            const user = await connection('users').insert({
                cpfCnpj,
                name, 
                email,
                phone,
                image,
                password
            });

            return response.json({
                id: user[0],
                message: 'Usuário criado com sucesso'
            });
        } catch (err) {
            console.error(err);
            return response.status(400).json({
                error: 'Erro ao criar usuário',
                message: `Ocorreu um erro ao tentar criar o usuário: ${String(err)}`
            });
        }
    },

    async show(request, response) {
        const { id } = request.params;

        try {
            const user = await connection('users')
                .where('id', id)
                .select(['cpfCnpj', 'name', 'email', 'phone', 'image'])
                .first();

            if (!user) {
                return response.status(404).json({
                    error: 'Usuário não encontrado',
                    message: 'Não foi possível encontrar o usuário especificado'
                });
            }
            
            return response.json(user);
        } catch (err) {
            console.error(err);
            return response.status(400).json({
                error: 'Erro ao buscar usuário',
                message: `Ocorreu um erro ao tentar buscar o usuário: ${String(err)}`
            });
        }
    },

    async update(request, response) {
        const { id } = request.params;
        const { name, email, phone, image, password } = request.body;

        try {
            const user = await connection('users')
                .where('id', id)
                .first();

            if (!user) {
                return response.status(404).json({
                    error: 'Usuário não encontrado',
                    message: 'Não foi possível encontrar o usuário especificado'
                });
            }

            await connection('users')
                .where('id', id)
                .update({
                    name,
                    email,
                    phone,
                    image,
                    password
                });

            return response.json({
                message: 'Usuário atualizado com sucesso'
            });
        } catch (err) {
            console.error(err);
            return response.status(400).json({
                error: 'Erro ao atualizar usuário',
                message: `Ocorreu um erro ao tentar atualizar o usuário: ${String(err)}`
            });
        }
    },

    async delete(request, response) {
        const { id } = request.params;

        try {
            const user = await connection('users')
                .where('id', id)
                .first();

            if (!user) {
                return response.status(404).json({
                    error: 'Usuário não encontrado',
                    message: 'Não foi possível encontrar o usuário especificado'
                });
            }

            await connection('users')
                .where('id', id)
                .delete();

            return response.json({
                message: 'Usuário removido com sucesso'
            });
        } catch (err) {
            console.error(err);
            return response.status(400).json({
                error: 'Erro ao remover usuário',
                message: `Ocorreu um erro ao tentar remover o usuário: ${String(err)}`
            });
        }
    }
};
