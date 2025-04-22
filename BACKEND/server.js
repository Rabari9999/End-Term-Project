    const express = require('express')
    const mongoose = require('mongoose')
    const cors = require('cors')
    const PORT = process.env.PORT || 5000;
    require('dotenv').config();

    const app = express();

    app.use(cors())
    app.use(express.json())

    const taskRoutes = require('./routes/tasks')
    const authRoutes = require('./routes/auth')
    app.use('/api/tasks',taskRoutes)
    app.use('/api/auth',authRoutes)

    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
			console.log('Connected to MongoDB')
			app.listen(PORT,()=>{
					console.log(`Server running on port ${PORT}`)
			});
		})
    .catch(err => console.error(err))

