const UserModel = require("../model/User")
const router = require("express").Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const VerifyToken = require("./verification")


router.get("/", async(req, res)=> {

    try {
        
        const user = await UserModel.find()
        !user && res.status(401).json({message: "No user found"})
        res.status(200).json({message: `${user.length} user(s)`,
    data: user})
    } catch (error) {
        res.status(400).json(error.message)
    }
})

router.post("/signup", async (req, res)=> {
    try {
    const {name, email, password, userId} = req.body
    const user = await UserModel.create({
        name, password, email, userId
    })
    !user && res.status(400).json("User not found")
    res.status(200).json({message: "Success", 
    data: user})
    } catch (error) {
        res.status(400).json(error.message)
    }
    
})

router.post("/login", async (req, res)=> {
    try {        
        const user = await UserModel.findOne({email: req.body.email})
        !user && res.status(400).json({message: "email does not exist"})

        const check = await bcrypt.compare(req.body.password, user.password)
        !check && res.status(400).json({message: "failed"})

        const {password, ...others} = user._doc

        const token = jwt.sign({
            name: user.email,
            email: user.email
        }, process.env.JWT_SECRET, 
        {expiresIn: "1d"})

        res.status(200).json({
            message: `${user.name}, you welcome`,
            data: { others, token}
        })

    } catch (error) {
        res.status(400).json(error.message)
    }
})


router.get("/getProfile/:id", async (req, res)=> {
    try {
        const user = await UserModel.findById(req.params.id)
        !user && res.status(400).json({
            message: "failed"
        })
        res.status(200).json({message: "Success",
    ddata: user})
    } catch (error) {
        res.status(400).json(error.message)
    }
})

module.exports = router