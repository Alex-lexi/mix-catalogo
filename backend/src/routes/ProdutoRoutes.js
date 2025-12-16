const express = require('express');
const ProdutoController = require('../controllers/ProdutoController');

const router = express.Router();

router.post('/', ProdutoController.criar);
router.get('/', ProdutoController.listar);
router.get('/:id', ProdutoController.buscarPorId);
router.get('/categoria/:categoria_id', ProdutoController.buscarPorCategoria);
router.put('/:id', ProdutoController.atualizar);
router.delete('/:id', ProdutoController.deletar);

module.exports = router;
