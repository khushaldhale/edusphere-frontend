import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEmployee, getEmployees } from "../../redux/slices/employeeSlice";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { User, Trash2, Edit3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Employees = () => {
  const employees = useSelector((state) => state.employee.employees || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getEmployees()).then((action) => {
      if (action.payload.success) {
        toast.success(action.payload.message);
      } else {
        toast.error(action.payload.message);
      }
    });
  }, [dispatch]);

  // Animation variants for employee cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

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
                  variants={cardVariants}
                  exit="exit"
                  layout
                  className="bg-white/90  backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 flex flex-col"
                >
                  {/* Employee Name */}
                  <h2 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <User className="w-5 h-5 text-purple-600" />
                    {employee?.fname} {employee?.lname}
                  </h2>

                  {/* Email */}
                  <p className="text-gray-700 mb-2 break-words">
                    {employee?.email}
                  </p>

                  {/* Account Type */}
                  <p className="text-sm text-gray-600 font-semibold mb-6 capitalize">
                    Role: {employee?.accountType}
                  </p>

                  {/* Actions */}
                  <div className="mt-auto flex gap-3">
                    <button
                      type="button"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-shadow shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                      onClick={() => {
                        navigate(
                          `/dashboard/employees/${employee._id}/update`,
                          {
                            state: employee,
                          }
                        );
                      }}
                    >
                      <Edit3 className="w-5 h-5" />
                      <span>Update</span>
                    </button>

                    <button
                      type="button"
                      className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-3 rounded-xl transition-shadow shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                      onClick={() => {
                        dispatch(deleteEmployee({ employee_id: employee._id }));
                      }}
                    >
                      <Trash2 className="w-5 h-5" />
                      <span>Delete</span>
                    </button>
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
