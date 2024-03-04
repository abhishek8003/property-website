const express = require("express")
const app = express();
const path = require("path")
const mongoose = require("mongoose");
const route_listing=require("./routes/listings.js");
const route_show=require("./routes/show.js");


(async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
        console.log("connected to mongoDB");
    }
    catch (err) {
        console.log(err);
    }
})();
// middlewares
app.set("view engine", "ejs");
app.set('views',`${path.join(__dirname,"views")}`);
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(`${path.join(__dirname,"public")}`));
// middlewares for routes
app.use("/listings",route_listing);
app.use("/show",route_show);
app.get("/",(req,res)=>{
    res.send("Am root!");
});
app.listen("5000", () => {
    console.log("server listening to port 5000..");
});
