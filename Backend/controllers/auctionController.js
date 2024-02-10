import asyncHandler from 'express-async-handler'
import Auction from '../Models/auctionModel.js'

export const createAuction= ('/add', asyncHandler(async (req, res)=>{
    let {
      playerid,
      playername,
      category,
      soldprice,
      team
    } = req.body;
    playername.trim()
    soldprice= Number(soldprice)
    const auction = new Auction({
       
      playerid,
      playername,
      category,
      soldprice,
      team
        
        
      })
  
    const leagueDone= await auction.save()

    if (leagueDone) {
        res.json(leagueDone)
        
    }
    else {
        res.status(404)
        throw new Error('Problem with creating Auction')
    }


}))




/// get all auctions 
export const getAuctions = ('/', asyncHandler(async (req, res)=>{

  const auctions = await Auction.find()
    if (auctions) {
      res.json(auctions);
    } else {
      res.status(404);
      throw new Error("Auction History not found...");
    }
}))

// /// update delivery, update payment : change ispaid true & isDelivered true
// export const updateLeague = ('update/:id', asyncHandler(async (req, res)=>{

  
  
//   const updateDone = await Auction.findOneAndUpdate({_id:req.params.id}, req.body, {
//     new: true
//   })
//     if (updateDone) {
//       res.json({success: true});
//     } else {
//       res.status(404);
//       throw new Error("Auction Details not found...");
//     }
// }))

// /// delete Auction 
// /// private route
// /// api/Auction/delete/:id



export const deleteAuctions =
  ("/delete",
  asyncHandler(async (req, res) => {
    const auction = await Auction.deleteMany({createdAt: {
													$gt: '2023-05-14T11:45:46.434Z'}});
    if (auction) {
      res.json({success: true, message:'Auction deleted successfully'});
    } else {
      res.status(404);
      throw new Error("Auction Not Found...");
    }
  }));