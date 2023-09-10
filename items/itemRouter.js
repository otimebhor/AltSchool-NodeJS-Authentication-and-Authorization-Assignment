const express = require('express');
const { createItem, getAllItems, getItem, updateItem, deleteItem } = require('./itemController');
const { checkAdmin } = require('../middlewares/authMiddleware')

const router = express.Router();

router.post('/', checkAdmin, createItem);
router.get('/', getAllItems);
router.get('/:id', getItem);
router.put('/:id', checkAdmin, updateItem);
router.delete('/:id', checkAdmin, deleteItem);



const itemRouter = router;

module.exports = itemRouter;