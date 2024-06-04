const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { createConnection } = require('typeorm');
const Product = require('./entities/product');

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

createConnection({
  type: 'postgres',
  username: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.DBPORT,
  database: process.env.DATABASE,
  synchronize: true,
  ssl: true, // Enable SSL
  extra: {
    ssl: {
      rejectUnauthorized: false // If using self-signed certificate, set to false, otherwise true
    }
  },
  entities: [Product],
}).then(async () => {
  console.log('Connected to database');

  // Define routes here
  app.use('/products', require('./routes/productRoutes'));

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(error => console.log('Error connecting to database:', error));
