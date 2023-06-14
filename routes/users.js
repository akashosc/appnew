const User=require('../models/userdata');
const postUser=require('../models/post');
const commentUser=require('../models/comment');
const path=require('path');
const fs=require('fs');
module.exports.users=async (req,res)=>{
    const findpost=await postUser.find({}).populate('user').populate({
        path:'comments',
        populate:{
            path:'user'
        }
    }).exec();
    res.render('user',{
        user:req.user,
        name:req.user.name,
        email:req.user.email,
        posts:findpost,
    });
}
// module.exports.home=(req,res)=>{
//     res.render('');
// }
module.exports.signup=(req,res)=>{
   res.render('signup');
}
module.exports.login=(req,res)=>{
    res.render('login');
}
module.exports.sendsignupdata=async (req,res)=>{
    const finduser=await User.findOne({email:req.body.email});
    if(!finduser){
        const user=new User({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
        });
        user.save();
        console.log(user);
      return  res.redirect('/login');
        
    }else{
        return res.redirect('/signup');
   }
}
module.exports.sendlogindata=(req,res)=>{
      req.flash('success','logged in');
      res.redirect('/users');
}
module.exports.postuser=async (req,res)=>{
     const user=new postUser({
        content:req.body.content,
        user:req.user._id,
     });
     console.log(user);
     user.save();
   
    //  if(req.xhr){
    //     return res.status(200).json({
    //         data:{
    //             post:user,
    //             user:req.user,
    //         }
    //         ,message:'Post created',
    //     })
    //  }
     
    return  res.redirect('back');
}
module.exports.comment=async (req,res)=>{
    const post =await postUser.findById(req.body.post);
    
    if(post){
        const userpost =new commentUser({
            content:req.body.content,
            post:req.body.post,
            user:req.user._id,
        })
        
    //    if(req.xhr){
    //     return res.status(200).json({
    //         data:{
    //           comment:userpost,
    //           name:req.user.name,
    //         }
    //         ,message:'comment created',
    //     })
    //    }
       const doc=await userpost.save();
       post.comments.push(userpost);
       post.save();
    }
    return res.redirect('back');
}

module.exports.deletePost=async (req,res)=>{
      const post=await postUser.findById(req.params.id);
      if(post){
         if(post.user==req.user.id){
           const doc=await postUser.findByIdAndRemove(req.params.id);
            commentUser.deleteMany({post:req.params.id});
            return res.redirect('back');
         }else{
            return res.redirect('back');
         }
         
      }else{
         return res.redirect('back');
      }
    
}
module.exports.deleatcomment=async (req,res)=>{
    const comment=await commentUser.findById(req.params.id);
    console.log(comment);
    if(comment.user==req.user.id){
        const doc=await commentUser.findByIdAndRemove(req.params.id);
         return res.redirect('back');
      }else{
         return res.redirect('back');
      }
      
}
module.exports.updateProfile=async (req,res)=>{
     res.render('profile',{
        id:req.user._id,
        name:req.user.name,
        email:req.user.email,
        password:req.user.password,
        avtar:req.user.avtar,
    });
}
module.exports.updateProfilease=async (req,res)=>{
    // const doc=User.uploadedavtar(req,res,async (err)=>{
    //     if(err){
    //         console.log(err);
    //     }
   
    // });
      
     console.log(req.params.id);
     const user=await User.findByIdAndUpdate(req.params.id,{
        name:req.body.name,
        password:req.body.password,
        email:req.body.email,
     });
    // const user=await User.findById(req.params.id,{
    //   name:req.body.name,
    //   password:req.body.password,
    //   email:req.body.email,
    // });
    console.log(req.params.name);
    console.log(user);
    // user.name=req.body.name;
    // user.password=req.body.password;
    // user.email=req.body.email;
   
    user.save();

    return res.redirect('/users');
}
    