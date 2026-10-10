const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
    patient: { type: String, required: true },
    pickupLocation: { type: String, required: true },
    status: { 
        type: String, 
        enum: ["pending", "accepted", "completed", "cancelled"], 
        default: "pending" 
    },
    assignedDriver: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

const Request = mongoose.model("Request", requestSchema);

module.exports = Request;
