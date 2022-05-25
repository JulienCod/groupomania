import {Router} from 'express';
import limiter from '../middlewares/rateLimit.js';

import {signup, login, updateUser, deleteUser} from '../controllers/userCtrl.js';

const router = Router();

router.post('/signup', limiter, signup);
router.post('/login', limiter, login);
router.put('/:id', limiter, updateUser);
router.delete('/:id', limiter, deleteUser);

export default router;