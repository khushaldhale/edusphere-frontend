import useForm from "../../hooks/useForm";
import { createEnrollment } from "../../redux/slices/enrollmentSlice";

import {
  BookOpen,
  DollarSign,
  Receipt,
  Mail,
  Lock,
  UserPlus, // For main title and submit button
  AlertCircle, // For error messages
  Users, // For installment numbers
  Calendar, // For due in days,
  ListChecks,
} from "lucide-react";
import Installment from "./Installment";
import { useSelector } from "react-redux";
import Loading from "../Loading";

const EnrollmentForm = ({ enquiry_id, courses, isLoading }) => {
  const validate = (input_name, value, formData) => {
    let error;

    switch (input_name) {
      case "course": {
        if (!value.trim()) {
          error = "Course is required.";
        }
        break;
      }
      case "payment_type": {
        if (!value.trim()) {
          error = "Payment Mode is required.";
        }
        break;
      }
      case "transaction_id": {
        if (!value.trim()) {
          error = "Transaction ID is required.";
        }
        break;
      }
      case "email": {
        const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (!value.trim()) {
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
    }

    return error || "";
  };
  //   here the formData  of the course is having complete object of the course.
  const [formData, changeHandler, submitHandler, errors, setFormData] = useForm(
    {
      enquiry_id,
      course: "",
      course_obj: {},
      is_lumpsum: false,
      is_total_fee_paid: false,
      payment_type: "",
      amount_paid: 0,
      payment_mode: "Cash",
      transaction_id: "",
      installment_info: [],
      email: "",
      password: "",
    },
    createEnrollment,
    validate,
    "/dashboard/enquiries",
    "enrollment"
  );

  const is_loading = useSelector((state) => {
    return state.enrollment.isLoading;
  });

  if (is_loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 font-sans">
      {/* Page Header */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Enroll New Student
        </h1>
        <p className="text-gray-600">
          Complete the form to enroll a new student into a course.
        </p>
      </div>

      {/* Main Content Area - contains individual styled sections */}
      <form onSubmit={submitHandler} className="max-w-6xl mx-auto space-y-6">
        {/* Course Enrollment Section */}
        <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-xl p-6 border border-gray-100 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            <BookOpen className="w-6 h-6 mr-2 text-blue-600" />
            Course Enrollment
          </h2>
          <div className="space-y-2">
            <label
              htmlFor="course"
              className="flex items-center text-sm font-semibold text-gray-700"
            >
              <BookOpen className="w-4 h-4 mr-2 text-gray-500" />
              Course Enrolled In
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="relative">
              <select
                name="course"
                id="course"
                required
                onChange={changeHandler}
                value={formData.course}
                className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 appearance-none
                  ${
                    errors?.course
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                  }
                  focus:ring-4 focus:ring-opacity-20 outline-none bg-white hover:border-gray-300`}
              >
                <option value="">Select any course</option>
                {isLoading ? (
                  <option disabled>Loading courses...</option>
                ) : courses.length > 0 ? (
                  courses.map((course) => (
                    <option
                      key={course._id}
                      value={course._id}
                      data-course={JSON.stringify(course)}
                    >
                      {course.course_name}
                    </option>
                  ))
                ) : (
                  <option disabled>No courses available</option>
                )}
              </select>
            </div>
            {errors?.course && (
              <div className="flex items-center mt-2 text-red-600 text-sm animate-fade-in">
                <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                <span>{errors.course}</span>
              </div>
            )}
          </div>
        </div>

        {/* Payment Details Section */}
        <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-xl p-6 border border-gray-100 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            <DollarSign className="w-6 h-6 mr-2 text-green-600" />
            Payment Details
          </h2>

          {/* Payment Type Radio Buttons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div className="flex items-center">
              <input
                type="radio"
                name="payment_type"
                id="lumpsum"
                value={"lumpsum"}
                onChange={changeHandler}
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded-full accent-blue-600"
              />
              <label
                htmlFor="lumpsum"
                className="ml-2 text-gray-700 font-medium"
              >
                Full Payment (Lumpsum)
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                name="payment_type"
                id="installment"
                value={"installment"}
                onChange={changeHandler} // Use custom handler
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded-full accent-blue-600"
              />
              <label
                htmlFor="installment"
                className="ml-2 text-gray-700 font-medium"
              >
                Installment
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Amount Paid */}
            <div className="space-y-2">
              <label
                htmlFor="amount_paid"
                className="flex items-center text-sm font-semibold text-gray-700"
              >
                <DollarSign className="w-4 h-4 mr-2 text-gray-500" />
                Amount Paid (₹)
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="amount_paid"
                  id="amount_paid"
                  required
                  readOnly
                  placeholder="e.g., 15000"
                  onChange={changeHandler}
                  value={formData.amount_paid ?? 0}
                  className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200
                    ${
                      errors?.amount_paid
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                    }
                    focus:ring-4 focus:ring-opacity-20 outline-none bg-white hover:border-gray-300`}
                />
              </div>
              {errors?.amount_paid && (
                <div className="flex items-center mt-2 text-red-600 text-sm animate-fade-in">
                  <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                  <span>{errors.amount_paid}</span>
                </div>
              )}
            </div>
            {/* payment mode */}
            {formData.is_lumpsum && (
              <div className="space-y-2">
                <label
                  htmlFor="payment_mode"
                  className="flex items-center text-sm font-semibold text-gray-700"
                >
                  <ListChecks className="w-4 h-4 mr-2 text-gray-500" />
                  Payment Mode
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <select
                    name="payment_mode"
                    id="payment_mode"
                    required
                    onChange={changeHandler}
                    value={formData.payment_mode}
                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 appearance-none
                      ${
                        errors?.payment_mode
                          ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                          : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                      }
                      focus:ring-4 focus:ring-opacity-20 outline-none bg-white hover:border-gray-300`}
                  >
                    {["Cash", "UPI", "Bank-Transfer", "Card"].map(
                      (mode, index) => {
                        return (
                          <option key={index} value={mode}>
                            {mode}
                          </option>
                        );
                      }
                    )}
                  </select>
                </div>
                {errors?.payment_mode && (
                  <div className="flex items-center mt-2 text-red-600 text-sm animate-fade-in">
                    <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                    <span>{errors.payment_mode}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Transaction ID */}
          {formData.is_lumpsum && formData.payment_mode !== "Cash" && (
            <div className="space-y-2">
              <label
                htmlFor="transaction_id"
                className="flex items-center text-sm font-semibold text-gray-700"
              >
                <Receipt className="w-4 h-4 mr-2 text-gray-500" />
                Transaction ID
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="transaction_id"
                  id="transaction_id"
                  placeholder="Optional: Enter transaction ID"
                  onChange={changeHandler}
                  value={formData.transaction_id}
                  className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200
                    ${
                      errors?.transaction_id
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                    }
                    focus:ring-4 focus:ring-opacity-20 outline-none bg-white hover:border-gray-300`}
                />
              </div>
              {errors?.transaction_id && (
                <div className="flex items-center mt-2 text-red-600 text-sm animate-fade-in">
                  <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                  <span>{errors.transaction_id}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Installments Section (Conditional) */}
        {!formData.is_lumpsum && (
          <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-xl p-6 border border-gray-100 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <Users className="w-6 h-6 mr-2 text-purple-600" />
              Installment Breakdown
            </h2>

            {formData.installment_info?.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-gray-200">
                <h3 className="text-base font-semibold text-gray-700">
                  Current Installments
                </h3>
                <div className="grid gap-3">
                  {formData.installment_info.map((element, index) => {
                    return (
                      <Installment
                        key={index}
                        index={index}
                        element={element}
                        formData={formData}
                        setFormData={setFormData}
                      ></Installment>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Student Account Credentials Section */}
        <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-xl p-6 border border-gray-100 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            <UserPlus className="w-6 h-6 mr-2 text-orange-600" />
            Student Account Credentials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="flex items-center text-sm font-semibold text-gray-700"
              >
                <Mail className="w-4 h-4 mr-2 text-gray-500" />
                Email Address
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="student.email@example.com"
                  onChange={changeHandler}
                  value={formData.email}
                  className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200
                    ${
                      errors?.email
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                    }
                    focus:ring-4 focus:ring-opacity-20 outline-none bg-white hover:border-gray-300`}
                />
              </div>
              {errors?.email && (
                <div className="flex items-center mt-2 text-red-600 text-sm animate-fade-in">
                  <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                  <span>{errors.email}</span>
                </div>
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
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  placeholder="Set student password"
                  onChange={changeHandler}
                  value={formData.password}
                  className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200
                    ${
                      errors?.password
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                    }
                    focus:ring-4 focus:ring-opacity-20 outline-none bg-white hover:border-gray-300`}
                />
              </div>
              {errors?.password && (
                <div className="flex items-center mt-2 text-red-600 text-sm animate-fade-in">
                  <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                  <span>{errors.password}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6 border-t border-gray-200">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-200 transform hover:scale-105 focus:ring-4 focus:ring-blue-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
          >
            <UserPlus className="w-5 h-5" />
            <span>Enroll Student</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default EnrollmentForm;
