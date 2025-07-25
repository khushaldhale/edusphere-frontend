import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEmployee, getEmployees } from "../../redux/slices/employeeSlice";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { User, Trash2, Edit3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";

const Employees = () => {
  const employees = useSelector((state) => state.employee.employees || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector((state) => {
    return state.employee.isLoading;
  });

  // Animation variants for employee cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  const buttonVariants = {
    hover: { scale: 1.04 },
    tap: { scale: 0.97 },
  };

  useEffect(() => {
    dispatch(getEmployees()).then((action) => {
      if (action.payload.success) {
        toast.success(action.payload.message);
      } else {
        toast.error(action.payload.message);
      }
    });
  }, [dispatch]);

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="min-h-screen w-[100vw] bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-6 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8  justify-center items-center gap-3">
          Employees
        </h1>

        {employees.length > 0 ? (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            className="grid gap-8 md:grid-cols-2 xl:grid-cols-3"
          >
            <AnimatePresence>
              {employees.map((employee) => (
                <motion.div
                  key={employee?._id || employee?.email}
                  variants={cardVariants} // same variant naming from your previous example
                  whileHover="hover"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden group relative p-6 w-full flex flex-col"
                >
                  {/* Employee Name */}
                  <div className="flex items-center gap-2 mb-3">
                    <User className="text-purple-600 w-5 h-5 flex-shrink-0" />
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                      {employee?.fname} {employee?.lname}
                    </h3>
                  </div>

                  {/* Email */}
                  <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed mb-4 break-words">
                    {employee?.email}
                  </p>

                  {/* Account Type */}
                  <p className="text-sm text-gray-600 font-semibold mb-4 capitalize">
                    Role: {employee?.accountType}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t border-gray-100 mt-auto">
                    <motion.button
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg text-sm"
                      onClick={() => {
                        navigate(
                          `/dashboard/employees/${employee._id}/update`,
                          {
                            state: employee,
                          }
                        );
                      }}
                    >
                      <Edit3 className="w-4 h-4" />
                      <span>Update</span>
                    </motion.button>

                    <motion.button
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg text-sm"
                      onClick={() => {
                        dispatch(deleteEmployee({ employee_id: employee._id }));
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center py-32 text-gray-600 italic text-lg">
            No employees are created yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default Employees;
