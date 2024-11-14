import dotenv from 'dotenv';
import express from 'express';
import appointmentRoutes from "./routes/appointmentRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());


// Routes
app.use('/api/appointments', appointmentRoutes);
app.use('/api/clients', clientRoutes);

// Start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
