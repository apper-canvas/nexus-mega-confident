import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import Modal from "@/components/molecules/Modal";
import ContactForm from "@/components/organisms/ContactForm";
import ContactTable from "@/components/organisms/ContactTable";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import contactsService from "@/services/api/contactsService";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadContacts();
  }, []);

  useEffect(() => {
if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const filtered = contacts.filter((contact) =>
        `${contact.first_name_c} ${contact.last_name_c}`.toLowerCase().includes(query) ||
        contact.email_c.toLowerCase().includes(query) ||
        (contact.company_c && contact.company_c.toLowerCase().includes(query)) ||
        (contact.job_title_c && contact.job_title_c.toLowerCase().includes(query))
      );
      setFilteredContacts(filtered);
    } else {
      setFilteredContacts(contacts);
    }
  }, [searchQuery, contacts]);

  const loadContacts = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await contactsService.getAll();
      setContacts(data);
      setFilteredContacts(data);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load contacts");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (formData) => {
    try {
      setFormLoading(true);
      const newContact = await contactsService.create(formData);
      setContacts((prev) => [...prev, newContact]);
      setIsModalOpen(false);
      toast.success("Contact created successfully!");
    } catch (err) {
      toast.error("Failed to create contact");
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdate = async (formData) => {
    try {
      setFormLoading(true);
      const updated = await contactsService.update(editingContact.Id, formData);
      setContacts((prev) =>
        prev.map((c) => (c.Id === editingContact.Id ? updated : c))
      );
      setIsModalOpen(false);
      setEditingContact(null);
      toast.success("Contact updated successfully!");
    } catch (err) {
      toast.error("Failed to update contact");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await contactsService.delete(id);
      setContacts((prev) => prev.filter((c) => c.Id !== id));
      toast.success("Contact deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete contact");
    }
  };

  const openCreateModal = () => {
    setEditingContact(null);
    setIsModalOpen(true);
  };

  if (loading) {
    return <Loading type="table" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadContacts} />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
<h1 className="text-3xl font-bold text-gray-900">Contacts</h1>
          <p className="text-gray-600 mt-1">
            Manage your customer relationships and connections
          </p>
        </div>
        <Button onClick={openCreateModal} variant="primary">
          <ApperIcon name="UserPlus" size={18} />
          Add Contact
        </Button>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <SearchBar
          placeholder="Search contacts by name, email, company..."
          onSearch={setSearchQuery}
        />
      </motion.div>

      {/* Contacts Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {filteredContacts.length === 0 ? (
          <Empty
            icon="Users"
            title={searchQuery ? "No contacts found" : "No contacts yet"}
            description={
              searchQuery
                ? "Try adjusting your search criteria"
                : "Start building your network by adding your first contact"
            }
            actionLabel={!searchQuery ? "Add Your First Contact" : undefined}
            onAction={!searchQuery ? openCreateModal : undefined}
          />
        ) : (
          <ContactTable contacts={filteredContacts} onDelete={handleDelete} />
        )}
      </motion.div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingContact(null);
        }}
        title={editingContact ? "Edit Contact" : "Add New Contact"}
      >
        <ContactForm
          contact={editingContact}
          onSubmit={editingContact ? handleUpdate : handleCreate}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingContact(null);
          }}
          loading={formLoading}
        />
      </Modal>
    </div>
  );
};

export default Contacts;