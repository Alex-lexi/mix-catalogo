const express = require('express');
const app = express();
const pool = require('./config/ConexaoBD');

// middlewares
app.use(express.json());

// IMPORTANDO AS ROTAS
const categoriaRoutes = require('./src/routes/CategoriaRoutes');
const produtoRoutes = require('./src/routes/ProdutoRoutes');
const usuarioRoutes = require('./src/routes/UsuarioRoutes');
const carrinhoRoutes = require('./src/routes/CarrinhoRoutes');

// REGISTRANDO AS ROTAS
app.use('/categorias', categoriaRoutes);
app.use('/produtos', produtoRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/carrinho', carrinhoRoutes);

// Rota simples para testar o servidor
app.get('/', (req, res) => {
    res.json({ mensagem: "API Mix Catálogo Digital funcionando!" });
});

// Teste de comunicação com o banco
app.get('/testar-banco', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT NOW()');
        res.json({
            mensagem: "Banco conectado!",
            horario: resultado.rows[0]
        });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao conectar ao banco", detalhe: error });
    }
});

// Cria tabelas automaticamente e inicia servidor
async function iniciarServidor() {
    try {
        // Tabela de Categorias
        await pool.query(`
            CREATE TABLE IF NOT EXISTS categorias (
                id SERIAL PRIMARY KEY,
                nome VARCHAR(120) NOT NULL
            );
        `);
        console.log('✅ Tabela categorias pronta');

        // Tabela de Produtos
        await pool.query(`
            CREATE TABLE IF NOT EXISTS produtos (
                id SERIAL PRIMARY KEY,
                nome VARCHAR(180) NOT NULL,
                preco NUMERIC(10,2) NOT NULL,
                descricao TEXT,
                categoria_id INTEGER REFERENCES categorias(id) ON DELETE SET NULL,
                imagem TEXT
            );
        `);
        console.log('✅ Tabela produtos pronta');

        // Tabela de Usuários
        await pool.query(`
            CREATE TABLE IF NOT EXISTS usuarios (
                id SERIAL PRIMARY KEY,
                nome VARCHAR(120) NOT NULL,
                email VARCHAR(180) UNIQUE NOT NULL,
                senha VARCHAR(255) NOT NULL
            );
        `);
        console.log('✅ Tabela usuarios pronta');

        // Tabela de Carrinho
        await pool.query(`
            CREATE TABLE IF NOT EXISTS carrinho (
                id SERIAL PRIMARY KEY,
                usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
                produto_id INTEGER REFERENCES produtos(id) ON DELETE CASCADE,
                quantidade INTEGER DEFAULT 1
            );
        `);
        console.log('✅ Tabela carrinho pronta');

    } catch (error) {
        console.error('❌ Erro ao criar tabelas:', error.message);
    }

    app.listen(3000, () => {
        console.log("🚀 Servidor rodando em http://localhost:3000");
    });
}

iniciarServidor();
