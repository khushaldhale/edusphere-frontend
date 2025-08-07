import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { examResults } from "../../redux/slices/examAttemptSlice";
import { useParams } from "react-router-dom";
import {
  ScrollText,
  Hash,
  Star,
  Timer,
  Calendar,
  CheckCircle,
  FileText,
  BookOpen,
  ClipboardCheck,
} from "lucide-react";

const ExamResult = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const exam_results = useSelector(
    (state) => state.exam_attempt.exam_results || []
  );

  useEffect(() => {
    dispatch(examResults({ student_id: params?.id }));
  }, [dispatch, params]);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8">
      <div className="max-w-4xl  mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-10 flex items-center  justify-center gap-3">
          <ScrollText className="w-8 h-8 text-blue-600" />
          Exam Results
        </h2>

        {exam_results.length > 0 ? (
          <div className="space-y-10">
            {exam_results.map((result, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                {/* Exam Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <ScrollText className="w-6 h-6 text-blue-600" />
                    <h3 className="text-xl font-semibold text-gray-900">
                      {result.exam_id.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <ClipboardCheck className="w-5 h-5 text-purple-600" />
                    <span className="font-semibold">Status:</span>
                    <span>{result.exam_attempt_status}</span>
                  </div>
                </div>
                {/* Exam overview with responsive layout */}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-gray-700 text-sm mb-6">
                  {/* Row 1: Total Marks & Marks Obtained side-by-side on sm+ */}
                  <div className="flex items-center gap-2">
                    <Hash className="w-5 h-5 text-orange-500" />
                    <span className="font-semibold">Total Marks:</span>
                    <span>{result.exam_id.total_marks}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-green-600" />
                    <span className="font-semibold">Marks Obtained:</span>
                    <span>{result.total_marks}</span>
                  </div>

                  {/* Row 2: Duration & Exam Date side-by-side on sm+ */}
                  <div className="flex items-center gap-2">
                    <Timer className="w-5 h-5 text-blue-500" />
                    <span className="font-semibold">Duration:</span>
                    <span>{result.exam_id.duration} min</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-green-600" />
                    <span className="font-semibold">Exam Date:</span>
                    <span>{result.exam_id.exam_date?.split("T")[0]}</span>
                  </div>

                  {/* You can keep Status on separate line or incorporate as you like */}
                </div>

                {/* Answers Section */}
                {result.answers && result.answers.length > 0 && (
                  <div className="mt-6 space-y-6">
                    <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                      Answers
                    </h4>
                    <ul className="space-y-5 max-h-96 overflow-y-auto pr-2">
                      {result.answers.map((answer, idx) => {
                        const isCorrect =
                          answer.answer?.trim()?.toLowerCase() ===
                          answer.question_id.answer?.trim()?.toLowerCase();
                        return (
                          <li
                            key={idx}
                            className="bg-gray-50 rounded-lg p-4 shadow-sm border border-gray-200"
                          >
                            <div className="flex justify-between items-start gap-3">
                              <div>
                                <p className="font-medium text-gray-900 mb-1">
                                  <FileText className="inline w-5 h-5 mr-2 text-purple-600" />
                                  {answer.question_id.question}
                                </p>
                                <p className="text-sm text-gray-700 mb-1">
                                  <span className="font-semibold">
                                    Correct Answer:
                                  </span>{" "}
                                  {answer.question_id.answer}
                                </p>
                                <p className="text-sm text-gray-700 mb-1">
                                  <span className="font-semibold">Marks:</span>{" "}
                                  {answer.question_id.marks}
                                </p>
                                <p className="text-sm text-gray-700">
                                  <span className="font-semibold">
                                    Answer Submitted:
                                  </span>{" "}
                                  {answer.answer}
                                </p>
                              </div>
                              <div className="flex items-center">
                                {isCorrect ? (
                                  <CheckCircle
                                    className="w-7 h-7 text-green-600"
                                    aria-label="Correct Answer"
                                  />
                                ) : (
                                  <CheckCircle
                                    className="w-7 h-7 text-red-600 rotate-45"
                                    aria-label="Incorrect Answer"
                                  />
                                )}
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center text-gray-500 font-semibold mt-20 select-none">
            No exams attempted yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamResult;
