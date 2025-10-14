import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Avatar from "@/components/atoms/Avatar";
import { cn } from "@/utils/cn";

const ContactTable = ({ contacts, onDelete }) => {
  const navigate = useNavigate();
  const [sortConfig, setSortConfig] = useState({ key: "firstName", direction: "asc" });

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sortedContacts = [...contacts].sort((a, b) => {
    const aValue = a[sortConfig.key] || "";
    const bValue = b[sortConfig.key] || "";

    if (sortConfig.key === "lastContacted") {
      return sortConfig.direction === "asc"
        ? new Date(aValue) - new Date(bValue)
        : new Date(bValue) - new Date(aValue);
    }

    if (typeof aValue === "string") {
      return sortConfig.direction === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
  });

  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) {
      return <ApperIcon name="ChevronsUpDown" size={14} className="text-white/30" />;
    }
    return (
      <ApperIcon
        name={sortConfig.direction === "asc" ? "ChevronUp" : "ChevronDown"}
        size={14}
        className="text-primary"
      />
    );
  };

  return (
    <div className="glass-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort("firstName")}
                  className="flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white transition-colors"
                >
                  Name
                  <SortIcon columnKey="firstName" />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort("email")}
                  className="flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white transition-colors"
                >
                  Email
                  <SortIcon columnKey="email" />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort("company")}
                  className="flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white transition-colors"
                >
                  Company
                  <SortIcon columnKey="company" />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort("jobTitle")}
                  className="flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white transition-colors"
                >
                  Job Title
                  <SortIcon columnKey="jobTitle" />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort("lastContacted")}
                  className="flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white transition-colors"
                >
                  Last Contacted
                  <SortIcon columnKey="lastContacted" />
                </button>
              </th>
              <th className="px-6 py-4 text-right">
                <span className="text-sm font-semibold text-white/80">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedContacts.map((contact) => (
              <tr
                key={contact.Id}
className="border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => navigate(`/contacts/${contact.Id}`)}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar name={`${contact.firstName} ${contact.lastName}`} size="sm" />
                    <span className="font-medium text-white">
                      {contact.firstName} {contact.lastName}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-white/70">{contact.email}</td>
                <td className="px-6 py-4 text-white/70">{contact.company || "-"}</td>
                <td className="px-6 py-4 text-white/70">{contact.jobTitle || "-"}</td>
                <td className="px-6 py-4 text-white/70">
                  {contact.lastContacted
                    ? format(new Date(contact.lastContacted), "MMM d, yyyy")
                    : "-"}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm("Are you sure you want to delete this contact?")) {
                        onDelete(contact.Id);
                      }
                    }}
                    className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-white/60 hover:text-red-500"
                  >
                    <ApperIcon name="Trash2" size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactTable;