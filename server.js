const mongoose = require('mongoose');
const http = require('http');

const MONGO_URL = 'mongodb+srv://Cypher:cyphervk9900bs@social-media.xheyp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connection.once('open', () => {
    console.log("MongoDB Connected");
})

mongoose.connection.on('error', (err) => {
    console.error(err);
})

mongoose.connect(MONGO_URL)

const app = require('./app')


const server = http.createServer(app);

server.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running `);
})

