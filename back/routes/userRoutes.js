import {Router} from 'express';
import limiter from '../middlewares/rateLimit.js';
import auth from '../middlewares/authentification.js';
import userCompare from '../middlewares/userCompare.js';
import {signup, login, updateUser, deleteUser, getById} from '../controllers/userCtrl.js';
import multer from '../middlewares/multer-config.js';

const router = Router();

router.post('/signup', limiter, multer, signup);
router.post('/login', limiter, login);
router.put('/:id', limiter, auth, userCompare, multer, updateUser);
router.delete('/:id', limiter, auth, userCompare,  deleteUser);
router.get('/:id',auth, getById)

export default router;