import { useSelector } from "react-redux";
import useFetchCourses from "../../hooks/useFetchCourses";
import useForm from "../../hooks/useForm";
import { createEnquiry } from "../../redux/slices/enquirySlice";
import {
  BookOpen,
  User,
  Phone,
  MapPin,
  GraduationCap,
  Calendar,
  Briefcase,
  Building,
  LayoutList,
  AlertCircle,
  Send,
  Package,
} from "lucide-react";
import Loading from "../Loading";

const CreateEnquiry = () => {
  const [courses, isLoading] = useFetchCourses();

  const validate = (input_name, value, formData) => {
    let error;
    const currentYear = new Date().getFullYear();
    const contactRegex = /^[6-9]\d{9}$/;

    switch (input_name) {
      case "full_name": {
        if (!value.trim()) {
          error = "Full Name is required.";
        } else if (value.length < 2 || value.length > 50) {
          error = "Full Name must be between 2 and 50 characters.";
        }
        break;
      }

      case "contact_number": {
        if (!value) {
          error = "Contact Number is required.";
        } else if (!/^\d+$/.test(value)) {
          error = "Contact Number should contain only digits.";
        } else if (value.toString().length !== 10) {
          error = "Contact Number must be exactly 10 digits.";
        } else if (!contactRegex.test(value)) {
          error = "Contact Number format is invalid.";
        }
        break;
      }

      case "address": {
        if (!value.trim()) {
          error = "Address is required.";
        }
        break;
      }

      case "last_qualification": {
        if (!value.trim()) {
          error = "Last Qualification is required.";
        }
        break;
      }

      case "passing_year": {
        if (!value) {
          error = "Passing Year is required.";
        } else if (!/^\d{4}$/.test(value)) {
          error = "Passing Year must be a 4-digit number.";
        } else if (value < currentYear - 10 || value > currentYear + 4) {
          error = `Passing Year should be between ${currentYear - 10} and ${
            currentYear + 4
          }.`;
        }
        break;
      }

      case "current_status": {
        if (!value.trim()) {
          error = "Current Status is required.";
        }
        break;
      }

      case "college_name": {
        if (!value.trim()) {
          error = "College Name is required.";
        } else if (value.length < 5) {
          error = "College Name must be at least 5 characters.";
        }
        break;
      }

      case "course_interested": {
        if (!value.trim()) {
          error = "Course Interested field is required.";
        }
        break;
      }

      case "learning_mode": {
        if (!value.trim()) {
          error = "Learning Mode is required.";
        }
        break;
      }

      case "house_number": {
        if (!value.trim()) {
          error = "House Number is required.";
        }
        break;
      }

      case "city": {
        if (!value.trim()) {
          error = "City is required.";
        } else if (value.length < 2) {
          error = "City must contain at least 2 characters.";
        }
        break;
      }

      case "area": {
        if (!value.trim()) {
          error = "Area is required.";
        } else if (value.length < 5) {
          error = "Area must contain at least 5 characters.";
        }
        break;
      }

      case "pincode": {
        if (!value) {
          error = "Pincode is required.";
        } else if (!/^\d{6}$/.test(value)) {
          error = "Pincode must be a 6-digit number.";
        }
        break;
      }

      default:
        error = "";
    }

    return error || "";
  };

  let navigate_url;
  const { accountType } = useSelector((state) => {
    return state.auth.userInfo;
  });
  // check whether the  enquiry  is in-person or online.
  let enquiry_type = "";
  if (accountType === "receptionist" || accountType === "counsellor") {
    enquiry_type = "in-person";
  } else {
    enquiry_type = "online";
  }
  if (accountType === "counsellor") {
    navigate_url = "/dashboard/enquiries";
  } else {
    navigate_url = "";
  }
  const [formData, changeHandler, submitHandler, errors, setFormData] = useForm(
    {
      fname: "",
      lname: "",
      contact_number: "",
      address: "",
      last_qualification: "",
      passing_year: "",
      current_status: "",
      college_name: "",
      course_interested: "",
      learning_mode: "",
      house_number: "",
      area: "",
      city: "",
      pincode: "",
      enquiry_type,
    },
    createEnquiry,
    validate,
    navigate_url,
    "enquiry"
  );

  const is_loading = useSelector((state) => {
    return state.enquiry.isLoading;
  });

  if (isLoading || is_loading) {
    return <Loading></Loading>;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Create New Enquiry
          </h1>
          <p className="text-gray-600">
            Fill out the details to create a new student enquiry
          </p>
        </div>

        <form
          autoComplete="off"
          onSubmit={submitHandler}
          className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl p-8 space-y-8 border border-gray-100"
        >
          {/* Personal Information */}
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-600" />
                Personal Information
              </h2>
            </div>

            {/* First Name */}
            <div className="space-y-2">
              <label
                htmlFor="fname"
                className="flex items-center text-sm font-semibold text-gray-700"
              >
                <User className="w-4 h-4 mr-2 text-gray-500" />
                First Name
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="fname"
                  id="fname"
                  required
                  placeholder="Enter First name"
                  onChange={changeHandler}
                  value={formData.fname}
                  className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200
                  ${
                    errors?.fname
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                  }
                  focus:ring-4 focus:ring-opacity-20 outline-none bg-white hover:border-gray-300`}
                />
              </div>
              {errors?.fname && (
                <div className="flex items-center mt-2 text-red-600 text-sm animate-fade-in">
                  <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                  <span>{errors.fname}</span>
                </div>
              )}
            </div>
            {/* Last Name */}
            <div className="space-y-2">
              <label
                htmlFor="lname"
                className="flex items-center text-sm font-semibold text-gray-700"
              >
                <User className="w-4 h-4 mr-2 text-gray-500" />
                Last Name
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="lname"
                  id="lname"
                  required
                  placeholder="Enter Last name"
                  onChange={changeHandler}
                  value={formData.lname}
                  className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200
                  ${
                    errors?.lname
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                  }
                  focus:ring-4 focus:ring-opacity-20 outline-none bg-white hover:border-gray-300`}
                />
              </div>
              {errors?.lname && (
                <div className="flex items-center mt-2 text-red-600 text-sm animate-fade-in">
                  <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                  <span>{errors.lname}</span>
                </div>
              )}
            </div>

            {/* Contact Number */}
            <div className="space-y-2">
              <label
                htmlFor="contact_number"
                className="flex items-center text-sm font-semibold text-gray-700"
              >
                <Phone className="w-4 h-4 mr-2 text-gray-500" />
                Contact Number
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="contact_number"
                  id="contact_number"
                  required
                  placeholder="e.g., 9876543210"
                  onChange={changeHandler}
                  // value={formData.contact_number}
                  className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200
                  ${
                    errors?.contact_number
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                  }
                  focus:ring-4 focus:ring-opacity-20 outline-none bg-white hover:border-gray-300`}
                />
              </div>
              {errors?.contact_number && (
                <div className="flex items-center mt-2 text-red-600 text-sm animate-fade-in">
                  <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                  <span>{errors.contact_number}</span>
                </div>
              )}
            </div>

            {/* Address Fields */}
            <div className="border-t border-gray-200 pt-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center mb-4">
                <MapPin className="w-5 h-5 mr-2 text-orange-600" />
                Address Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* House Number */}
                <div className="space-y-2">
                  <label
                    htmlFor="house_number"
                    className="flex items-center text-sm font-semibold text-gray-700"
                  >
                    <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                    House/Flat Number
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="house_number"
                      id="house_number"
                      required
                      placeholder="e.g., A-101, B-5"
                      onChange={changeHandler}
                      value={formData.house_number}
                      className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200
                      ${
                        errors?.house_number
                          ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                          : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                      }
                      focus:ring-4 focus:ring-opacity-20 outline-none bg-white hover:border-gray-300`}
                    />
                  </div>
                  {errors?.house_number && (
                    <div className="flex items-center mt-2 text-red-600 text-sm animate-fade-in">
                      <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                      <span>{errors.house_number}</span>
                    </div>
                  )}
                </div>

                {/* Area */}
                <div className="space-y-2">
                  <label
                    htmlFor="area"
                    className="flex items-center text-sm font-semibold text-gray-700"
                  >
                    <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                    Area/Street/Locality
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="area"
                      id="area"
                      required
                      placeholder="e.g., Gandhi Road, ABC Society"
                      onChange={changeHandler}
                      value={formData.area}
                      className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200
                      ${
                        errors?.area
                          ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                          : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                      }
                      focus:ring-4 focus:ring-opacity-20 outline-none bg-white hover:border-gray-300`}
                    />
                  </div>
                  {errors?.area && (
                    <div className="flex items-center mt-2 text-red-600 text-sm animate-fade-in">
                      <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                      <span>{errors.area}</span>
                    </div>
                  )}
                </div>

                {/* City */}
                <div className="space-y-2">
                  <label
                    htmlFor="city"
                    className="flex items-center text-sm font-semibold text-gray-700"
                  >
                    <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                    City
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="city"
                      id="city"
                      required
                      placeholder="e.g., Nagpur"
                      onChange={changeHandler}
                      value={formData.city}
                      className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200
                      ${
                        errors?.city
                          ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                          : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                      }
                      focus:ring-4 focus:ring-opacity-20 outline-none bg-white hover:border-gray-300`}
                    />
                  </div>
                  {errors?.city && (
                    <div className="flex items-center mt-2 text-red-600 text-sm animate-fade-in">
                      <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                      <span>{errors.city}</span>
                    </div>
                  )}
                </div>

                {/* Pincode */}
                <div className="space-y-2">
                  <label
                    htmlFor="pincode"
                    className="flex items-center text-sm font-semibold text-gray-700"
                  >
                    <Package className="w-4 h-4 mr-2 text-gray-500" />
                    Pincode
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="pincode"
                      id="pincode"
                      required
                      placeholder="e.g., 440001"
                      onChange={changeHandler}
                      className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200
                      ${
                        errors?.pincode
                          ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                          : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                      }
                      focus:ring-4 focus:ring-opacity-20 outline-none bg-white hover:border-gray-300`}
                    />
                  </div>
                  {errors?.pincode && (
                    <div className="flex items-center mt-2 text-red-600 text-sm animate-fade-in">
                      <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                      <span>{errors.pincode}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Educational Information */}
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <GraduationCap className="w-5 h-5 mr-2 text-green-600" />
                Educational Information
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Last Qualification */}
              <div className="space-y-2">
                <label
                  htmlFor="last_qualification"
                  className="flex items-center text-sm font-semibold text-gray-700"
                >
                  <GraduationCap className="w-4 h-4 mr-2 text-gray-500" />
                  Last Qualification
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  {/* lastqualification */}

                  <select
                    name="last_qualification"
                    id="last_qualification"
                    required
                    onChange={changeHandler}
                    value={formData.last_qualification}
                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 appearance-none
                  ${
                    errors?.last_qualification
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                  }
                  focus:ring-4 focus:ring-opacity-20 outline-none bg-white hover:border-gray-300`}
                  >
                    <option value="">Select last qualification</option>
                    {/* Assuming 'courses' is an array of objects like [{ _id: '123', course_name: 'React Dev' }] */}
                    {["BCA", "MCA", "BE", "ME"].map((qualification, index) => (
                      <option key={index} value={qualification}>
                        {qualification}
                      </option>
                    ))}
                  </select>
                </div>
                {errors?.last_qualification && (
                  <div className="flex items-center mt-2 text-red-600 text-sm animate-fade-in">
                    <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                    <span>{errors.last_qualification}</span>
                  </div>
                )}
              </div>

              {/* Passing Year */}
              <div className="space-y-2">
                <label
                  htmlFor="passing_year"
                  className="flex items-center text-sm font-semibold text-gray-700"
                >
                  <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                  Passing Year
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="passing_year"
                    id="passing_year"
                    required
                    onChange={changeHandler}
                    // value={formData.passing_year}
                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200
                    ${
                      errors?.passing_year
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                    }
                    focus:ring-4 focus:ring-opacity-20 outline-none bg-white hover:border-gray-300`}
                  />
                </div>
                {errors?.passing_year && (
                  <div className="flex items-center mt-2 text-red-600 text-sm animate-fade-in">
                    <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                    <span>{errors.passing_year}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Current Status */}
            <div className="space-y-2">
              <label
                htmlFor="current_status"
                className="flex items-center text-sm font-semibold text-gray-700"
              >
                <Briefcase className="w-4 h-4 mr-2 text-gray-500" />
                Current Status
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <select
                  name="current_status"
                  id="current_status"
                  required
                  onChange={changeHandler}
                  value={formData.current_status}
                  className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 appearance-none
                  ${
                    errors?.current_status
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                  }
                  focus:ring-4 focus:ring-opacity-20 outline-none bg-white hover:border-gray-300`}
                >
                  <option value="">Select current status</option>
                  {["Studying", "Passed"].map((element, index) => (
                    <option value={element} key={index}>
                      {element.charAt(0).toUpperCase() + element.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              {errors?.current_status && (
                <div className="flex items-center mt-2 text-red-600 text-sm animate-fade-in">
                  <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                  <span>{errors.current_status}</span>
                </div>
              )}
            </div>

            {/* College Name */}
            <div className="space-y-2">
              <label
                htmlFor="college_name"
                className="flex items-center text-sm font-semibold text-gray-700"
              >
                <Building className="w-4 h-4 mr-2 text-gray-500" />
                College Name
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="college_name"
                  id="college_name"
                  required
                  placeholder="Enter college/institution name"
                  onChange={changeHandler}
                  value={formData.college_name}
                  className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200
                  ${
                    errors?.college_name
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                  }
                  focus:ring-4 focus:ring-opacity-20 outline-none bg-white hover:border-gray-300`}
                />
              </div>
              {errors?.college_name && (
                <div className="flex items-center mt-2 text-red-600 text-sm animate-fade-in">
                  <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                  <span>{errors.college_name}</span>
                </div>
              )}
            </div>
          </div>

          {/* Course and Learning Preference */}
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-purple-600" />
                Course & Learning Preference
              </h2>
            </div>

            {/* Course Interested */}
            <div className="space-y-2">
              <label
                htmlFor="course_interested"
                className="flex items-center text-sm font-semibold text-gray-700"
              >
                <BookOpen className="w-4 h-4 mr-2 text-gray-500" />
                Course Interested In
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <select
                  name="course_interested"
                  id="course_interested"
                  required
                  onChange={changeHandler}
                  value={formData.course_interested}
                  className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 appearance-none
                  ${
                    errors?.course_interested
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                  }
                  focus:ring-4 focus:ring-opacity-20 outline-none bg-white hover:border-gray-300`}
                >
                  <option value="">Select any course</option>
                  {/* Assuming 'courses' is an array of objects like [{ _id: '123', course_name: 'React Dev' }] */}
                  {courses?.length > 0 &&
                    courses.map((course) => (
                      <option key={course._id} value={course._id}>
                        {course.course_name}
                      </option>
                    ))}
                </select>
              </div>
              {errors?.course_interested && (
                <div className="flex items-center mt-2 text-red-600 text-sm animate-fade-in">
                  <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                  <span>{errors.course_interested}</span>
                </div>
              )}
            </div>

            {/* Learning Mode */}
            <div className="space-y-2">
              <label
                htmlFor="learning_mode"
                className="flex items-center text-sm font-semibold text-gray-700"
              >
                <LayoutList className="w-4 h-4 mr-2 text-gray-500" />
                Learning Mode
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <select
                  name="learning_mode"
                  id="learning_mode"
                  required
                  onChange={changeHandler}
                  value={formData.learning_mode}
                  className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 appearance-none
                  ${
                    errors?.learning_mode
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                  }
                  focus:ring-4 focus:ring-opacity-20 outline-none bg-white hover:border-gray-300`}
                >
                  <option value="">Select learning mode</option>
                  {["Online", "Offline", "Hybrid"].map((element, index) => (
                    <option key={index} value={element}>
                      {element.charAt(0).toUpperCase() + element.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              {errors?.learning_mode && (
                <div className="flex items-center mt-2 text-red-600 text-sm animate-fade-in">
                  <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                  <span>{errors.learning_mode}</span>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6 border-t border-gray-200">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-200 transform hover:scale-105 focus:ring-4 focus:ring-blue-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <Send className="w-5 h-5" />
              <span>Create Enquiry</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEnquiry;
