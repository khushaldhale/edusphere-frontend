import { useDispatch } from "react-redux";
import { deleteCourse } from "../../redux/slices/courseSlice";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Clock,
  DollarSign,
  Users,
  Edit3,
  Trash2,
  Eye,
  Percent,
} from "lucide-react";
import useFetchCourses from "../../hooks/useFetchCourses";

const Courses = () => {
  const dispatch = useDispatch();

  const [courses, isLoading] = useFetchCourses();

  const buttonVariants = {
    hover: {
      scale: 1.02,
      y: -1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    tap: {
      scale: 0.98,
      y: 0,
    },
  };

  const cardHoverVariants = {
    hover: {
      y: -4,
      scale: 1.02,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const getStatusColor = (status) => {
    return status === "active"
      ? "bg-green-100 text-green-800 border-green-200"
      : "bg-yellow-100 text-yellow-800 border-yellow-200";
  };

  const delete_course = (course_id) => {
    dispatch(deleteCourse({ course_id })).then((action) => {
      if (action.payload.success) {
        toast.success(action.payload.message);
      } else {
        toast.error(action.payload.message);
      }
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Loading Courses...
          </h2>
          <p className="text-gray-600">
            Please wait while we fetch your courses
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="relative inline-block">
            {/* Background decoration */}
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Courses
            </h1>
          </div>
        </motion.div>

        {/* Courses Grid */}
        {courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            <AnimatePresence>
              {courses.map((course) => (
                <motion.div
                  key={course._id}
                  variants={cardHoverVariants}
                  whileHover="hover"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden group cursor-pointer"
                >
                  {/* Course Header */}
                  <div className="p-6 pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                              course.status || "active"
                            )}`}
                          >
                            {course.status || "Active"}
                          </span>
                          {course.is_installments && (
                            <span className="px-3 py-1 rounded-full text-xs font-semibold border bg-blue-100 text-blue-800 border-blue-200">
                              Installments
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                          {course.course_name.charAt(0).toUpperCase() +
                            course.course_name.slice(1)}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                          {course.course_desc.charAt(0).toUpperCase() +
                            course.course_desc.slice(1)}
                        </p>
                      </div>
                    </div>

                    {/* Course Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-4 h-4 mr-2 text-blue-500" />
                        <span className="text-sm font-medium">
                          {course.duration} months
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <DollarSign className="w-4 h-4 mr-2 text-green-500" />
                        <span className="text-sm font-medium">
                          ₹{course.total_fee?.toLocaleString()}
                        </span>
                      </div>
                      {course.is_installments && (
                        <div className="flex items-center text-gray-600">
                          <Users className="w-4 h-4 mr-2 text-purple-500" />
                          <span className="text-sm font-medium">
                            {course.installment_numbers} installments
                          </span>
                        </div>
                      )}
                      {course.discount_allowed && (
                        <div className="flex items-center text-gray-600">
                          <Percent className="w-4 h-4 mr-2 text-orange-500" />
                          <span className="text-sm font-medium">
                            {course.discount_per}% discount
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Installment Breakdown */}
                    {course.installment_breakdown &&
                      course.installment_breakdown.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-gray-700 mb-2">
                            Payment Schedule:
                          </h4>
                          <div className="space-y-1">
                            {course.installment_breakdown
                              .slice(0, 2)
                              .map((installment, index) => (
                                <div
                                  key={index}
                                  className="flex justify-between text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded"
                                >
                                  <span>₹{installment.amount}</span>
                                  <span>
                                    Due in {installment.due_in_days} days
                                  </span>
                                </div>
                              ))}
                            {course.installment_breakdown.length > 2 && (
                              <div className="text-xs text-gray-500 text-center">
                                +{course.installment_breakdown.length - 2} more
                                installments
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                  </div>

                  {/* Action Buttons */}
                  <div className="px-6 pb-6">
                    <div className="flex gap-2">
                      <motion.button
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View</span>
                      </motion.button>

                      <motion.button
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center shadow-md hover:shadow-lg"
                      >
                        <Edit3 className="w-4 h-4" />
                      </motion.button>

                      <motion.button
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        className="bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center shadow-md hover:shadow-lg"
                        onClick={() => {
                          console.log("cloked");
                          delete_course(course._id);
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
        ) : (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6"></div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              {courses?.length === 0
                ? "No courses created yet."
                : "No courses found"}
            </h3>
            <p className="text-gray-600 mb-6">
              {courses?.length === 0
                ? "Start by creating your first course to see it here."
                : "Try adjusting your search or filter criteria"}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Courses;
