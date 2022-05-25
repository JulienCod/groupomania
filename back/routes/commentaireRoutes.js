import {Router} from 'express';
import {getAll, createCommentaire, deleteCommentaire, updateCommentaire} from '../controllers/commentaireCtrl.js';

const router = Router();

router.get('/', getAll);
router.post('/', createCommentaire);
router.put('/:id', updateCommentaire);
router.delete('/:id', deleteCommentaire);


export default router;