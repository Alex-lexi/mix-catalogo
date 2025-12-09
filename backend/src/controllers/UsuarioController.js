const Usuario = require('../models/UsuarioModel');

class UsuarioController {
    // POST /usuarios - Criar usuário
    static async criar(req, res) {
        try {
            const { nome, email, senha } = req.body;
            
            // Verifica se email já existe
            const existente = await Usuario.buscarPorEmail(email);
            if (existente) {
                return res.status(400).json({ erro: "Email já cadastrado" });
            }

            const usuario = await Usuario.criar(nome, email, senha);
            res.status(201).json(usuario);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }

    // GET /usuarios - Listar todos
    static async listar(req, res) {
        try {
            const usuarios = await Usuario.listar();
            res.json(usuarios);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }

    // GET /usuarios/:id - Buscar por ID
    static async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            const usuario = await Usuario.buscarPorId(id);

            if (!usuario) {
                return res.status(404).json({ erro: "Usuário não encontrado" });
            }

            res.json(usuario);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }

    // PUT /usuarios/:id - Atualizar
    static async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { nome, email } = req.body;
            const usuario = await Usuario.atualizar(id, nome, email);

            if (!usuario) {
                return res.status(404).json({ erro: "Usuário não encontrado" });
            }

            res.json(usuario);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }

    // DELETE /usuarios/:id - Deletar
    static async deletar(req, res) {
        try {
            const { id } = req.params;
            const resultado = await Usuario.deletar(id);
            res.json(resultado);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }
}

module.exports = UsuarioController;
