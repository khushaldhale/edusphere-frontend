import { useNavigate, useParams } from "react-router-dom";
import CreateQuestion from "./CreateQuestion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteQuestion, getQuestions } from "../../redux/slices/questionSlice";
import { toast } from "react-toastify";

const Questions = () => {
  const params = useParams();
  const exam_id = params.id;
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.question.questions);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getQuestions({ exam_id }));
    // eslint-disable-next-line
  }, [dispatch, exam_id]);

  return (
    <div className="max-w-3xl mx-auto py-10">
      {/* Header & Add Question Button */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold text-black">Questions</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className={`px-6 py-3 rounded-lg font-semibold text-white shadow-md transition 
            ${
              showForm
                ? "bg-gray-900 hover:bg-blue-600"
                : "bg-blue-600 hover:bg-blue-800"
            }
          `}
        >
          {showForm ? "Cancel" : "Add Question"}
        </button>
      </div>

      {/* Create Question Form */}
      {showForm && (
        <div className="mb-10">
          <CreateQuestion exam_id={exam_id} />
        </div>
      )}

      {/* Show all questions */}
      {questions && questions.length > 0 ? (
        <div className="flex flex-col gap-6">
          {questions.map((question, idx) => (
            <div
              key={idx}
              className="bg-white border-2 border-gray-900 rounded-2xl shadow-lg p-6"
            >
              <div className="flex items-center gap-3 mb-1">
                <span className="text-lg font-semibold text-black">
                  Q{idx + 1}.
                </span>
                <span className="text-base text-black">
                  {question.question}
                </span>
                <span className="ml-auto bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
                  {question.marks} Marks
                </span>
              </div>
              <div className="flex flex-col gap-2 mt-2 ml-3">
                {question?.options?.map((option, optionIdx) => (
                  <div
                    key={optionIdx}
                    className={`flex items-center gap-2 ${
                      question.answer === option
                        ? "font-bold text-blue-600"
                        : "text-black"
                    }`}
                  >
                    <span
                      className={`w-3 h-3 rounded-full border-2 ${
                        question.answer === option
                          ? "bg-blue-600 border-blue-600"
                          : "border-gray-400"
                      }`}
                    />
                    <span>{option}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 text-sm text-black/70">
                <span className="mr-2 font-medium text-gray-900">Answer:</span>
                <span className="font-semibold text-blue-700">
                  {question.answer}
                </span>
              </div>
              {/*   action  button */}
              <button
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
                Delete
              </button>
              <button
                onClick={() => {
                  navigate(`/dashboard/exams/${exam_id}/questions/update`, {
                    state: question,
                  });
                }}
              >
                Update
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border-2 border-gray-900 rounded-2xl shadow-lg p-8 mt-8 text-center text-black/70">
          No questions are created yet.
        </div>
      )}
    </div>
  );
};

export default Questions;
