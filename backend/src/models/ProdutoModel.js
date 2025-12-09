const db = require('../../config/ConexaoBD');

class Produto {
    static async criar(nome, preco, descricao, categoria_id, imagem) {
        const query = `
            INSERT INTO produtos (nome, preco, descricao, categoria_id, imagem) 
            VALUES ($1, $2, $3, $4, $5) 
            RETURNING *
        `;
        const result = await db.query(query, [nome, preco, descricao, categoria_id, imagem]);
        return result.rows[0];
    }

    static async listar() {
        const query = `
            SELECT p.*, c.nome as categoria_nome 
            FROM produtos p 
            LEFT JOIN categorias c ON p.categoria_id = c.id 
            ORDER BY p.id
        `;
        const result = await db.query(query);
        return result.rows;
    }

    static async buscarPorId(id) {
        const query = `
            SELECT p.*, c.nome as categoria_nome 
            FROM produtos p 
            LEFT JOIN categorias c ON p.categoria_id = c.id 
            WHERE p.id = $1
        `;
        const result = await db.query(query, [id]);
        return result.rows[0];
    }

    static async buscarPorCategoria(categoria_id) {
        const query = 'SELECT * FROM produtos WHERE categoria_id = $1 ORDER BY id';
        const result = await db.query(query, [categoria_id]);
        return result.rows;
    }

    static async atualizar(id, nome, preco, descricao, categoria_id, imagem) {
        const query = `
            UPDATE produtos 
            SET nome = $1, preco = $2, descricao = $3, categoria_id = $4, imagem = $5 
            WHERE id = $6 
            RETURNING *
        `;
        const result = await db.query(query, [nome, preco, descricao, categoria_id, imagem, id]);
        return result.rows[0];
    }

    static async deletar(id) {
        const query = 'DELETE FROM produtos WHERE id = $1';
        await db.query(query, [id]);
        return { message: 'Produto removido com sucesso' };
    }
}

module.exports = Produto;
