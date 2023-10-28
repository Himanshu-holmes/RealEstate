import express from 'express';
import { deleteUser, getUserListing, test, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifiyUser.js';


const router = express.Router();

router.get("/test",test);
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/listing/:id',verifyToken, getUserListing)

export default router;

