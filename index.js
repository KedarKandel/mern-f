const express = require("express");

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();

app.use(cors());
const path = require("path");

const pinRoute = require("./routes/pins");
const userRoute = require("./routes/users");
dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Mongo db connected");
  })
  .catch((err) => console.log(err));

app.use("/api/pins", pinRoute);
app.use("/api/users", userRoute);

// server static assets if in production

// app.use(express.static("/frontend/build"));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '/frontend/build', 'index.html'));
// });
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "./frontend/build")));
//   app.get("*", (req, res) => {
//     res.sendFile(
//       path.resolve(__dirname, "./", "frontend", "build", "index.html")
//     );
//   });
// }

app.use(express.static(path.join(__dirname, "/frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/frontend/build", "index.html"));
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running");
});

// "frontend-install": "npm install --prefix frontend",
//     "frontend": "npm start --prefix frontend",
//     "start": "node index.js",
//     "dev": "concurrently \"npm run server\" \"npm run frontend\"",
//     "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix frontend && npm run build --prefix frontend"
