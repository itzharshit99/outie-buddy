import express from 'express';
import { getAllOutingData, markEntered, outingData } from '../controller/outing.controller.js';
import verifyToken from '../middleware/auth.middleware.js';
const outingRouter = express.Router();

outingRouter.post("/outing-details",outingData);
outingRouter.put("/mark-outing-entered/:id",markEntered);
outingRouter.get("/get-outing-details",getAllOutingData)


export default outingRouter ;
