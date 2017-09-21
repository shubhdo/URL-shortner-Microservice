const mongoose=require('mongoose')
const db=mongoose.connection;
const shortid=require('shortid')

db.on('error', function (error) {
    console.log(error);
});

db.once('open', function () {
    console.log("connected");
});

let Schema=mongoose.Schema;


let URL=new Schema({
   url:{
       type:String,
       match:[/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,"Valid URL is required"],
       trim:true,
       unique:true
   },
   short_url:{
     type:String,
       trim:true,
       unique:true,
       default:shortid.generate()
   }
});
module.exports=mongoose.model('URL',URL,'URL');