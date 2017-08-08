'use strict';

import express from 'express'
import User from '../controller/user/user'
const router = express.Router()
router.post('/login', User.login);
router.post('/add', User.add);
export default router