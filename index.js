const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.get('/', (req, res) => {
  res.send('Hello from App Engine!');
});

app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// using cors for csrf protection
app.use(cors());

// Require task routes
const router = require("./router");

// using as middleware
app.use("", router);

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
