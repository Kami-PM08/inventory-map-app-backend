//TODO not in fly
// require("dotenv").config();
const express = require("express");
const cors = require("cors");
// Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const markerRoutes = require("./routes/marker");
// DB
const { dbConnections } = require("./database/config");

const app = express();
const port = process.env.PORT || 8080;
const paths = {
  auth: "/auth",
  users: "/user",
  markers: "/marker",
};

// Middlewares
app.use(cors({ exposedHeaders: "jwt" }));
app.use(express.json());
// use routes
app.use(paths.auth, authRoutes);
app.use(paths.users, userRoutes);
app.use(paths.markers, markerRoutes);

dbConnections();

app.listen(port, () => console.log(`HelloNode app listening on port ${port}!`));
