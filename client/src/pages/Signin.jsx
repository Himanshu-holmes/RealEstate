import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInStart,signInSuccess,signInFailure } from "../redux/user/userSlice";

export default function Signin() {
  const [formData, setFormData] = useState({});
const {loading,error} = useSelector((state)=>state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message))

        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
     
    } catch (error) {
       dispatch(signInFailure(error.message))
    }
  };
  console.log(formData);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>

      <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg "
          id="email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          className="border p-3 rounded-lg "
          placeholder="password"
          id="password"
          onChange={handleChange}
          required
        />
        <button
          disabled={loading}
          className=" bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "loading..." : "Sign in"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Donot have an account</p>
        <Link to={"/signup"}>
          <span className=" text-blue-700">Sign up</span>
        </Link>
      </div>
      {error && <p className=" text-red-500 mt-5">{error}</p>}
    </div>
  );
}
