import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Avatar from "@/components/atoms/Avatar";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Modal from "@/components/molecules/Modal";
import Tabs from "@/components/molecules/Tabs";
import ContactForm from "@/components/organisms/ContactForm";
import Contacts from "@/components/pages/Contacts";
import Empty from "@/components/ui/Empty";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
import contactsService from "@/services/api/contactsService";

const { ApperClient } = window.ApperSDK;
const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

const ContactDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "activity", label: "Activity" },
    { id: "deals", label: "Deals" },
    { id: "notes", label: "Notes" },
  ];

  useEffect(() => {
    loadContact();
  }, [id]);

  const loadContact = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await contactsService.getById(id);
      setContact(data);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load contact");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (formData) => {
    try {
      setFormLoading(true);
      const updated = await contactsService.update(id, formData);
      setContact(updated);
      setIsEditModalOpen(false);
      toast.success("Contact updated successfully!");
    } catch (err) {
      toast.error("Failed to update contact");
    } finally {
      setFormLoading(false);
    }
  };
const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        await contactsService.delete(id);
        toast.success("Contact deleted successfully!");
        navigate("/contacts");
      } catch (err) {
        toast.error("Failed to delete contact");
      }
    }
};

  if (loading) {
    return <Loading type="detail" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadContact} />;
  }

  if (!contact) {
    return <Error message="Contact not found" />;
  }

return (
    <div className="space-y-4">
      {/* Back Button */}
      <Button
        onClick={() => navigate("/contacts")}
        variant="ghost"
        className="mb-4"
      >
        <ApperIcon name="ArrowLeft" size={18} />
        Back to Contacts
      </Button>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[#1e3a8a] to-[#1e40af] rounded-xl p-6 border border-blue-800 shadow-lg"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Avatar
              name={`${contact.first_name_c} ${contact.last_name_c}`}
              size="xl"
              imageUrl={contact.image_url_c}
            />
            <div>
              <h1 className="text-2xl font-bold text-white">
                {contact.first_name_c} {contact.last_name_c}
              </h1>
              <p className="text-blue-200 mt-1">{contact.job_title_c || "No job title"}</p>
              {contact.company_c && (
                <p className="text-blue-100 mt-1 flex items-center gap-2">
                  <ApperIcon name="Building2" size={16} className="text-blue-300" />
                  {contact.company_c}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button onClick={() => setIsEditModalOpen(true)} variant="secondary">
              <ApperIcon name="Edit2" size={16} />
              Edit
            </Button>
            <Button onClick={handleDelete} variant="danger">
              <ApperIcon name="Trash2" size={16} />
              Delete
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      </motion.div>

      {/* Tab Content */}
<motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
{activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Contact Information */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 shadow-card">
              <h3 className="text-lg font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4 flex items-center gap-2">
                <ApperIcon name="User" size={20} className="text-primary" />
                Contact Information
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-blue-700 text-sm font-medium">Email</label>
                  <p className="text-blue-900 mt-1">{contact.email_c}</p>
                </div>
                {contact.phone_c && (
                  <div>
                    <label className="text-blue-700 text-sm font-medium">Phone</label>
                    <p className="text-blue-900 mt-1">{contact.phone_c}</p>
                  </div>
                )}
                {contact.linkedin_c && (
                  <div>
                    <label className="text-blue-700 text-sm font-medium">LinkedIn</label>
                    <a
                      href={contact.linkedin_c}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-secondary transition-colors mt-1 block font-medium"
                    >
                      View Profile
                    </a>
                  </div>
                )}
              </div>
            </div>

{/* Additional Details */}
            <div className="bg-blue-100 border border-blue-300 rounded-xl p-4 shadow-card">
              <h3 className="text-lg font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4 flex items-center gap-2">
                <ApperIcon name="Calendar" size={20} className="text-primary" />
                Timeline
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-blue-700 text-sm font-medium">Last Contacted</label>
                  <p className="text-blue-900 mt-1">
                    {contact.last_contacted_c
                      ? format(new Date(contact.last_contacted_c), "MMMM d, yyyy 'at' h:mm a")
                      : "Never"}
                  </p>
                </div>
                <div>
                  <label className="text-blue-700 text-sm font-medium">Created</label>
                  <p className="text-blue-900 mt-1">
                    {format(new Date(contact.CreatedOn), "MMMM d, yyyy")}
                  </p>
                </div>
                <div>
                  <label className="text-blue-700 text-sm font-medium">Last Updated</label>
                  <p className="text-blue-900 mt-1">
                    {format(new Date(contact.ModifiedOn), "MMMM d, yyyy")}
                  </p>
                </div>
              </div>
            </div>

{/* Notes */}
            {contact.notes_c && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 md:col-span-2 shadow-card">
                <h3 className="text-lg font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4 flex items-center gap-2">
                  <ApperIcon name="FileText" size={20} className="text-primary" />
                  Notes
                </h3>
                <p className="text-blue-900 whitespace-pre-wrap">{contact.notes_c}</p>
              </div>
            )}

            {/* Tags */}
            {contact.tags_c && contact.tags_c.length > 0 && (
              <div className="bg-blue-100 border border-blue-300 rounded-xl p-4 md:col-span-2 shadow-card">
                <h3 className="text-lg font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4 flex items-center gap-2">
                  <ApperIcon name="Tag" size={20} className="text-primary" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {contact.tags_c.split(',').map((tag) => (
                    <Badge key={tag.trim()} variant="primary">
                      {tag.trim()}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

{activeTab === "activity" && (
          <div className="bg-gradient-to-br from-blue-900 to-blue-800 border border-blue-700 rounded-xl p-8 shadow-lg">
            <Empty
              icon="Activity"
              title="Activity Timeline Coming Soon"
              description="Track all interactions, emails, calls, and meetings with this contact"
            />
          </div>
        )}

        {activeTab === "deals" && (
          <div className="bg-gradient-to-br from-blue-900 to-blue-800 border border-blue-700 rounded-xl p-8 shadow-lg">
            <Empty
              icon="TrendingUp"
              title="Deal Management Coming Soon"
              description="View and manage all deals associated with this contact"
            />
          </div>
        )}

        {activeTab === "notes" && (
          <div className="bg-gradient-to-br from-blue-900 to-blue-800 border border-blue-700 rounded-xl p-8 shadow-lg">
            <Empty
              icon="FileText"
              title="Enhanced Notes Coming Soon"
              description="Create rich text notes, attach files, and collaborate with your team"
            />
          </div>
        )}
      </motion.div>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Contact"
      >
        <ContactForm
          contact={contact}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditModalOpen(false)}
          loading={formLoading}
        />
      </Modal>
    </div>
  );
};

export default ContactDetail;