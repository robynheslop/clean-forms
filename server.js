const bodyParser = require("body-parser");
const express = require("express");
const router = require("./routes");
const passport = require("./utils/passport");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 3001;
const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(passport.initialize());
server.use("/api", router);

server.use(express.static(__dirname + '/public'))



mongoose.connect(
    process.env.MONGODB_URI || process.env.DATABASE_INFO,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
);



if (process.env.NODE_ENV = 'production') {
    server.use(express.static('client/build'));
    server.get('*', function (request, response){
        response.sendFile('client/build/index.html')
    })
}



server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})