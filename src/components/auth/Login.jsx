import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/slice/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { auth, googleProvider } from "../../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import Header from "../login_Signup_Header/index";
import { GoogleIcon } from "../../constants";
import Loader from "../loader";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email || !password) {
      setFormError("Email and password are required!");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setFormError("Please enter a valid email.");
      return false;
    }
    setFormError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      dispatch(loginUser({ email, password }));
      setTimeout(() => {
        setLoading(false);
        navigate("/home");
      }, 3000);
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setFormError("Wrong email. User not found.");
        setLoading(false);
      } else if (error.code === "auth/wrong-password") {
        setFormError("Wrong password. Please try again.");
        setLoading(false);
      } else {
        setFormError(error.message);
        setLoading(false);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/home");
    } catch (error) {
      setLoading(false);
      setFormError(error.message);
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center">
      {loading && <Loader />}
      <Header linkText="Sign Up" linkTo="/signup" />

      <div className=" p-8 mt-40 rounded  w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-4">
          Login
        </h2>

        {formError && (
          <p className="text-red-500 text-sm text-center">{formError}</p>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label className="text-base font-bold text-black">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-2 mb-2 border-2 border-gray rounded-md "
              required
            />
          </div>

          <div className="mb-4 relative">
            <label className="text-base font-bold text-black">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-2 mb-2 border-2 border-gray rounded-md pr-10"
              required
            />
            {password.length > 0 && (
              <button
                type="button"
                className="absolute right-3 top-12 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <div className="text-center my-4 text-gray-500">OR</div>
        <hr className="my-6 border-t-2 border-double border-gray" />

        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center text-black border-gray border-2 py-2 rounded hover:bg-gray transition gap-2"
        >
          <GoogleIcon />
          Sign in with Google
        </button>

        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
