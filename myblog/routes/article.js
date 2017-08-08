'use strict';

import express from 'express'
import Article from '../controller/article/article'
const router = express.Router()
router.get('/list', Article.getAll);
router.get('/article/:id', Article.getById);
router.get('/delete/:id', Article.delete);
router.post('/save', Article.save);
export default router