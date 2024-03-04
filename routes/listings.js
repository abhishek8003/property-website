const express = require("express")
const route_listing = express.Router();
const path = require("path")
const mongoose = require("mongoose");
const list = require("../models/listing");
const wrapasync = require("../utils/wrapAsync.js");
const customError = require("../utils/customErrors.js");
const vSchema = require("../utils/validationSchema.js");
//middlwares
// const valid_list = ((req, res, next) => {
//     // let { error, value } = vSchema.validate(req.body, { abortEarly: false });
//     let { error, value } = vSchema.validate(req.body, { abortEarly: false });
// if (error) {

//     console.log(value);
//   console.log(error.details);
// }
    

//     if (error) {
//         let message = error.details.map((e) => {
//             return e.message;
//         });
//         console.log(message)
//         let final_message = message.join(",");
//         next(new customError(400, final_message));
//     }
//     else {

//         next();
//     }
// })
const valid_list = async (req, res, next) => {
    try {
        const { error, value } = vSchema.validate(req.body, { abortEarly: false });

        if (error) {
            console.log("Validation Errors all:", error);
            console.log("Validation Errors:", error.details); 
            console.log("Validation Errors:", error.message); 

            let message = error.details.map((e) => e.message);
            console.log("Formatted Error Messages:", message);

            let final_message = message.join(",");
            throw new customError(400, final_message);
        }

        // No validation errors, proceed to the next middleware
        next();
    } catch (err) {
        // Handle any unexpected errors
        next(err);
    }
};





route_listing.get("/", wrapasync(async (req, res) => {
    console.log("/");
    let data = await list.find({});
    res.render("listings/home.ejs", { data });
}));
route_listing.post("/", valid_list, wrapasync(async (req, res, next) => {
    let data = req.body;
    console.log("post");
    console.log(data);
    let obj = new list(data.listing);
    await obj.save();
    res.redirect("/listings/");
}));
route_listing.put("/:id", valid_list, wrapasync(async (req, res, next) => {

    let { id } = req.params;
    let { listing } = req.body;
    let result = await list.findByIdAndUpdate(id, listing, { runValidators: true });
    res.json({ status: 200, message: "Data updated sucessfully!" });
}));
route_listing.delete("/:id", wrapasync(async (req, res, next) => {
    let { id } = req.params;
    let result = await list.findByIdAndDelete(id);
    res.json({ status: 200, message: "Data deleted sucessfully!" });

}));


//forms
route_listing.get("/add-form", async (req, res) => {
    res.render("add-form/addForm.ejs");
});

route_listing.all("*", (req, res, next) => {
    next(new customError(404, "page nhi h yeh route check krr"));
})
//Error handling middlwares
route_listing.use((err, req, res, next) => {
    let { status = 500, message } = err;
    res.status(status).render("error.ejs", {message });
});

module.exports = route_listing;