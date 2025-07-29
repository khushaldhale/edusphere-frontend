import { useDispatch, useSelector } from "react-redux";
import useFetchCourses from "../../hooks/useFetchCourses";
import { deleteBatch, getAllBatches } from "../../redux/slices/batchSlice";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, User, AlertCircle, BookOpen, Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";

const Batches = () => {
  const [courses, isLoadingCourses] = useFetchCourses();
  const dispatch = useDispatch();
  const batches = useSelector((state) => state.batch.batches || []);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const navigate = useNavigate();
  const isLoading = useSelector((state) => {
    return state.batch.isLoading;
  });

  //  whenver the user selects course.
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

  useEffect(() => {
    if (courses.length > 0) {
      dispatch(getAllBatches({ course_id: courses[0]._id })).then((action) => {
        if (action.payload.success) {
          setSelectedCourseId(courses[0]._id);
          toast.success(action.payload.message);
        } else {
          toast.error(action.payload.message);
        }
      });
    }
  }, [courses]);

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

  if (isLoading || isLoadingCourses) {
    return <Loading></Loading>;
  }

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
                className={`px-5 p-4 font-semibold text-sm transition-colors duration-200 shadow-md focus:outline-none
                  ${
                    selectedCourseId === course._id
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                  }
                `}
              >
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
          <div className="my-10 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            <AnimatePresence>
              {batches.length > 0 ? (
                batches.map((batch) => (
                  <motion.div
                    key={batch._id || batch.name}
                    variants={cardVariants} // Use the same Subject Card motion variants
                    whileHover="hover"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      width: "100%",
                    }}
                    className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden group relative p-6"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Layers className="text-purple-600 w-5 h-5 flex-shrink-0" />
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                          {batch.name.charAt(0).toUpperCase() +
                            batch.name.slice(1)}
                        </h3>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed mb-4">
                      {batch.desc &&
                        batch.desc.charAt(0).toUpperCase() +
                          batch.desc.slice(1)}
                    </p>

                    <div className="flex items-center text-gray-600 font-semibold gap-2 mb-4">
                      <User className="w-4 h-4" />
                      <span>
                        {batch.students.length}{" "}
                        {batch.students.length === 1 ? "Student" : "Students"}
                      </span>
                    </div>

                    <div className="flex gap-2 pt-4 border-t border-gray-100">
                      <motion.button
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        onClick={() => {
                          navigate(`/dashboard/batches/${batch._id}/students`);
                        }}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg text-sm"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View Students</span>
                      </motion.button>
                      <motion.button
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        className="bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center shadow-md hover:shadow-lg text-sm"
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
                        aria-label="Delete Batch"
                        title="Delete Batch"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <p className="text-center text-gray-600 col-span-full py-8">
                  No Batch is created yet.
                </p>
              )}
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
