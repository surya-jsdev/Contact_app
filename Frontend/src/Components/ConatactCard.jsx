import { Mail, Pencil, PhoneIcon, Star, Trash } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useContacts } from "../hooks/useContacts";

function ConatactCard({ favoritesOnly = false }) {
  const navigate = useNavigate();
  const { contacts, deleteContact, toggleFavourite } = useContacts();
  const displayedContacts = contacts.filter(
    (contact) =>
      (contact.isFavorite === true || contact.isFavorite === "true") ===
      favoritesOnly
  );

  const handleDelete = async (id) => {
    try {
      await deleteContact(id);
    } catch (error) {
      console.error("Failed to delete contact:", error);
    }
  };

  const handleToggleFavourite = async (contact) => {
    try {
      await toggleFavourite(contact);
    } catch (error) {
      console.error("Failed to update favourite:", error);
    }
  };

  return (
    <div className="Cards">
      {displayedContacts.map((contact) => (
        <div
          className={`Card${contact.isFavorite === true || contact.isFavorite === "true" ? " favorite-card" : ""}`}
          key={contact.id || contact._id}
        >
          <Link
            className="contact-card-link"
            to={`/contact/${contact.id || contact._id}`}
          >
            <div className="avatar" style={{ backgroundColor: contact.color }}>
              <p>{contact.name.slice(0, 2).toUpperCase()}</p>
            </div>
            <div className="Carditem">
              <h2>{contact.name}</h2>
              <p>
                <PhoneIcon size={10} /> {contact.phone || contact.Phone}
              </p>
              <p>
                <Mail size={10} /> {contact.email || contact.Email}
              </p>
              <p
                className="group"
                style={{ backgroundColor: contact.color, color: "white" }}
              >
                {contact.group || contact.Group}
              </p>
            </div>
          </Link>
          <div className="contact-actions">
            <button
              onClick={() =>
                navigate(`/edit/${contact.id ?? contact._id}`)
              }
            >
              <Pencil size={10} /> Edit
            </button>
            <button
              className="delete-contact"
              onClick={() => handleDelete(contact.id ?? contact._id)}
            >
              <Trash size={10} /> Delete
            </button>
          </div>
          <div className="favorite-actions">
            <button
              className="favorite-toggle"
              type="button"
              aria-label={
                contact.isFavorite
                  ? "Remove from favourites"
                  : "Add to favourites"
              }
              onClick={() => handleToggleFavourite(contact)}
            >
              <Star
                size={14}
                fill={
                  contact.isFavorite === true || contact.isFavorite === "true"
                    ? "currentColor"
                    : "none"
                }
              />
            </button>
          </div>
        </div>
      ))}

      {displayedContacts.length === 0 && (
        <p className="empty-contacts">No contacts.</p>
      )}
    </div>
  );
}

export default ConatactCard;
