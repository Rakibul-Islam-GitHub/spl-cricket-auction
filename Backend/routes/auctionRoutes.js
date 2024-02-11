import express from 'express';
const router = express.Router();

import { auctionUpdate, createAuction, deleteAuctions, deleteSingleAuction, getAuctions } from '../controllers/auctionController.js';


router.route('/add').post( createAuction)
router.route('/').get( getAuctions)
router.route('/delete').delete( deleteAuctions)
router.route('/delete/:id').delete( deleteSingleAuction)
router.route('/update/:id').put( auctionUpdate)





export default router