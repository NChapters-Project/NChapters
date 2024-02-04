import React, { useState } from "react";
//import axios from "axios";

const OTPVerificationForm = () => {
  const [otp, setOTP] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/verify-otp", { otp });
      console.log(response.data); // Handle response accordingly (e.g., display success message)
    } catch (error) {
      setError(error.response.data.message); // Display error message
    }
  };

  return (
    <div>
      <h2>Enter OTP to Verify</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOTP(e.target.value)}
        />
        <button type="submit">Verify OTP</button>
      </form>
    </div>
  );
};

export default OTPVerificationForm;
