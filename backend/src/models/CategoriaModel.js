const db = require('../../config/ConexaoBD');

class Categoria {
    static async criar(nome) {
        const query = 'INSERT INTO categorias (nome) VALUES ($1) RETURNING *';
        const result = await db.query(query, [nome]);
        return result.rows[0];
    }

    static async listar() {
        const query = 'SELECT * FROM categorias ORDER BY id';
        const result = await db.query(query);
        return result.rows;
    }

    static async buscarPorId(id) {
        const query = 'SELECT * FROM categorias WHERE id = $1';
        const result = await db.query(query, [id]);
        return result.rows[0];
    }

    static async atualizar(id, nome) {
        const query = 'UPDATE categorias SET nome = $1 WHERE id = $2 RETURNING *';
        const result = await db.query(query, [nome, id]);
        return result.rows[0];
    }

    static async deletar(id) {
        const query = 'DELETE FROM categorias WHERE id = $1';
        await db.query(query, [id]);
        return { message: 'Categoria removida com sucesso' };
    }
}

module.exports = Categoria;
