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

app.use(cors({
  origin: "https://aivoiceagent-frontents.onrender.com", // jahan se frontend run kar raha hai (Vite/React ka port)
  credentials: true // 👈 cookies allow karna hoga
}));


app.use(express.json());
app.use(cookieParser());


app.get('/', async (req, res) => {
  // res.send('Hello World!')
  let prompt=req.query.prompt
  let data=await GemniResponse(prompt);
  res.json(data)
})

// Routing here

app.use('/api/auth',authRouter);
app.use('/api/user',userRouter);



 function inilizeConnection(){
    
    Promise.all([main(),redisClient.connect()]);
    console.log("Database & Redis connected");

    app.listen(process.env.PORT, ()=>{
    console.log("Server lishening at Port "+process.env.PORT)
    
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
