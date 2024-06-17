import { createUser,deleteUser,fetchUsers,showUser,updateUser } from '../Controller/user.controller.js';
import express, {Router}from 'express';
const router = express.Router();
router.get('/',fetchUsers)
router.get('/:id',showUser)

router.post('/',createUser)
router.put('/:id',updateUser)
router.delete('/:id',deleteUser)
export default router ;