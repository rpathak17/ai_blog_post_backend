const express = require('express');

const isAuthenticated = require('../middlewares/isAuthenticated');
const { openAIControllers } = require('../controllers/openAIControllers');





const openAIRouter = express.Router();

openAIRouter.post('/generate', isAuthenticated, openAIControllers);

module.exports= openAIRouter;