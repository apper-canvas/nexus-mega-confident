import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Avatar from "@/components/atoms/Avatar";
import Badge from "@/components/atoms/Badge";
import Tabs from "@/components/molecules/Tabs";
import Modal from "@/components/molecules/Modal";
import ContactForm from "@/components/organisms/ContactForm";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import contactsService from "@/services/api/contactsService";

const ContactDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

const [sendingEmail, setSendingEmail] = useState(false);

  // Initialize ApperClient
  const { ApperClient } = window.ApperSDK;
  const apperClient = new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  });

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

  const handleSendEmail = async () => {
    if (!contact?.email) {
      toast.error('Contact email address is required');
      return;
    }

    setSendingEmail(true);
    try {
      const result = await apperClient.functions.invoke(import.meta.env.VITE_SEND_CONTACT_EMAIL, {
        body: JSON.stringify({
          contactId: contact.Id,
          contactEmail: contact.email,
          contactName: `${contact.firstName} ${contact.lastName}`.trim(),
          contactCompany: contact.company
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (result.success) {
        toast.success(`Email sent successfully to ${contact.email}`);
      } else {
        console.info(`apper_info: Got an error in this function: ${import.meta.env.VITE_SEND_CONTACT_EMAIL}. The response body is: ${JSON.stringify(result)}.`);
        toast.error(result.error || 'Failed to send email');
      }
    } catch (error) {
      console.info(`apper_info: Got this error an this function: ${import.meta.env.VITE_SEND_CONTACT_EMAIL}. The error is: ${error.message}`);
      toast.error('Failed to send email. Please try again.');
    } finally {
      setSendingEmail(false);
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
    <div className="space-y-6">
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
        className="glass-card p-8"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <Avatar
              name={`${contact.firstName} ${contact.lastName}`}
              size="xl"
            />
            <div>
              <h1 className="text-3xl font-bold gradient-text">
{contact.firstName} {contact.lastName}
              </h1>
              <p className="text-gray-600 text-lg mt-1">{contact.jobTitle || "No job title"}</p>
              {contact.company && (
                <p className="text-white/80 mt-1 flex items-center gap-2">
                  <ApperIcon name="Building2" size={16} />
                  {contact.company}
                </p>
              )}
            </div>
          </div>
<div className="flex gap-3">
<Button 
              onClick={handleSendEmail} 
              variant="purple"
              disabled={sendingEmail}
            >
              <ApperIcon name={sendingEmail ? "Loader2" : "Mail"} size={16} />
              {sendingEmail ? "Sending..." : "Send Email"}
            </Button>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Information */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <ApperIcon name="User" size={20} className="text-primary" />
                Contact Information
              </h3>
              <div className="space-y-4">
                <div>
<label className="text-gray-600 text-sm">Email</label>
                  <p className="text-white mt-1">{contact.email}</p>
                </div>
                {contact.phone && (
                  <div>
                    <label className="text-white/60 text-sm">Phone</label>
                    <p className="text-white mt-1">{contact.phone}</p>
                  </div>
                )}
                {contact.linkedin && (
                  <div>
                    <label className="text-white/60 text-sm">LinkedIn</label>
                    <a
                      href={contact.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-accent transition-colors mt-1 block"
                    >
                      View Profile
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Details */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <ApperIcon name="Calendar" size={20} className="text-primary" />
                Timeline
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-white/60 text-sm">Last Contacted</label>
<p className="text-gray-900 mt-1">
                    {contact.lastContacted
                      ? format(new Date(contact.lastContacted), "MMMM d, yyyy 'at' h:mm a")
                      : "Never"}
                  </p>
                </div>
                <div>
<label className="text-gray-600 text-sm">Created</label>
                  <p className="text-white mt-1">
                    {format(new Date(contact.createdAt), "MMMM d, yyyy")}
                  </p>
                </div>
                <div>
                  <label className="text-white/60 text-sm">Last Updated</label>
<p className="text-gray-900 mt-1">
                    {format(new Date(contact.updatedAt), "MMMM d, yyyy")}
                  </p>
                </div>
              </div>
            </div>

            {/* Notes */}
            {contact.notes && (
              <div className="glass-card p-6 md:col-span-2">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <ApperIcon name="FileText" size={20} className="text-primary" />
                  Notes
                </h3>
                <p className="text-white/80 whitespace-pre-wrap">{contact.notes}</p>
              </div>
            )}

            {/* Tags */}
            {contact.tags && contact.tags.length > 0 && (
              <div className="glass-card p-6 md:col-span-2">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <ApperIcon name="Tag" size={20} className="text-primary" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {contact.tags.map((tag) => (
                    <Badge key={tag} variant="primary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "activity" && (
          <div className="glass-card p-8">
            <Empty
              icon="Activity"
              title="Activity Timeline Coming Soon"
              description="Track all interactions, emails, calls, and meetings with this contact"
            />
          </div>
        )}

        {activeTab === "deals" && (
          <div className="glass-card p-8">
            <Empty
              icon="TrendingUp"
              title="Deal Management Coming Soon"
              description="View and manage all deals associated with this contact"
            />
          </div>
        )}

        {activeTab === "notes" && (
          <div className="glass-card p-8">
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