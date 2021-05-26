const express = require('express')
const users = require('./routers/userRouter')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/Users',
    {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
});

const app = express()
const port = 7542

app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.get('/',  (req, res) => {
    res.send('Hello')
})
app.use('/users',users)

app.use((req,res)=>{
    res.send(404)
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

