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
  FileText, // For the main details section header
  MessageSquareMore, // For Follow Up button
  CheckCircle, // For Converted button
  XCircle, // For Not Interested button
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { changeEnquiryStatus } from "../../redux/slices/enquirySlice";
import { toast } from "react-toastify";
import { useState } from "react";
import EnrollmentForm from "../enrollment/EnrollmentForm";

const Enquiry = () => {
  const location = useLocation();
  // Ensure data exists before trying to access its properties
  const enquiry = location.state;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  // Helper function to determine the Tailwind CSS classes for status badges based on status
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
      setShowForm(true);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 font-sans">
      {/* Page Header - remains centered and contained */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Enquiry Details
        </h1>
        <p className="text-gray-600">
          Detailed view of {enquiry.full_name}'s enquiry.
        </p>
      </div>

      {/* Main Content Area - now contains individual styled sections */}
      <div className="max-w-6xl mx-auto space-y-6">
        {" "}
        {/* Wider max-width for content sections */}
        {/* Enquiry Header Section (Full Name and Status Badge) */}
        <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-xl p-6 border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center">
            <User className="inline-block w-7 h-7 mr-3 text-blue-600" />
            {enquiry.full_name.split(" ").map((element) => {
              return element.charAt(0).toUpperCase() + element.slice(1) + " ";
            })}
          </h2>
          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
              enquiry.status
            )}`}
          >
            {enquiry.status.replace("-", " ")}
          </span>
        </div>
        {/* General Information Section */}
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
              <span className="font-medium mr-1">Passing Year:</span>{" "}
              {enquiry.passing_year}
            </p>
            <p className="flex items-center">
              <Briefcase className="w-5 h-5 mr-2 text-gray-500" />
              <span className="font-medium mr-1">Current Status:</span>{" "}
              {enquiry.current_status.charAt(0).toUpperCase() +
                enquiry.current_status.slice(1)}
            </p>
            <p className="flex items-center">
              <Building className="w-5 h-5 mr-2 text-gray-500" />
              <span className="font-medium mr-1">College:</span>{" "}
              {enquiry.college_name}
            </p>
            <p className="flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-gray-500" />
              <span className="font-medium mr-1">Course ID:</span>{" "}
              {enquiry.course_interested.$oid}
            </p>
            <p className="flex items-center col-span-full">
              <LayoutList className="w-5 h-5 mr-2 text-gray-500" />
              <span className="font-medium mr-1">Learning Mode:</span>{" "}
              {enquiry.learning_mode.charAt(0).toUpperCase() +
                enquiry.learning_mode.slice(1)}
            </p>
          </div>
        </div>
        {/* Address Section */}
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
              <MapPin className="w-5 h-5 mr-2 text-gray-500 mt-1 invisible" />
              <span className="font-medium mr-1">Area:</span>{" "}
              {enquiry.address.area}
            </p>
            <p className="flex items-start">
              <MapPin className="w-5 h-5 mr-2 text-gray-500 mt-1" />
              <span className="font-medium mr-1">City:</span>{" "}
              {enquiry.address.city}
            </p>
            <p className="flex items-start">
              <MapPin className="w-5 h-5 mr-2 text-gray-500 mt-1 invisible" />
              <span className="font-medium mr-1">Pincode:</span>{" "}
              {enquiry.address.pincode}
            </p>
          </div>
        </div>
        {/* Action Buttons Section */}
        <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-xl p-6 border border-gray-100 space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
            <MessageSquareMore className="w-6 h-6 mr-2 text-blue-600" />
            Actions
          </h3>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => {
                change_status({ enquiry_id: enquiry._id, status: "follow-up" });
              }}
              className="inline-flex items-center justify-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm rounded-lg transition-all duration-200 transform hover:scale-105 focus:ring-4 focus:ring-orange-200 shadow-sm"
            >
              <MessageSquareMore className="w-5 h-5 mr-1" />
              <span>Follow Up</span>
            </button>
            <button
              onClick={() => {
                change_status({
                  enquiry_id: enquiry._id,
                  status: "converted",
                });
              }}
              className="inline-flex items-center justify-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold text-sm rounded-lg transition-all duration-200 transform hover:scale-105 focus:ring-4 focus:ring-green-200 shadow-md"
            >
              <CheckCircle className="w-5 h-5 mr-1" />
              <span>Converted</span>
            </button>

            <button
              onClick={() => {
                change_status({
                  enquiry_id: enquiry._id,
                  status: "not-interested",
                });
              }}
              className="inline-flex items-center justify-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold text-sm rounded-lg transition-all duration-200 transform hover:scale-105 focus:ring-4 focus:ring-red-200 shadow-md"
            >
              <CheckCircle className="w-5 h-5 mr-1" />
              <span>Not Interested</span>
            </button>
          </div>
        </div>
      </div>

      {/*  form for converted enquiry */}
      {showForm && <EnrollmentForm enquiry_id={enquiry._id}></EnrollmentForm>}
    </div>
  );
};

export default Enquiry;
