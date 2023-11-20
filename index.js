require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const { spawn } = require('child_process');
const subscribersRouter = require('./routes/subscribers.js')
const child = spawn('node', ['scripts/delete-unverified.js']);

const database = process.env.DATABASE_URL;
const port = 8080;

async function connectToDatabase() {
    try {
        await mongoose.connect(database, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        mongoose.connection.on('error', (error) => console.error(error));
        mongoose.connection.once('open', () => console.log("Connected to database"));
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}

child.stdout.on('data', (data) => {
    console.log(`Child process stdout: ${data}`);
});
child.stderr.on('data', (data) => {
    console.error(`Child process stderr: ${data}`);
});  

app.use(cors());
app.use(express.json());
app.use('/subscribers', subscribersRouter);
app.listen(port, () => {
    console.log("Listening on port " + port);
    connectToDatabase();
}) 