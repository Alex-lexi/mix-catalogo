const express = require('express');
const CategoriaController = require('../controllers/CategoriaController');

const router = express.Router();

router.post('/', CategoriaController.criar);
router.get('/', CategoriaController.listar);
router.get('/:id', CategoriaController.buscarPorId);
router.put('/:id', CategoriaController.atualizar);
router.delete('/:id', CategoriaController.deletar);

module.exports = router;
