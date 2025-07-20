import { useState } from "react";
import {
  AlertCircle,
  BookOpen,
  DollarSign,
  Calendar,
  Users,
  Percent,
} from "lucide-react";
import useForm from "../../hooks/useForm";
import { createCourse } from "../../redux/slices/courseSlice";
import { toast } from "react-toastify";

const CreateCourse = () => {
  const validate = (input_name, value, formData) => {
    let error;
    switch (input_name) {
      case "course_name": {
        if (!value.trim()) {
          error = "Course Name is required.";
        } else if (!(value && value.length >= 3)) {
          error = "Course Name length should be equal to or greater than 3.";
        }
        break;
      }
      case "course_desc": {
        if (!value.trim()) {
          error = "Course description is required.";
        } else if (!(value && value.length >= 10)) {
          error = "Course Desc length should be equal to or greater than 10.";
        }
        break;
      }
      case "duration": {
        if (isNaN(value)) {
          error = "Duration should be a valid number.";
        } else if (value < 1 || value > 60) {
          error = "Minimum course duration is 1 and maximum is 60 months.";
        }
        break;
      }
      case "total_fee": {
        if (isNaN(value)) {
          error = "Fee should be a valid number.";
        } else if (value < 100) {
          error = "Minimum course fee is 100 RS.";
        }
        break;
      }
      case "installment_numbers": {
        if (!(formData.is_installments && value >= 1 && value <= 3)) {
          error = "Minimum installment number is 1 and maximum is 3.";
        }
        break;
      }
      case "discount_per": {
        if (isNaN(value)) {
          error = "Discount should be a valid number.";
        } else if (!(formData.discount_allowed && value >= 1 && value <= 100)) {
          error = "Discount percentage should be between 1 to 100.";
        }
        break;
      }
    }
    return error || "";
  };

  // installment validation and  default value set up.
  //  also add one more field  remark.
  const [breakdown, setBreakDown] = useState({
    amount: 1,
    due_in_days: 0,
  });

  const [formData, changeHandler, submitHandler, errors, setFormData] = useForm(
    {
      course_name: "",
      course_desc: "",
      duration: "",
      total_fee: "",
      is_installments: false,
      installment_numbers: "",
      installment_breakdown: [],
      discount_allowed: false,
      discount_per: "",
    },
    createCourse,
    validate,
    "/dashboard/courses"
  );

  const breakdown_handler = (event) => {
    const { name, value, type, checked } = event.target;
    let actual_value;

    switch (type) {
      case "number":
        actual_value = Number(value);
        break;
      case "checkbox":
        actual_value = checked;
        break;
      case "date":
        actual_value = new Date(value);
        break;
      default:
        actual_value = value;
    }
    setBreakDown((prevData) => ({
      ...prevData,
      [name]: actual_value,
    }));
  };

  const add_breakdown = () => {
    //  installment length handled.
    if (
      formData.installment_breakdown.length + 1 >
      formData.installment_numbers
    ) {
      toast.error("Installment Number and Installment Breakdown doesnt match.");
      return;
    }

    //installment fees exceed.
    const sum = formData.installment_breakdown.reduce((acc, current) => {
      return acc + current?.amount;
    }, 0);

    if (
      formData.installment_breakdown.length + 1 <
      formData.installment_numbers
    ) {
      if (sum + breakdown.amount >= formData.total_fee) {
        toast.error("Installment Fees are exceeding total fee.");
        return;
      }
    } else {
      if (sum + breakdown.amount !== formData.total_fee) {
        toast.error("Installment Fees are Not matching.");
        return;
      }
    }

    // duplicate date values handled here.
    if (formData.installment_breakdown.length > 0) {
      const is_duplicate = formData.installment_breakdown.some((element) => {
        if (element.due_in_days == breakdown.due_in_days) {
          return true;
        }
      });
      if (is_duplicate) {
        toast.error("Duplicate Due day.");
      } else {
        setFormData((prevData) => ({
          ...prevData,
          installment_breakdown: [...prevData.installment_breakdown, breakdown],
        }));

        setBreakDown({
          amount: 0,
          due_in_days: 0,
        });
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        installment_breakdown: [...prevData.installment_breakdown, breakdown],
      }));

      setBreakDown({
        amount: 0,
        due_in_days: 0,
      });
    }
  };

  const remove_breakdown = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      installment_breakdown: prevData.installment_breakdown.filter(
        (_, i) => i !== index
      ),
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Create New Course
          </h1>
          <p className="text-gray-600">
            Design your educational program with detailed configuration
          </p>
        </div>

        <form
          onSubmit={submitHandler}
          className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl p-8 space-y-8 border border-gray-100"
        >
          {/* Course Basic Information */}

          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                Course Information
              </h2>
            </div>

            {/* Course Name */}
            <div className="space-y-2">
              <label
                htmlFor="course_name"
                className="flex items-center text-sm font-semibold text-gray-700"
              >
                <BookOpen className="w-4 h-4 mr-2 text-gray-500" />
                Course Name
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="course_name"
                  id="course_name"
                  required
                  placeholder="Enter course name (e.g., Advanced React Development)"
                  onChange={changeHandler}
                  value={formData.course_name}
                  className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 
                    ${
                      errors?.course_name
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                    } 
                    focus:ring-4 focus:ring-opacity-20 outline-none bg-white hover:border-gray-300`}
                />
              </div>
              {errors?.course_name && (
                <div className="flex items-center mt-2 text-red-600 text-sm animate-fade-in">
                  <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                  <span>{errors?.course_name}</span>
                </div>
              )}
            </div>

            {/* Course Description */}
            <div className="space-y-2">
              <label
                htmlFor="course_desc"
                className="flex items-center text-sm font-semibold text-gray-700"
              >
                <BookOpen className="w-4 h-4 mr-2 text-gray-500" />
                Course Description
                <span className="text-red-500 ml-1">*</span>
              </label>
              <textarea
                name="course_desc"
                id="course_desc"
                required
                placeholder="Describe your course content, objectives, and target audience..."
                rows={4}
                onChange={changeHandler}
                value={formData.course_desc}
                className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 resize-none
                  ${
                    errors?.course_desc
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                  } 
                  focus:ring-4 focus:ring-opacity-20 outline-none bg-white hover:border-gray-300`}
              />
              {errors?.course_desc && (
                <div className="flex items-center mt-2 text-red-600 text-sm animate-fade-in">
                  <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                  <span>{errors?.course_desc}</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Duration */}
              <div className="space-y-2">
                <label
                  htmlFor="duration"
                  className="flex items-center text-sm font-semibold text-gray-700"
                >
                  <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                  Duration (months)
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="duration"
                    id="duration"
                    required
                    min="1"
                    max="60"
                    placeholder="6"
                    onChange={changeHandler}
                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 
                      ${
                        errors?.duration
                          ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                          : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                      } 
                      focus:ring-4 focus:ring-opacity-20 outline-none bg-white hover:border-gray-300`}
                  />
                </div>
                {errors?.duration && (
                  <div className="flex items-center mt-2 text-red-600 text-sm animate-fade-in">
                    <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                    <span>{errors?.duration}</span>
                  </div>
                )}
              </div>

              {/* Total Fee */}
              <div className="space-y-2">
                <label
                  htmlFor="total_fee"
                  className="flex items-center text-sm font-semibold text-gray-700"
                >
                  <DollarSign className="w-4 h-4 mr-2 text-gray-500" />
                  Total Fee (₹)
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="total_fee"
                    id="total_fee"
                    required
                    min="100"
                    placeholder="15000"
                    onChange={changeHandler}
                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 
                      ${
                        errors?.total_fee
                          ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                          : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                      } 
                      focus:ring-4 focus:ring-opacity-20 outline-none bg-white hover:border-gray-300`}
                  />
                </div>
                {errors?.total_fee && (
                  <div className="flex items-center mt-2 text-red-600 text-sm animate-fade-in">
                    <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                    <span>{errors?.total_fee}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Installments Section */}
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <Users className="w-5 h-5 mr-2 text-green-600" />
                Payment Options
              </h2>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
              <input
                type="checkbox"
                name="is_installments"
                id="is_installments"
                onChange={changeHandler}
                checked={formData.is_installments}
                className="w-5 h-5 text-blue-600 focus:ring-blue-500 focus:ring-2 rounded border-gray-300"
              />
              <label
                htmlFor="is_installments"
                className="text-gray-700 font-medium cursor-pointer"
              >
                Enable Installment Payments
              </label>
            </div>

            {formData.is_installments && (
              <div className="space-y-6 bg-blue-50 p-6 rounded-xl border border-blue-200">
                {/* Number of Installments */}
                <div className="space-y-2">
                  <label
                    htmlFor="installment_numbers"
                    className="flex items-center text-sm font-semibold text-gray-700"
                  >
                    <Users className="w-4 h-4 mr-2 text-gray-500" />
                    Number of Installments
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="installment_numbers"
                      id="installment_numbers"
                      required
                      min="1"
                      placeholder="3"
                      onChange={changeHandler}
                      className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 
                        ${
                          errors?.installment_numbers
                            ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                            : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                        } 
                        focus:ring-4 focus:ring-opacity-20 outline-none bg-white hover:border-gray-300`}
                    />
                  </div>
                  {errors?.installment_numbers && (
                    <div className="flex items-center mt-2 text-red-600 text-sm animate-fade-in">
                      <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                      <span>{errors?.installment_numbers}</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="amount"
                      className="flex items-center text-sm font-semibold text-gray-700"
                    >
                      <DollarSign className="w-4 h-4 mr-2 text-gray-500" />
                      Installment Amount (₹)
                    </label>
                    <input
                      type="number"
                      name="amount"
                      id="amount"
                      min="1"
                      placeholder="5000"
                      onChange={breakdown_handler}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200 focus:ring-opacity-20 outline-none bg-white hover:border-gray-300 transition-all duration-200"
                    />
                  </div>
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
                      onChange={breakdown_handler}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200 focus:ring-opacity-20 outline-none bg-white hover:border-gray-300 transition-all duration-200"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={add_breakdown}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 focus:ring-4 focus:ring-blue-200"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Add Installment Breakdown
                </button>

                {formData.installment_breakdown?.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-gray-700">
                      Installment Breakdown
                    </h3>
                    <div className="grid gap-3">
                      {formData.installment_breakdown.map((element, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center text-sm text-gray-600">
                              <DollarSign className="w-4 h-4 mr-1" />
                              <span className="font-medium">
                                ₹{element.amount}
                              </span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Calendar className="w-4 h-4 mr-1" />
                              <span>Due in {element.due_in_days} days</span>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => remove_breakdown(index)}
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
          </div>

          {/* Discount Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
              <input
                type="checkbox"
                name="discount_allowed"
                id="discount_allowed"
                onChange={changeHandler}
                checked={formData.discount_allowed}
                className="w-5 h-5 text-green-600 focus:ring-green-500 focus:ring-2 rounded border-gray-300"
              />
              <label
                htmlFor="discount_allowed"
                className="text-gray-700 font-medium cursor-pointer"
              >
                Allow Discount on Course Fee
              </label>
            </div>

            {formData.discount_allowed && (
              <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                <div className="space-y-2">
                  <label
                    htmlFor="discount_per"
                    className="flex items-center text-sm font-semibold text-gray-700"
                  >
                    <Percent className="w-4 h-4 mr-2 text-gray-500" />
                    Discount Percentage (%)
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="discount_per"
                      id="discount_per"
                      required
                      min="1"
                      max="100"
                      placeholder="10"
                      onChange={changeHandler}
                      className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 
                        ${
                          errors?.discount_per
                            ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                            : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                        } 
                        focus:ring-4 focus:ring-opacity-20 outline-none bg-white hover:border-gray-300`}
                    />
                  </div>
                  {errors?.discount_per && (
                    <div className="flex items-center mt-2 text-red-600 text-sm animate-fade-in">
                      <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                      <span>{errors?.discount_per}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-6 border-t border-gray-200">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-200 transform hover:scale-105 focus:ring-4 focus:ring-blue-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <BookOpen className="w-5 h-5" />
              <span>Create Course</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;
