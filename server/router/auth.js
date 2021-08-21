const express=require('express')
const router=express.Router()
require('../db/conn')
const User=require('../model/userschema')

router.get('/',(req,res)=>{
    res.send('jaana bey')
})

// router.post('/register',(req,res)=>{
//     const { name, email, phone, work, password, cpassword }=req.body
//     //console.log(req.body)
//     //res.json({message:req.body})
//     if(!name || !email || !phone || !work || !password || !cpassword){
//         return res.status(422).json({error:'kuch khaali hai'})
//     }
//     User.findOne({email:email})
//         .then((userExist)=>{
//             if(userExist){
//                 return res.status(422).json({error:'pehle se hi hai vo banda'})
//             }
//             const user=new User({name, email, phone, work, password, cpassword})

//             user.save().then(()=>{
//                 res.status(201).json({message:'hogaya user register'})
//             }).catch((err)=>res.status(500).json({error:'nhi hua user register'}))

//     }).catch(err=>{
//         console.log(err)
//     })
// })

router.post('/register',async (req,res)=>{
    const { name, email, phone, work, password, cpassword }=req.body
    //console.log(req.body)
    //res.json({message:req.body})
    if(!name || !email || !phone || !work || !password || !cpassword){
        return res.status(422).json({error:'kuch khaali hai'})
    }

    try{
        const userExist=await User.findOne({email:email})
        if(userExist){
            return res.status(422).json({error:'pehle se hi hai vo banda'})
        }
        const user=new User({name, email, phone, work, password, cpassword})
        await user.save()
        res.status(201).json({message:'hogaya user register'})
     
    }
    catch(err){
        console.log(err)
    }

})

//login

router.post('/login',async (req,res)=>{
    //console.log(req.body)
      try{
          
          const{email,password}=req.body
          if(!email || !password){
              return res.status(400).json({error:"kuch khali h"})
          }
          //res.json({message:req.body})

          const userlogin=await User.findOne({email:email})
          //console.log(userlogin)

          if(!userlogin){
            res.status(400).json({error:"user nhi mila gaya"})
          }
          else{
            res.json({message:"user mil gaya"})
          }
          

      }
      catch(err){
          console.log(err)
      }

})

module.exports=router