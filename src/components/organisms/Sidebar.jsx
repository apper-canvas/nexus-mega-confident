import React, { useState, useContext } from 'react'
import { useSelector } from 'react-redux'
import { AuthContext } from '@/layouts/Root'
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";
const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

const navItems = [
    { to: "/", icon: "LayoutDashboard", label: "Dashboard" },
    { to: "/contacts", icon: "Users", label: "Contacts" },
    { to: "/deals", icon: "DollarSign", label: "Deals" },
    { to: "/companies", icon: "Building2", label: "Companies" },
    { to: "/analytics", icon: "BarChart3", label: "Analytics" },
    { to: "/settings", icon: "Settings", label: "Settings" },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
<motion.div
className={cn(
            "hidden lg:block fixed left-0 top-0 h-screen bg-gradient-to-b from-[#0F172A] to-[#1E293B] border-r border-slate-700/50 transition-all duration-300 z-40 shadow-xl",
            isCollapsed ? "w-20" : "w-60"
          )}
      >
<div className="flex flex-col h-full p-4">
          {/* Logo */}
<div className="flex items-center justify-between mb-8">
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                    <ApperIcon name="Users" size={20} className="text-white" />
                  </div>
                  <div>
                    <h1 className="text-base font-semibold text-white">Nexus CRM</h1>
                    <span className="text-xs text-blue-300">v1.0.0</span>
                  </div>
                </motion.div>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 hover:bg-sidebar-active rounded-lg transition-colors"
            >
              <ApperIcon 
                name={isCollapsed ? "ChevronRight" : "ChevronLeft"} 
                size={18} 
                className="text-text-secondary"
              />
            </button>
          </div>

          {/* Navigation */}
<nav className="flex-1 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                      "hover:bg-blue-900/50",
                      isActive
                        ? "bg-blue-800 text-white font-medium shadow-lg"
                        : "text-slate-300 hover:text-white"
                    )
                }
              >
                <ApperIcon name={item.icon} size={20} />
                {!isCollapsed && <span className="text-[15px] font-medium">{item.label}</span>}
              </NavLink>
            ))}
          </nav>

{/* User Section */}
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="pt-4 border-t border-border"
            >
<div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-blue-900/30 border border-blue-700/50 shadow-lg">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm shadow-lg">
                    JD
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">John Doe</p>
                    <p className="text-xs text-blue-300 truncate">john@nexus.com</p>
                  </div>
                </div>
              </motion.div>
          )}
        </div>
      </motion.div>

{/* Mobile Sidebar - Overlay */}
      <div className="lg:hidden">
        <MobileSidebar navItems={navItems} />
      </div>
    </>
  );
};

const MobileSidebar = ({ navItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
<div className="fixed top-0 left-0 right-0 h-16 bg-gradient-to-r from-[#0F172A] to-[#1E3A8A] border-b border-slate-700/50 flex items-center justify-between px-4 z-50 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
              <ApperIcon name="Users" size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold text-white">Nexus CRM</h1>
              <span className="text-xs text-blue-200 font-medium">v1.0.0</span>
            </div>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-sidebar-active rounded-xl transition-all duration-200 active:scale-95"
        >
          <ApperIcon name={isOpen ? "X" : "Menu"} size={24} className="text-text-primary" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-slate-900/70 z-40 lg:hidden backdrop-blur-sm"
              />
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed left-0 top-16 bottom-0 w-64 bg-gradient-to-b from-[#0F172A] to-[#1E293B] border-r border-slate-700/50 z-40 lg:hidden shadow-xl"
              >
              <nav className="p-4 space-y-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                          "hover:bg-blue-900/50",
                          isActive
                            ? "bg-blue-800 text-white font-medium shadow-lg"
                            : "text-slate-300 hover:text-white"
                      )
                    }
                  >
                    <ApperIcon name={item.icon} size={20} />
                    <span className="text-[15px] font-medium">{item.label}</span>
                  </NavLink>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;