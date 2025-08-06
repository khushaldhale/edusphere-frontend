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
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col"
    >
      {/* Student Avatar & Name */}
      <div className="flex items-center gap-5 mb-4">
        {student?.student_img ? (
          <img
            src={student.student_img}
            alt={student.fname + student.lname}
            className="w-24 h-24 object-cover rounded-full border-4 border-purple-200 shadow"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center border-4 border-gray-200 shadow">
            <User className="w-12 h-12 text-gray-400" />
          </div>
        )}
        <div>
          <div className="text-2xl font-bold text-gray-900 leading-tight">
            {student?.fname} {student?.lname}
          </div>
          <div className="flex items-center gap-2 mt-1 text-gray-600 text-sm">
            <BookOpen className="w-4 h-4 text-blue-500" />
            <span>{course?.course_name || "—"}</span>
          </div>
        </div>
      </div>

      {/* Student Details */}
      <div className="flex flex-col gap-3 text-gray-700 text-md mb-4">
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-blue-600" />
          <span>
            {student?.contact_number || (
              <span className="italic text-gray-400">—</span>
            )}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <AtSign className="w-4 h-4 text-purple-600" />
          <span>
            {student?.email || <span className="italic text-gray-400">—</span>}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <LayoutList className="w-4 h-4 text-orange-600" />
          <span className="capitalize">
            {student?.learning_mode || (
              <span className="italic text-gray-400">—</span>
            )}
          </span>
        </div>
      </div>

      {/* Add to Batch Button */}
      {required_path !== "students" && (
        <div className="mt-auto pt-2">
          <button
            type="button"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all duration-200 text-base"
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
