import { useDispatch, useSelector } from "react-redux";
import useFetchCourses from "../../hooks/useFetchCourses";
import { deleteBatch, getAllBatches } from "../../redux/slices/batchSlice";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, User, AlertCircle, BookOpen, Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Batches = () => {
  const [courses, isLoadingCourses] = useFetchCourses();
  const dispatch = useDispatch();
  const batches = useSelector((state) => state.batch.batches || []);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedCourseId) {
      dispatch(getAllBatches({ course_id: selectedCourseId })).then(
        (action) => {
          if (action.payload.success) {
            toast.success(action.payload.message);
          } else {
            toast.error(action.payload.message);
          }
        }
      );
    }
  }, [selectedCourseId, dispatch]);

  const buttonVariants = {
    hover: {
      scale: 1.05,
      y: -2,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
    tap: { scale: 0.95, y: 0 },
  };

  const cardVariants = {
    hover: {
      scale: 1.02,
      y: -4,
      boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
            <Layers className="w-8 h-8 text-purple-600" />
            Batches
          </h1>
          <p className="text-gray-600">
            Select a course to view its batches and enrolled students.
          </p>
        </div>

        {/* Course Selection Pills */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {isLoadingCourses ? (
            <div className="text-gray-500 italic">Loading courses...</div>
          ) : courses.length > 0 ? (
            courses.map((course) => (
              <motion.button
                key={course._id}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => setSelectedCourseId(course._id)}
                className={`px-5 py-2 rounded-full font-semibold text-sm transition-colors duration-200 shadow-md focus:outline-none
                  ${
                    selectedCourseId === course._id
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                  }
                `}
              >
                <BookOpen className="inline w-4 h-4 mr-1 -mb-[2px]" />
                {course.course_name.charAt(0).toUpperCase() +
                  course.course_name.slice(1)}
              </motion.button>
            ))
          ) : (
            <p className="text-gray-600 italic">No courses found.</p>
          )}
        </div>

        {/* Batches Grid */}
        {batches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            <AnimatePresence>
              {batches.map((batch) => (
                <motion.div
                  key={batch._id || batch.name}
                  variants={cardVariants}
                  whileHover="hover"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 flex flex-col"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-purple-600" />
                    {batch.name.charAt(0).toUpperCase() + batch.name.slice(1)}
                  </h3>
                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {batch.desc}
                  </p>

                  <div className="flex items-center text-gray-600 mb-4 font-semibold gap-2">
                    <User className="w-4 h-4" />
                    <span>
                      {batch.students.length}{" "}
                      {batch.students.length === 1 ? "Student" : "Students"}
                    </span>
                  </div>
                  <div className="mt-auto  pt-4 pb-6">
                    <div className="flex gap-2 justify-start">
                      <motion.button
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        onClick={() => {
                          navigate(`/dashboard/batches/${batch._id}/students`);
                        }}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
                      >
                        <Eye className="w-5 h-5" />
                        <span>View Students</span>
                      </motion.button>

                      <motion.button
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        onClick={() => {
                          dispatch(deleteBatch({ batch_id: batch._id })).then(
                            (action) => {
                              if (action.payload.success) {
                                toast.success(action.payload.message);
                              } else {
                                toast.error(action.payload.message);
                              }
                            }
                          );
                        }}
                        className="bg-red-100 hover:bg-red-200 text-red-700 py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center shadow-md hover:shadow-lg"
                        aria-label="Delete Batch"
                        title="Delete Batch"
                      >
                        <Trash2 className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : selectedCourseId ? (
          <div className="text-center py-20 text-gray-600 italic">
            No batches found for the selected course.
          </div>
        ) : (
          <div className="text-center py-20 text-gray-600 italic">
            Please select a course to view batches.
          </div>
        )}
      </div>
    </div>
  );
};

export default Batches;
