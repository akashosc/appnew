const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/userdata');


// authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email'
    },
   async function(email, password, done){
        // find a user and establish the identity
       const user=await User.findOne({email: email});
       if(!user){
        return done(null,false);
       }
       if(user.password!=password){
        return done(null,false);
       }
       return done(null,user);
    }

));


// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});



// deserializing the user from the key in the cookies
passport.deserializeUser(async (id, done)=>{
   const user=await User.findById(id);
   
        if(!user){
            console.log('Error in finding user --> Passport');
            return done(err);
        }

    return done(null, user);

});


// check if the user is authenticated
passport.isAuthonticate=(req,res,next)=>{
    if(req.user) return next();

    res.redirect('/login');
};




module.exports = passport;