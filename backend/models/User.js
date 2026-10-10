const mongoose = require("mongoose");

// User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
        type: String, 
        enum: ["patient", "driver", "admin"], 
        default: "patient" 
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

// Export models (later we’ll add Ambulance & Request too)
module.exports = { User };
