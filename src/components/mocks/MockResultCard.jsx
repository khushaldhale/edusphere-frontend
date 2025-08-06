import { FileText, Hash, Star, MessageSquare, User } from "lucide-react";

const MockResultCard = ({ result, index }) => {
  console.log("rsesult : ", result);
  return (
    <div
      key={index}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col"
    >
      {!result?.student_id && (
        <div className="flex items-center gap-2 mb-3">
          <FileText className="w-5 h-5 text-blue-600" />
          <span className="text-lg font-semibold text-gray-900">
            {result.mock_id.name}
          </span>
        </div>
      )}
      <div className="flex flex-col gap-3 text-gray-700 text-md mb-2">
        {result?.student_id && (
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-blue-500" />
            <span className="font-semibold">Student Name:</span>
            <span className="ml-2">
              {result.student_id.fname + " " + result.student_id.lname}
            </span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <Hash className="w-4 h-4 text-orange-500" />
          <span className="font-semibold">Total Marks:</span>
          <span className="ml-2">{result.mock_id.total_marks}</span>
        </div>
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-green-600" />
          <span className="font-semibold">Marks Obtained:</span>
          <span className="ml-2">{result.marks_obtained}</span>
        </div>
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-blue-400" />
          <span className="font-semibold">Remarks:</span>
          <span className="ml-2">
            {result.remarks || (
              <span className="italic text-gray-400">No remarks</span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MockResultCard;
