const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const routes = require('./routes/basic');
const path = require('path');
const port = process.env.PORT || 3333;
const environment = process.env.NODE_ENV || 'dev';

const corsOption = {
	origin: true,
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	credentials: true,
	exposedHeaders: ['x-auth-token']
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors(corsOption));
app.use(express.static(path.join(__dirname, "client", "dist")))

app.use('/api', routes);
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});
app.listen(port, () => {
	console.log(`Your app is now running on port: ${port}`);
})