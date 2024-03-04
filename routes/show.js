const express = require("express")
const route_show = express.Router();
const path = require("path")
const mongoose = require("mongoose");
const list = require("../models/listing");
const wrapasync=require("../utils/wrapAsync.js");
const customError=require("../utils/customErrors.js");

route_show.get("/:id", wrapasync(async (req, res) => {
    let { id } = req.params;
    let data = await list.findById(id);
    res.render("show/show.ejs", { data });
}));
route_show.get("/edit-form/:id", wrapasync(async (req, res) => {
    let { id } = req.params;
    let data = await list.findById(id);
    res.render("edit-form/edit-form.ejs", { data });
}));
route_show.all("*",(req,res,next)=>{
    next(new customError(404,"page nhi h yeh route check krr"));
});
route_show.use((err,req,res,next)=>{
    let {status=500,message}=err;
    res.send(status,message);
})

module.exports = route_show;