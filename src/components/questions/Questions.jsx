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
    <div className="max-w-3xl mx-auto py-10 px-4">
      {/* Improved Header */}
      <div className="mb-12 border-b border-gray-300 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
              Questions
            </h1>
            <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full shadow">
              {questions?.length ?? 0}
            </span>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold shadow-md transition 
            ${
              showForm
                ? "bg-gray-900 hover:bg-blue-700 text-white"
                : "bg-blue-600 hover:bg-blue-800 text-white"
            }
          `}
            aria-label={
              showForm ? "Cancel adding question" : "Add a new question"
            }
            type="button"
          >
            {showForm ? (
              "Cancel"
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add Question
              </>
            )}
          </button>
        </div>

        {showForm && (
          <p className="mt-3 text-gray-600 max-w-lg">
            Fill out the question form below to add a new question.
          </p>
        )}
      </div>

      {/* The rest of your component */}
      {showForm && (
        <div className="mb-10">
          <CreateQuestion setShowForm={setShowForm} exam_id={exam_id} />
        </div>
      )}

      {questions && questions.length > 0 ? (
        <div className="flex flex-col gap-6">
          {questions.map((question, idx) => (
            <QuestionCard key={idx} question={question} idx={idx} />
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
