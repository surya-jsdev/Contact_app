

const API_URL = "http://localhost:3000/contacts";

// Get ContactList

export const getContacts = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error("Failed to get contacts")
        }
        return await response.json();

    } catch (error) {
        console.error("GET Error:", error.message);
        throw error;
    }
};

// Post Contact

export const addContact = async (contact) => {
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
        return await response.json();

    } catch (error) {
        console.error("POST Error:", error.message);
        throw error;
    }
}

// PATCH Contact

export const updateContact = async (id, contact) => {
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

        return await response.json();

    } catch (error) {
        console.error("PATCH Error:", error.message);
        throw error;
    }
};

// DELETE Contact

export const deleteContact = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Failed to delete contact");
        }

        return true;

    } catch (error) {
        console.error("DELETE Error:", error.message);
        throw error;
    }
};
