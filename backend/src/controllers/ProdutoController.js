const Produto = require('../models/ProdutoModel');

class ProdutoController {
    // POST /produtos - Criar produto
    static async criar(req, res) {
        try {
            const { nome, preco, descricao, categoria_id, imagem } = req.body;
            const produto = await Produto.criar(nome, preco, descricao, categoria_id, imagem);
            res.status(201).json(produto);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }

    // GET /produtos - Listar todos
    static async listar(req, res) {
        try {
            const produtos = await Produto.listar();
            res.json(produtos);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }

    // GET /produtos/:id - Buscar por ID
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

    // GET /produtos/categoria/:categoria_id - Buscar por categoria
    static async buscarPorCategoria(req, res) {
        try {
            const { categoria_id } = req.params;
            const produtos = await Produto.buscarPorCategoria(categoria_id);
            res.json(produtos);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }

    // PUT /produtos/:id - Atualizar
    static async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { nome, preco, descricao, categoria_id, imagem } = req.body;
            const produto = await Produto.atualizar(id, nome, preco, descricao, categoria_id, imagem);
            
            if (!produto) {
                return res.status(404).json({ erro: "Produto não encontrado" });
            }

            res.json(produto);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }

    // DELETE /produtos/:id - Deletar
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
