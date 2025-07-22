import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { createTopic, updateTopic } from "../../redux/slices/topicSlice";

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4 font-sans">
      <div className="max-w-5xl mx-auto">
        {required_path === "update" && (
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Update Topic
            </h1>
          </div>
        )}

        <div className="max-w-md mx-auto bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8">
          <form
            onSubmit={(event) => {
              submitHandler(event);
            }}
          >
            {/* Topic Name */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Topic Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={changeHandler}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                placeholder="e.g., Introduction to Algebra"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Description */}
            <div className="mb-4">
              <label
                htmlFor="desc"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Description
              </label>
              <textarea
                name="desc"
                id="desc"
                value={formData.desc}
                onChange={changeHandler}
                required
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-y"
                placeholder="Provide a brief description of the topic..."
              ></textarea>
              {errors.desc && (
                <p className="text-red-500 text-sm mt-1">{errors.desc}</p>
              )}
            </div>

            {/* Notes PDF Upload */}
            <div className="mb-6">
              <label
                htmlFor="notes_pdf"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Upload Notes (PDF)
              </label>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full">
                <input
                  type="file"
                  name="notes_pdf"
                  id="notes_pdf"
                  accept=".pdf"
                  required={required_path !== "update"}
                  onChange={changeHandler}
                  className="block w-full sm:w-auto text-sm text-gray-700
               file:mr-4 file:py-2 file:px-4
               file:rounded-lg file:border-0
               file:text-sm file:font-semibold
               file:bg-blue-600 file:text-white
               hover:file:bg-blue-700
               transition duration-200"
                />
              </div>

              {errors.notes_pdf && (
                <p className="text-red-500 text-sm mt-1">{errors.notes_pdf}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
            >
              {required_path === "update-topic"
                ? "Update Topic"
                : "Create Topic"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTopic;
