import express ,{Router} from 'express';
import userRoute from './user.route.js'
import postRoute from './post.route.js'
import commentRoute from './comment.route.js';

const router =express.Router();
router.use('/api/user',userRoute)
router.use('/api/post',postRoute)
router.use('/api/comment',commentRoute)
export default router ;