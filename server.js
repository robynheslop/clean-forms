const bodyParser = require("body-parser");
const express = require("express");
const router = require("./routes");
const passport = require("./utils/passport");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3001;
const server = express();


server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(passport.initialize());
server.use("/api", router);

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/cleanforms',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  );
server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})