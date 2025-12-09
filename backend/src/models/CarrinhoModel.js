const db = require('../../config/ConexaoBD');

class Carrinho {
    // Adiciona item ao carrinho
    static async adicionarItem(usuario_id, produto_id, quantidade) {
        // Verifica se já existe no carrinho
        const existe = await db.query(
            'SELECT * FROM carrinho WHERE usuario_id = $1 AND produto_id = $2',
            [usuario_id, produto_id]
        );

        if (existe.rows.length > 0) {
            // Atualiza quantidade
            const query = `
                UPDATE carrinho 
                SET quantidade = quantidade + $1 
                WHERE usuario_id = $2 AND produto_id = $3 
                RETURNING *
            `;
            const result = await db.query(query, [quantidade, usuario_id, produto_id]);
            return result.rows[0];
        } else {
            // Insere novo item
            const query = `
                INSERT INTO carrinho (usuario_id, produto_id, quantidade) 
                VALUES ($1, $2, $3) 
                RETURNING *
            `;
            const result = await db.query(query, [usuario_id, produto_id, quantidade]);
            return result.rows[0];
        }
    }

    // Lista itens do carrinho de um usuário
    static async listarPorUsuario(usuario_id) {
        const query = `
            SELECT c.*, p.nome, p.preco, p.imagem,
                   (c.quantidade * p.preco) as subtotal
            FROM carrinho c
            JOIN produtos p ON c.produto_id = p.id
            WHERE c.usuario_id = $1
            ORDER BY c.id
        `;
        const result = await db.query(query, [usuario_id]);
        return result.rows;
    }

    // Atualiza quantidade de um item
    static async atualizarQuantidade(id, quantidade) {
        const query = `
            UPDATE carrinho 
            SET quantidade = $1 
            WHERE id = $2 
            RETURNING *
        `;
        const result = await db.query(query, [quantidade, id]);
        return result.rows[0];
    }

    // Remove item do carrinho
    static async removerItem(id) {
        const query = 'DELETE FROM carrinho WHERE id = $1';
        await db.query(query, [id]);
        return { message: 'Item removido do carrinho' };
    }

    // Limpa todo o carrinho de um usuário
    static async limparCarrinho(usuario_id) {
        const query = 'DELETE FROM carrinho WHERE usuario_id = $1';
        await db.query(query, [usuario_id]);
        return { message: 'Carrinho limpo com sucesso' };
    }

    // Calcula total do carrinho
    static async calcularTotal(usuario_id) {
        const query = `
            SELECT SUM(c.quantidade * p.preco) as total
            FROM carrinho c
            JOIN produtos p ON c.produto_id = p.id
            WHERE c.usuario_id = $1
        `;
        const result = await db.query(query, [usuario_id]);
        return { total: result.rows[0].total || 0 };
    }
}

module.exports = Carrinho;
