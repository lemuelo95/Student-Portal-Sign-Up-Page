import { useState } from "react";
import logo from './assets/student-sitting.svg'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

export default function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({ email: "", username: "", password: "" , passwordconfirm: "", });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const endpoint = isSignUp ? "/api/signup" : "/api/login";
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Something went wrong");
      alert(isSignUp ? "Sign Up Successful" : "Sign In Successful");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#1C1D21] gap-x-2 items-stretch">
      {/* Left Side - Form */}
      <div className="w-1/2 flex justify-center ml-0.5 items-center p-8">
        <div className=" bg-[#1C1D21]  text-white p-8 h-4/6 w-[400px]">
          <h1 className="text-5xl font-bold text-white text-left mb-4">
            {isSignUp ? "Sign Up" : "Login"}
          </h1>
           <p className="text-left text-gray-300 mb-15">
          Enter your account details
        </p>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border-b-2 border-gray-300 bg-transparent focus:border-blue-500 outline-none"
                  required
                />
              </div>
            )}
            <div>
              <input
                type="username"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-2 border-b-2 border-gray-300 bg-transparent focus:border-blue-500 outline-none"
                required
              />
            </div>
            <div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-2 border-b-2 border-gray-300 bg-transparent focus:border-blue-500 outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>
            </div>
            {isSignUp && (
              <div>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="passwordconfirm"
                    placeholder="Confirm your password"
                    value={formData.passwordconfirm}
                    onChange={handleChange}
                    className="w-full p-2 border-b-2 border-gray-300 bg-transparent focus:border-blue-500 outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </button>
                </div>
              </div>
            )}
            <button className="text-white underline mt-1 mb-5">
              Forgot your password?
            </button>
            <button
              type="submit"
              className="w-full bg-[#9C6FE4] text-white p-3 rounded hover:bg-gray-700"
              disabled={loading}
            >
              {loading ? "Processing..." : isSignUp ? "Register" : "Login"}
            </button>
          </form>
          
          <p className="text-sm text-center mt-4">
            {isSignUp ? "Already have an account?" : "Don't have an account?"} 
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-white ml-3.5 rounded-sm bg-gray-700 mt-40 px-3 py-1 text-sm w-20 h-12"
            >
              {isSignUp ? "Login" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="w-2/3 flex flex-col items-center justify-center bg-[#9C6FE4]">
      <h1 className="text-8xl font-extrabold text-white ml-10">Welcome to</h1>
      <h1 className="text-8xl text-white ml-10 ">student portal</h1>
      <p className="text-left text-white ml-1.5">Login to access your account</p>
        <img src={logo} alt="Authentication" style={{width: "200%", maxWidth: "700px", height: "auto"}} />
      </div>
    </div>
  );
}