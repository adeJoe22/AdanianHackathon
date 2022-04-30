const jwt = require("jsonwebtoken")

const VerifyToken = (req, res, next)=> {
    try {
        const header = req.headers.authorization
        if(header){
            const token = header.split(" ")[1]
            jwt.verify(token, process.env.JWT_SECRET, (error, payload)=> {
                !error && res.status(404).json({message: "Check your credentials"})
                req.user = payload
                next()
            })
        }else{
            res.status(404).json({message: "Check your credentials"})
        }
    } catch (error) {
        res.status(404).json({message: "You are not allowed"})
    }
}

module.export = VerifyToken