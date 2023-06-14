// All requires files and system
const express=require('express');
const router=express.Router();
const userControler=require('./users');
const passport=require('passport');


// all the requires systenm

// all the get req
// router.get('/',userControler.home);
router.get('/',(req,res)=>{
     res.render('home');
})
router.get('/login',userControler.login);
router.get('/signup',userControler.signup);
router.get('/users',passport.isAuthonticate,userControler.users);
router.get('/logout',(req,res,next)=>{
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success','logged out');
        res.redirect('/');
      });
})
router.get('/users/deleatpost/:id',passport.isAuthonticate,userControler.deletePost);
router.get('/users/deleatcomment/:id',passport.isAuthonticate,userControler.deleatcomment);
router.get('/profile',passport.isAuthonticate,userControler.updateProfile);


// all the get req
// all the post req
router.post('/signup',userControler.sendsignupdata);
router.post('/login',passport.authenticate('local',{failureRedirect:'/login'}),userControler.sendlogindata);
router.post('/users',passport.isAuthonticate,userControler.postuser);
router.post('/users/comment',passport.isAuthonticate,userControler.comment);
router.post('/profile/:id',passport.isAuthonticate,userControler.updateProfilease);

// all the post req
router.use('/api',require('./api'));


module.exports=router;