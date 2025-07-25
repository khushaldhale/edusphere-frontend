import { useLocation, useNavigate } from "react-router-dom";
import {
  User,
  Phone,
  MapPin,
  GraduationCap,
  Calendar,
  Briefcase,
  Building,
  LayoutList,
  BookOpen,
  FileText,
  MessageSquareMore,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { changeEnquiryStatus } from "../../redux/slices/enquirySlice";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import EnrollmentForm from "../enrollment/EnrollmentForm";
import FollowUpForm from "./FollowUpForm";
import { particularEnrollment } from "../../redux/slices/enrollmentSlice";
import useFetchCourses from "../../hooks/useFetchCourses";
import Loading from "../Loading";

const Enquiry = () => {
  const location = useLocation();
  const enquiry = location.state;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState("");

  const enrollment = useSelector((state) => state.enrollment.enrollment);
  const [courses, isLoading] = useFetchCourses();

  const getStatusColor = (status) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800";
      case "follow-up":
        return "bg-yellow-100 text-yellow-800";
      case "converted":
        return "bg-green-100 text-green-800";
      case "not-interested":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const change_status = ({ enquiry_id, status }) => {
    if (status === "converted") {
      setShowForm("converted");
    } else if (status === "follow-up") {
      setShowForm("follow");
    } else {
      setShowForm(false);
      dispatch(changeEnquiryStatus({ enquiry_id, status })).then((action) => {
        if (action.payload.success) {
          toast.success(action.payload.message);
          navigate("/dashboard/enquiries");
        } else {
          toast.error(action.payload.message);
        }
      });
    }
  };

  useEffect(() => {
    if (enquiry.status === "converted") {
      dispatch(particularEnrollment({ student_id: enquiry._id }));
    }
  }, []);

  const is_loading = useSelector((state) => {
    return state.enquiry.isLoading;
  });

  if (isLoading || is_loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 font-sans">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Enquiry Details
        </h1>
        <p className="text-gray-600">
          Detailed view of {enquiry.full_name}'s enquiry.
        </p>
      </div>

      <div className="max-w-6xl mx-auto space-y-7">
        {/* Name + status */}
        <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-xl p-6 border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center">
            <User className="inline-block w-7 h-7 mr-3 text-blue-600" />
            {enquiry.full_name}
          </h2>
          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(
              enquiry.status
            )}`}
          >
            {enquiry?.status?.replace("-", " ")}
          </span>
        </div>

        {/* General Info */}
        <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-xl p-6 border border-gray-100 space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
            <FileText className="w-6 h-6 mr-2 text-purple-600" />
            General Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-gray-700 text-base">
            <p className="flex items-center">
              <Phone className="w-5 h-5 mr-2 text-gray-500" />
              <span className="font-medium mr-1">Contact:</span>{" "}
              {enquiry.contact_number}
            </p>
            <p className="flex items-center">
              <GraduationCap className="w-5 h-5 mr-2 text-gray-500" />
              <span className="font-medium mr-1">Qualification:</span>{" "}
              {enquiry.last_qualification}
            </p>
            <p className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-gray-500" />
              <span className="font-medium mr-1">Passing Year:</span>
              {enquiry.passing_year}
            </p>
            <p className="flex items-center">
              <Briefcase className="w-5 h-5 mr-2 text-gray-500" />
              <span className="font-medium mr-1">Current Status:</span>
              {enquiry.current_status.charAt(0).toUpperCase() +
                enquiry.current_status.slice(1)}
            </p>
            <p className="flex items-center">
              <Building className="w-5 h-5 mr-2 text-gray-500" />
              <span className="font-medium mr-1">College:</span>
              {enquiry.college_name}
            </p>
            <p className="flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-gray-500" />
              <span className="font-medium mr-1">Course Name:</span>
              {
                courses.find(
                  (course) => course._id === enquiry.course_interested
                )?.course_name
              }
            </p>
            <p className="flex items-center col-span-full">
              <LayoutList className="w-5 h-5 mr-2 text-gray-500" />
              <span className="font-medium mr-1">Learning Mode:</span>
              {enquiry.learning_mode.charAt(0).toUpperCase() +
                enquiry.learning_mode.slice(1)}
            </p>
          </div>
        </div>

        {/* Address */}
        <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-xl p-6 border border-gray-100 space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
            <MapPin className="w-6 h-6 mr-2 text-orange-600" />
            Address Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <p className="flex items-start">
              <MapPin className="w-5 h-5 mr-2 text-gray-500 mt-1" />
              <span className="font-medium mr-1">House:</span>{" "}
              {enquiry.address.house_number}
            </p>
            <p className="flex items-start">
              <span className="w-5 h-5 mr-2 mt-1" />{" "}
              {/* for indent alignment */}
              <span className="font-medium mr-1">Area:</span>{" "}
              {enquiry.address.area}
            </p>
            <p className="flex items-start">
              <MapPin className="w-5 h-5 mr-2 text-gray-500 mt-1" />
              <span className="font-medium mr-1">City:</span>{" "}
              {enquiry.address.city}
            </p>
            <p className="flex items-start">
              <span className="w-5 h-5 mr-2 mt-1" />{" "}
              {/* for indent alignment */}
              <span className="font-medium mr-1">Pincode:</span>{" "}
              {enquiry.address.pincode}
            </p>
          </div>
        </div>

        {/* Latest Follow-Up Details */}
        {enquiry.follow_up_date && enquiry.remarks && (
          <div className="bg-white/70 backdrop-blur-sm shadow-md rounded-xl p-6 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
              <MessageSquareMore className="w-6 h-6 mr-2 text-orange-600" />
              Latest Follow-up
            </h3>
            <div className="flex flex-col gap-2 md:flex-row md:gap-8 text-base text-gray-800">
              <span>
                <Calendar className="w-4 h-4 mr-1 inline-block text-blue-500" />
                {enquiry.follow_up_date.split("T")[0]}
              </span>
              <span>
                <FileText className="w-4 h-4 mr-1 inline-block text-gray-500" />
                {enquiry.remarks}
              </span>
            </div>
          </div>
        )}

        {/* Actions */}
        {enquiry.status !== "converted" && (
          <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-xl p-6 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
              <MessageSquareMore className="w-6 h-6 mr-2 text-blue-600" />
              Actions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() =>
                  change_status({
                    enquiry_id: enquiry._id,
                    status: "follow-up",
                  })
                }
                className="inline-flex items-center justify-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm rounded-lg transition-all duration-200 transform hover:scale-105 focus:ring-4 focus:ring-orange-200 shadow-sm"
              >
                <MessageSquareMore className="w-5 h-5 mr-1" />
                <span>Follow Up</span>
              </button>
              <button
                onClick={() =>
                  change_status({
                    enquiry_id: enquiry._id,
                    status: "converted",
                  })
                }
                className="inline-flex items-center justify-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold text-sm rounded-lg transition-all duration-200 transform hover:scale-105 focus:ring-4 focus:ring-green-200 shadow-md"
              >
                <CheckCircle className="w-5 h-5 mr-1" />
                <span>Converted</span>
              </button>
              <button
                onClick={() =>
                  change_status({
                    enquiry_id: enquiry._id,
                    status: "not-interested",
                  })
                }
                className="inline-flex items-center justify-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold text-sm rounded-lg transition-all duration-200 transform hover:scale-105 focus:ring-4 focus:ring-red-200 shadow-md"
              >
                <XCircle className="w-5 h-5 mr-1" />
                <span>Not Interested</span>
              </button>
            </div>
          </div>
        )}

        {/* Enrollment Info for converted */}
        {enquiry.status === "converted" && enrollment && (
          <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-xl p-6 border border-gray-100 space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
              <CheckCircle className="w-6 h-6 mr-2 text-green-600" />
              Enrollment Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-gray-700 text-base">
              <p>
                <BookOpen className="w-5 h-5 mr-2 inline-block text-blue-600" />
                <span className="font-medium mr-1">Course enrolled in: </span>
                {
                  courses.find((course) => course._id === enrollment.course)
                    ?.course_name
                }
              </p>
              <p>
                <FileText className="w-5 h-5 mr-2 inline-block text-purple-600" />
                <span className="font-medium mr-1">Amount Paid: </span>₹
                {enrollment.amount_paid}
              </p>
              <p>
                <Calendar className="w-5 h-5 mr-2 inline-block text-gray-600" />
                <span className="font-medium mr-1">Admission Date: </span>
                {enrollment.createdAt ? enrollment.createdAt.split("T")[0] : ""}
              </p>
              <p>
                <LayoutList className="w-5 h-5 mr-2 inline-block text-gray-600" />
                <span className="font-medium mr-1">Payment Type: </span>
                {enrollment.is_lumpsum
                  ? "Lumpsum Payment"
                  : "Installment Payment"}
              </p>
              <p className="col-span-full">
                <CheckCircle className="w-5 h-5 mr-2 inline-block text-green-600" />
                <span className="font-medium mr-1">Is Total Fee Paid:</span>
                {enrollment.is_Total_fee_paid ? (
                  <span className="text-green-700 font-semibold ml-1">
                    Paid
                  </span>
                ) : (
                  <span className="text-red-700 font-semibold ml-1">
                    Not Paid
                  </span>
                )}
              </p>
            </div>
            {/* Installments */}
            {!enrollment.is_lumpsum && (
              <div className="mt-4">
                <h4 className="text-md font-semibold text-gray-800 mb-2 flex items-center">
                  <LayoutList className="w-5 h-5 mr-2 text-purple-600" />
                  Installments
                </h4>
                <div className="space-y-3">
                  {enrollment.installment_info.map((installment, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-lg bg-gray-50 flex flex-col md:flex-row md:justify-between md:items-center text-gray-700"
                    >
                      <div>
                        <span className="font-semibold mr-2">
                          Installment #{installment?.installment_number}
                        </span>
                        -<span className="ml-2">₹{installment?.amount}</span>
                      </div>
                      <div>
                        {installment?.paid_on ? (
                          <span className="text-green-600 font-medium ml-4">
                            Paid on {installment?.paid_on.split("T")[0]}
                          </span>
                        ) : (
                          <span className="text-red-600 font-medium ml-4">
                            Pending
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Forms for status change */}
        {showForm === "converted" && (
          <div className="mt-8">
            <EnrollmentForm
              courses={courses}
              enquiry_id={enquiry._id}
              isLoading={isLoading}
            ></EnrollmentForm>
          </div>
        )}
        {showForm === "follow" && (
          <div className="mt-8">
            <FollowUpForm enquiry_id={enquiry._id}></FollowUpForm>
          </div>
        )}
      </div>
    </div>
  );
};

export default Enquiry;
