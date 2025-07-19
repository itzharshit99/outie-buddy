import express from 'express';
import connectDB from './config/mongodb.js';
import "dotenv/config";
import cors from 'cors';
import homeRouter from './routes/home.route.js';
import outingRouter from './routes/outing.route.js';
import adminRouter from './routes/admin.route.js';
import path from 'path'

// app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();

// Middlewares
app.use(express.json());
app.use(cors({
  origin: ["https://outie-buddy-rxgr.vercel.app/", "http://localhost:5173"],
  methods: ['GET','POST','PUT','DELETE'],
  credentials: true
}));

// API Endpoints
app.get("/", (req, res) => {
  res.send("working");
});

// other routes
app.use('/api/user',homeRouter)
app.use("/api/user",outingRouter)
app.use("/api/admin",adminRouter)

// app.listen(port, () => {
//   console.log("Server is running on:", port);
// });

export default app;