import {Router} from 'express';
import limiter from '../middlewares/rateLimit.js';
import auth from '../middlewares/authentification.js';
import idCompareCommentaire from '../middlewares/idCompareCommentaire.js'
import {getAll, createCommentaire, deleteCommentaire, updateCommentaire} from '../controllers/commentaireCtrl.js';

const router = Router();

router.get('/',auth, getAll);
router.post('/', limiter, auth, createCommentaire);
router.put('/:id', limiter, auth,idCompareCommentaire, updateCommentaire);
router.delete('/:id',auth,idCompareCommentaire, deleteCommentaire);

export default router;