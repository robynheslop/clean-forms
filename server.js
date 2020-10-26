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
    process.env.MONGODB_URI || "mongodb://localhost/cleanforms1",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
);



if (process.env.NODE_ENV = 'production') {
    server.use(express.static('client/build'));
    server.use('*', express.static('client/build'));
    server.get('/*', function(req, res) {
        res.sendFile(path.join(__dirname, '/client/build/index.html'), function(err) {
          if (err) {
            res.status(500).send(err)
          }
        })
      })
}



server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})