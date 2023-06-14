const express=require('express');
const port=8000;
const app=express();
const expressLayouts=require('express-ejs-layouts');
const mongoose=require('mongoose');
const mongUrl="mongodb://localhost:27017/User_Signup";
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport');
const flash=require('connect-flash');
const connMidll=require('./config/middlewhere');

// database connetion
mongoose.connect(mongUrl,{useNewUrlParser:true}).then(()=>console.log('MongoDb connected'))
.catch(err=>console.log(err));
// usrencoding
app.use(express.urlencoded({ extended:false}))

// accese static files
app.use(express.static('assiet'));
app.use('/uplods',express.static(__dirname+'/uplods'));
// ejs setup
app.use(expressLayouts);
app.set('view engine','ejs');
// passport req

app.use(session({
    name:'passport application',
    secret:'bloomburg',
    saveUninitialized:false,
     resave:false,
    cookie:{
        maxAge:1000*60*100,
    }
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(connMidll.flashmessage);
app.use('/',require('./routes'));

// app.listen(port, '192.168.1.10');
app.listen(port,(req,res)=>{
    console.log(`server is running at ${port}`);
})