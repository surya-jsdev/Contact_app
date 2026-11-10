import { useEffect, useState } from "react";
import ContactsContext from "./ContactsContext";
import {
  getContacts,
  addContact as apiAddContact,
  updateContact as apiUpdateContact,
  deleteContact as apiDeleteContact,
} from "../Api/contact";

export function ContactsProvider({ children }) {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    getContacts()
      .then((data) => {
        if (active) {
          setContacts(data);
          setError("");
        }
      })
      .catch((error) => {
        console.error("Error fetching contacts:", error);
        if (active) {
          setError("Failed to load contacts.");
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const addContact = async (contact) => {
    try {
      const newContact = await apiAddContact(contact);

      setContacts((currentContacts) => [...currentContacts, newContact]);
      setError("");

      return newContact;
    } catch (error) {
      console.error("Error adding contact:", error);
      setError("Failed to add contact.");
      throw error;
    }
  };

  const updateContact = async (id, contact) => {
    try {
      const updatedContact = await apiUpdateContact(id, contact);

      setContacts((currentContacts) =>
        currentContacts.map((currentContact) =>
          String(currentContact.id ?? currentContact._id) === String(id)
            ? updatedContact
            : currentContact
        )
      );
      setError("");

      return updatedContact;
    } catch (error) {
      console.error("Error updating contact:", error);
      setError("Failed to update contact.");
      throw error;
    }
  };

  const deleteContact = async (id) => {
    try {
      await apiDeleteContact(id);

      setContacts((currentContacts) =>
        currentContacts.filter(
          (currentContact) =>
            String(currentContact.id ?? currentContact._id) !== String(id)
        )
      );
      setError("");
    } catch (error) {
      console.error("Error deleting contact:", error);
      setError("Failed to delete contact.");
      throw error;
    }
  };

  const toggleFavourite = async (contact) => {
    const id = contact.id ?? contact._id;

    const updatedContact = {
      ...contact,
      isFavorite: !(
        contact.isFavorite === true ||
        contact.isFavorite === "true"
      ),
    };

    try {
      const savedContact = await apiUpdateContact(
        id,
        updatedContact
      );

      setContacts((currentContacts) =>
        currentContacts.map((currentContact) =>
          String(currentContact.id ?? currentContact._id) === String(id)
            ? savedContact
            : currentContact
        )
      );
      setError("");

      return savedContact;
    } catch (error) {
      console.error("Error updating favourite:", error);
      setError("Failed to update favourite.");
      throw error;
    }
  };

  return (
    <ContactsContext.Provider
      value={{
        contacts,
        loading,
        error,
        addContact,
        updateContact,
        deleteContact,
        toggleFavourite,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
}
