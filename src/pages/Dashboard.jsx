import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  BookOpen,
  Users,
  Layers,
  Settings,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { toast } from "react-toastify";
import { SocketContext } from "../SocketProvider";
import useSocket from "../hooks/useSocket";

// ----- MENUS -----
const menus = [
  {
    name: "Courses",
    icon: <BookOpen className="w-5 h-5 mr-2" />,
    subMenus: [
      {
        label: "All Courses",
        to: "/dashboard/courses",
        roles: ["admin", "counsellor", "operations_executive"],
      },
      { label: "Add Course", to: "/dashboard/courses/add", roles: ["admin"] },
      {
        label: "Course Enrolled",
        to: "/dashboard/courses/enrolled",
        roles: ["student"],
      },
    ],
  },
  {
    name: "Batches",
    icon: <Layers className="w-5 h-5 mr-2" />,
    subMenus: [
      {
        label: "All Batches",
        to: "/dashboard/batches",
        roles: ["admin", "operations_executive", "counsellor"],
      },
      {
        label: "Add Batch",
        to: "/dashboard/batches/add",
        roles: ["admin", "operations_executive"],
      },
    ],
  },
  {
    name: "Staff",
    icon: <Users className="w-5 h-5 mr-2" />,
    subMenus: [
      {
        label: "All Staff",
        to: "/dashboard/employees",
        roles: ["admin", "operations_executive"],
      },
      { label: "Add Staff", to: "/dashboard/employees/add", roles: ["admin"] },
    ],
  },
  {
    name: "Enquiries",
    icon: <Users className="w-5 h-5 mr-2" />,
    subMenus: [
      {
        label: "All Enquiries",
        to: "/dashboard/enquiries",
        roles: ["admin", "counsellor", "operations_executive"],
      },
      {
        label: "Add Enquiry",
        to: "/dashboard/enquiries/add",
        roles: ["counsellor", "receptionist"],
      },
    ],
  },
  {
    name: "Batch Allocation",
    icon: <Users className="w-5 h-5 mr-2" />,
    subMenus: [
      {
        label: "Students",
        to: "/dashboard/students/no-batch",
        roles: ["admin", "counsellor", "operations_executive"],
      },
    ],
  },
  {
    name: "Exams",
    icon: <Users className="w-5 h-5 mr-2" />,
    subMenus: [
      {
        label: "All Exams",
        to: "/dashboard/exams",
        roles: ["admin", "operations_executive", "instructor"],
      },
      {
        label: "Add Exam",
        to: "/dashboard/exams/add",
        roles: ["admin", "operations_executive"],
      },
      {
        label: "Appear for Exam",
        to: "/dashboard/exams/students",
        roles: ["student"],
      },
    ],
  },
  {
    name: "Mocks",
    icon: <Users className="w-5 h-5 mr-2" />,
    subMenus: [
      {
        label: "All Mocks",
        to: "/dashboard/mocks",
        roles: ["admin", "operations_executive", "instructor"],
      },
      {
        label: "Add Mock",
        to: "/dashboard/mocks/add",
        roles: ["admin", "operations_executive"],
      },
    ],
  },
  {
    name: "Attendance",
    icon: <Users className="w-5 h-5 mr-2" />,
    subMenus: [
      {
        label: "Take Attendance",
        to: "/dashboard/attendance",
        roles: ["operations_executive", "instructor"],
      },
      {
        label: "Show Attendance",
        to: "/dashboard/attendance/student",
        roles: ["student"],
      },
    ],
  },
  {
    name: "Payment",
    icon: <Users className="w-5 h-5 mr-2" />,
    subMenus: [
      {
        label: "Payment Info",
        to: "/dashboard/student/payment-info",
        roles: ["student"],
      },
    ],
  },
  {
    name: "Settings",
    icon: <Settings className="w-5 h-5 mr-2" />,
    to: "/dashboard/settings",
    // shown if menu name is whitelisted in roleMenus
  },
];

// Role to allowed menu names mapping
const roleMenus = {
  admin: [
    "Courses",
    "Batches",
    "Staff",
    "Enquiries",
    "Batch Allocation",
    "Exams",
    "Mocks",
    "Settings",
  ],
  counsellor: ["Courses", "Enquiries", "Batch Allocation", "Settings"],
  instructor: ["Attendance", "Mocks", "Settings"],
  student: ["Courses", "Exams", "Attendance", "Payment", "Settings"],
  receptionist: ["Enquiries", "Settings"],
  operations_executive: [
    "Courses",
    "Batches",
    "Staff",
    "Batch Allocation",
    "Attendance",
    "Exams",
    "Mocks",
    "Settings",
  ],
};

