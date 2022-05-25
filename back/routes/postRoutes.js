import {Router} from 'express';
import {getAll, createPost, updatePost, deletePost} from '../controllers/postCtrl.js';

const router = Router();

router.get('/', getAll);
router.post('/', createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);


export default router;