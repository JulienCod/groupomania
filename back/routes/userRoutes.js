import {Router} from 'express';
import limiter from '../middlewares/rateLimit.js';

import {signup, login} from '../controllers/userCtrl.js';

const router = Router();

router.post('/signup', limiter, signup);
router.post('/login', limiter, login);

export default router;