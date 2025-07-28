import {
  User,
  BookOpen,
  Phone,
  AtSign,
  LayoutList,
  PlusCircle,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const StudentsCard = ({ student, idx, course }) => {
  const navigate = useNavigate();
  const required_path = useLocation().pathname.split("/").at(-1);
  return (
    <div
      key={student?._id || idx}
      className="flex flex-col bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6"
    >
      {/* Student Image & Name */}
      <div className="flex items-center gap-4 mb-4">
        {/* Student Image or Default Avatar */}
        {student?.student_img ? (
          <img
            src={student?.student_img}
            alt={student?.full_name}
            className="w-28 h-28 object-cover rounded-full border-4 border-purple-300 shadow-md"
          />
        ) : (
          <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center border-4 border-gray-300 shadow-md">
            <User className="w-14 h-14 text-gray-400" />
          </div>
        )}

        <div>
          <div className="text-xl font-bold text-gray-900">
            {student?.full_name}
          </div>
          <div className="text-sm text-gray-600">
            {course?.course_name || "—"}
          </div>
        </div>
      </div>

      {/* Student Info */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-gray-700 gap-2">
          <Phone className="w-4 h-4 text-blue-600" />
          <span>{student?.contact_number}</span>
        </div>
        <div className="flex items-center text-gray-700 gap-2">
          <AtSign className="w-4 h-4 text-purple-600" />
          <span>{student?.email}</span>
        </div>
        <div className="flex items-center text-gray-700 gap-2">
          <LayoutList className="w-4 h-4 text-orange-600" />
          <span className="capitalize">{student?.learning_mode}</span>
        </div>
      </div>

      {/* Add to Batch Button */}
      {required_path !== "students" && (
        <div className="mt-auto pt-2">
          <button
            type="button"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all duration-200"
            onClick={() => {
              navigate(`/dashboard/students/${student._id}/add-batch`, {
                state: student,
              });
            }}
          >
            <PlusCircle className="w-5 h-5" />
            Add to Batch
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentsCard;
