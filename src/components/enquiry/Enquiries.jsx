import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getEnquiries,
  markAsProcessed,
  new_enquiry,
  remove_enquiry,
} from "../../redux/slices/enquirySlice";
import {
  User,
  Phone,
  MapPin,
  GraduationCap,
  Calendar,
  Briefcase,
  Building,
  LayoutList,
  MessageSquareMore, // For Follow Up
  CheckCircle, // For Converted
  XCircle,
  BookOpen, // For course interested
  AlertCircle, // For general alerts/errors, though not used in this specific display
} from "lucide-react"; // Imported necessary Lucide icons
import { SocketContext } from "../../SocketProvider";
import { getCourses } from "../../redux/slices/courseSlice";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";

const Enquiries = () => {
  // Selects enquiries from the Redux store
  const enquiries = useSelector((state) => state.enquiry.enquiries);
  const dispatch = useDispatch();
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();
  const userInfo = useSelector((state) => {
    return state.auth.userInfo;
  });
  const courses = useSelector((state) => {
    return state.course.courses;
  });

  // Defines the available status options for filtering enquiries
  const statusOptions = ["new", "follow-up", "converted", "processing"];

  // State to manage which status button is currently active for styling
  const [activeStatus, setActiveStatus] = useState("new");

  // Function to fetch enquiries based on the selected status
  const fetch_enquiries = (event) => {
    const selectedStatus = event.target.value;
    setActiveStatus(selectedStatus); // Update the active status state
    dispatch(getEnquiries({ status: selectedStatus })); // Dispatch action to get enquiries
  };

  const add_enquiry = (data) => {
    dispatch(new_enquiry(data));
  };

  const mark_as_processed = (enquiry) => {
    if (socket) {
      //  event emmited
      socket.emit("processing", enquiry);
      // navigated.
      navigate(`/dashboard/enquiries/${enquiry._id}`, {
        state: enquiry,
      });
    }
    dispatch(markAsProcessed({ enquiry_id: enquiry._id }));
  };

  const is_loading = useSelector((state) => {
    return state.enquiry.isLoading;
  });

  useEffect(() => {
    dispatch(getEnquiries({ status: "new" }));
    dispatch(getCourses());
  }, [dispatch]);

  // listening to the socket event.
  useEffect(() => {
    if (socket) {
      if (userInfo.accountType === "counsellor") {
        socket?.on("new_enquiry", add_enquiry);
        socket?.on("processing_enquiry", (data) => {
          //   remove the data from  the list if  status  is new
          dispatch(remove_enquiry(data));
        });
      }
    }
    return () => {
      socket?.off("new_enquiry", add_enquiry);
    };
  }, [socket]);

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

  if (is_loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Student Enquiries
          </h1>
          <p className="text-gray-600">
            Manage and view all student enquiries with their current status.
          </p>
        </div>

        {/* Status Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-10 p-4 bg-white/80 backdrop-blur-sm shadow-lg rounded-full border border-gray-100">
          {statusOptions.map((element, index) => (
            <button
              key={index}
              onClick={fetch_enquiries}
              value={element}
              className={`
                px-6 py-3 rounded-full font-semibold text-sm capitalize
                transition-all duration-300 ease-in-out
                ${
                  activeStatus === element
                    ? "bg-blue-600 text-white shadow-md transform scale-105" // Active state styling
                    : "bg-gray-200 text-gray-700 hover:bg-blue-100 hover:text-blue-700" // Inactive state styling
                }
                focus:outline-none focus:ring-4 focus:ring-blue-200 focus:ring-opacity-50
              `}
            >
              {/* Formats "follow-up" to "follow up" for display */}
              {element.replace("-", " ")}
            </button>
          ))}
        </div>

        {/* lg:grid-cols-3 */}
        {/* Enquiries Display Grid */}
        {enquiries.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2  gap-8">
            {enquiries.map((enquiry) => (
              <div
                key={enquiry._id} // Unique key for each enquiry card
                className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-6 space-y-4 border border-gray-100 transform hover:scale-[1.02] transition-transform duration-200 ease-in-out"
              >
                {/* Card Header: Full Name and Status Badge */}
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">
                    <User className="inline-block w-5 h-5 mr-2 text-blue-600" />
                    {enquiry.full_name}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      enquiry.status
                    )}`}
                  >
                    {enquiry.status.replace("-", " ")}
                  </span>
                </div>

                {/* Enquiry Details */}
                <div className="space-y-2 text-gray-700 text-sm">
                  <p className="flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="font-medium mr-1">Contact:</span>{" "}
                    {enquiry.contact_number}
                  </p>
                  <p className="flex items-center">
                    <GraduationCap className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="font-medium mr-1">
                      Qualification:
                    </span>{" "}
                    {enquiry.last_qualification}
                  </p>
                  <p className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="font-medium mr-1">Passing Year:</span>{" "}
                    {enquiry.passing_year}
                  </p>
                  <p className="flex items-center">
                    <Briefcase className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="font-medium mr-1">
                      Current Status:
                    </span>{" "}
                    {enquiry.current_status.charAt(0).toUpperCase() +
                      enquiry.current_status.slice(1)}
                  </p>
                  <p className="flex items-center">
                    <Building className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="font-medium mr-1">College:</span>{" "}
                    {enquiry.college_name}
                  </p>
                  <p className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="font-medium mr-1">Course ID:</span>{" "}
                    {courses.length > 0 &&
                      courses.find((elemnt) => {
                        if (elemnt._id === enquiry.course_interested) {
                          return true;
                        }
                      }).course_name}
                  </p>
                  <p className="flex items-center">
                    <LayoutList className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="font-medium mr-1">
                      Learning Mode:
                    </span>{" "}
                    {enquiry.learning_mode.charAt(0).toUpperCase() +
                      enquiry.learning_mode.slice(1)}
                  </p>

                  {/* Address Section - Moved to the end */}
                  <p className="flex items-start pt-2 border-t border-gray-100">
                    <MapPin className="w-4 h-4 mr-2 text-gray-500 mt-1" />
                    <span className="font-medium mr-1">City:</span>{" "}
                    {enquiry.address.city}
                    <span className="font-medium ml-2 mr-1">Pincode:</span>{" "}
                    {enquiry.address.pincode}
                  </p>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-1  mt-4 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => mark_as_processed(enquiry)}
                      className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-semibold text-sm rounded-lg transition-all duration-200 transform hover:scale-105 focus:ring-4  shadow-md"
                    >
                      <MessageSquareMore className="w-4 h-4 mr-1" />
                      <span>
                        {enquiry.status === "converted"
                          ? "View Details"
                          : "Enroll Students"}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-xl p-8 text-center text-gray-600 text-lg">
            <p>No enquiries found for the selected status.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Enquiries;
