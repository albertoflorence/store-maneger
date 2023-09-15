const { Router } = require('express');
const { getAll, getById, create } = require('../controllers/sales.controller');

const router = Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);

module.exports = router;
