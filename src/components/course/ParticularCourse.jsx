import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getParticularCourse } from "../../redux/slices/courseSlice";
import {
  BookOpen,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  FileText,
  BookOpenCheck,
} from "lucide-react";
import { Card, CardHeader, CardContent } from "../home/Card";

const ParticularCourse = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.course.data);
  const particular_course = data?.course;
  const enrollment = data?.enrollment;

  // To track which subject is expanded
  const [openSubjectIndex, setOpenSubjectIndex] = useState(null);
  const [openTopicIdx, setOpenTopicIdx] = useState(null);

  useEffect(() => {
    dispatch(getParticularCourse());
  }, [dispatch]);

  if (!particular_course)
    return (
      <div className="max-w-2xl mx-auto mt-12 p-8 bg-white border border-gray-200 rounded-xl shadow-sm text-gray-700 text-center font-medium">
        You are not enrolled in any course yet.
      </div>
    );

  return (
    <div className="max-w-full mx-auto p-6 min-h-screen bg-gray-50">
      {/* Combined Course + Enrollment Card */}
      <Card className="mb-8 mx-auto max-w-5xl shadow-sm rounded-2xl border-2 border-gray-200 p-6 bg-white">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ">
          <div className="flex items-center gap-3 text-blue-700">
            <GraduationCap className="w-7 h-7" />
            <h2 className="text-2xl font-bold text-gray-900">
              {particular_course.course_name}
            </h2>
          </div>
          <p className="text-gray-900 font-semibold text-lg">
            Duration:{" "}
            <span className="font-normal">
              {particular_course.duration} months
            </span>
          </p>
        </CardHeader>

        <CardContent className="text-gray-700 space-y-4">
          {enrollment ? (
            <>
              <p>
                <strong>Mode of Payment:</strong>{" "}
                {enrollment.is_lumpsum
                  ? "Lumpsum (Full Payment)"
                  : "Installment"}
              </p>
              <p>
                <strong>Amount Paid:</strong> {enrollment.amount_paid}
              </p>
              <p>
                <strong>Enrollment Date:</strong>{" "}
                {enrollment?.enrollment_date?.split("T")[0]}
              </p>

              {enrollment.is_lumpsum ? (
                <>
                  <p>
                    <strong>Payment Mode:</strong> {enrollment.payment_mode}
                  </p>
                  {enrollment.payment_mode !== "Cash" && (
                    <p>
                      <strong>Transaction ID:</strong>{" "}
                      {enrollment.transaction_id}
                    </p>
                  )}
                </>
              ) : (
                <div className="space-y-4">
                  {enrollment.installment_info.map((installment, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                    >
                      <p>
                        <strong>Installment Number:</strong>{" "}
                        {installment.installment_number}
                      </p>
                      <p>
                        <strong>Due Date:</strong>{" "}
                        {installment.due_date?.split("T")[0]}
                      </p>
                      <p>
                        <strong>Amount:</strong> {installment.amount}
                      </p>
                      <p>
                        <strong>Status:</strong>{" "}
                        {installment.is_paid ? (
                          <span className="text-green-600 font-semibold">
                            Paid
                          </span>
                        ) : (
                          <span className="text-red-600 font-semibold">
                            Unpaid
                          </span>
                        )}
                      </p>
                      {installment.is_paid && (
                        <>
                          <p>
                            <strong>Paid On:</strong> {installment.paid_on}
                          </p>
                          <p>
                            <strong>Payment Mode:</strong> {installment.mode}
                          </p>
                          {installment.mode !== "Cash" && (
                            <p>
                              <strong>Transaction ID:</strong>{" "}
                              {installment.transaction}
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <p className="text-gray-500 text-center font-medium">
              Enrollment details are not available.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Improved Subjects & Topics with Assignments-style styling */}
      <div>
        <h3 className="text-xl text-center font-semibold text-gray-900 mb-6 border-b border-gray-300 pb-2">
          Subjects
        </h3>
        <div className="space-y-6 max-w-5xl mx-auto">
          {particular_course?.subjects?.length ? (
            particular_course.subjects.map((subject, sIdx) => (
              <div
                key={sIdx}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                {/* Subject Header */}
                <button
                  type="button"
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                  onClick={() =>
                    setOpenSubjectIndex(openSubjectIndex === sIdx ? null : sIdx)
                  }
                  aria-expanded={openSubjectIndex === sIdx}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {subject.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {subject.topics?.length || 0} topics available
                      </p>
                    </div>
                  </div>
                  {openSubjectIndex === sIdx ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>

                {/* Topics List */}
                {openSubjectIndex === sIdx && (
                  <div className="border-t border-gray-200 bg-gray-50">
                    {!subject.topics || subject.topics.length === 0 ? (
                      <div className="px-6 py-8 text-center">
                        <BookOpenCheck className="w-8 h-8 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500 font-medium">
                          No topics available in this subject.
                        </p>
                        <p className="text-gray-400 text-sm">
                          No topics have been created for this subject yet.
                        </p>
                      </div>
                    ) : (
                      <div className="p-6 space-y-4">
                        {subject.topics.map((topic, tIdx) => (
                          <div
                            key={tIdx}
                            className="bg-white rounded-lg border border-gray-200 overflow-hidden"
                          >
                            {/* Topic Header */}
                            <button
                              type="button"
                              className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                              onClick={() =>
                                setOpenTopicIdx(
                                  openTopicIdx === `${sIdx}_${tIdx}`
                                    ? null
                                    : `${sIdx}_${tIdx}`
                                )
                              }
                              aria-expanded={openTopicIdx === `${sIdx}_${tIdx}`}
                            >
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                  <BookOpenCheck className="w-4 h-4 text-green-600" />
                                </div>
                                <span className="font-medium text-gray-900 truncate">
                                  {topic.name}
                                </span>
                              </div>
                              {openTopicIdx === `${sIdx}_${tIdx}` ? (
                                <ChevronUp className="w-4 h-4 text-gray-400" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-gray-400" />
                              )}
                            </button>

                            {/* Topic Content */}
                            {openTopicIdx === `${sIdx}_${tIdx}` && (
                              <div className="border-t border-gray-200 p-4 bg-gray-50">
                                {/* Put any detailed topic content here */}
                                {topic.notes_pdf && (
                                  <a
                                    href={topic.notes_pdf}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-blue-600 hover:underline text-sm font-semibold"
                                    aria-label={`View notes for ${topic.name}`}
                                  >
                                    <FileText className="w-5 h-5" />
                                    View Notes
                                  </a>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-gray-500 text-center py-8 font-medium">
              No subjects found in this course.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParticularCourse;
