import express from 'express';
const router = express.Router();

import { createAuction, deleteAuctions, getAuctions } from '../controllers/auctionController.js';


router.route('/add').post( createAuction)
router.route('/').get( getAuctions)
router.route('/delete').delete( deleteAuctions)





export default router