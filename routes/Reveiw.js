const express=require('express');
const bodyparser=require('body-parser');
const ReveiwRouter=express.Router();
ReveiwRouter.use(bodyparser.json());
const Reveiws=require('../models/ReveiwSchema');
var authenticate=require('../authenticate');

ReveiwRouter.route('/')
.get(async (req, res) => {
    try{
        const watchlist=await author.find({})
        .populate('author');

        res.status(200).json(watchlist);
    }
    catch (err) {
        res.status(500).send(err);
    }
})
.post(authenticate.verifyUser,(req,res,next)=>{
    if(req.body!=null)
    {
        req.body.author=req.user._id;
        Reveiws.create(req.body)
        .then((comment)=>{
            Reveiws.findById(comment._id)
            .populate('author')
            .then((comment)=>{
                res.statuscode=200;
                res.setHeader('content-type','application/json');
                res.json(comment);
            })
        },(err)=>next(err))
        .catch((err)=>next(err));
    }
    else {
        err = new Error('Comment not found in request body');
        err.status = 404;
        return next(err);
    }


})
.put(async (req, res) => {
    try{
        res.status(403).send("Can't Update");
    }
    catch (err) {
        res.status(500).send(err);
    }
})
.delete(async (req, res) => {
    try{
        const resp=await Reveiws.remove({});
        res.status(200).json(resp);
    }
    catch (err) {
        res.status(500).send(err);
    }
});


ReveiwRouter.route('/:id')
.get(async (req, res) => {
    try{
        const movie=await Reveiws.findOne(req.params.id)
        .populate('author');
        res.status(200).json(movie);
    }
    catch (err) {
        res.status(500).send(err);
    }
})
.post(async (req, res) => {
    try{
        res.status(403).send("Cant Perform post on : "+req.params.id);
    }
    catch (err) {
        res.status(500).send(err);
    }
})
.put(authenticate.verifyUser,(req,res,next)=>{
    Reveiws.findById(req.params.id)
    .then((comment)=>{
        if(comment!=null){
            if(!comment.author.equals(req.user._id)){
                var err=new Error("You are not Authorized");
                error.status=403;
                return next(err);
            }
            else
            {
                req.body.User=req.user._id;
                Reveiws.findByIdAndUpdate(req.params.id,{
                    $set:req.body
                },{new:true})
                .then((comment)=>{
                    Reveiws.findById(comment._id)
                    .populate('author')
                    .then((comment)=>{
                        res.statusCode=200;
                        res.setHeader('Content-Type','application/json');
                        res.json(comment);
                    })
                },(err)=>next(err))
            }
        }
        else
        {
         err=new Error('Comment '+req.params.id+"Not found");
         err.status=404;
         return next(err);   
        }
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.delete(authenticate.verifyUser, async (req, res) => {
    try{
        const resp=await Reveiws.findOneAndRemove(req.params.id);
        res.status(200).json(resp);
    }
    catch (err) {
        res.status(500).send(err);
    }
});


module.exports=ReveiwRouter;