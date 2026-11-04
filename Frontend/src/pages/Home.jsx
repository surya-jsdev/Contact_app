import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteContact, getContacts, updateContact } from "../Api/contact";
import ConatactCard from "../Components/ConatactCard";
import Header from "../Components/Header";
import SearchBar from "../Components/SearchBar";

function Home() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState("");
  const favoriteContacts = contacts.filter(
    (contact) => contact.isFavorite === true || contact.isFavorite === "true"
  );
  const otherContacts = contacts.filter(
    (contact) => contact.isFavorite !== true && contact.isFavorite !== "true"
  );

  useEffect(() => {
    let active = true;

    getContacts()
      .then((data) => {
        if (active) {
          setContacts(data);
          setError("");
        }
      })
      .catch((fetchError) => {
        console.error("Error fetching contacts:", fetchError);
        if (active) {
          setError("Failed to load contacts.");
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const handleEditContact = (contact) => {
    navigate(`/edit/${contact.id ?? contact._id}`);
  };

  const handleDeleteContact = async (id) => {
    try {
      await deleteContact(id);
      setContacts((currentContacts) =>
        currentContacts.filter(
          (contact) => String(contact.id ?? contact._id) !== String(id)
        )
      );
    } catch (deleteError) {
      console.error("Error deleting contact:", deleteError);
      setError("Failed to delete contact.");
    }
  };

  const handleToggleFavorite = async (contact) => {
    const id = contact.id ?? contact._id;
    try {
      const updatedContact = await updateContact(id, {
        ...contact,
        isFavorite: !(contact.isFavorite === true || contact.isFavorite === "true")
      });
      setContacts((currentContacts) =>
        currentContacts.map((currentContact) =>
          String(currentContact.id ?? currentContact._id) === String(id)
            ? updatedContact
            : currentContact
        )
      );
    } catch (updateError) {
      console.error("Error updating favourite:", updateError);
      setError("Failed to update favourite.");
    }
  };

  return (
    <>
      <Header Data={contacts} />
      <main className="Home home-page">
        <section className="contact-list">
          <SearchBar contacts={contacts} />
          {error && <p role="alert">{error}</p>}
          {favoriteContacts.length > 0 && (
            <section className="favorite-section">
              <h2>
                <i className="fa-solid fa-star"></i> Favourites
              </h2>
              <ConatactCard
                contacts={favoriteContacts}
                onEdit={handleEditContact}
                onDelete={handleDeleteContact}
                onToggleFavorite={handleToggleFavorite}
              />
            </section>
          )}
          <section className="all-contacts">
            <h2>All contacts</h2>
            <ConatactCard
              contacts={otherContacts}
              onEdit={handleEditContact}
              onDelete={handleDeleteContact}
              onToggleFavorite={handleToggleFavorite}
            />
          </section>
        </section>
      </main>
    </>
  );
}

export default Home;
