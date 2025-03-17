import express from 'express'
import { addStudent, adminLogin } from '../controller/admin.controller.js';
const adminRouter = express.Router();

adminRouter.post("/admin-details",adminLogin);
adminRouter.post("/add-student-details",addStudent)

export default adminRouter;