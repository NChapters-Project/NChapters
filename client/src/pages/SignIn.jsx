// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   signInStart,
//   signInSuccess,
//   signInFailure,
// } from "../redux/user/userSlice";
// import OAuth from "../components/OAuth";

// export default function SignIn() {
//   const [formData, setFormData] = useState({});
//   const { loading, error } = useSelector((state) => state.user);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.id]: e.target.value,
//     });
//     console.log(formData);
//   };

//   const handleSubmit = async (e) => {
//     console.log(formData);
//     e.preventDefault();
//     const { email, otp } = formData;
//     console.log(otp);
//     console.log(email);

//     try {
//       dispatch(signInStart());
//       const res = await fetch("/api/auth/signin", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, otp }),
//       });
//       const data = await res.json();
//       if (res.status !== 200) {
//         dispatch(signInFailure(data.message));
//         return;
//       }
//       dispatch(signInSuccess(data));
//       navigate("/");
//     } catch (error) {
//       dispatch(signInFailure(error.message));
//     }
//   };

//   return (
//     <div className="max-w-lg p-3 mx-auto">
//       <h1 className="text-3xl font-semibold text-center my-7">Sign In</h1>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <input
//           type="email"
//           placeholder="Email"
//           className="p-3 border rounded-lg"
//           id="email"
//           onChange={async (e) => await handleChange(e)}
//         />
//         <input
//           type="text"
//           placeholder="OTP Verification"
//           className="p-3 border rounded-lg"
//           id="otp"
//           onChange={async (e) => await handleChange(e)}
//         />
//         <button
//           disabled={loading}
//           className="p-3 text-white uppercase rounded-lg cursor-pointer bg-slate-700 hover:opacity-95 disabled:opacity-80"
//         >
//           {loading ? (
//             <i className="mr-2 fas fa-spinner fa-spin"></i>
//           ) : (
//             "Sign In"
//           )}
//         </button>
//         {/* <OAuth /> */}
//       </form>
//       <div className="flex gap-2 mt-5">
//         <p>Do not have an account?</p>
//         <Link to={"/signUp"}>
//           <span className="text-blue-700">Sign up</span>
//         </Link>
//       </div>
//       {error && <p className="mt-5 text-red-500">{error}</p>}
//     </div>
//   );
// }

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
//import OAuth from "../components/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();

    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (res.status !== 200) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="max-w-lg p-3 mx-auto mt-20">
      <h1 className="text-3xl font-semibold text-center my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          className="p-3 border rounded-lg"
          id="email"
          onChange={async (e) => await handleChange(e)}
        />
        <input
          type="password"
          placeholder="password"
          className="p-3 border rounded-lg"
          id="password"
          onChange={async (e) => await handleChange(e)}
        />
        <button
          disabled={loading}
          className="p-3 text-white uppercase rounded-lg cursor-pointer bg-slate-700 hover:opacity-95 disabled:opacity-80"
        >
          {loading ? (
            <i className="mr-2 fas fa-spinner fa-spin"></i>
          ) : (
            "Sign In"
          )}
        </button>
        {/* <OAuth /> */}
      </form>
      <div className="flex gap-2 mt-5">
        <p>Do not have an account?</p>
        <Link to={"/signUp"}>
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
      {error && <p className="mt-5 text-red-500">{error}</p>}
    </div>
  );
}
