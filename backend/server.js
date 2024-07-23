const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();
const colors = require('colors');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/resume',require('./routes/ResumeRoute'));
app.use('/api/user', require('./routes/userRoute'));

app.post('/api/resume/template', async (req, res) => {
    const id = Number(req.body.id); // Convert to number
    const _id = req.body._id;

    console.log('Received ID:', id); // Debug log
    console.log('Received _id:', _id); // Debug log

    if (![1, 2, 3].includes(id)) {
        return res.status(400).json({ msg: 'Invalid template ID' });
    }

    // Proceed with rendering or other logic if needed
    const redirectUrl = `/template/${id}`;
    res.status(200).json({ _id, redirectUrl });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`.green));
