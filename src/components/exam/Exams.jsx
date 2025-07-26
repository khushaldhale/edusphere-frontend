import { useDispatch, useSelector } from "react-redux";
import { ScrollText, ListChecks, Hash, Timer, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { clear_exams, deleteExam } from "../../redux/slices/examSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ExamFilter from "./ExamFilter";
import { motion } from "framer-motion";
import { Edit3, Trash2, Eye } from "lucide-react";
import Loading from "../Loading";

const Exams = () => {
  const dispatch = useDispatch();
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const exams = useSelector((state) => state.exam.exams);
  const navigate = useNavigate();
  const subjects = useSelector((state) => {
    return state.subject.subjects;
  });
  const isLoading = useSelector((state) => state.exam.isLoading);

  useEffect(() => {
    dispatch(clear_exams());
  }, []);

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-900 mb-8 flex  jts items-center gap-3">
          Exams
        </h1>

        {/* Select Filters */}
        <ExamFilter
          selectedBatch={selectedBatch}
          setSelectedBatch={setSelectedBatch}
          selectedCourse={selectedCourse}
          setSelectedCourse={setSelectedCourse}
          exams={exams}
        ></ExamFilter>

        {/* Exams List */}
        {exams.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {exams.map((exam) => (
              <div
                key={exam._id}
                className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 flex flex-col"
              >
                <div className="flex items-center gap-2 mb-3">
                  <ScrollText className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-bold text-gray-900">
                    {exam.name}
                  </h2>
                </div>
                <p className="text-gray-700 mb-3">{exam.desc}</p>
                <div className="flex flex-col gap-2 text-gray-700 text-sm mb-1">
                  <div className="flex items-center gap-2">
                    <Hash className="w-4 h-4 text-orange-500" />
                    <span className="font-semibold">Total Marks:</span>{" "}
                    {exam.total_marks}
                  </div>
                  <div className="flex items-center gap-2">
                    <Timer className="w-4 h-4 text-blue-500" />
                    <span className="font-semibold">Duration:</span>{" "}
                    {exam.duration} min
                  </div>
                  <div className="flex items-center gap-2">
                    <ListChecks className="w-4 h-4 text-purple-500" />
                    <span className="font-semibold">Subject:</span>{" "}
                    {
                      subjects.find((subject) => {
                        if (subject._id === exam.subject) {
                          return true;
                        }
                      }).name
                    }
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-green-600" />
                    <span className="font-semibold">Exam Date:</span>{" "}
                    {exam.exam_date?.split("T")[0]}
                  </div>
                </div>
                {/*  action buttons */}
                <div className="px-4 pt-4 mt-auto">
                  {/* Add Students - Full width primary button */}
                  <motion.button
                    whileHover="hover"
                    whileTap="tap"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg text-sm mb-3"
                    onClick={() => {
                      navigate(`/dashboard/exams/${exam._id}/questions`, {
                        state: { exam_id: exam._id },
                      });
                    }}
                  >
                    <Eye className="w-4 h-4" />
                    <span>Add Questions</span>
                  </motion.button>

                  {/* Row of Update & Delete buttons */}
                  <div className="flex items-center gap-3">
                    <motion.button
                      whileHover="hover"
                      whileTap="tap"
                      onClick={() => {
                        navigate("/dashboard/exams/update", { state: exam });
                      }}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-1 shadow-md hover:shadow-lg text-sm"
                      aria-label="Update Exam"
                    >
                      <Edit3 className="w-4 h-4" />
                      <span>Update</span>
                    </motion.button>

                    <motion.button
                      whileHover="hover"
                      whileTap="tap"
                      onClick={() => {
                        dispatch(deleteExam({ exam_id: exam._id })).then(
                          (action) => {
                            if (action.payload.success) {
                              toast.success(action.payload.message);
                            } else {
                              toast.error(action.payload.message);
                            }
                          }
                        );
                      }}
                      className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-1 shadow-md hover:shadow-lg text-sm"
                      aria-label="Delete Exam"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 text-gray-600 italic text-lg">
            {selectedBatch
              ? "No exams found for this batch."
              : "First select a course and batch to view exams."}
          </div>
        )}
      </div>
    </div>
  );
};

export default Exams;
