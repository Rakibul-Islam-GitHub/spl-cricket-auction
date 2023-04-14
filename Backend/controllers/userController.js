import asyncHandler from 'express-async-handler'
import User from '../Models/userModel.js'
import cloudinary from 'cloudinary'
import jwt from 'jsonwebtoken'

/// new user register
/// public route
/// post req
/// api/user/

export const userRegister = ('/', asyncHandler(async(req, res) =>{
    const {name, age, style, role, image, phone} = req.body
 console.log(req.body)
   
    if ( image.length===0) {
        image.push('https://i.ibb.co/Yy0FdfH/player.png')
        const user = new User({
             
           name,
           image,
           age,
           style,
           role,
           phone,
           
          
           
         })
     
       const userAddDone= await user.save()
       if (userAddDone) {
             res.json(userAddDone)
             
            }
      }else{
        
      let uploadedImage=[]
      let uploadedImagePublicId=[]

      try {

        
        const uploadResult= await Promise.all(image.map(async img=>{
          const result= await cloudinary.uploader.upload(img,{
            folder: 'spl/players'
          })
          uploadedImagePublicId.push({
            url: result.secure_url,
            publicId: result.public_id
      
          })
          uploadedImage.push(result.secure_url)
          return result.secure_url
          
        })) 
        try {

            const user = new User({
             
               name,
              image:uploadedImage,
              imagePublicId:uploadedImagePublicId,
              age,
              style,
              role,
              phone,
              
            })
        
          const userAddDone= await user.save()
          if (userAddDone) {
                res.json(userAddDone)}
            
           } catch (error) {
            console.log(error);
            throw new Error('server error')
           }
         } catch (error) {
          console.log(error);
          throw new Error('problem with image upload');
         }
      }


        
        }))
        


// const user= await User.create({firstname, lastname, email,  password, city, gender, ustarating, preferedcourt, phone})

// if (user) {
//     const token = jwt.sign({ id: user._id , email: user.email, isAdmin: user.isAdmin, role: user.role}, process.env.JWT_SECRET, {
//                     expiresIn: '30d'
//                 });
//     res.json({
//                     id: user._id,
//                     firstname,
//                     lastname,
//                     email,
//                     gender,
//                     city,
//                     ustarating,
//                     preferedcourt,
//                     phone,
//                     image: user.image,
//                     isAdmin: user.isAdmin,
//                     role: user.role,
//                     token : token
                    
//                 })
    
// }

   


/// user login auth 
/// public route
/// api/user/login
export const userAuth= ('/login', asyncHandler(async (req, res)=> {
    const {phone} = req.body
    try {
        const user=await User.findOne({phone})
        if (user) {
            const token = jwt.sign({ id: user._id , isAdmin:user.isAdmin,  phone: user.phone,}, process.env.JWT_SECRET, {
                expiresIn: '30d'
            });
            res.json({
                id: user._id,
                name: user.name,
                
                image: user.image,
                isAdmin: user.isAdmin,
                role: user.role,
                age: user.age,
                style: user.style,
                token : token
                
            })
            
        }else{
            throw new Error('Invalid email or password')
            
        }
        
        
    } catch (error) {
        throw new Error('invalid email or password')
    }
    
    
}))


/// get logged in user profile
/// private route
/// api/user/profile

export const getUser = ('/profile', asyncHandler(async(req, res) =>{

    const user= await User.findById(req.user._id, '-password')
   
    if (user) {
       
        res.json(user)
    }else{
        res.status(404)
        throw new Error('User not found')
    }
}))


/// get users list by admin
/// private route
/// get req
/// api/user/

export const getUsersList = ('/', asyncHandler(async(req, res) =>{

    const users= await User.find({isAdmin: false}).select('-password')
   
    if (users) {
       
        res.json(users)
    }else{
        res.status(404)
        throw new Error('User not found')
    }
}))
export const getApprovedUsers = ('/approvedusers', asyncHandler(async(req, res) =>{

    const users= await User.find({isAdmin: false, approved:true}).select('-password')
   
    if (users) {
       
        res.json(users)
    }else{
        res.status(404)
        throw new Error('User not found')
    }
}))


/// logged in user profile update
/// private route
/// api/user/profile/update

export const updateMyProfile = ('/profile/update', asyncHandler(async(req, res) =>{
 
    const user= await User.findOneAndUpdate({_id:req.user._id}, req.body.changedField )
   
    if (user) {
        res.json({success: true})
    }else{
        res.status(404)
        throw new Error('User not found')
    }
}))


///  user profile update by admin
/// private route
/// api/user/roleupdate

export const userUpdate = ('/update/:id', asyncHandler(async(req, res) =>{
 const {name, category, description} = req.body
    const user= await User.findOneAndUpdate({_id:req.params.id}, {name, category, description, approved:true} )
   
    if (user) {
        res.json({success: true})
    }else{
        res.status(404)
        throw new Error('User not found')
    }
}))


/// get  user profile by id
/// public route
/// api/user/:id

export const getProfileById = ('/:id', asyncHandler(async(req, res) =>{
    
    const user= await User.findById(req.params.id,'-password');
   
    if (user) {
        res.json(user)
    }else{
        res.status(404)
        throw new Error('User not found')
    }
}))


export const deleteuser =
  ("/delete/:id",
  asyncHandler(async (req, res) => {
    const tournament = await User.deleteOne({_id:req.params.id});
    if (tournament) {
      res.json({success: true, message:'player deleted successfully'});
    } else {
      res.status(404);
      throw new Error("player Not Found...");
    }
  }));