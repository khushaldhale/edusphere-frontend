import { useEffect, useRef } from "react";
import useForm from "../../hooks/useForm";
import {
  createQuestion,
  updateQuestion,
} from "../../redux/slices/questionSlice";
import { FileText, Hash, PlusCircle, CheckCircle } from "lucide-react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const CreateQuestion = ({ exam_id }) => {
  const location = useLocation();
  const data = location.state;
  const validate = (input_name, value, formData) => {
    let error = "";
    switch (input_name) {
      case "question": {
        if (!value.trim()) {
          error = "Question is required";
        } else if (value && value.length < 10) {
          error = "Minimum 10 characters are required.";
        }
        break;
      }

      case "marks": {
        if (typeof value !== "number") {
          error = "Valid Input is required";
        } else if (typeof value === "number" && value < 1) {
          error = "Zero and negative value is not allowed.";
        }
        break;
      }

      case "answer": {
        if (!value.trim()) {
          error = "Answer is required";
        }
        break;
      }
    }
    return error;
  };
  const required_path = location.pathname.split("/").at(-1);
  const optionRef = useRef();
  const marksRef = useRef();
  let thunk;
  if (required_path === "update") {
    thunk = updateQuestion;
  } else {
    thunk = createQuestion;
  }
  const [formData, changeHandler, submitHandler, errors, setFormData] = useForm(
    {
      question: data?.question || "",
      marks: data?.marks || "",
      options: data?.options || [],
      answer: data?.answer || "",
      question_id: data?._id || "",
      exam_id: data?.exam_id || "",
    },
    thunk,
    validate,
    //dont go anywhere so that we do have an exam id anytime.
    "",
    "question"
  );

  const addOption = () => {
    const option = optionRef.current.value.trim();
    if (!option) {
      toast.error("Option  should be provided.");
    }
    setFormData((prevData) => ({
      ...prevData,
      options: [...prevData.options, option],
    }));
    optionRef.current.value = "";
  };

  useEffect(() => {
    if (required_path === "update") {
      marksRef.current.value = data.marks;
    }
  }, [required_path]);

  return (
    <div className="bg-gradient-to-br min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <form
          onSubmit={(event) => {
            marksRef.current.value = "";
            optionRef.current.value = "";
            submitHandler(event);
          }}
          className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl p-8 space-y-8 border border-gray-100"
        >
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center mb-8">
            <FileText className="w-7 h-7 text-blue-600 mr-2" />
            {required_path === "update" ? "Update" : "Add New"} Question
          </h2>

          {/* Question Input */}
          <div className="space-y-2">
            <label
              htmlFor="question"
              className="flex items-center text-sm font-semibold text-gray-700"
            >
              <FileText className="w-4 h-4 mr-2 text-purple-600" />
              Question <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="question"
              id="question"
              required
              placeholder="Enter question text"
              value={formData.question}
              onChange={changeHandler}
              className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 outline-none bg-white hover:border-gray-300 ${
                errors.question
                  ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                  : "border-gray-200 focus:border-purple-500 focus:ring-purple-200"
              } focus:ring-4 focus:ring-opacity-20`}
            />
            {errors.question && (
              <div className="flex items-center text-red-600 text-sm mt-1 animate-fade-in">
                <FileText className="w-4 h-4 mr-1" />
                <span>{errors.question}</span>
              </div>
            )}
          </div>

          {/* Marks Input */}
          <div className="space-y-2">
            <label
              htmlFor="marks"
              className="flex items-center text-sm font-semibold text-gray-700"
            >
              <Hash className="w-4 h-4 mr-2 text-orange-500" />
              Marks <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="number"
              name="marks"
              id="marks"
              min={1}
              required
              ref={marksRef}
              placeholder="Marks for this question"
              onChange={changeHandler}
              className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 outline-none bg-white hover:border-gray-300 ${
                errors.marks
                  ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                  : "border-gray-200 focus:border-purple-500 focus:ring-purple-200"
              } focus:ring-4 focus:ring-opacity-20`}
            />
            {errors.marks && (
              <div className="flex items-center text-red-600 text-sm mt-1 animate-fade-in">
                <Hash className="w-4 h-4 mr-1" />
                <span>{errors.marks}</span>
              </div>
            )}
          </div>

          {/* Option Input */}
          <div className="space-y-2">
            <label
              htmlFor="option"
              className="flex items-center text-sm font-semibold text-gray-700"
            >
              <PlusCircle className="w-4 h-4 mr-2 text-blue-600" />
              Add Option
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                ref={optionRef}
                id="option"
                name="option"
                placeholder="Enter option text"
                className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 outline-none bg-white hover:border-gray-300 border-gray-200 focus:border-purple-500 focus:ring-purple-200 focus:ring-4 focus:ring-opacity-20"
              />
              <button
                type="button"
                onClick={addOption}
                className="bg-gradient-to-r bg-blue-600 hover:bg-blue-800 px-15   text-white font-normal  rounded-xl text-lg transition-all duration-200 shadow  flex items-center justify-center gap-1"
                aria-label="Add option"
              >
                Add
              </button>
            </div>

            {/* Options List */}
            {formData.options.length > 0 && (
              <ul className="space-y-2 mt-4">
                {formData.options.map((option, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 text-gray-700 border border-gray-200 rounded-lg px-4 py-2 shadow-sm"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>{option}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Correct Answer Select */}
          <div className="space-y-2">
            <label
              htmlFor="answer"
              className="flex items-center text-sm font-semibold text-gray-700"
            >
              <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
              Correct Answer <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              id="answer"
              name="answer"
              required
              value={formData.answer}
              onChange={changeHandler}
              className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 outline-none bg-white hover:border-gray-300 ${
                errors.answer
                  ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                  : "border-gray-200 focus:border-purple-500 focus:ring-purple-200"
              } focus:ring-4 focus:ring-opacity-20`}
            >
              <option value="">Select correct answer</option>
              {formData.options.map((option, idx) => (
                <option key={idx} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.answer && (
              <div className="flex items-center text-red-600 text-sm mt-1 animate-fade-in">
                <CheckCircle className="w-4 h-4 mr-1" />
                <span>{errors.answer}</span>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-6 border-t border-gray-200">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-200 transform hover:scale-105 focus:ring-4 focus:ring-purple-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-5 h-5" />
              <span>
                {required_path === "update" ? "Update" : "Add"} Question
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateQuestion;
