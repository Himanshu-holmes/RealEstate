import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Oauth from "../components/Oauth";


export default function Signup() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);

        return;
      }
      setError(null);
      navigate("/signin");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  console.log(formData);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign up</h1>

      <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg "
          id="username"
          onChange={handleChange}
          required
        />
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
          {loading ? "loading..." : "Sign up"}
        </button>
        <Oauth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account??</p>
        <Link to={"/signin"}>
          <span className=" text-blue-700">Sign in</span>
        </Link>
      </div>
      {error && <p className=" text-red-500 mt-5">{error}</p>}
    </div>
  );
}
