import {Router} from 'express';
import limiter from '../middlewares/rateLimit.js';
import auth from '../middlewares/authentification.js';
import idComparePost from '../middlewares/idComparePost.js';
import {getAll, createPost, updatePost, deletePost, getById, like} from '../controllers/postCtrl.js';
import multer from '../middlewares/multer-config.js';

const router = Router();

router.get('/',auth, getAll);
router.get('/:id',auth, getById);
router.post('/',limiter, auth, multer, createPost);
router.put('/:id', limiter, auth, idComparePost,multer , updatePost);
router.delete('/:id', auth, idComparePost, deletePost);
router.put('/:id/like',limiter, auth, like)

export default router;