import {Router} from 'express';
import limiter from '../middlewares/rateLimit.js';
import auth from '../middlewares/authentification.js';
import idCompareCommentaire from '../middlewares/idCompareCommentaire.js'
import {getById, createCommentaire, deleteCommentaire, updateCommentaire, like} from '../controllers/commentaireCtrl.js';
import multer from '../middlewares/multer-config.js';

const router = Router();

router.get('/:id', auth, getById);
router.post('/', limiter, auth, multer, createCommentaire);
router.put('/:id', limiter, auth, idCompareCommentaire, multer, updateCommentaire);
router.delete('/:id', auth, idCompareCommentaire, deleteCommentaire);
router.put('/:id/like', limiter, auth, like);
export default router;