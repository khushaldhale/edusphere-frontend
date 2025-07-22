import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
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

const menus = [
  {
    name: "Courses",
    icon: <BookOpen className="w-5 h-5 mr-2" />,
    subMenus: [
      { label: "All Courses", to: "/dashboard/courses" },
      { label: "Add Course", to: "/dashboard/courses/add" },
    ],
  },
  {
    name: "Batches",
    icon: <Layers className="w-5 h-5 mr-2" />,
    subMenus: [
      { label: "All Batches", to: "/dashboard/batches" },
      { label: "Add Batch", to: "/dashboard/batches/add" },
    ],
  },
  {
    name: "Staff",
    icon: <Users className="w-5 h-5 mr-2" />,
    subMenus: [
      { label: "All Staff", to: "/dashboard/employees" },
      { label: "Add Staff", to: "/dashboard/employees/add" },
    ],
  },
  {
    name: "Settings",
    icon: <Settings className="w-5 h-5 mr-2" />,
    to: "/dashboard/settings",
  },
];

function Sidebar({ open, closeSidebar }) {
  const [openMenuIdx, setOpenMenuIdx] = useState(null);
  const location = useLocation();

  const toggleMenu = (idx) => {
    setOpenMenuIdx((prev) => (prev === idx ? null : idx));
  };

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
                {menus.map((menu, idx) => {
                  const isActive =
                    menu.to &&
                    location.pathname.startsWith(menu.to.replace(/\/$/, ""));
                  return (
                    <li key={menu.name} className="relative">
                      {/* Menu with submenu */}
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
                                {menu.subMenus.map((s) => (
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
                        /* Menu without submenu */
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
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      <Sidebar open={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />

      {/* Main content outlet */}
      <main className="min-h-screen transition-all">
        <Outlet />
      </main>
    </div>
  );
}
