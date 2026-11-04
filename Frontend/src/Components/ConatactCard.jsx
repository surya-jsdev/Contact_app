import { Mail, Pencil, PhoneIcon, Star, Trash } from "lucide-react";
import { Link } from "react-router-dom";

function ConatactCard({ contacts, onEdit, onDelete, onToggleFavorite }) {
  return (
    <div className="Cards">
      {contacts.map((contact) => (
        <div
          className={`Card${contact.isFavorite === true || contact.isFavorite === "true" ? " favorite-card" : ""}`}
          key={contact.id || contact._id}
        >
          <Link
            className="contact-card-link"
            to={`/contact/${contact.id ?? contact._id}`}
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
            <button onClick={() => onEdit(contact)}>
              <Pencil size={10} /> Edit
            </button>
            <button
              className="delete-contact"
              onClick={() => onDelete(contact.id || contact._id)}
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
              onClick={() => onToggleFavorite(contact)}
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

      {contacts.length === 0 && <p className="empty-contacts">No contacts.</p>}
    </div>
  );
}

export default ConatactCard;
