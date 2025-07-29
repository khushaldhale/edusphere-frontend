import { User, AtSign, Lock, Users } from "lucide-react";
import useForm from "../../hooks/useForm";
import {
  createEmployee,
  updateEmployee,
} from "../../redux/slices/employeeSlice";
import { useLocation } from "react-router-dom";
import Loading from "../Loading";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const CreateEmployee = () => {
  const validate = (input_name, value, formData) => {
    let error;
    switch (input_name) {
      case "fname": {
        if (!value.trim()) {
          error = "Fname is required.";
        } else if (value.trim().length < 2) {
          error = "Minimum 2 characters are required.";
        }
        break;
      }
      case "lname": {
        if (!value.trim()) {
          error = "Lname is required.";
        } else if (value.trim().length < 2) {
          error = "Minimum 2 characters are required.";
        }
        break;
      }
      case "email": {
        const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (!value) {
          error = "Email is required.";
        } else if (!gmailRegex.test(value)) {
          error = "Please enter a valid @gmail.com email address.";
        }
        break;
      }
      case "password": {
        const passwordRegex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
        if (!value) {
          error = "Password is required.";
        } else if (!passwordRegex.test(value)) {
          error =
            "Password must be at least 6 characters and include uppercase, lowercase, number, and special character.";
        }
        break;
      }
      case "accountType": {
        if (!value.trim()) {
          error = "AccountType is required.";
        }
        break;
      }
      default:
        break;
    }
    return error || "";
  };
  const isLoading = useSelector((state) => {
    return state.employee.isLoading;
  });
  const location = useLocation();
  const data = location.state;
  const required_path = location.pathname.split("/").at(-1);
  let thunk;
  if (required_path === "update") {
    thunk = updateEmployee;
  } else {
    thunk = createEmployee;
  }
  const [formData, changeHandler, submitHandler, errors, setFormData] = useForm(
    {
      fname: data?.fname || "",
      lname: data?.lname || "",
      email: data?.email || "",
      password: "",
      accountType: data?.accountType || "",
      employee_id: data?._id || "",
    },
    thunk,
    validate,
    "/dashboard/employees",
    "employee"
  );

  useEffect(() => {
    if (required_path !== "update") {
      setFormData((prevData) => {
        return {
          fname: "",
          lname: "",
          email: "",
          password: "",
          accountType: "",
          employee_id: "",
        };
      });
    }
  }, [required_path]);

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="bg-gradient-to-br px-6 max-w-3xl mx-auto">
      <div className="text-center my-7 ">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
          {required_path === "update" ? "Update" : "Create"} Employee
        </h1>
      </div>

      <form
        onSubmit={submitHandler}
        className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl p-8 space-y-8 border border-gray-100"
      >
        {/* Fname and Lname in a flex row on md+, stacked on mobile */}
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
          {/* First Name */}
          <div className="flex-1 space-y-2">
            <label
              htmlFor="fname"
              className="flex items-center text-sm font-semibold text-gray-700"
            >
              <User className="w-4 h-4 mr-2 text-gray-500" />
              First Name
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="fname"
              id="fname"
              required
              placeholder="Enter first name"
              value={formData.fname}
              onChange={changeHandler}
              className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 outline-none bg-white hover:border-gray-300 focus:ring-4 focus:ring-opacity-20 ${
                errors.fname
                  ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                  : "border-gray-200 focus:border-purple-500 focus:ring-purple-200"
              }`}
            />
            {errors.fname && (
              <p className="flex items-center text-red-600 text-sm mt-1 animate-fade-in">
                {errors.fname}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div className="flex-1 space-y-2">
            <label
              htmlFor="lname"
              className="flex items-center text-sm font-semibold text-gray-700"
            >
              <User className="w-4 h-4 mr-2 text-gray-500" />
              Last Name
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="lname"
              id="lname"
              required
              placeholder="Enter last name"
              value={formData.lname}
              onChange={changeHandler}
              className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 outline-none bg-white hover:border-gray-300 focus:ring-4 focus:ring-opacity-20 ${
                errors.lname
                  ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                  : "border-gray-200 focus:border-purple-500 focus:ring-purple-200"
              }`}
            />
            {errors.lname && (
              <p className="flex items-center text-red-600 text-sm mt-1 animate-fade-in">
                {errors.lname}
              </p>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="flex items-center text-sm font-semibold text-gray-700"
          >
            <AtSign className="w-4 h-4 mr-2 text-gray-500" />
            Email Address
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            placeholder="Enter your @gmail.com email"
            value={formData.email}
            onChange={changeHandler}
            className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 outline-none bg-white hover:border-gray-300 focus:ring-4 focus:ring-opacity-20 ${
              errors.email
                ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                : "border-gray-200 focus:border-purple-500 focus:ring-purple-200"
            }`}
          />
          {errors.email && (
            <p className="flex items-center text-red-600 text-sm mt-1 animate-fade-in">
              {errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="flex items-center text-sm font-semibold text-gray-700"
          >
            <Lock className="w-4 h-4 mr-2 text-gray-500" />
            Password
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="password"
            name="password"
            id="password"
            required={required_path !== "update"}
            disabled={required_path === "update"}
            placeholder="Enter a strong password"
            value={formData.password}
            onChange={changeHandler}
            className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 outline-none bg-white hover:border-gray-300 focus:ring-4 focus:ring-opacity-20 ${
              errors.password
                ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                : "border-gray-200 focus:border-purple-500 focus:ring-purple-200"
            }`}
          />
          {errors.password && (
            <p className="flex items-center text-red-600 text-sm mt-1 animate-fade-in">
              {errors.password}
            </p>
          )}
        </div>

        {/* Account Type */}
        <div className="space-y-2">
          <label
            htmlFor="accountType"
            className="flex items-center text-sm font-semibold text-gray-700"
          >
            <Users className="w-4 h-4 mr-2 text-gray-500" />
            Account Type
            <span className="text-red-500 ml-1">*</span>
          </label>
          <select
            id="accountType"
            name="accountType"
            value={formData.accountType}
            onChange={changeHandler}
            required
            className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 outline-none bg-white hover:border-gray-300 focus:ring-4 focus:ring-opacity-20 ${
              errors.accountType
                ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                : "border-gray-200 focus:border-purple-500 focus:ring-purple-200"
            }`}
          >
            <option value="">Select account type</option>
            {[
              "instructor",
              "counsellor",
              "receptionist",
              "operations_executive",
            ].map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
          {errors.accountType && (
            <p className="flex items-center text-red-600 text-sm mt-1 animate-fade-in">
              {errors.accountType}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-6 border-t border-gray-200">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-200 transform hover:scale-105 focus:ring-4 focus:ring-purple-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
          >
            <User className="w-5 h-5" />
            <span>
              {required_path === "update" ? "Update" : "Create"} Employee
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEmployee;
