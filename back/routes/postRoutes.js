import {Router} from 'express';
import limiter from '../middlewares/rateLimit.js';
import auth from '../middlewares/authentification.js';
import idComparePost from '../middlewares/idComparePost.js';
import {getAll, createPost, updatePost, deletePost} from '../controllers/postCtrl.js';
import like from '../controllers/like.js'

const router = Router();

router.get('/',auth, getAll);
router.post('/', limiter, auth, createPost);
router.put('/:id', limiter, auth,idComparePost, updatePost);
router.delete('/:id',auth,idComparePost, deletePost);
router.post('/:id/like',auth, like)

export default router;