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
    { to: "/cache", icon: "Database", label: "Cache" },
    { to: "/css", icon: "FileCode", label: "CSS" },
    { to: "/javascript", icon: "Code", label: "JavaScript" },
    { to: "/fonts", icon: "Type", label: "Fonts" },
    { to: "/images", icon: "Image", label: "Images" },
    { to: "/iframes", icon: "Monitor", label: "iFrames" },
    { to: "/cdn", icon: "Globe", label: "CDN" },
    { to: "/bloat", icon: "Trash2", label: "Bloat" },
    { to: "/database", icon: "HardDrive", label: "Database" },
    { to: "/settings", icon: "Settings", label: "Settings" },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
<motion.div
        className={cn(
          "hidden lg:block fixed left-0 top-0 h-screen bg-sidebar-bg border-r border-border/60 transition-all duration-300 z-40 shadow-sm",
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
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                  <ApperIcon name="Zap" size={20} className="text-white" />
                </div>
                <div>
                  <h1 className="text-base font-semibold text-text-primary">FlyingPress</h1>
                  <span className="text-xs text-text-secondary">v2.3.0</span>
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
                    "hover:bg-sidebar-active",
                    isActive
                      ? "sidebar-active text-primary font-medium"
                      : "text-text-secondary"
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
<div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-surface border border-border/50 shadow-card">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                  JD
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-text-primary truncate">John Doe</p>
                  <p className="text-xs text-text-secondary/80 truncate">john@nexus.com</p>
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
<div className="fixed top-0 left-0 right-0 h-16 bg-surface border-b border-border/60 flex items-center justify-between px-4 z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-sm">
            <ApperIcon name="Zap" size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold text-text-primary">FlyingPress</h1>
            <span className="text-xs text-text-secondary/70 font-medium">v2.3.0</span>
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
              className="fixed inset-0 bg-gray-900/50 z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-16 bottom-0 w-64 bg-sidebar-bg border-r border-border/60 z-40 lg:hidden shadow-lg"
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
                        "hover:bg-sidebar-active",
                        isActive
                          ? "sidebar-active text-primary font-medium"
                          : "text-text-secondary"
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