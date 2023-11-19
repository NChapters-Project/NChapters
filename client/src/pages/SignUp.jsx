import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  //keep track the all data
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    //prevent refreshing the page when we submit
    e.preventDefault();
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log(data);
  };
  console.log(formData);
  return (
    <div className="max-w-lg p-3 mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">SignUp</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Index Number"
          className="p-3 border rounded-lg"
          id="indexno"
          onChange={handleChange}
        />

        <input
          type="text"
          placeholder="Username"
          className="p-3 border rounded-lg"
          id="username"
          onChange={handleChange}
        />

        <input
          type="text"
          placeholder="Email"
          className="p-3 border rounded-lg"
          id="email"
          onChange={handleChange}
        />

        <input
          type="text"
          placeholder="Passsword"
          className="p-3 border rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button className="p-3 text-white uppercase rounded-lg cursor-pointer bg-slate-700 hover:opacity-95 disabled:opacity-80">
          Sign up
        </button>
      </form>
      <div className="flex m-5 gap">
        <p>Have an account? </p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
    </div>
  );
}
