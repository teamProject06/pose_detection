const https = require('https');
const fs = require('fs');
const mongoose = require ("mongoose");
const express = require("express");
const app = express();
const cors = require("cors"); //middleware쓰는 모듈
const userRouter = require('./routes/user');
const routineRouter = require('./routes/routine');
const poseRouter = require('./routes/pose');
const authRouter = require('./routes/auth')
const corsOptions = {
  origin: ["http://localhost:5500", "http://localhost:3000", "https://118.67.128.231", "https://118.67.128.231", "https://www.fitback.site","https://fitback.site", "https://localhost:5500"], 
  credentials: true,
};

/*________________HTTPS server_________________ */
const PORT = 5500;
const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/fitback.site-0001/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/fitback.site-0001/cert.pem'),
  ca: fs.readFileSync('/etc/letsencrypt/live/fitback.site-0001/chain.pem'),
};
const server = https.createServer(options, app);
server.listen(PORT, () => {
      console.log(PORT, "is port number [server open]");
    });

/*________________server_________________ */
// app.listen(PORT, () => {
//     console.log(PORT, "is port number [server open]");
//   });

app.use(cors(corsOptions));
app.use(express.json());
app.use("/user", userRouter);
app.use("/routine", routineRouter);
app.use("/pose", poseRouter);
app.use("/oauth", authRouter);

/*________________mongoDB_________________ */
mongoose.connect("mongodb+srv://dbUser:KmhWcJJY8NLLXFnD@cluster0.n4n8o07.mongodb.net/app?retryWrites=true&w=majority");
mongoose.connection.on("connected", () => {
  console.log("DB connect success (dbUser)");
});
mongoose.connection.on("error", (err) => {
  console.log(err);
});

/*
Country Name (2 letter code) [AU]:KR
State or Province Name (full name) [Some-State]:Seoul
Locality Name (eg, city) []:SeochoGu
Organization Name (eg, company) [Internet Widgits Pty Ltd]:fitback
Organizational Unit Name (eg, section) []:fitback
Common Name (e.g. server FQDN or YOUR name) []:fitback.site
Email Address []: <-alice gmail로 입력됨
*/