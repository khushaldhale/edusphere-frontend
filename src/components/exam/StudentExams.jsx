import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { examsViaStudent } from "../../redux/slices/examSlice";
import { Clock, Play } from "lucide-react";
import { getSubjects } from "../../redux/slices/subjectSlice";
import { createExamAttempt } from "../../redux/slices/examAttemptSlice";
import { toast } from "react-toastify";

// Helper to format remaining time as mm:ss
const formatTime = (seconds) => {
  let min = Math.floor(seconds / 60);
  let sec = seconds % 60;
  return `${min} min ${sec < 10 ? "0" : ""}${sec} sec`;
};

const StudentExams = () => {
  const student_id = useParams().id;
  const exams = useSelector((state) => state.exam.exams_students || []);
  const dispatch = useDispatch();
  const subjects = useSelector((state) => state.subject.subjects);
  const navigate = useNavigate();

  const [, setTick] = useState(0);
  useEffect(() => {
    dispatch(examsViaStudent({ student_id }));
  }, [dispatch, student_id]);
  useEffect(() => {
    const timer = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    if (exams.length > 0) {
      dispatch(getSubjects({ course_id: exams[0]?.course }));
    }
  }, [exams]);

  const current_date = new Date();

  return (
    <div className="space-y-6 py-19 px-5 sm:px-10 md:px-25 bg-gray-50 rounded-md">
      {exams.length > 0 ? (
        exams.map((exam, index) => {
          const examDate = new Date(exam.exam_date);
          const examStartPlus5 = new Date(examDate.getTime() + 5 * 60000);
          const examEnd = new Date(examDate.getTime() + exam.duration * 60000);

          // Timer calculations
          const secondsUntilStart = Math.floor(
            (examDate - current_date) / 1000
          );

          // Window flags
          const isBeforeStart = current_date < examDate;
          const isInFirst5Minutes =
            current_date >= examDate && current_date < examStartPlus5;
          const isAfter5Minutes =
            current_date >= examStartPlus5 && current_date <= examEnd;
          const isDuringExam =
            current_date >= examDate && current_date <= examEnd;
          const isAfterEnd = current_date > examEnd;

          // For upcoming countdown
          const showUpcoming = isBeforeStart;
          const showCountdown =
            showUpcoming && secondsUntilStart <= 900 && secondsUntilStart > 0;

          return (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-5 border border-gray-200"
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {exam.name}
              </h3>
              <p className="text-gray-700 mb-1">{exam.desc}</p>
              <p className="text-gray-700 mb-1">
                <strong>Total Marks:</strong> {exam.total_marks}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Duration:</strong> {exam.duration} minutes
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Exam Date & Time:</strong>{" "}
                {examDate.toLocaleDateString()}{" "}
                {examDate.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Subject:</strong>{" "}
                {subjects.length > 0 &&
                  subjects.find((sub) => sub._id === exam.subject)?.name}
              </p>

              {/* UPCOMING */}
              {showUpcoming && (
                <>
                  <button
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md font-medium"
                    aria-label="Upcoming Exam"
                    disabled
                  >
                    <Clock className="w-5 h-5" />
                    Upcoming Exam
                  </button>
                  {showCountdown && (
                    <div className="mt-2 text-blue-700 font-semibold">
                      Exam starts in {formatTime(secondsUntilStart)}
                    </div>
                  )}
                </>
              )}

              {/* EXAM ACTIVE: Start/Reattempt button (enabled) + Ongoing marker */}
              {isDuringExam && (
                <div className="flex items-center gap-4">
                  <button
                    className={`flex items-center gap-2 ${
                      isInFirst5Minutes
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-purple-600 hover:bg-purple-700"
                    } text-white px-4 py-2 rounded-md font-medium`}
                    aria-label={
                      isInFirst5Minutes ? "Start Exam" : "Reattempt Exam"
                    }
                    onClick={() => {
                      dispatch(createExamAttempt({ exam_id: exam._id })).then(
                        (action) => {
                          if (action.payload.success) {
                            toast.success(action.payload.message);
                            navigate(`/dashboard/exams/${exam._id}/conduct`, {
                              state: {
                                duration: exam.duration,
                                exam_date: exam.exam_date,
                              },
                            });
                          } else {
                            toast.error(action.payload.message);
                          }
                        }
                      );
                    }}
                  >
                    <Play className="w-5 h-5" />
                    {isInFirst5Minutes ? "Start Exam" : "Reattempt Exam"}
                  </button>
                  {/* Ongoing marker */}
                  <div className="flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-md font-medium w-max">
                    <Clock className="w-5 h-5" />
                    Exam Ongoing
                  </div>
                </div>
              )}

              {/* CONDUCTED */}
              {isAfterEnd && (
                <button
                  className="flex items-center gap-2 bg-gray-400 text-white px-4 py-2 rounded-md font-medium cursor-not-allowed"
                  aria-label="Exam Conducted"
                  disabled
                >
                  Exam Already Conducted
                </button>
              )}
            </div>
          );
        })
      ) : (
        <p className="text-gray-500 text-center">No Exam is created yet.</p>
      )}
    </div>
  );
};

export default StudentExams;
