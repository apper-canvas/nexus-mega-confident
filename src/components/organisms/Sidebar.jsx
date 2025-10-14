import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";
const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { to: "/", icon: "LayoutDashboard", label: "Dashboard" },
    { to: "/contacts", icon: "Users", label: "Contacts" },
    { to: "/companies", icon: "Building2", label: "Companies" },
    { to: "/deals", icon: "TrendingUp", label: "Deals" },
    { to: "/analytics", icon: "BarChart3", label: "Analytics" },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.div
className={cn(
          "hidden lg:block fixed left-0 top-0 h-screen glass-card border-r border-gray-200 transition-all duration-300 z-40",
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
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <ApperIcon name="Zap" size={20} className="text-white" />
                </div>
<h1 className="text-xl font-bold text-gray-900">Nexus CRM</h1>
              </motion.div>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              <ApperIcon 
                name={isCollapsed ? "ChevronRight" : "ChevronLeft"} 
                size={20} 
                className="text-white/60"
              />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
"flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200",
                    "hover:bg-gray-100",
                    isActive
                      ? "bg-gradient-to-r from-primary to-secondary text-white shadow-glow"
                      : "text-gray-600"
                  )
                }
              >
                <ApperIcon name={item.icon} size={20} />
                {!isCollapsed && <span className="font-medium">{item.label}</span>}
              </NavLink>
            ))}
          </nav>

          {/* User Section */}
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="pt-4 border-t border-white/10"
            >
<div className="flex items-center gap-3 px-3 py-3 rounded-lg bg-gray-100">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold">
                  JD
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">John Doe</p>
                  <p className="text-xs text-gray-600 truncate">john@nexus.com</p>
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
<div className="fixed top-0 left-0 right-0 h-16 glass-card border-b border-gray-200 flex items-center justify-between px-4 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <ApperIcon name="Zap" size={20} className="text-white" />
          </div>
<h1 className="text-xl font-bold text-gray-900">Nexus CRM</h1>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ApperIcon name={isOpen ? "X" : "Menu"} size={24} className="text-gray-900" />
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
className="fixed inset-0 bg-white/50 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
className="fixed left-0 top-16 bottom-0 w-64 glass-card border-r border-gray-200 z-40 lg:hidden"
            >
              <nav className="p-4 space-y-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      cn(
"flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200",
                        "hover:bg-gray-100",
                        isActive
                          ? "bg-gradient-to-r from-primary to-secondary text-white shadow-glow"
                          : "text-gray-600"
                      )
                    }
                  >
                    <ApperIcon name={item.icon} size={20} />
                    <span className="font-medium">{item.label}</span>
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