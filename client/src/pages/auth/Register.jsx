import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets';

const Register = () => {
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

        <form className="mt-8 space-y-5">
          <input
            type="text"
            placeholder="Full name"
            className="w-full h-13 px-4 rounded-xl border border-gray-200 outline-none focus:border-[#1B3022]"
          />

          <input
            type="email"
            placeholder="Email address"
            className="w-full h-13 px-4 rounded-xl border border-gray-200 outline-none focus:border-[#1B3022]"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full h-13 px-4 rounded-xl border border-gray-200 outline-none focus:border-[#1B3022]"
          />

          <button
            type="submit"
            className="w-full h-13 rounded-xl bg-[#1B3022] text-white font-medium hover:opacity-90 transition"
          >
            Create Account
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-6">
          Already have an account?
          <Link to="/login" className="text-[#1B3022] font-medium cursor-pointer ml-1">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register
