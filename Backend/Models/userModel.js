import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      
    },
    style: {
      type: String,
     
    },
    description: {
      type: String,
     
    },
    
    image: [
      {
        type: String,
      }
    ],
    imagePublicId: [
      {
        url:{type: String},
        publicId:{type: String}
      }
    ],
   
    role: {
      type: String,
    },
   
    phone: {
      type: String,
      
    },

    isAdmin: {
      type: Boolean,
     
      default: false,
    },
    approved: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      default: 'B',
    },
    
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model('User', userSchema)

export default User