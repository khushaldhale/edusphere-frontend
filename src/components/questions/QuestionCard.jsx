import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteQuestion } from "../../redux/slices/questionSlice";
import { motion } from "framer-motion";
import { Trash2, Pencil } from "lucide-react";

const QuestionCard = ({ question, idx }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div
      key={idx}
      className="bg-white border-2 border-gray-900 rounded-2xl shadow-lg p-6"
    >
      <div className="flex items-center gap-3 mb-1">
        <span className="text-lg font-semibold text-black">Q{idx + 1}.</span>
        <span className="text-base text-black">{question.question}</span>
        <span className="ml-auto bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
          {question.marks} Marks
        </span>
      </div>
      <div className="flex flex-col gap-2 mt-2 ml-3">
        {question?.options?.map((option, optionIdx) => (
          <div
            key={optionIdx}
            className={`flex items-center gap-2 ${
              question.answer === option ? "text-blue-700" : "text-black"
            }`}
          >
            <span
              className={`w-3 h-3 rounded-full border-2 ${
                question.answer === option ? "bg-blue-700" : "text-black"
              }`}
            />
            <span>{option}</span>
          </div>
        ))}
      </div>

      <div className="mt-3 text-sm text-black/70">
        <span className="mr-2 font-medium text-gray-900">Answer:</span>
        <span className="font-semibold text-blue-700">{question.answer}</span>
      </div>
      {/*   action  button */}
      <div className="flex gap-2 pt-4 border-t border-gray-100">
        <motion.button
          whileHover="hover"
          whileTap="tap"
          className="bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center shadow-md hover:shadow-lg text-sm"
          onClick={() => {
            dispatch(deleteQuestion({ question_id: question._id })).then(
              (action) => {
                if (action.payload.success) {
                  toast.success(action.payload.message);
                } else {
                  toast.error(action.payload.message);
                }
              }
            );
          }}
        >
          <Trash2 className="w-4 h-4" />
          <span className="ml-2">Delete</span>
        </motion.button>
        <motion.button
          whileHover="hover"
          whileTap="tap"
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center shadow-md hover:shadow-lg text-sm"
          onClick={() => {
            navigate(`/dashboard/exams/${exam_id}/questions/update`, {
              state: question,
            });
          }}
        >
          <Pencil className="w-4 h-4" />
          <span className="ml-2">Update</span>
        </motion.button>
      </div>
    </div>
  );
};

export default QuestionCard;
