import { useLocation } from "react-router-dom";
import useFetchCourses from "../../hooks/useFetchCourses";
import useForm from "../../hooks/useForm";
import { createBatch } from "../../redux/slices/batchSlice";
import {
  Layers,
  BookOpen,
  UserPlus,
  FileText,
  AlertCircle,
  Target,
} from "lucide-react"; // Lucide icons
import Loading from "../Loading";
import { useSelector } from "react-redux";

const CreateBatch = () => {
  const [courses, isLoading] = useFetchCourses();
  const validate = (input_name, value, formData) => {
    let error;

    return error || "";
  };
  const is_loading = useSelector((state) => {
    return state.batch.isLoading;
  });
  const location = useLocation();
  const [formData, changeHandler, submitHandler, errors, setFormData] = useForm(
    {
      name: "",
      desc: "",
      course: "",
    },
    createBatch,
    validate,
    "/dashboard/batches",
    "batch"
  );

  if (is_loading || isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="bg-gradient-to-br py-1 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center my-7">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
            Create Batch
          </h1>
        </div>

        <form
          onSubmit={submitHandler}
          className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl p-8 space-y-8 border border-gray-100"
        >
          {/* Batch Information Section */}
          <div className="space-y-6">
            {/* Header */}
            <div className="border-b border-gray-200 pb-4">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <Layers className="w-5 h-5 mr-2 text-purple-600" />
                Batch Information
              </h2>
            </div>

            {/* Batch Name */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="flex items-center text-sm font-semibold text-gray-700"
              >
                <Target className="w-4 h-4 mr-2 text-gray-500" />
                Batch Name
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  placeholder="Enter batch name (e.g., 2025 Spring Batch)"
                  onChange={changeHandler}
                  value={formData.name}
                  className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 
                    ${
                      errors.name
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-200 focus:border-purple-500 focus:ring-purple-200"
                    }
                    focus:ring-4 focus:ring-opacity-20 outline-none bg-white hover:border-gray-300`}
                />
              </div>
              {errors.name && (
                <div className="flex items-center mt-2 text-red-600 text-sm animate-fade-in">
                  <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                  <span>{errors.name}</span>
                </div>
              )}
            </div>

            {/* Batch Description */}
            <div className="space-y-2">
              <label
                htmlFor="desc"
                className="flex items-center text-sm font-semibold text-gray-700"
              >
                <FileText className="w-4 h-4 mr-2 text-gray-500" />
                Batch Description
                <span className="text-red-500 ml-1">*</span>
              </label>
              <textarea
                name="desc"
                id="desc"
                required
                placeholder="Describe the batch schedule, key details, timing, etc."
                rows={4}
                onChange={changeHandler}
                value={formData.desc}
                className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 resize-none 
                  ${
                    errors.desc
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                      : "border-gray-200 focus:border-purple-500 focus:ring-purple-200"
                  } 
                  focus:ring-4 focus:ring-opacity-20 outline-none bg-white hover:border-gray-300`}
              />
              {errors.desc && (
                <div className="flex items-center mt-2 text-red-600 text-sm animate-fade-in">
                  <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                  <span>{errors.desc}</span>
                </div>
              )}
            </div>

            {/* Course Select */}
            <div className="space-y-2">
              <label
                htmlFor="course"
                className="flex items-center text-sm font-semibold text-gray-700"
              >
                <BookOpen className="w-4 h-4 mr-2 text-gray-500" />
                Select Course
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <select
                  name="course"
                  id="course"
                  required
                  onChange={changeHandler}
                  value={formData.course}
                  className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 
                    ${
                      errors.course
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-200 focus:border-purple-500 focus:ring-purple-200"
                    }
                    focus:ring-4 focus:ring-opacity-20 outline-none bg-white hover:border-gray-300 appearance-none`}
                >
                  <option value={""}>Select any course</option>
                  {!isLoading &&
                    courses.length > 0 &&
                    courses.map((course, index) => (
                      <option key={index} value={course._id}>
                        {course.course_name}
                      </option>
                    ))}
                </select>
                {/* Custom dropdown icon */}
                <svg
                  className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              {errors.course && (
                <div className="flex items-center mt-2 text-red-600 text-sm animate-fade-in">
                  <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                  <span>{errors.course}</span>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6 border-t border-gray-200">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-200 transform hover:scale-105 focus:ring-4 focus:ring-purple-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <UserPlus className="w-5 h-5" />
              <span>
                {location.pathname.includes("update") ? "Update" : "Create"}{" "}
                Batch
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBatch;
