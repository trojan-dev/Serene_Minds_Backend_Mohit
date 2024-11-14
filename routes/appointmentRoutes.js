import express from "express";
import { getAllAppointments, createAppointment } from "../controllers/appointmentsController.js";

const router = express.Router();


router.get('/', getAllAppointments);
router.post('/', createAppointment);

export default router;
