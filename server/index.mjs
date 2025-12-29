import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';

// Config dotenv file to use all .env variables
dotenv.config();

// Creating Server and Defining port
const app = express();
const port = process.env.PORT;

// Middleware for Request
app.use(cors({
  origin: "http://localhost:5173",  // your React app
  credentials: true                 // <--- allow cookies
}));

// Middleware for Parsing Request Body and Cookies
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


app.get('/',(req,res)=>{
    res.send('Server is Running');
});

app.listen(port,()=>{
    console.log(`Server Running on http://localhost:${port}`);
});