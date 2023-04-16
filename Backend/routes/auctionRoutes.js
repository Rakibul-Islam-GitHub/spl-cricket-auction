import express from 'express';
const router = express.Router();

import { createAuction, getAuctions } from '../controllers/auctionController.js';


router.route('/add').post( createAuction)
router.route('/').get( getAuctions)





export default router