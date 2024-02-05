import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Otp() {
  const [otp, setOTP] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleOK = async () => {
    console.log("Attempting OTP verification...");
    try {
      const response = await fetch("/api/auth/verifyOTP", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp }),
      });
      const data = await response.json();
      console.log("Response:", data);
      if (response.status === 200) {
        navigate("/signin");
      } else {
        setError(data.message || "Invalid OTP");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="max-w-lg p-3 mx-auto mt-20">
      <h1 className="text-3xl font-semibold text-center my-7">OTP</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="OTP Verification"
          className="p-3 border rounded-lg"
          value={otp}
          onChange={(e) => setOTP(e.target.value)}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            handleOK();
          }}
          className="p-3 text-white uppercase rounded-lg cursor-pointer bg-slate-700 hover:opacity-95 disabled:opacity-80"
        >
          Ok
        </button>
      </form>
      {error && <p className="mt-3 text-red-500">{error}</p>}
    </div>
  );
}
