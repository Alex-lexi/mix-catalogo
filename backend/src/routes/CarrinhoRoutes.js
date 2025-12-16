const express = require('express');
const CarrinhoController = require('../controllers/CarrinhoController');

const router = express.Router();

router.post('/', CarrinhoController.adicionarItem);
router.get('/:usuario_id', CarrinhoController.listarPorUsuario);
router.get('/:usuario_id/total', CarrinhoController.calcularTotal);
router.put('/:id', CarrinhoController.atualizarQuantidade);
router.delete('/:id', CarrinhoController.removerItem);
router.delete('/limpar/:usuario_id', CarrinhoController.limparCarrinho);

module.exports = router;
