
const express = require("express");
const cookieParser = require("cookie-parser");
require('dotenv').config();
const usersRouter = require("./routes/usersRouter");
const { errorHandler } = require("./middlewares/errorMiddleware");
const openAIRouter = require("./routes/openAIRouter");
require("./utils/connectDB")(); 


const app = express();
const PORT = process.env.PORT || 8090

//middleware
app.use(express.json()); 
app.use(cookieParser()); //pass the cooke automatically

//-----routes---
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/openai", openAIRouter);

//--error handler middlewares
app.use(errorHandler);
//start the server
app.listen(PORT, console.log(`Server is running on port ${PORT}`));