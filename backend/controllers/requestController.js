const Request = require("../models/request");
const { User } = require("../models/User");

// Create new request
exports.createRequest = async (req, res) => {
    try {
        const { patient, pickupLocation, destination } = req.body;

        if (!patient || !pickupLocation) {
            return res.status(400).json({ message: "Patient and pickup location required" });
        }

        // Find patient by name instead of requiring ObjectId
        const user = await User.findOne({ email: patient });
        if (!user) {
            return res.status(404).json({ message: `Patient '${patient}' not found` });
        }

        const request = new Request({
            patient: user._id,   // store the linked ObjectId
            pickupLocation,
            destination
        });

        await request.save();

        res.status(201).json({ 
            message: "Request created successfully", 
            request 
        });
    } catch (error) {
        res.status(500).json({ 
            message: "Error creating request", 
            error: error.message 
        });
    }
};

// Get all requests
exports.getRequests = async (req, res) => {
    try {
        const requests = await Request.find()
            .populate("patient", "name email")  // populate patient details
            .populate("assignedDriver", "name email");

        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: "Error fetching requests", error: error.message });
    }
};

// Update request status
exports.updateRequestStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, assignedDriver } = req.body;

        const updateData = {};
        if (status) updateData.status = status;
        if (assignedDriver) {
            const driver = await User.findOne({ name: assignedDriver, role: "driver" });
            if (!driver) return res.status(404).json({ message: "Driver not found" });
            updateData.assignedDriver = driver._id;
        }

        const request = await Request.findByIdAndUpdate(id, updateData, { new: true })
            .populate("patient", "name email")
            .populate("assignedDriver", "name email");

        if (!request) {
            return res.status(404).json({ message: "Request not found" });
        }

        res.json({ message: "Request updated successfully", request });
    } catch (error) {
        res.status(500).json({ message: "Error updating request", error: error.message });
    }
};
