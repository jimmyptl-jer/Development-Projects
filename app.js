const path = require('path');
const PORT = 5000;
const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoose = require('mongoose')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://Anshumi:anshumi@cluster0.w5wfjgh.mongodb.net/Shop?retryWrites=true&w=majority').then(()=>{
  app.listen(PORT);
}).catch(err =>{
  console.log("Error while connecting to database",err);
})