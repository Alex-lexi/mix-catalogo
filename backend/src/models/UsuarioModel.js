const db = require('../../config/ConexaoBD');

class Usuario {
    static async criar(nome, email, senha) {
        const query = `
            INSERT INTO usuarios (nome, email, senha) 
            VALUES ($1, $2, $3) 
            RETURNING id, nome, email
        `;
        const result = await db.query(query, [nome, email, senha]);
        return result.rows[0];
    }

    static async listar() {
        const query = 'SELECT id, nome, email FROM usuarios ORDER BY id';
        const result = await db.query(query);
        return result.rows;
    }

    static async buscarPorId(id) {
        const query = 'SELECT id, nome, email FROM usuarios WHERE id = $1';
        const result = await db.query(query, [id]);
        return result.rows[0];
    }

    static async buscarPorEmail(email) {
        const query = 'SELECT * FROM usuarios WHERE email = $1';
        const result = await db.query(query, [email]);
        return result.rows[0];
    }

    static async atualizar(id, nome, email) {
        const query = `
            UPDATE usuarios 
            SET nome = $1, email = $2 
            WHERE id = $3 
            RETURNING id, nome, email
        `;
        const result = await db.query(query, [nome, email, id]);
        return result.rows[0];
    }

    static async deletar(id) {
        const query = 'DELETE FROM usuarios WHERE id = $1';
        await db.query(query, [id]);
        return { message: 'Usuário removido com sucesso' };
    }
}

module.exports = Usuario;
