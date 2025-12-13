const Produto = require('../models/ProdutoModel');

class ProdutoController {
    static async criar(req, res) {
        try {
            const { nome, preco, descricao, categoria_id, imagem } = req.body;

            if (!nome || nome.trim() === '') {
                return res.status(400).json({ erro: 'Nome do produto é obrigatório' });
            }

            if (!preco || preco <= 0) {
                return res.status(400).json({ erro: 'Preço inválido' });
            }

            if (!categoria_id) {
                return res.status(400).json({ erro: 'Categoria é obrigatória' });
            }

            const produto = await Produto.criar(
                nome,
                preco,
                descricao || '',
                categoria_id,
                imagem || null
            );

            res.status(201).json(produto);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }

    static async listar(req, res) {
        try {
            const produtos = await Produto.listar();
            res.json(produtos);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }

    static async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            const produto = await Produto.buscarPorId(id);

            if (!produto) {
                return res.status(404).json({ erro: "Produto não encontrado" });
            }

            res.json(produto);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }

    static async buscarPorCategoria(req, res) {
        try {
            const { categoria_id } = req.params;
            const produtos = await Produto.buscarPorCategoria(categoria_id);
            res.json(produtos);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }

    static async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { nome, preco, descricao, categoria_id, imagem } = req.body;

            if (!nome || nome.trim() === '') {
                return res.status(400).json({ erro: 'Nome do produto é obrigatório' });
            }

            if (!preco || preco <= 0) {
                return res.status(400).json({ erro: 'Preço inválido' });
            }

            const produto = await Produto.atualizar(
                id,
                nome,
                preco,
                descricao || '',
                categoria_id,
                imagem || null
            );

            if (!produto) {
                return res.status(404).json({ erro: 'Produto não encontrado' });
            }

            res.json(produto);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }

    static async deletar(req, res) {
        try {
            const { id } = req.params;
            const resultado = await Produto.deletar(id);
            res.json(resultado);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }
}

module.exports = ProdutoController;
