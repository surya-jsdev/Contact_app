import { useEffect, useState } from "react";
import { addContact, deleteContact, getContacts, updateContact } from "./Api/contact";
import ContactForm from "./Components/ContactForm";
import ConatactCard from "./Components/ConatactCard";
import Header from "./Components/Header";
import SearchBar from "./Components/SearchBar";

function App() {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);
  const [successmessage, setSuccessMessage] = useState('')
  const [error, setError] = useState("");
  const favoriteContacts = contacts.filter((contact) => contact.isFavorite === true || contact.isFavorite === "true");
  const otherContacts = contacts.filter((contact) => contact.isFavorite !== true && contact.isFavorite !== "true");

  useEffect(() => {
    getContacts()
      .then(setContacts)
      .catch((fetchError) => {
        console.error("Error fetching contacts:", fetchError);
        setError("Failed to load contacts.");
      });
  }, []);

  const handleAddContact = async (contact) => {
    const newContact = await addContact(contact);
    setContacts((currentContacts) => [...currentContacts, newContact]);
    setSuccessMessage("Contact Added SuccessFully");
    setError("");
  };

  const handleUpdateContact = async (id, contact) => {
    const updatedContact = await updateContact(id, contact);
    setContacts((currentContacts) =>
      currentContacts.map((currentContact) =>
        (currentContact.id ?? currentContact._id) === id
          ? updatedContact
          : currentContact
      )
    );
  };

  const handleDeleteContact = async (id) => {
    await deleteContact(id);
    setContacts((currentContacts) =>
      currentContacts.filter((contact) => (contact.id ?? contact._id) !== id)
    );
  };

  // handle Toggle
  const handleToggleFavorite = async (contact) => {
    const id = contact.id ?? contact._id;
    const updatedContact = await updateContact(id, {
      ...contact,
      isFavorite: !contact.isFavorite
    });
    setContacts((currentContacts) =>
      currentContacts.map((currentContact) =>
        (currentContact.id ?? currentContact._id) === id
          ? updatedContact
          : currentContact
      )
    );
  };

  return (
    <>
      <Header Data={contacts} />
      <main className="Home">
        <ContactForm
          AddContact={handleAddContact}
          editingContact={editingContact}
          UpdateContact={handleUpdateContact}
          onCancelEdit={() => setEditingContact(null)}
        />
        <section className="contact-list">
          <SearchBar contacts={contacts} />
          {successmessage && (
            <p className="success-message" role="status">
              {successmessage}
            </p>
          )}
          {error && <p role="alert">{error}</p>}
          {favoriteContacts.length > 0 && (
            <section className="favorite-section">
              <h2>⭐ Favourites</h2>
              <ConatactCard
                contacts={favoriteContacts}
                Editcontact={setEditingContact}
                Deletecontact={handleDeleteContact}
                onToggleFavorite={handleToggleFavorite}
              />
            </section>
          )}
          <section className="all-contacts">
            <h2>All contacts</h2>
            <ConatactCard
              contacts={otherContacts}
              Editcontact={setEditingContact}
              Deletecontact={handleDeleteContact}
              onToggleFavorite={handleToggleFavorite}
            />
          </section>
        </section>
      </main>
    </>
  );
}

export default App;
