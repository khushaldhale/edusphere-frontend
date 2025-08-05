import { useLocation, useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import { login, studentLogin } from "../redux/slices/authSlice";
import { Mail, Lock, AlertCircle, LogIn } from "lucide-react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Login = () => {
  const validate = (input_name, value) => {
    let error = "";
    if (input_name === "email") {
      const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
      if (!value) {
        error = "Email is required.";
      } else if (!gmailRegex.test(value)) {
        error = "Please enter a valid @gmail.com email address.";
      }
    } else if (input_name === "password") {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
      if (!value) {
        error = "Password is required.";
      } else if (!passwordRegex.test(value)) {
        error =
          "Password must be at least 6 characters and include uppercase, lowercase, number, and special character.";
      }
    }
    return error;
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const required_path = useLocation().pathname.split("/").at(-1);
  let thunk = required_path === "login" ? login : studentLogin;

  const [formData, changeHandler, submitHandler, errors] = useForm(
    {
      email: "",
      password: "",
    },
    thunk,
    validate,
    "/dashboard/courses",
    "login"
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Left: Login Form */}
        <div className="max-w-md w-full mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Welcome Back!
            </h1>
            <p className="text-gray-600">Sign in to your EduSphere account</p>
          </div>
          <form
            onSubmit={submitHandler}
            className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl p-8 space-y-8 border border-gray-100"
            noValidate
            autoComplete="off"
          >
            {/* Email Input */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="flex items-center text-sm font-semibold text-gray-700"
              >
                <Mail className="w-4 h-4 mr-2 text-gray-500" />
                Email Address <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={changeHandler}
                required
                placeholder="your.email@gmail.com"
                className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 outline-none bg-white hover:border-gray-300 ${
                  errors.email
                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                } focus:ring-4 focus:ring-opacity-20`}
              />
              {errors.email && (
                <div className="flex items-center mt-2 text-red-600 text-sm animate-fade-in">
                  <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                  <span>{errors.email}</span>
                </div>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="flex items-center text-sm font-semibold text-gray-700"
              >
                <Lock className="w-4 h-4 mr-2 text-gray-500" />
                Password <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                autoComplete="off"
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={changeHandler}
                required
                placeholder="Enter your password"
                className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 outline-none bg-white hover:border-gray-300 ${
                  errors.password
                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                } focus:ring-4 focus:ring-opacity-20`}
              />
              {errors.password && (
                <div className="flex items-center mt-2 text-red-600 text-sm animate-fade-in">
                  <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                  <span>{errors.password}</span>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-gray-200">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-200 transform hover:scale-105 focus:ring-4 focus:ring-purple-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <LogIn className="w-5 h-5" />
                <span>Login</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right: Image and Text Section */}
        <div className="hidden md:flex flex-col items-center justify-center px-8">
          <img
            src="https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg"
            alt="EduSphere Education Illustration"
            className="max-w-full h-auto mb-8"
          />
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4 text-center">
            Empower Your Learning Journey
          </h2>
          <p className="text-gray-700 text-center max-w-md">
            Join EduSphere to access top-quality courses, track your progress,
            and achieve your educational goals with ease and confidence.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
