const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const favouriteSchema=new Schema({
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

const Favourite=mongoose.model('favouriteSchema',favouriteSchema);
module.exports=Favourite;