const { ApperClient } = window.ApperSDK;
const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

const TABLE_NAME = 'contact_c';

const contactsService = {
  getAll: async () => {
    try {
      const params = {
        fields: [
          { "field": { "Name": "Id" } },
          { "field": { "Name": "Name" } },
          { "field": { "Name": "first_name_c" } },
          { "field": { "Name": "last_name_c" } },
          { "field": { "Name": "email_c" } },
          { "field": { "Name": "phone_c" } },
          { "field": { "Name": "company_c" } },
          { "field": { "Name": "job_title_c" } },
          { "field": { "Name": "linkedin_c" } },
          { "field": { "Name": "notes_c" } },
          { "field": { "Name": "tags_c" } },
          { "field": { "Name": "last_contacted_c" } },
          { "field": { "Name": "image_url_c" } },
          { "field": { "Name": "CreatedOn" } },
          { "field": { "Name": "ModifiedOn" } }
        ],
        orderBy: [{ "fieldName": "Id", "sorttype": "DESC" }],
        pagingInfo: { "limit": 1000, "offset": 0 }
      };

      const response = await apperClient.fetchRecords(TABLE_NAME, params);

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching contacts:", error?.response?.data?.message || error);
      return [];
    }
  },

  getById: async (id) => {
    try {
      const params = {
        fields: [
          { "field": { "Name": "Id" } },
          { "field": { "Name": "Name" } },
          { "field": { "Name": "first_name_c" } },
          { "field": { "Name": "last_name_c" } },
          { "field": { "Name": "email_c" } },
          { "field": { "Name": "phone_c" } },
          { "field": { "Name": "company_c" } },
          { "field": { "Name": "job_title_c" } },
          { "field": { "Name": "linkedin_c" } },
          { "field": { "Name": "notes_c" } },
          { "field": { "Name": "tags_c" } },
          { "field": { "Name": "last_contacted_c" } },
          { "field": { "Name": "image_url_c" } },
          { "field": { "Name": "CreatedOn" } },
          { "field": { "Name": "ModifiedOn" } }
        ]
      };

      const response = await apperClient.getRecordById(TABLE_NAME, parseInt(id), params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message || "Contact not found");
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching contact ${id}:`, error?.response?.data?.message || error);
      throw error;
    }
  },

  create: async (contactData) => {
    try {
      const payload = {
        records: [{
          first_name_c: contactData.first_name_c || "",
          last_name_c: contactData.last_name_c || "",
          email_c: contactData.email_c || "",
          phone_c: contactData.phone_c || "",
          company_c: contactData.company_c || "",
          job_title_c: contactData.job_title_c || "",
          linkedin_c: contactData.linkedin_c || "",
          notes_c: contactData.notes_c || "",
          tags_c: contactData.tags_c || "",
          last_contacted_c: contactData.last_contacted_c || new Date().toISOString(),
          image_url_c: contactData.image_url_c || ""
        }]
      };

      const response = await apperClient.createRecord(TABLE_NAME, payload);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);

        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} records:${JSON.stringify(failed)}`);
        }

        return successful[0]?.data;
      }

      return response.data;
    } catch (error) {
      console.error("Error creating contact:", error?.response?.data?.message || error);
      throw error;
    }
  },

  update: async (id, contactData) => {
    try {
      const payload = {
        records: [{
          Id: parseInt(id),
          first_name_c: contactData.first_name_c,
          last_name_c: contactData.last_name_c,
          email_c: contactData.email_c,
          phone_c: contactData.phone_c,
          company_c: contactData.company_c,
          job_title_c: contactData.job_title_c,
          linkedin_c: contactData.linkedin_c,
          notes_c: contactData.notes_c,
          tags_c: contactData.tags_c,
          last_contacted_c: contactData.last_contacted_c,
          image_url_c: contactData.image_url_c
        }]
      };

      const response = await apperClient.updateRecord(TABLE_NAME, payload);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);

        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} records:${JSON.stringify(failed)}`);
        }

        return successful[0]?.data;
      }

      return response.data;
    } catch (error) {
      console.error(`Error updating contact ${id}:`, error?.response?.data?.message || error);
      throw error;
    }
  },

  updateAvatar: async (id, imageUrl) => {
    try {
      const payload = {
        records: [{
          Id: parseInt(id),
          image_url_c: imageUrl
        }]
      };

      const response = await apperClient.updateRecord(TABLE_NAME, payload);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);

        if (failed.length > 0) {
          console.error(`Failed to update avatar:${JSON.stringify(failed)}`);
        }

        return successful[0]?.data;
      }

      return response.data;
    } catch (error) {
      console.error(`Error updating avatar for contact ${id}:`, error?.response?.data?.message || error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const payload = {
        RecordIds: [parseInt(id)]
      };

      const response = await apperClient.deleteRecord(TABLE_NAME, payload);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failed = response.results.filter(r => !r.success);

        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} records:${JSON.stringify(failed)}`);
          throw new Error("Failed to delete contact");
        }
      }

      return { success: true };
    } catch (error) {
      console.error(`Error deleting contact ${id}:`, error?.response?.data?.message || error);
      throw error;
    }
  },
};

export default contactsService;