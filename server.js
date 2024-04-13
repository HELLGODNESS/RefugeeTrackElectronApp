const express = require('express');
const cors = require('cors');

const app = express();

const corsConfig = {
    origin: '*',
    allowHeaders: ['Content-Type', 'Authorization'],
    methods: ['OPTIONS', 'GET', 'PUT', 'POST', 'DELETE'],
};
// Middleware
app.use(cors(corsConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
const personRouter = require('./routes/person');
const imageRouter = require('./routes/images');
app.use('/person', personRouter);
app.use("/file", imageRouter);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
