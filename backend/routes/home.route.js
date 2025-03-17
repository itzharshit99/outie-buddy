import express from 'express';
import { deleteHomeData, getAllHomeData, homeData, markEntry } from '../controller/home.controller.js';
import verifyToken from '../middleware/auth.middleware.js';
const homeRouter = express.Router();

homeRouter.post("/home-details",homeData);
homeRouter.get("/get-home-details",getAllHomeData);
homeRouter.delete("/delete-home-details",deleteHomeData);
homeRouter.put("/mark-home-entered/:id",markEntry);


export default homeRouter;
