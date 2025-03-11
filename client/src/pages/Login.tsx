import { useState } from "react";
import { signin } from "../services/auth";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: "",
      password: "",
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      const user = await signin(email, password);
      login(user.token);
      navigate("/");
    } catch (error: any) {
      console.error("Login Failed", error);
      setErrorMessage(error.response?.data?.message || "Sign-in failed");
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gray-50`}>
      <div className='max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-bold text-gray-900'>
            Sign In
          </h2>
          <p className='mt-2 text-center text-sm text-gray-600'>
            Don't have an account?{" "}
            <a
              href='/signup'
              className='text-blue-600 hover:text-blue-500 font-medium'
            >
              Sign up
            </a>
          </p>
        </div>

        {errorMessage && (
          <div className='p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg'>
            {errorMessage}
          </div>
        )}

        <form className='mt-8 space-y-6' onSubmit={(e) => e.preventDefault()}>
          <div className='rounded-md space-y-4'>
            <div className='space-y-1'>
              <div className='relative'>
                <FaEnvelope className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10' />
                <input
                  id='email'
                  type='email'
                  required
                  className={`pl-10 appearance-none rounded-lg relative block w-full px-3 py-2 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  placeholder='Email address'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {errors.email && (
                <p className='text-sm text-red-500'>{errors.email}</p>
              )}
            </div>

            <div className='space-y-1'>
              <div className='relative'>
                <FaLock className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10' />
                <input
                  id='password'
                  type='password'
                  required
                  className={`pl-10 appearance-none rounded-lg relative block w-full px-3 py-2 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  placeholder='Password'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {errors.password && (
                <p className='text-sm text-red-500'>{errors.password}</p>
              )}
            </div>
          </div>

          <button
            onClick={handleLogin}
            className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200'
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
