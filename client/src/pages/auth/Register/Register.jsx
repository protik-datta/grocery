import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../../assets/assets";
import { useState } from "react";
import { useRegister } from "./registerApi.hook";
import { showSuccess } from "../../../utils/toast";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { mutate: login, isPending } = useRegister();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(form, {
      onSuccess: () => {
        showSuccess("Registration successful");
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
          Create your account
        </h3>

        <p className="text-gray-500 mt-3 text-sm">
          Join with us and start your journey today.
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit} method="POST">
          <input
            type="text"
            placeholder="Full name"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full h-13 px-4 rounded-xl border border-gray-200 outline-none focus:border-[#1B3022]"
          />

          <input
            type="email"
            placeholder="Email address"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full h-13 px-4 rounded-xl border border-gray-200 outline-none focus:border-[#1B3022]"
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full h-13 px-4 rounded-xl border border-gray-200 outline-none focus:border-[#1B3022]"
          />

          <button
            type="submit"
            className="w-full h-13 rounded-xl bg-[#1B3022] text-white font-medium hover:opacity-90 transition"
          >
            {isPending ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-6">
          Already have an account?
          <Link
            to="/login"
            className="text-[#1B3022] font-medium cursor-pointer ml-1"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
