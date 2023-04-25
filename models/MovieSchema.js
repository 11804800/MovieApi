const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const MovieSchema=new Schema({
    name:{
        type:String,
        unique:true
    },
    image:{
        type:String
    }
    ,
    genre:{
        type:String
    },
    year:{
        type:Number
    },
    description:{
        type:String
    },
    directors:{
        type:String
    },
    rating:{
        type:Number
    }
},{
    timestamps:true
});

const Movies=mongoose.model('moviesSchema',MovieSchema);
module.exports=Movies;