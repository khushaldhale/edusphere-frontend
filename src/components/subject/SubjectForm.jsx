import {
  AlertCircle,
  BookOpen,
  FileText,
  GraduationCap,
  Sparkles,
  Target,
} from "lucide-react";

const SubjectForm = ({
  courses,
  formData,
  changeHandler,
  submitHandler,
  errors,
  isLoading,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Enhanced Header Section */}
        <div className="text-center mb-10">
          <div className="relative inline-block">
            {/* Background decoration */}
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-3xl blur-xl"></div>

            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Create New Subject
            </h1>
          </div>
        </div>

        <form
          onSubmit={submitHandler}
          className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl p-8 space-y-8 border border-gray-100"
        >
          {/* Subject Information Section */}
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-purple-600" />
                Subject Information
              </h2>
            </div>

            {/* Subject Name */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="flex items-center text-sm font-semibold text-gray-700"
              >
                <Target className="w-4 h-4 mr-2 text-gray-500" />
                Subject Name
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  placeholder="Enter subject name (e.g., Advanced Mathematics)"
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

            {/* Subject Description */}
            <div className="space-y-2">
              <label
                htmlFor="desc"
                className="flex items-center text-sm font-semibold text-gray-700"
              >
                <FileText className="w-4 h-4 mr-2 text-gray-500" />
                Subject Description
                <span className="text-red-500 ml-1">*</span>
              </label>
              <textarea
                name="desc"
                id="desc"
                required
                placeholder="Describe the subject content, learning objectives, and key topics covered..."
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

            {/* Course Selection */}
            <div className="space-y-2">
              <label
                htmlFor="course"
                className="flex items-center text-sm font-semibold text-gray-700"
              >
                <GraduationCap className="w-4 h-4 mr-2 text-gray-500" />
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
                  disabled={isLoading}
                  className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 
                    ${
                      errors.course
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-200 focus:border-purple-500 focus:ring-purple-200"
                    } 
                    focus:ring-4 focus:ring-opacity-20 outline-none bg-white hover:border-gray-300
                    ${
                      isLoading
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    }
                  `}
                >
                  <option value="">
                    {isLoading ? "Loading courses..." : "Select a course"}
                  </option>
                  {courses.length > 0 &&
                    courses.map((course) => (
                      <option key={course._id} value={course._id}>
                        {course.course_name.charAt(0).toUpperCase() +
                          course.course_name.slice(1)}
                      </option>
                    ))}
                </select>
                {isLoading && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="w-5 h-5 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
              {errors.course && (
                <div className="flex items-center mt-2 text-red-600 text-sm animate-fade-in">
                  <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                  <span>{errors.course}</span>
                </div>
              )}

              {/* Course Selection Helper */}
              {courses.length === 0 && !isLoading && (
                <div className="flex items-center mt-2 text-amber-600 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                  <span>
                    No courses available. Please create a course first.
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={isLoading || courses.length === 0}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-200 transform hover:scale-105 focus:ring-4 focus:ring-purple-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <Target className="w-5 h-5" />
              <span>{isLoading ? "Loading..." : "Add Subject"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubjectForm;
