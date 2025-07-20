import { useDispatch, useSelector } from "react-redux";
import useFetchCourses from "../../hooks/useFetchCourses";
import { deleteSubject, getSubjects } from "../../redux/slices/subjectSlice";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Edit3, Eye, Trash2, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Subjects = () => {
  const dispatch = useDispatch();
  const [courses, isLoading] = useFetchCourses();
  const subjects = useSelector((state) => state.subject.subjects);
  const navigate = useNavigate();

  const changeHandler = (event) => {
    dispatch(getSubjects({ course_id: event.target.value })).then((action) => {
      if (action.payload.success) {
        toast.success(action.payload.message);
      } else {
        toast.error(action.payload.message);
      }
    });
  };

  const buttonVariants = {
    hover: {
      scale: 1.02,
      y: -1,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
    tap: { scale: 0.98, y: 0 },
  };

  const cardHoverVariants = {
    hover: {
      y: -4,
      scale: 1.02,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  const delete_subject = (subject_id) => {
    dispatch(deleteSubject({ subject_id })).then((action) => {
      if (action.payload.success) {
        toast.success(action.payload.message);
      } else {
        toast.error(action.payload.message);
      }
    });
  };

  const update_subject = (subject) => {
    navigate("/dashboard/subject/edit", {
      state: subject,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Subjects
          </h1>
        </motion.div>

        {/* Select Dropdown */}
        <div className="mb-10 max-w-md mx-auto">
          <select
            name="course_id"
            id="course_id"
            onChange={changeHandler}
            className="w-full py-2 px-4 rounded-lg shadow border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.course_name}
              </option>
            ))}
          </select>
        </div>

        {/* Subject Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {subjects.length > 0 &&
              subjects.map((sub) => (
                <motion.div
                  key={sub._id}
                  variants={cardHoverVariants}
                  whileHover="hover"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden group"
                >
                  <div className="p-6 pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <FileText className="text-blue-600 w-5 h-5" />
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                          {sub.name.charAt(0).toUpperCase() + sub.name.slice(1)}
                        </h3>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                      {sub.desc.charAt(0).toUpperCase() + sub.desc.slice(1)}
                    </p>
                  </div>

                  <div className="px-6 pb-6">
                    <div className="flex gap-2">
                      <motion.button
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
                      >
                        <Eye className="w-4 h-4" />
                        <span
                          onClick={() => {
                            navigate("/dashboard/topics", {
                              state: sub._id,
                            });
                          }}
                        >
                          View Topics
                        </span>
                      </motion.button>

                      <motion.button
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center shadow-md hover:shadow-lg"
                        onClick={() => {
                          update_subject(sub);
                        }}
                      >
                        <Edit3 className="w-4 h-4" />
                      </motion.button>

                      <motion.button
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        className="bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center shadow-md hover:shadow-lg"
                        onClick={() => {
                          delete_subject(sub._id);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {subjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="text-gray-400 w-8 h-8" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              No subjects found
            </h3>
            <p className="text-gray-600">
              Please select a course to view its subjects.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Subjects;
