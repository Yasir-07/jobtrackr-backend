const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));

app.get('/', (req, res) => {res.send("JobTrackr app started running...")});

app.use('/api/user', require('./routes/userRoutes'));

app.use('/api/resume', require('./routes/resumeRoutes'));

const PORT = process.env.PORT || 5001
app.listen(PORT, () => {console.log(`app listening on port ${PORT}`)});
