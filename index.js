require("dotenv").config()
const express = require("express")
const port = process.env.PORT || 8080
const mongoose = require("mongoose")
const app = express()


app.use(express.json())

mongoose.connect(process.env.MONGO_DB).then(()=> {
    console.log(`DB is connected`)
}).catch((error)=> {
    console.log(error.message)
})

app.use("/api", require("./routes/user"))
app.listen(port, ()=> {
    console.log(`Server is running on ${port}`)
})
