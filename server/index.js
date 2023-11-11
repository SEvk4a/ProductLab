require('dotenv').config()
const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')
const router = require('./router/index')
const PORT = process.env.PORT || 5000
const errorMiddleware = require('./middlewares/error-middleware');
const path = require('path')

const app = express()

app.use(express.json())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use(express.static(path.resolve(__dirname, 'static')))
app.use('/api', router);
app.use(errorMiddleware);

const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://sevk4a:kunski@cluster0.axqleld.mongodb.net/`)
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()