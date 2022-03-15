const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const passportSetup = require("./passport");
const passport = require("passport");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const morgan = require("morgan");
const app = express();


//config
dotenv.config({
    path:".env"
});

app.use(
  cookieSession({ name: "session", keys: ["Dip"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(morgan("dev"));
app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/auth", authRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});