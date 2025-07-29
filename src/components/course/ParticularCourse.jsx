import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getParticularCourse } from "../../redux/slices/courseSlice";
import {
  BookOpen,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  FileText,
} from "lucide-react";

const ParticularCourse = () => {
  const dispatch = useDispatch();
  const particular_course = useSelector(
    (state) => state.course.particular_course
  );

  // To track which subject is expanded
  const [openSubjectIndex, setOpenSubjectIndex] = useState(null);

  useEffect(() => {
    dispatch(getParticularCourse());
  }, [dispatch]);

  if (!particular_course)
    return (
      <div className="max-w-2xl mx-auto mt-12 p-8 bg-white border border-gray-200 rounded-xl shadow text-gray-700 text-center font-medium">
        You are not enrolled in any course yet.
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Course Details */}
      <div className="bg-white border-2 border-gray-200 rounded-2xl shadow p-6 mb-8">
        <h2 className="text-2xl font-bold flex items-center gap-3 text-blue-700 mb-1">
          {/* <BookOpen className="w-7 h-7 text-blue-700" /> */}
          <GraduationCap className="w-7 h-7 text-blue-700" />
          {particular_course.course_name}
        </h2>
        <p className="text-gray-700 mb-1">{particular_course.course_desc}</p>
        <p className="text-sm font-semibold text-gray-600">
          Duration:{" "}
          <span className="text-gray-900">
            {particular_course.duration} Months
          </span>
        </p>
      </div>
      {/* Subjects List */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Subjects</h3>
        <div className="flex flex-col gap-4">
          {particular_course?.subjects?.length ? (
            particular_course.subjects.map((subject, sIdx) => (
              <div
                key={sIdx}
                className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-md transition-shadow"
              >
                {/* Subject Header */}
                <button
                  type="button"
                  className="w-full flex justify-between items-center py-4 px-6 cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-400 rounded-xl transition"
                  onClick={() =>
                    setOpenSubjectIndex(openSubjectIndex === sIdx ? null : sIdx)
                  }
                  aria-expanded={openSubjectIndex === sIdx}
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-blue-500" />
                    <span className="text-base font-medium text-gray-900">
                      {subject.name}
                    </span>
                  </div>
                  {openSubjectIndex === sIdx ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {/* Topics (Expand/Collapse) */}
                {openSubjectIndex === sIdx && (
                  <div className="border-t border-gray-100 bg-gray-50 px-7 py-4 animate-fade-in">
                    {subject.topics?.length ? (
                      <ul className="space-y-3">
                        {subject.topics.map((topic, tIdx) => (
                          <li
                            key={tIdx}
                            className="flex items-center justify-between py-2 px-2 rounded hover:bg-white transition"
                          >
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-blue-400" />
                              <span className="text-gray-800">
                                {topic.name}
                              </span>
                            </div>
                            {topic.notes_pdf && (
                              <a
                                href={topic.notes_pdf}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-blue-600 hover:underline text-xs font-semibold"
                              >
                                <FileText className="w-4 h-4" />
                                Notes
                              </a>
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-gray-500 text-sm italic py-4">
                        No topics in this subject.
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-gray-500 text-center py-8">
              No subjects found in this course.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParticularCourse;
