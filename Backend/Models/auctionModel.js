import mongoose from 'mongoose'

const auctionSchema = mongoose.Schema(
  {
    playerid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    playername: {
      type: String,
      
    },
    team: {
      type: String,
      
    },
    category: {
      type: String,
      
    },
    
    
    soldprice: {
      type: Number,
      default: 0

    },
    season: {
      type: Number,
      default: 1

    },
   
    
  },
  {
    timestamps: true,
  }
)

const Auction = mongoose.model('Auction', auctionSchema)

export default Auction