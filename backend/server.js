require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const workoutRoutes = require("./routes/workouts")
const userRoutes = require("./routes/user")


//express app
const app = express()

//middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

//routes
app.use("/api/workouts", workoutRoutes)
app.use("/api/user", userRoutes )

//connect to db
mongoose
  .connect(process.env.MONG_URI) //async in nature so returns a promise
  .then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
      console.log("listening on port", process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  });
