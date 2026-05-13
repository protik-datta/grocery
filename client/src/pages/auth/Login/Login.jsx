import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../../assets/assets";
import { useLogin } from "./LoginApi.hook";
import { useState } from "react";
import { showSuccess } from "../../../utils/toast";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { mutate: login, isPending } = useLogin();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(form, {
      onSuccess: () => {
        showSuccess("Login successful");
        navigate("/");
      },
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-12 bg-[#F8F8F5]">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-sm border border-gray-100 p-10 text-center">
        <img
          src={assets.logo}
          alt="Logo"
          className="w-32 mx-auto object-contain mb-8"
        />

        <h3 className="text-[#1B3022] text-[28px] font-semibold tracking-tight">
          Sign in to your account
        </h3>

        <p className="text-gray-500 mt-3 text-sm">
          Welcome back! Please enter your details.
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit} method="POST">
          <input
            type="email"
            placeholder="Email address"
            className="w-full h-13 px-4 rounded-xl border border-gray-200 outline-none focus:border-[#1B3022]"
            name="email"
            value={form.email}
            onChange={handleChange}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full h-13 px-4 rounded-xl border border-gray-200 outline-none focus:border-[#1B3022]"
            name="password"
            value={form.password}
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={isPending}
            className="w-full h-13 rounded-xl bg-[#1B3022] text-white font-medium hover:opacity-90 transition"
          >
            {isPending ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-6">
          Don’t have an account?
          <Link
            to="/register"
            className="text-[#1B3022] font-medium cursor-pointer ml-1"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
