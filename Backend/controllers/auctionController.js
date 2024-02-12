import asyncHandler from 'express-async-handler'
import Auction from '../Models/auctionModel.js'

export const createAuction= ('/add', asyncHandler(async (req, res)=>{
    let {
      playerid,
      playername,
      category,
      soldprice,
      team,
      season
    } = req.body;
    playername.trim()
    soldprice= Number(soldprice)
    const auction = new Auction({
       
      playerid,
      playername,
      category,
      soldprice,
      team,
      season
        
        
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


  export const deleteSingleAuction =
  ("/delete/:id",
  asyncHandler(async (req, res) => {
    const product = await Auction.deleteOne({_id:req.params.id});
    if (product) {
      res.json({success: true, message:'Item deleted successfully'});
    } else {
      res.status(404);
      throw new Error("Item Not Found...");
    }
  }));


  export const auctionUpdate = ('/update/:id', asyncHandler(async(req, res) =>{
    let {soldprice, team} = req.body.creds
   // console.log(req.body)
   soldprice= Number(soldprice)
       if (team) {
        const user= await Auction.findOneAndUpdate({_id:req.params.id}, {
          "$set":{
              'soldprice' : soldprice,
              'team' : team
          }
         } )
         if (user) {
          res.json({success: true})
      }else{
          res.status(404)
          throw new Error('Auction not found')
      }
       }else{
        const user= await Auction.findOneAndUpdate({_id:req.params.id}, {
          "$set":{
              'soldprice' : soldprice
          }
         } )

         if (user) {
          res.json({success: true})
      }else{
          res.status(404)
          throw new Error('Auction not found')
      }
       }
       
      
       
   }))