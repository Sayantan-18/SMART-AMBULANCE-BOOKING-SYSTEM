const express = require("express");
const router = express.Router();
const {
    createRequest,
    getRequests,
    updateRequestStatus
} = require("../controllers/requestController");

// Routes
router.post("/", createRequest);           // Create new request
router.get("/req", getRequests);              // Get all requests
router.put("/:id", updateRequestStatus);   // Update request status

module.exports = router;
