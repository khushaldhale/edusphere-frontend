import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { getQuestions } from "../../redux/slices/questionSlice";
import {
  getExamAttempted,
  submitExam,
} from "../../redux/slices/examAttemptSlice";
import { toast } from "react-toastify";
import { submitAnswer } from "../../redux/slices/answerSlice";

const formatTime = (seconds) => {
  if (seconds <= 0) return "00:00";
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};

const StudentQuestions = () => {
  const exam_id = useParams().id;
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.question.questions || []);
  const locationState = useLocation().state || {};
  const { duration, exam_date } = locationState;
  const exam_attempted = useSelector(
    (state) => state.exam_attempt.exam_attempted
  );
  //  ref for  counting tab switch
  const switchCountRef = useRef(0);

  // State for remaining time in seconds
  const [remainingTime, setRemainingTime] = useState(0);
  // State for exam submitted due to time up or manual submit
  const [isSubmitted, setIsSubmitted] = useState(false);
  // State for showing confirm submit popup
  const [confirmPopupVisible, setConfirmPopupVisible] = useState(false);
  // State for showing submitted popup after submission
  const [submittedPopupVisible, setSubmittedPopupVisible] = useState(false);

  // Calculate exam end time once
  const examEndTime = React.useMemo(() => {
    if (!exam_date || !duration) return null;
    return new Date(new Date(exam_date).getTime() + duration * 60000);
  }, [exam_date, duration]);

  // Fetch questions on mount
  useEffect(() => {
    dispatch(getQuestions({ exam_id }));
  }, [dispatch, exam_id]);

  // Fetch exam attempt info on mount
  useEffect(() => {
    dispatch(getExamAttempted({ exam_id }));
  }, [dispatch, exam_id]);

  // Set isSubmitted if exam was already submitted (fix infinite re-render)
  useEffect(() => {
    if (exam_attempted?.exam_attempt_status === "submitted") {
      setIsSubmitted(true);
      setSubmittedPopupVisible(true);
    }
  }, [exam_attempted]);

  // Countdown timer effect
  useEffect(() => {
    if (!examEndTime || isSubmitted) return;

    const timerId = setInterval(() => {
      const now = new Date();
      const diffSeconds = Math.floor((examEndTime - now) / 1000);

      if (diffSeconds <= 0) {
        setRemainingTime(0);
        setIsSubmitted(true); // Auto submit on time end
        setSubmittedPopupVisible(true);
        clearInterval(timerId);
      } else {
        setRemainingTime(diffSeconds);
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, [examEndTime, isSubmitted]);

  // Handler for Submit Exam button click - show popup
  const handleSubmitClick = () => {
    setConfirmPopupVisible(true);
  };

  // Confirm submission handler
  const handleConfirmSubmit = () => {
    setIsSubmitted(true);
    setConfirmPopupVisible(false);
    setSubmittedPopupVisible(true);

    // Dispatch submitExam with exam_attempt_id and show toast based on result
    dispatch(submitExam({ exam_attempt_id: exam_attempted._id })).then(
      (action) => {
        if (action.payload.success) {
          toast.success(action.payload.message);
        } else {
          toast.error(action.payload.message);
        }
      }
    );
  };

  // Cancel submission handler
  const handleCancelSubmit = () => {
    setConfirmPopupVisible(false);
  };

  // Close submission acknowledgement popup handler
  const handleCloseSubmittedPopup = () => {
    setSubmittedPopupVisible(false);
    // Optionally, redirect user or do other actions here
  };

  // Answer selection handler
  const answerHandler = ({ answer, question_id }) => {
    dispatch(
      submitAnswer({
        answer,
        question_id,
        exam_attempted_id: exam_attempted._id,
      })
    ).then((action) => {
      if (action.payload.success) {
        toast.success(action.payload.message);
      } else {
        toast.error(action.payload.message);
      }
    });
  };

  // handling tab switch
  useEffect(() => {
    // Load previous count from localStorage if available
    const savedCount = parseInt(localStorage.getItem("switchCount") || "0");
    switchCountRef.current = savedCount;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        switchCountRef.current += 1;
        localStorage.setItem("switchCount", switchCountRef.current);

        alert(`⚠️ Tab switch detected! Count: ${switchCountRef.current}`);

        if (switchCountRef.current >= 3) {
          alert("🚫 Disqualified due to multiple tab switches!");

          // Clear the counter so future exams don't get affected
          localStorage.removeItem("switchCount");

          // Perform disqualification logic here (submit or redirect)
          // For example:
          // dispatch(disqualifyExam(exam_attempted._id));
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      localStorage.removeItem("switchCount"); // Clear on unmount to avoid leak
    };
  }, [isSubmitted]);

  if (!exam_attempted?._id) {
    return (
      <div className="text-center p-10 text-red-600">
        You are late for the examination.
      </div>
    );
  }

  return (
    <div className="flex flex-col my-20 gap-6 max-w-4xl mx-auto px-4">
      {/* Ticker at top */}
      <div className="sticky top-0 bg-white z-10 p-4 border-b border-gray-300 flex justify-center items-center text-lg font-semibold text-gray-900">
        {!isSubmitted ? (
          <>
            Time Remaining:{" "}
            <span className="ml-1 text-red-600 font-mono text-xl">
              {formatTime(remainingTime)}
            </span>
          </>
        ) : (
          <span className="text-green-600">Exam Submitted. Thank you.</span>
        )}
      </div>

      {/* Questions list or message */}
      {!isSubmitted &&
        (questions.length > 0 ? (
          questions.map((question, idx) => (
            <div
              key={question._id || idx}
              className="select-none bg-white border-2 mx-5 sm:mx-10 md:mx-25 border-gray-300 rounded-2xl shadow-md p-6"
            >
              <div className="flex items-center mb-3">
                <span className="text-lg font-semibold text-gray-900">{`Q${
                  idx + 1
                }.`}</span>
                <p className="ml-3 text-gray-900 flex-1">{question.question}</p>
                <span className="ml-auto bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">{`${question.marks} Marks`}</span>
              </div>

              <form>
                <div className="flex flex-col gap-3">
                  {question.options.map((option, optionIdx) => (
                    <label
                      key={optionIdx}
                      htmlFor={`q${idx}-option${optionIdx}`}
                      className="flex items-center gap-3 cursor-pointer select-none"
                    >
                      <input
                        id={`q${idx}-option${optionIdx}`}
                        name={`answer-${idx}`}
                        type="radio"
                        value={option}
                        className="peer hidden"
                        disabled={isSubmitted} // disable inputs if submitted
                        onChange={() =>
                          answerHandler({
                            answer: option,
                            question_id: question._id,
                          })
                        }
                      />
                      {/* Custom radio circle */}
                      <span className="w-5 h-5 inline-block rounded-full border-2 border-gray-400 peer-checked:border-blue-600 peer-checked:bg-blue-600 transition-colors"></span>
                      <span className="text-gray-800">{option}</span>
                    </label>
                  ))}
                </div>
              </form>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center mt-10">No questions found.</p>
        ))}

      {/* Submit Button - disabled if already submitted */}
      {!isSubmitted && (
        <div className="mx-auto mt-6">
          <button
            type="button"
            onClick={handleSubmitClick}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md font-medium transition"
          >
            Submit Exam
          </button>
        </div>
      )}

      {/* Confirmation Popup */}
      {confirmPopupVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Submit Exam?</h2>
            <p className="mb-6">
              Are you sure you want to submit your exam? You won't be able to
              change your answers afterward.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleCancelSubmit}
                className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSubmit}
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Exam Submitted Popup */}
      {isSubmitted && submittedPopupVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Exam Submitted</h2>
            <p className="mb-6">Thank you for completing the exam.</p>
            <div className="flex justify-end">
              <button
                onClick={handleCloseSubmittedPopup}
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentQuestions;
