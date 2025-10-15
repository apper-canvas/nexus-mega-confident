import { useState, useEffect } from "react";
import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";
import Button from "@/components/atoms/Button";

const ContactForm = ({ contact, onSubmit, onCancel, loading }) => {
const [formData, setFormData] = useState({
    first_name_c: "",
    last_name_c: "",
    email_c: "",
    phone_c: "",
    company_c: "",
    job_title_c: "",
    linkedin_c: "",
    notes_c: "",
    tags_c: [],
  });

  const [errors, setErrors] = useState({});
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
if (contact) {
      setFormData({
        first_name_c: contact.first_name_c || "",
        last_name_c: contact.last_name_c || "",
        email_c: contact.email_c || "",
        phone_c: contact.phone_c || "",
        company_c: contact.company_c || "",
        job_title_c: contact.job_title_c || "",
        linkedin_c: contact.linkedin_c || "",
        notes_c: contact.notes_c || "",
        tags_c: contact.tags_c ? contact.tags_c.split(',').filter(Boolean) : [],
      });
    }
  }, [contact]);

  const validateForm = () => {
    const newErrors = {};

if (!formData.first_name_c.trim()) {
      newErrors.first_name_c = "First name is required";
    }
    if (!formData.last_name_c.trim()) {
      newErrors.last_name_c = "Last name is required";
    }
    if (!formData.email_c.trim()) {
      newErrors.email_c = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email_c)) {
      newErrors.email_c = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleAddTag = () => {
if (tagInput.trim() && !formData.tags_c.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags_c: [...prev.tags_c, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
setFormData((prev) => ({
      ...prev,
      tags_c: prev.tags_c.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
if (validateForm()) {
      const submissionData = {
        ...formData,
        tags_c: formData.tags_c.join(',')
      };
      onSubmit(submissionData);
    }
  };

  return (
<form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="First Name"
name="first_name_c"
          value={formData.first_name_c}
          onChange={handleChange}
          error={errors.first_name_c}
          required
          autoFocus
        />
        <Input
          label="Last Name"
          name="last_name_c"
          value={formData.last_name_c}
          onChange={handleChange}
          error={errors.last_name_c}
          required
        />
      </div>

<Input
        label="Email"
        name="email_c"
        type="email"
        value={formData.email_c}
        onChange={handleChange}
        error={errors.email_c}
        required
      />

      <Input
label="Phone"
        name="phone_c"
        type="tel"
        value={formData.phone_c}
        onChange={handleChange}
        placeholder="+1 (555) 123-4567"
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
label="Company"
          name="company_c"
          value={formData.company_c}
          onChange={handleChange}
        />
        <Input
          label="Job Title"
          name="job_title_c"
          value={formData.job_title_c}
          onChange={handleChange}
        />
      </div>

      <Input
label="LinkedIn Profile"
        name="linkedin_c"
        type="url"
        value={formData.linkedin_c}
        onChange={handleChange}
        placeholder="https://linkedin.com/in/username"
      />

      <Textarea
label="Notes"
        name="notes_c"
        value={formData.notes_c}
        onChange={handleChange}
        rows={4}
        placeholder="Add any additional notes about this contact..."
      />

<div className="space-y-1.5">
        <label className="block text-sm font-medium text-white/80">Tags</label>
        <div className="flex gap-2">
          <Input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
            placeholder="Add a tag and press Enter"
            className="flex-1"
          />
          <Button type="button" onClick={handleAddTag} variant="secondary">
            Add
          </Button>
        </div>
{formData.tags_c.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.tags_c.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1 bg-primary/20 text-primary rounded-full text-sm border border-primary/30"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="hover:text-white transition-colors"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" variant="primary" loading={loading} className="flex-1">
          {contact ? "Update Contact" : "Create Contact"}
        </Button>
        <Button type="button" onClick={onCancel} variant="secondary">
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;