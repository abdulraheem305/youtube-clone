import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { auth, googleProvider } from "../../firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { signupUser, googleSignupUser } from "../../redux/slice/authSlice";
import Header from "../login_Signup_Header/index";
import { GoogleIcon } from "../../constants";
import Loader from "../loader";
import { Eye, EyeOff } from "lucide-react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email || !password || !confirmPassword) {
      setFormError("All fields are required!");
      return false;
    }
    if (password.length < 6) {
      setFormError("Password must be at least 6 characters.");
      return false;
    }
    if (password !== confirmPassword) {
      setFormError("Passwords do not match!");
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
      await createUserWithEmailAndPassword(auth, email, password);
      dispatch(signupUser({ email, password }));
      setTimeout(() => {
        setLoading(false);
        navigate("/home");
      }, 3000);
    } catch (error) {
      setFormError(error.message);
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
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
      <Header linkText="Login" linkTo="/" />

      <div className="p-8 mt-40 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-4">
          Sign up
        </h2>
        {formError && (
          <p className="text-red-500 text-sm text-center">{formError}</p>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label className="text-base font-bold text-black">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full p-2 mb-2 border-2 border-gray rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4 relative">
            <label className="text-base font-bold">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              className="w-full p-2 mb-2 border-2 border-gray rounded-md pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {password.length > 0 && (
              <button
                type="button"
                className="absolute right-3 top-11 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            )}
          </div>

          <div className="mb-4 relative">
            <label className="text-base font-bold">Confirm Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Enter confirm password"
              className="w-full p-2 mb-2 border-2 border-gray rounded-md pr-10"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {confirmPassword.length > 0 && (
              <button
                type="button"
                className="absolute right-3 top-11 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded"
          >
            Sign Up
          </button>
        </form>

        <div className="my-4 text-center text-gray-500">OR</div>
        <hr className="my-6 border-t-2 border-double border-gray" />
        <button
          onClick={handleGoogleSignUp}
          className="w-full flex items-center justify-center text-black border-gray border-2 py-2 rounded-md hover:bg-gray transition gap-2"
        >
          <GoogleIcon />
          Sign up with Google
        </button>

        <p className="mt-2 text-center">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
