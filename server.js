// let http = require('http');
// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/html'});
//   res.end('Hello World!');
// }).listen(8080);


//server.js
const express = require('express'); //express variable is a fn
const cors = require('cors');
const app = express(); // app is an object (an instance of the Express application).
const port = 3000;

app.use(cors({
  origin: 'http://localhost:5173', // only allow this frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));


app.use(express.json());  // json to js obj as express can't understand json

// Routes
const healthcareRoute = require('./src/routes/healthcareRoute');
app.use('/healthcare', healthcareRoute);//(base_path, router) (router is also a function internally):

// const shoppingRoute = require('./src/routes/shopping');
// app.use('/shopping', shoppingRoute);

// const educationRoute = require('./src/routes/education');
// app.use('/education', educationRoute);


// Start server
app.listen(port, () => {
  console.log(`MediNest Backend running on port ${port}`);
})
