const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const ambulanceRoutes = require("./routes/ambulanceRoutes");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// DB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/ambulance", require("./routes/ambulanceRoutes"));
app.use("/api/request", require("./routes/requestRoutes"));

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Server running on ${PORT}`));

// Socket.io for real-time tracking
const io = require("socket.io")(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
    console.log("Driver connected:", socket.id);

    // Driver updates location
    socket.on("updateLocation", (data) => {
        io.emit("locationUpdated", data); // send to all clients
    });

    socket.on("disconnect", () => {
        console.log("Driver disconnected");
    });
});
