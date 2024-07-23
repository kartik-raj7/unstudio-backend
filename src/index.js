const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

dotenv.config();

const app = express();

app.use(express.json({ limit: '200mb' }));
const logger = require('./middleware/logger');
app.use(logger);
app.use(cors());
const userRoutes = require('./routes/userRoutes');
app.use('/unstudio', userRoutes);
const mediaRoutes = require('./routes/mediaRoutes');
app.use('/unstudio', mediaRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
