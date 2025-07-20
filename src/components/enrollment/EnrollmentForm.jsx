import { useState } from "react";
import useFetchCourses from "../../hooks/useFetchCourses";
import useForm from "../../hooks/useForm";
import { createEnrollment } from "../../redux/slices/enrollmentSlice";

import {
  BookOpen,
  DollarSign,
  CreditCard,
  Receipt,
  Mail,
  Lock,
  UserPlus, // For main title and submit button
  AlertCircle, // For error messages
  Users, // For installment numbers
  Calendar, // For due in days
} from "lucide-react";

const EnrollmentForm = ({ enquiry_id }) => {
  const [courses, isLoading] = useFetchCourses();
  const validate = (input_name, value, formData) => {
    let error;

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
      is_installment: false,
      amount_paid: 0,
      payment_mode: "",
      transaction_id: "",
      installment_info: [],
      email: "",
      password: "",
    },
    createEnrollment,
    validate,
    "/",
    "enrollment"
  );
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

          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
            <input
              type="checkbox"
              name="is_lumpsum"
              id="is_lumpsum"
              onChange={changeHandler}
              checked={formData.is_lumpsum}
              className="w-5 h-5 text-blue-600 focus:ring-blue-500 focus:ring-2 rounded border-gray-300"
            />
            <label
              htmlFor="is_lumpsum"
              className="text-gray-700 font-medium cursor-pointer"
            >
              Full Payment (Lumpsum)
            </label>
            {/* installment  checkbox */}
            <input
              type="checkbox"
              name="is_installment"
              id="is_installment"
              onChange={changeHandler}
              checked={formData.is_installment}
              className="w-5 h-5 text-blue-600 focus:ring-blue-500 focus:ring-2 rounded border-gray-300"
            />
            <label
              htmlFor="is_installment"
              className="text-gray-700 font-medium cursor-pointer"
            >
              Installment Payment
            </label>
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
            {!formData.is_installment && (
              <div className="space-y-2">
                <label
                  htmlFor="payment_mode"
                  className="flex items-center text-sm font-semibold text-gray-700"
                >
                  <CreditCard className="w-4 h-4 mr-2 text-gray-500" />
                  Payment Mode
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="payment_mode"
                    id="payment_mode"
                    required
                    placeholder="e.g., Online, Cash, UPI"
                    onChange={changeHandler}
                    value={formData.payment_mode}
                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200
                    ${
                      errors?.payment_mode
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                    }
                    focus:ring-4 focus:ring-opacity-20 outline-none bg-white hover:border-gray-300`}
                  />
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
          {!formData.is_installment && (
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Installment Amount */}
              <div className="space-y-2">
                <label
                  htmlFor="installment_amount"
                  className="flex items-center text-sm font-semibold text-gray-700"
                >
                  <DollarSign className="w-4 h-4 mr-2 text-gray-500" />
                  Amount (₹)
                </label>
                <input
                  type="number"
                  name="amount"
                  id="installment_amount"
                  min="1"
                  placeholder="5000"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200 focus:ring-opacity-20 outline-none bg-white hover:border-gray-300 transition-all duration-200"
                />
              </div>
              {/* Due In Days */}
              <div className="space-y-2">
                <label
                  htmlFor="due_in_days"
                  className="flex items-center text-sm font-semibold text-gray-700"
                >
                  <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                  Due In (days)
                </label>
                <input
                  type="number"
                  name="due_in_days"
                  id="due_in_days"
                  min="0"
                  placeholder="30"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200 focus:ring-opacity-20 outline-none bg-white hover:border-gray-300 transition-all duration-200"
                />
              </div>
            </div>

            <button
              type="button"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 focus:ring-4 focus:ring-blue-200"
            >
              <Users className="w-4 h-4 mr-2" />
              Add Installment
            </button>

            {formData.installment_info?.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-gray-200">
                <h3 className="text-base font-semibold text-gray-700">
                  Current Installments
                </h3>
                <div className="grid gap-3">
                  {formData.installment_info.map((element, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <DollarSign className="w-4 h-4 mr-1" />
                          <span className="font-medium">₹{element.amount}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>Due in {element.due_in_days} days</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="text-red-500 hover:text-red-700 font-medium text-sm px-3 py-1 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
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
