import { useNavigate, useParams } from "react-router-dom";
import CreateQuestion from "./CreateQuestion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteQuestion, getQuestions } from "../../redux/slices/questionSlice";
import Loading from "../Loading";
import QuestionCard from "./QuestionCard";

const Questions = () => {
  const params = useParams();
  const exam_id = params.id;
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.question.questions);
  const navigate = useNavigate();
  const isLoading = useSelector((state) => {
    return state.question.isLoading;
  });

  useEffect(() => {
    dispatch(getQuestions({ exam_id }));
    // eslint-disable-next-line
  }, [dispatch, exam_id]);

  if (isLoading) {
    return <Loading></Loading>;
  }

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
            <QuestionCard
              key={idx}
              question={question}
              idx={idx}
            ></QuestionCard>
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
