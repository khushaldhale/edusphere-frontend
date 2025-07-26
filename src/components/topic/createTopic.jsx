import { useLocation, useParams } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { createTopic, updateTopic } from "../../redux/slices/topicSlice";
import { Target, AlertCircle, FileText, BookOpen } from "lucide-react";
import { useSelector } from "react-redux";

const CreateTopic = ({ setAddTopic }) => {
  const location = useLocation();
  const data = location.state;
  const required_path = location.pathname.split("/").at(-1);
  const subject_id = useParams().subject_id;
  let thunk;
  let path;
  if (required_path === "update") {
    thunk = updateTopic;
    const arr = location.pathname.split("/");
    path = arr.slice(0, arr.length - 2).join("/");
  } else {
    thunk = createTopic;
    path = location.pathname;
  }

  const validate = (input_name, value, formData) => {
    let error;
    switch (input_name) {
      case "name": {
        if (!value.trim()) {
          error = "Topic name is required.";
        } else if (value && value.trim().length < 2) {
          error = "Minumum 2 characters are required.";
        }

        break;
      }
      case "desc": {
        if (!value.trim()) {
          error = "Topic description is required.";
        } else if (value && value.trim().length < 10) {
          error = "Minumum 10 characters are required.";
        }
        break;
      }
      case "notes_pdf": {
        if (!value) {
          error = "Notes pdf is required.";
        }
        break;
      }
    }
    return error || "";
  };

  const [formData, changeHandler, submitHandler, errors, setFormData] = useForm(
    {
      name: data?.name || "",
      desc: data?.desc || "",
      subject: subject_id,
      notes_pdf: data?.notes_pdf || "",
      topic_id: data?._id || "",
    },
    thunk,
    validate,
    path,
    "",
    setAddTopic
  );

  const isLoading = useSelector((state) => {
    return state.topic.isLoading;
  });

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="bg-gradient-to-br py-1 px-4">
      <div className="max-w-3xl mx-auto">
        {required_path === "update" && (
          <div className="text-center my-8">
            <h1 className="text-3xl font-semibold text-gray-800 flex items-center justify-center">
              Update Topic
            </h1>
          </div>
        )}

        <form
          onSubmit={(event) => submitHandler(event)}
          className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl p-8 space-y-8 border border-gray-100"
        >
          {/* Topic Name */}
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="flex items-center text-sm font-semibold text-gray-700"
            >
              <Target className="w-4 h-4 mr-2 text-gray-500" />
              Topic Name
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={changeHandler}
                required
                placeholder="e.g., Introduction to Algebra"
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

          {/* Description */}
          <div className="space-y-2">
            <label
              htmlFor="desc"
              className="flex items-center text-sm font-semibold text-gray-700"
            >
              <FileText className="w-4 h-4 mr-2 text-gray-500" />
              Description
              <span className="text-red-500 ml-1">*</span>
            </label>
            <textarea
              name="desc"
              id="desc"
              value={formData.desc}
              onChange={changeHandler}
              required
              rows={4}
              placeholder="Provide a brief description of the topic..."
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

          {/* Notes PDF Upload */}
          <div className="space-y-2">
            <label
              htmlFor="notes_pdf"
              className="flex items-center text-sm font-semibold text-gray-700"
            >
              <BookOpen className="w-4 h-4 mr-2 text-gray-500" />
              Upload Notes (PDF)
              <span
                className={
                  required_path !== "update" ? "text-red-500 ml-1" : "ml-1"
                }
              >
                *
              </span>
            </label>
            <input
              type="file"
              name="notes_pdf"
              id="notes_pdf"
              accept=".pdf"
              required={required_path !== "update"}
              onChange={changeHandler}
              className="block w-full text-sm text-gray-700 
  file:mr-4 file:py-2 file:px-4
   file:text-sm file:font-semibold
  file:bg-blue-600
  file:text-white hover:file:bg-blue-700
  transition duration-200"
            />
            {errors.notes_pdf && (
              <div className="flex items-center mt-2 text-red-600 text-sm animate-fade-in">
                <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                <span>{errors.notes_pdf}</span>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed
              text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-200 transform hover:scale-105
              focus:ring-4 focus:ring-purple-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <Target className="w-5 h-5" />
              <span>
                {required_path === "update" ? "Update Topic" : "Create Topic"}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTopic;
