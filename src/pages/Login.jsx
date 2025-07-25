import useForm from "../hooks/useForm";
import { login } from "../redux/slices/authSlice";
import { Mail, Lock, AlertCircle, LogIn } from "lucide-react";

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

  const [formData, changeHandler, submitHandler, errors] = useForm(
    {
      email: "",
      password: "",
    },
    login,
    validate,
    "/dashboard/courses",
    "login"
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
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
        >
          {/* Email Input Section */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="flex items-center text-sm font-semibold text-gray-700"
            >
              <Mail className="w-4 h-4 mr-2 text-gray-500" />
              Email Address <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="relative">
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
            </div>
            {errors.email && (
              <div className="flex items-center mt-2 text-red-600 text-sm animate-fade-in">
                <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                <span>{errors.email}</span>
              </div>
            )}
          </div>

          {/* Password Input Section */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="flex items-center text-sm font-semibold text-gray-700"
            >
              <Lock className="w-4 h-4 mr-2 text-gray-500" />
              Password <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="relative">
              <input
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
            </div>
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
    </div>
  );
};

export default Login;
