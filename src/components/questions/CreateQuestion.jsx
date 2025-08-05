import { useEffect, useRef } from "react";
import useForm from "../../hooks/useForm";
import {
  createQuestion,
  updateQuestion,
} from "../../redux/slices/questionSlice";
import { FileText, Hash, PlusCircle, CheckCircle } from "lucide-react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Loading from "../Loading";

const CreateQuestion = ({ setShowForm }) => {
  const location = useLocation();
  const data = location.state;

  const validate = (input_name, value) => {
    switch (input_name) {
      case "question":
        if (!value.trim()) return "Question is required";
        if (value.length < 10) return "Minimum 10 characters are required.";
        break;
      case "marks":
        if (typeof value !== "number") return "Valid Input is required";
        if (value < 1) return "Zero and negative value is not allowed.";
        break;
      case "answer":
        if (!value.trim()) return "Answer is required";
        break;
      default:
        return "";
    }
    return "";
  };

  const required_path = location.pathname.split("/").at(-1);
  const optionRef = useRef();
  const marksRef = useRef();

  const thunk = required_path === "update" ? updateQuestion : createQuestion;

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
    "",
    "question"
  );

  const isLoading = useSelector((state) => state.question.isLoading);

  const addOption = () => {
    const option = optionRef.current.value.trim();
    if (!option) {
      toast.error("Option should be provided.");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      options: [...prev.options, option],
    }));
    optionRef.current.value = "";
  };

  useEffect(() => {
    if (required_path === "update") {
      marksRef.current.value = data.marks;
    }
  }, [required_path, data]);

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50  px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="w-full max-w-3xl">
        <form
          onSubmit={(event) => {
            marksRef.current.value = "";
            optionRef.current.value = "";
            setShowForm(false);
            submitHandler(event);
          }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-8"
          noValidate
        >
          {/* Question Input */}
          <div className="space-y-2 relative">
            <label
              htmlFor="question"
              className="block text-sm font-medium text-gray-700 flex items-center"
            >
              <FileText className="w-5 h-5 mr-2 text-purple-600" />
              Question <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              id="question"
              name="question"
              required
              placeholder="Enter question text"
              value={formData.question}
              onChange={changeHandler}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors ${
                errors.question
                  ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                  : "border-gray-300"
              }`}
            />
            {errors.question && (
              <p className="flex items-center gap-1 mt-1 text-sm text-red-600">
                <FileText className="w-4 h-4" />
                {errors.question}
              </p>
            )}
          </div>

          {/* Marks Input */}
          <div className="space-y-2 relative">
            <label
              htmlFor="marks"
              className="block text-sm font-medium text-gray-700 flex items-center"
            >
              <Hash className="w-5 h-5 mr-2 text-orange-500" />
              Marks <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="number"
              id="marks"
              name="marks"
              min={1}
              required
              placeholder="Marks for this question"
              onChange={changeHandler}
              ref={marksRef}
              value={formData.marks}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors ${
                errors.marks
                  ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                  : "border-gray-300"
              }`}
            />
            {errors.marks && (
              <p className="flex items-center gap-1 mt-1 text-sm text-red-600">
                <Hash className="w-4 h-4" />
                {errors.marks}
              </p>
            )}
          </div>

          {/* Option Input */}
          <div className="space-y-2">
            <label
              htmlFor="option"
              className="flex items-center text-sm font-semibold text-gray-700"
            >
              <PlusCircle className="w-5 h-5 mr-2 text-blue-600" />
              Add Option
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                id="option"
                name="option"
                ref={optionRef}
                placeholder="Enter option text"
                className="flex-1 px-4 py-3 border rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors border-gray-300 hover:border-gray-400"
              />
              <button
                type="button"
                onClick={addOption}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold shadow-md transition duration-200"
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
                    className="flex items-center gap-3 text-gray-700 border border-gray-300 rounded-lg px-4 py-2 shadow-sm"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>{option}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Correct Answer Select */}
          <div className="space-y-2 relative">
            <label
              htmlFor="answer"
              className="block text-sm font-medium text-gray-700 flex items-center"
            >
              <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
              Correct Answer <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              id="answer"
              name="answer"
              required
              value={formData.answer}
              onChange={changeHandler}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors ${
                errors.answer
                  ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                  : "border-gray-300"
              }`}
            >
              <option value="">Select correct answer</option>
              {formData.options.map((option, idx) => (
                <option key={idx} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.answer && (
              <p className="flex items-center gap-1 mt-1 text-sm text-red-600">
                <CheckCircle className="w-4 h-4" />
                {errors.answer}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-6 border-t border-gray-200">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-xl text-lg transition-transform duration-200 hover:scale-105 focus:ring-4 focus:ring-purple-200 shadow-lg hover:shadow-xl"
            >
              <PlusCircle className="w-5 h-5" />
              {required_path === "update" ? "Update" : "Add"} Question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateQuestion;
