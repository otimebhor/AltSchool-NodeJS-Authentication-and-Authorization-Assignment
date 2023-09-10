const express = require('express');
const auth = require('../middlewares/authMiddleware');
const { createUser } = require('./userController');
const router = express.Router();



// router.use(auth.apiKeyAuth);
router.post('/', createUser);

const userRouter = router;

module.exports = userRouter
