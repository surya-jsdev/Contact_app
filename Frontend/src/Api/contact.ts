

const configuredApiUrl = `${import.meta.env.VITE_API_URL}`.replace(/\/+$/, "");
const API_URL = `${configuredApiUrl.replace(/(?:\/contacts)+$/i, "")}/contacts`;
// interface
export interface Contact {
  id?: string;
  _id?:  string;
  name: string;
  phone?: string;
  Phone?: string;
  email?: string;
  Email?: string;
  group?: string;
  Group?: string;
  color?: string;
  isFavorite?: boolean | string;
}
// omit id
export type ContactInput = Omit<Contact, "id" | "_id">;

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : `Unknown error: ${String(error)}`;
}

// Get ContactList

export const getContacts = async (): Promise<Contact[]> => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Failed to get contacts: ${response.status} ${response.statusText}`);
        }
        return await response.json() as Contact[];

    } catch (error) {
        console.error("Failed:", getErrorMessage(error));
        throw error;
    }
};
// get by Id
export const getContactById = async (id: string): Promise<Contact> => {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) {
            throw new Error("Failed to get contact")
        }
        return await response.json() as Contact;

    } catch (error) {
        console.error("Failed:", getErrorMessage(error));
        throw error;
    }
};

// Post Contact
export const addContact = async (contact: ContactInput): Promise<Contact> => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact)
        });
        if (!response.ok) {
            throw new Error("Failed to add contact")
        }
        return await response.json() as Contact;

    } catch (error) {
        console.error("POST Error:", getErrorMessage(error));
        throw error;
    }
}

// PATCH Contact

export const updateContact = async (id: string, contact: ContactInput): Promise<Contact> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(contact)
        });

        if (!response.ok) {
            throw new Error("Failed to update contact");
        }

        return await response.json() as Contact;

    } catch (error) {
        console.error("PATCH Error:", getErrorMessage(error));
        throw error;
    }
};

// DELETE Contact by id

export const deleteContact = async (id: string): Promise<boolean> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Failed to delete contact");
        }

        return true;

    } catch (error) {
        console.error("DELETE Error:", getErrorMessage(error));
        throw error;
    }
};
