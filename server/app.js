const mongoose = require ("mongoose");
const express = require("express");
const app = express();
const cors = require("cors"); //middleware쓰는 모듈
const corsOptions = {
  origin: ["http://localhost:5500", "http://localhost:3000" ], 
  credentials: true,
};
const port = 5500;

const userRouter = require('./routes/user');

const authRouter = require("./routes/auth");

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


//app.use(cors(corsOptions));
app.use(express.json());
app.use("/user", userRouter);

  // /auth로 들어오는 모든 url은 여기서 작동 (auth url 경로 라우팅)
  app.use("/auth", authRouter);

  app.use(cors());