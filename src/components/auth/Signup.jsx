import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../redux/slice/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { auth, googleProvider } from "../../firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import Header from "../login_Signup_Header/index";
import { GoogleIcon } from "../../constants";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth || {});

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

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      dispatch(signupUser({ email, password }));
      navigate("/home");
    } catch (error) {
      setFormError(error.message);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      dispatch(signupUser({ email: user.email }));
      navigate("/home");
    } catch (error) {
      setFormError(error.message);
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center">
      <Header linkText="Login" linkTo="/" />

      <div className=" p-8 mt-40  w-full max-w-lg">
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
          <div className="mb-4">
            <label className="text-base font-bold ">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full p-2 mb-2 border-2 border-gray rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-base font-bold ">Confirm Password</label>
            <input
              type="password"
              placeholder="Enter confirm password"
              className="w-full p-2 mb-2 border-2 border-gray rounded-md"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <div className="my-4 text-center text-gray-500">OR</div>
        <hr className="my-6 border-t-2 border-double border-gray" />
        <button
          onClick={handleGoogleSignUp}
          className="w-full flex items-center justify-center text-black border-gray border-2 py-2 rounded-md hover:bg-gray  transition gap-2"
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
