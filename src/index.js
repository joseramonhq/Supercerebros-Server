const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const userRoute = require('./routes/userRoute');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', userRoute);

app.get('/', (req, res) => {
  res.send('Welcome to SuperCerebros API');
});
// Manejo específico del favicon
app.get('/favicon.ico', (req, res) => res.status(204));

if (!process.env.MONGO_URI) {
  console.error("MONGO_URI is not defined in the environment variables");
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((error) => console.error('Error connecting to MongoDB Atlas:', error));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
