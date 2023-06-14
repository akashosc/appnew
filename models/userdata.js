const mongoose=require('mongoose');
const multer=require('multer');
const path=require('path');
const AVTAR_PATH=path.join('/uplods/users/avtars');

const Userseam=new mongoose.Schema({
    name:{
       type:String,
       required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    avtar:{
        type:String,
    }
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join(__dirname,'..',AVTAR_PATH));
    },
    filename: function (req, file, cb) {
      
        cb(null, file.fieldname + '-' + Date.now() )
    }
  })

//   ststic method
Userseam.statics.uploadedavtar=multer({storage:storage}).single('avtar');
Userseam.statics.avtarPath=AVTAR_PATH;

const User=mongoose.model('User',Userseam);
module.exports=User;
