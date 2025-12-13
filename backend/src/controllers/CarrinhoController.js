const Carrinho = require('../models/CarrinhoModel');

class CarrinhoController {
    static async adicionarItem(req, res) {
        try {
            const { usuario_id, produto_id, quantidade } = req.body;

            if (!usuario_id || !produto_id) {
                return res.status(400).json({ erro: 'Usuário e produto são obrigatórios' });
            }

            if (quantidade !== undefined && quantidade <= 0) {
                return res.status(400).json({ erro: 'Quantidade inválida' });
            }

            const item = await Carrinho.adicionarItem(
                usuario_id,
                produto_id,
                quantidade || 1
            );

            res.status(201).json(item);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }

    static async listarPorUsuario(req, res) {
        try {
            const { usuario_id } = req.params;
            const itens = await Carrinho.listarPorUsuario(usuario_id);
            res.json(itens);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }

    static async calcularTotal(req, res) {
        try {
            const { usuario_id } = req.params;
            const total = await Carrinho.calcularTotal(usuario_id);
            res.json(total);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }

    static async atualizarQuantidade(req, res) {
        try {
            const { id } = req.params;
            const { quantidade } = req.body;

            if (!quantidade || quantidade <= 0) {
                return res.status(400).json({ erro: 'Quantidade inválida' });
            }

            const item = await Carrinho.atualizarQuantidade(id, quantidade);

            if (!item) {
                return res.status(404).json({ erro: 'Item não encontrado' });
            }

            res.json(item);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }

    static async removerItem(req, res) {
        try {
            const { id } = req.params;
            const resultado = await Carrinho.removerItem(id);
            res.json(resultado);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }

    static async limparCarrinho(req, res) {
        try {
            const { usuario_id } = req.params;
            const resultado = await Carrinho.limparCarrinho(usuario_id);
            res.json(resultado);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }
}

module.exports = CarrinhoController;
