const express = require('express');
const connectDb = require('./config/dbConnection');
const dotend = require('dotenv').config();
const PORT = process.env.PORT || 8000;

connectDb()
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/contacts', require('./routes/contactRoute'));
app.use('/api/users', require('./routes/usersRoute'));
app.use(require('./middleware/errorhandler'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});