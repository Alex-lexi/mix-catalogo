const express = require('express');
const app = express();
const pool = require('./config/ConexaoBD');

// middlewares
app.use(express.json());

// IMPORTANDO AS ROTAS
const categoriaRoutes = require('./src/routes/CategoriaRoutes');

// REGISTRANDO AS ROTAS
app.use('/categorias', categoriaRoutes);

// Rota simples para testar o servidor
app.get('/', (req, res) => {
    res.send("Servidor funcionando.");
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

// Cria tabela automaticamente se não existir
(async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS categorias (
                id SERIAL PRIMARY KEY,
                nome VARCHAR(120) NOT NULL
            );
        `);
        console.log('Tabela categorias pronta');
    } catch (error) {
        console.error('Erro ao criar tabela categorias:', error.message);
    }
})();

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});
