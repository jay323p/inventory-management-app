const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('./middleware/errorMiddleware');
const cookieParser = require('cookie-parser');
const path = require('path');

// route imports
const userRoute = require('./routes/userRoutes');
const productRoute = require('./routes/productRoutes');
const contactRoute = require('./routes/contactRoutes');

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: ['http://localhost:3000', 'https://pinvent-app.vercel.app'],
    credentials: true,
  })
);

// static apps
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes Middleware
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/contactus', contactRoute);

// Routes
app.get('/', (req, res) => {
  res.send('Home Page');
});

// Error Handling Middleware
app.use(errorHandler);

// Connect to Mongodb and Start Server
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Listening on PORT: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
