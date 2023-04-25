const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const WatchListSchema=new Schema({
    MovieId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"moviesSchema"
    },
    User:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
},
{
    timestamps:true
});

const WatchList=mongoose.model('WatchListSchema',WatchListSchema);
module.exports=WatchList;