const express = require("express");
const cors = require("cors");

const app = express();
const contract = require("./blockchain");

app.use(cors());


app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.send("Backend is running");
});

// File complaint API
app.post("/file-complaint", async (req, res) => {
    try {
        const { email, complaintText } = req.body;

        const crypto = require("crypto");

        // Hash email
        const hashedEmail = crypto
            .createHash("sha256")
            .update(email)
            .digest("hex");

        // Fake IPFS hash
        const fakeIPFS = "Qm" + Math.random().toString(36).substring(2, 10);

        const tx = await contract.fileComplaint(
            "0x" + hashedEmail,
            fakeIPFS
        );

        await tx.wait();

        res.json({
            message: "Complaint filed successfully",
            txHash: tx.hash
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error filing complaint" });
    }
});

// Start server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});