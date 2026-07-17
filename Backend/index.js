import express from "express"
import 'dotenv/config'
const app=express();
import cors from "cors"
import main from "./config/db.js";
const PORT=process.env.PORT || 8000;
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import redisClient from "./config/redis.js";
import GemniResponse from "./Gemni.js";

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : [
      "https://aivoiceagent-frontents.onrender.com",
      "http://localhost:5173",
    ];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  credentials: true
}));


app.use(express.json());
app.use(cookieParser());


app.get('/', async (req, res) => {
  let prompt=req.query.prompt
  if (!prompt) {
      return res.json({ status: "active", message: "Server is running! Please provide a prompt query parameter, e.g. /?prompt=hello" });
  }
  let data=await GemniResponse(prompt);
  res.json(data)
})

// Routing here

app.use('/api/auth',authRouter);
app.use('/api/user',userRouter);



 async function inilizeConnection  (){
    try {
        await Promise.all([main(), redisClient.connect()]);
        console.log("Database & Redis connected");
    } catch (err) {
        console.error("Failed to connect to Database or Redis during startup:", err);
    }

    app.listen(PORT, ()=>{
        console.log("Server lishening at Port "+PORT)
    })
}

inilizeConnection();

// main()
// .then(()=>{
//     console.log("database connected");

//     app.listen(process.env.PORT_NUMBER, ()=>{
//     console.log("Server lishening at Port "+process.env.PORT_NUMBER);
    
//     })
// })
// .catch((err) => console.log(err));
