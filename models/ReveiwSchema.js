const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const ReveiwSchema=new Schema({
    reveiw:{
        type:String
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    MovieId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"moviesSchema"
    },
    rating:{
        type:Number
    }
},{
    timestamps:true
});

const Reveiws=mongoose.model('reveiwSchema',ReveiwSchema);
module.exports=Reveiws;