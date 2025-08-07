import {
  User,
  Phone,
  AtSign,
  Home,
  GraduationCap,
  School2,
  BookOpen,
  DoorOpen,
  CalendarDays,
  Users,
} from "lucide-react";

const InfoCard = ({ student_by_id }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mt-8 space-y-10">
      {/* Header/avatar */}
      <div className="flex items-center gap-6">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center border-4 border-blue-200 shadow">
          <User className="w-12 h-12 text-blue-500" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            {student_by_id.fname} {student_by_id.lname}
          </h2>
          <p className="text-gray-500 mt-1 text-sm font-medium">
            {student_by_id.course_interested?.course_name || "—"}
          </p>
          <div className="flex gap-3 mt-2">
            <span
              className={`inline-block px-3 py-1 text-xs rounded-full font-semibold ${
                student_by_id.isAdmissionTaken
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {student_by_id.isAdmissionTaken ? "Enrolled" : "Not Enrolled"}
            </span>
            <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 text-xs rounded-full py-1 px-3">
              <CalendarDays className="w-4 h-4" />
              Joined: {student_by_id.createdAt?.split("T")[0] || "—"}
            </span>
          </div>
        </div>
      </div>
      {/* Personal Info */}
      <Section title="Personal Info">
        <DetailItem
          icon={Phone}
          label="Contact"
          value={student_by_id.contact_number}
        />
        <DetailItem icon={AtSign} label="Email" value={student_by_id.email} />
      </Section>
      {/* Address */}
      <Section title="Address">
        <DetailItem
          icon={Home}
          label="Address"
          value={
            [
              student_by_id.address?.house_number,
              student_by_id.address?.area,
              student_by_id.address?.city,
              student_by_id.address?.pincode,
            ]
              .filter(Boolean)
              .join(", ") || "—"
          }
        />
      </Section>
      {/* Education Details */}
      <Section title="Education">
        <DetailItem
          icon={GraduationCap}
          label="Last Qualification"
          value={student_by_id.last_qualification || "—"}
        />
        <DetailItem
          icon={School2}
          label="Passing Year"
          value={student_by_id.passing_year || "—"}
        />
        <DetailItem
          icon={BookOpen}
          label="College/School"
          value={student_by_id.college_name || "—"}
        />
        <DetailItem
          icon={DoorOpen}
          label="Current Status"
          value={student_by_id.current_status || "—"}
        />
      </Section>
      {/* Enrollment Info */}
      <Section title="Course Enrollment">
        <DetailItem
          icon={BookOpen}
          label="Course Interested"
          value={student_by_id.course_interested?.course_name || "—"}
        />
        <DetailItem
          icon={Users}
          label="Learning Mode"
          value={student_by_id.learning_mode || "—"}
        />
        <DetailItem
          icon={BookOpen}
          label="Enquiry Type"
          value={student_by_id.enquiry_type || "—"}
        />
        <DetailItem
          icon={CalendarDays}
          label="Admission Date"
          value={student_by_id.createdAt?.split("T")[0] || "—"}
        />
      </Section>
      {/* Batch Info */}
      <Section title="Batch">
        <DetailItem
          icon={Users}
          label="Batch"
          value={student_by_id.batch?.name || "—"}
        />
      </Section>
    </div>
  );
};

// Helper for section group
function Section({ title, children }) {
  return (
    <div>
      <h3 className="font-semibold text-gray-800 text-lg mb-4 flex items-center gap-2 border-b border-gray-100 pb-1">
        {title}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

// Helper for each field+icon row
function DetailItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
      <Icon className="w-5 h-5 text-blue-500 flex-shrink-0" />
      <div>
        <div className="text-sm text-gray-600 font-medium">{label}</div>
        <div className="font-semibold text-gray-900">
          {value || <span className="text-gray-400">—</span>}
        </div>
      </div>
    </div>
  );
}

export default InfoCard;
