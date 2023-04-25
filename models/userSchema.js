const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const passportLocalMongoose=require('passport-local-mongoose');

const User=new Schema({
    firstname:{
        type:String
    },
    lastname:{
        type:String
    }
},{
    timestamps:true
});

User.plugin(passportLocalMongoose);
module.exports=mongoose.model('user',User);