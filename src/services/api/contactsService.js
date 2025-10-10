import contactsData from "../mockData/contacts.json";

let contacts = [...contactsData];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const contactsService = {
  getAll: async () => {
    await delay(300);
    return [...contacts];
  },

  getById: async (id) => {
    await delay(200);
    const contact = contacts.find((c) => c.Id === parseInt(id));
    if (!contact) {
      throw new Error("Contact not found");
    }
    return { ...contact };
  },

  create: async (contactData) => {
    await delay(400);
    const maxId = contacts.reduce((max, c) => Math.max(max, c.Id), 0);
    const newContact = {
      ...contactData,
      Id: maxId + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastContacted: new Date().toISOString(),
    };
    contacts.push(newContact);
    return { ...newContact };
  },

  update: async (id, contactData) => {
    await delay(400);
    const index = contacts.findIndex((c) => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Contact not found");
    }
    contacts[index] = {
      ...contacts[index],
      ...contactData,
      Id: parseInt(id),
      updatedAt: new Date().toISOString(),
    };
    return { ...contacts[index] };
  },

  delete: async (id) => {
    await delay(300);
    const index = contacts.findIndex((c) => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Contact not found");
    }
    contacts.splice(index, 1);
    return { success: true };
  },
};

export default contactsService;