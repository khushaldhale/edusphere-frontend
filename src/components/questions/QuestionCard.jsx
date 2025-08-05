import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteQuestion } from "../../redux/slices/questionSlice";
import { motion } from "framer-motion";
import { Trash2, Pencil } from "lucide-react";

const QuestionCard = ({ question, idx, setShowForm, exam_id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Header: question number, question text and marks badge */}
      <div className="flex items-center gap-4 mb-3">
        <span className="text-lg font-semibold text-gray-900">Q{idx + 1}.</span>
        <p className="text-base text-gray-900 flex-1">{question.question}</p>
        <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm select-none">
          {question.marks} Marks
        </span>
      </div>

      {/* Options list */}
      <div className="flex flex-col gap-3 ml-5">
        {question?.options?.map((option, optionIdx) => {
          const isAnswer = question.answer === option;
          return (
            <div
              key={optionIdx}
              className={`flex items-center gap-3 transition-colors ${
                isAnswer ? "text-blue-700 font-semibold" : "text-gray-800"
              }`}
            >
              <span
                className={`inline-block w-4 h-4 rounded-full border-2 border-blue-700 flex-shrink-0 ${
                  isAnswer ? "bg-blue-700" : "bg-transparent"
                }`}
                aria-hidden="true"
              />
              <span>{option}</span>
            </div>
          );
        })}
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 pt-6 border-t border-gray-100">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-3 rounded-lg transition-shadow shadow-sm hover:shadow-md flex items-center justify-center gap-2 text-sm"
          onClick={() => {
            dispatch(deleteQuestion({ question_id: question._id })).then(
              (action) => {
                if (action.payload?.success) {
                  toast.success(action.payload.message);
                } else {
                  toast.error(action.payload?.message || "Error deleting");
                }
              }
            );
          }}
          aria-label="Delete Question"
        >
          <Trash2 className="w-5 h-5" />
          Delete
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg transition-shadow shadow-sm hover:shadow-md flex items-center justify-center gap-2 text-sm"
          onClick={() => {
            setShowForm(true);
            navigate(`/dashboard/exams/${exam_id}/questions/update`, {
              state: question,
            });
          }}
          aria-label="Update Question"
        >
          <Pencil className="w-5 h-5" />
          Update
        </motion.button>
      </div>
    </div>
  );
};

export default QuestionCard;
