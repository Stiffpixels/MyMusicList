const express = require("express");
const app = express();
require("express-async-errors");
const errorMiddleware = require("./middleware/errMiddleware");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//route imports
const musicRouter = require("./routes/musicRoutes");
const userRouter = require("./routes/userRoutes");

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: ["http://localhost:3000", "https://mymusiclist-muzammil.netlify.app"] }));

//routes
app.use("/api/v1", musicRouter);
app.use("/api/v1", userRouter);

//error handler middleware
app.use(errorMiddleware);

app.get("*", (req, res) => {
  res.send("couldn't get" + req.path);
});

module.exports = app;
