const express = require('express');
const cors = require('cors');
const app = express();
const shoplistsRoute = require("./routes/shoplists");
const imagesliderRoute = require("./routes/imageSlider");
const userRoute = require("./routes/user");

app.use(express.json())
app.use(cors({
        "origin": "*",
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "preflightContinue": false,
        "optionsSuccessStatus": 204
}));


app.listen(process.env.PORT, async (req, res) =>{
  await console.log("server is running at",process.env.PORT)
})

app.use("/api/shoplists", shoplistsRoute);
app.use("/api/imageslider", imagesliderRoute);
app.use("/api/users", userRoute);





