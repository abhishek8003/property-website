const mongoose = require("mongoose");
const listSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        validate:{
            validator:(v)=>{
                if((v.length)>3){
                    return true;
                }
                else{
                    return false;
            }
        },
        message:"atleast 4 characters in title"
        }
    },
    description: {
        type: String
    },
    image:{
        filename: {
            type: String,
            default:'img-name'
        },
        url: {
            type: String,
            set: (v) => {
                if (v == "") {
                    return 'https://images.unsplash.com/photo-1490359144708-3329fae5c6e8?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                }
                else {
                    return v;
                }
            },
            default: "https://images.unsplash.com/photo-1490359144708-3329fae5c6e8?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        }
    },
price: {
    type: Number,
    required:true,
    validate:{
        validator:(v)=>{
            if((v)>0){
                return true;
            }
            else{
                return false;
        }
    },
    message:"Price cant be negative!"
    }
},
location: {
    type: String
},
country: {
    type: String
}
});
const listing = mongoose.model("listing", listSchema);
module.exports = listing;