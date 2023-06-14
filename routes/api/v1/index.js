const express=require('express');
const router=express.Router();

router.index=(req,res)=>{
    return res.json(200,{
        message:'List of post',
        post:[],
    })
}





module.exports=router;