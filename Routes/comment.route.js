
import express,{Router} from 'express';
import { createComment, deleteComment, fetchComments, showComment, updateComment } from '../Controller/comment.controller.js';

const router =express.Router();
router.get('/',fetchComments)
router.get('/:id',showComment)

router.post('/',createComment)
router.put('/:id',updateComment)
router.delete('/:id',deleteComment)
export default router ;