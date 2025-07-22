import {
  AlertCircle,
  BookOpen,
  FileText,
  GraduationCap,
  Sparkles,
  Target,
} from "lucide-react";

const SubjectForm = ({
  formData,
  changeHandler,
  submitHandler,
  errors,
  url,
}) => {
  return (
    <div className="bg-gradient-to-br py-1 px-4">
      <div className="max-w-3xl mx-auto">
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
          </div>

          {/* Submit Button */}
          <div className="pt-6 border-t border-gray-200">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-200 transform hover:scale-105 focus:ring-4 focus:ring-purple-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <Target className="w-5 h-5" />
              <span>{url === "update" ? "Update" : "Add"} Subject</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubjectForm;
