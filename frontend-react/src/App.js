import React, { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [complaint, setComplaint] = useState("");

const submitComplaint = async () => {
  try {
    const res = await fetch("http://localhost:5000/file-complaint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        complaintText: complaint
      })
    });

    const data = await res.json();
    console.log(data); // 👈 ADD THIS

    alert(data.message || data.error);

  } catch (err) {
    console.error(err);
    alert("Error submitting complaint");
  }
};

  return (
    <div style={{ padding: "20px" }}>
      <h2>Student Grievance System</h2>

      <input
        type="email"
        placeholder="Enter your college email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <textarea
        placeholder="Enter complaint"
        value={complaint}
        onChange={(e) => setComplaint(e.target.value)}
      />
      <br /><br />

      <button onClick={submitComplaint}>
        Submit Complaint
      </button>
    </div>
  );
}

export default App;