const Categoria = require('../models/CategoriaModel');

class CategoriaController {
    static async criar(req, res) {
        try {
            const { nome } = req.body;

            if (!nome || nome.trim() === '') {
                return res.status(400).json({ erro: 'Nome da categoria é obrigatório' });
            }

            const categoria = await Categoria.criar(nome);
            res.status(201).json(categoria);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }

    static async listar(req, res) {
        try {
            const categorias = await Categoria.listar();
            res.json(categorias);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }

    static async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            const categoria = await Categoria.buscarPorId(id);

            if (!categoria) {
                return res.status(404).json({ erro: "Categoria não encontrada" });
            }

            res.json(categoria);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }

    static async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { nome } = req.body;

            if (!nome || nome.trim() === '') {
                return res.status(400).json({ erro: 'Nome da categoria é obrigatório' });
            }

            const categoria = await Categoria.atualizar(id, nome);

            if (!categoria) {
                return res.status(404).json({ erro: 'Categoria não encontrada' });
            }

            res.json(categoria);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }

    static async deletar(req, res) {
        try {
            const { id } = req.params;
            const resultado = await Categoria.deletar(id);
            res.json(resultado);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }
}

module.exports = CategoriaController;
