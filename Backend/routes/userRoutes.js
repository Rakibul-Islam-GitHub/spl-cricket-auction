import express from 'express';
const router = express.Router();
import {userAuth,getUser,getProfileById,updateMyProfile, userRegister,getUsersList, userUpdate, getApprovedUsers, deleteuser} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js';

router.post('/', userRegister);
router.route('/').get( getUsersList )
router.route('/approvedusers').get( getApprovedUsers )
router.route('/profile').get( protect ,getUser )
router.route('/update/:id').put( protect ,userUpdate )
router.route('/delete/:id').delete( deleteuser )
router.route('/profile/update').put( protect ,updateMyProfile )
router.post('/login', userAuth);
router.get('/:id', getProfileById);





export default router