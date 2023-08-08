const router = require('express').Router()

router.use("/user",require("./userRoutes.js"));

router.get("/",(req,res)=>{
    res.send("Checking the sign up server!");
})

module.exports  = router