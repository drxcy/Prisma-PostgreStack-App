
import express,{Router} from 'express';
import { createPost, deletePost, fetchPosts, searchPost, showPost, updatePost } from '../Controller/post.controller.js';

const router =express.Router();
router.get('/',fetchPosts)
router.get('/search',searchPost)
router.get('/:id',showPost)

router.post('/',createPost)
router.put('/:id',updatePost)
router.delete('/:id',deletePost)
export default router ;