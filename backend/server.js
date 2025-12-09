const express = require('express');
const app = express();
const pool = require('./config/ConexaoBD');

app.use(express.json());

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

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});
