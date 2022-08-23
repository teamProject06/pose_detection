const mongoose = require ("mongoose");
const express = require("express");
const app = express();
const cors = require("cors"); //middleware쓰는 모듈
const corsOptions = {
  origin: ["http://localhost:5500", "http://localhost:3000", "http://118.67.128.231"], 
  credentials: true,
};
const port = 5500;


const userRouter = require('./routes/user');
const routineRouter = require('./routes/routine');
const poseRouter = require('./routes/pose');
// const authRouter = require('./routes/auth')


/*________________mongoDB and server_________________ */
mongoose.connect("mongodb+srv://dbUser:KmhWcJJY8NLLXFnD@cluster0.n4n8o07.mongodb.net/app?retryWrites=true&w=majority");
mongoose.connection.on("connected", () => {
    console.log("DB connect success (dbUser)");
  });
mongoose.connection.on("error", (err) => {
    console.log(err);
  });
app.listen(port, () => {
    console.log(port, "is port number [server open]");
  });

app.use(cors(corsOptions));
app.use(express.json());
app.use("/user", userRouter);
app.use("/routine", routineRouter);
app.use("/pose", poseRouter);
app.use("/oauth",authRouter);