function Sidebar({ open, closeSidebar, accountType }) {
  const [openMenuIdx, setOpenMenuIdx] = useState(null);
  const location = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Filter menus based on allowed top-level menu names
  const allowedMenuNames = roleMenus[accountType] || [];
  const filteredMenus = menus.filter((menu) =>
    allowedMenuNames.includes(menu.name)
  );

  const { socket } = useContext(SocketContext);
  const toggleMenu = (idx) =>
    setOpenMenuIdx((prev) => (prev === idx ? null : idx));

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            className="fixed inset-0 bg-black/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSidebar}
          />

          {/* Sidebar */}
          <motion.aside
            key="sidebar"
            className="fixed top-0 left-0 w-72 md:w-80 h-full bg-white shadow-2xl z-50 flex flex-col"
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", stiffness: 350, damping: 32 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div className="font-bold text-lg text-purple-700 flex items-center gap-2">
                <span className="block w-8 h-8 bg-gradient-to-tr from-purple-600 to-blue-400 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </span>
                Edupshere
              </div>
              <button
                className="rounded-full bg-gray-100 p-2 hover:bg-gray-200 transition"
                onClick={closeSidebar}
                aria-label="Close Menu"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-6">
              <ul className="space-y-2">
                {filteredMenus.map((menu, idx) => {
                  const isActive =
                    menu.to &&
                    location.pathname.startsWith(menu.to.replace(/\/$/, ""));

                  let filteredSubMenus = null;
                  if (menu.subMenus) {
                    filteredSubMenus = menu.subMenus.filter(
                      (submenu) =>
                        Array.isArray(submenu.roles) &&
                        submenu.roles.includes(accountType)
                    );
                    // If no submenus remain, skip rendering this menu group
                    if (filteredSubMenus.length === 0) return null;
                  }

                  return (
                    <li key={menu.name} className="relative">
                      {menu.subMenus ? (
                        <>
                          <button
                            type="button"
                            className={`flex items-center w-full px-6 py-3 rounded-lg transition-all
                              text-base font-medium
                              ${
                                openMenuIdx === idx
                                  ? "bg-blue-50 text-blue-700"
                                  : "hover:bg-gray-50 text-gray-700"
                              }`}
                            aria-expanded={openMenuIdx === idx}
                            aria-controls={`submenu-${idx}`}
                            onClick={() => toggleMenu(idx)}
                          >
                            {menu.icon}
                            {menu.name}
                            {openMenuIdx === idx ? (
                              <ChevronDown className="ml-auto w-4 h-4" />
                            ) : (
                              <ChevronRight className="ml-auto w-4 h-4" />
                            )}
                          </button>
                          <AnimatePresence initial={false}>
                            {openMenuIdx === idx && (
                              <motion.ul
                                id={`submenu-${idx}`}
                                className="pl-9 mt-1 space-y-1"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ type: "tween", duration: 0.18 }}
                              >
                                {filteredSubMenus.map((s) => (
                                  <li key={s.label}>
                                    <Link
                                      to={s.to}
                                      onClick={closeSidebar}
                                      className={`block px-3 py-2 rounded-md text-gray-600 text-sm hover:bg-blue-100 hover:text-blue-700
                                        transition font-medium
                                        ${
                                          location.pathname === s.to
                                            ? "bg-blue-100 text-blue-700"
                                            : ""
                                        }`}
                                    >
                                      {s.label}
                                    </Link>
                                  </li>
                                ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        // No submenu
                        <Link
                          to={menu.to}
                          onClick={closeSidebar}
                          className={`flex items-center w-full px-6 py-3 rounded-lg transition-all text-base font-medium ${
                            isActive
                              ? "bg-blue-50 text-blue-700"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {menu.icon}
                          {menu.name}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Logout button at the bottom */}
            <div className="px-6 py-5 border-t border-gray-100 mt-auto">
              <button
                onClick={() => {
                  dispatch(logout()).then((action) => {
                    if (action.payload.success) {
                      toast.success(action.payload.message);
                      if (socket) {
                        socket?.disconnect();
                      }
                      navigate("/login", { replace: true });
                    }
                  });
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 font-medium hover:bg-red-100 active:bg-red-200 transition shadow"
              >
                {/* Logout icon */}
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="mr-2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3" />
                </svg>
                Logout
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

// Main Dashboard component
export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Get accountType from Redux
  const { accountType } = useSelector((state) => state.auth.userInfo);
  const isLoggedIn = useSelector((state) => {
    return state.auth.isLoggedIn;
  });
  const socketConection = useSocket();
  const { socket } = useContext(SocketContext);

  //   we are doing socket connection here  just because login component doesnt fall under the tree.
  useEffect(() => {
    //  establish sicket connection  when person is logged in
    if (isLoggedIn && !socket) {
      const temporary_socket = socketConection();
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Menu Button */}
      <button
        className="fixed top-4 left-4 z-50 bg-white/80 backdrop-blur-sm shadow-lg rounded-full p-3 hover:bg-purple-100 transition"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open Menu"
      >
        <Menu className="w-6 h-6 text-purple-700" />
      </button>

      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        closeSidebar={() => setSidebarOpen(false)}
        accountType={accountType}
      />

      {/* Main content */}
      <main className="min-h-screen transition-all">
        <Outlet />
      </main>
    </div>
  );
}
