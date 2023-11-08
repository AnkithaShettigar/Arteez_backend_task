const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const User = require('./routes/userRegister');
const Book = require('./routes/bookRouter');

const mongoURL =
  'mongodb+srv://ankithayermal:Ankitha96@cluster0.cumniar.mongodb.net/Library?retryWrites=true&w=majority';

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log('Connected to mongoDB');
  })
  .catch(() => {
    console.log('failed to connect mongoDB');
  });

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/user', User);
app.use('/api', Book);

app.get('/', (req, res) => {
  res.json('Hello world');
});

app.listen(PORT, () => {
  console.log(`app running at ${PORT}`);
});
