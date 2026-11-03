import { Mail, Pencil, PhoneIcon, Star, Trash } from "lucide-react";

function ConatactCard({ contacts, Edit, Deletecontact, onToggleFavorite }) {
    return (
            <div className="Cards">
                {contacts.map((contact) => (
                    <div className={`Card${contact.isFavorite === true || contact.isFavorite === "true" ? " favorite-card" : ""}`} key={contact.id || contact._id}>
                        <div className='avatar' style={{ backgroundColor: contact.color }}>
                            <p>{contact.name.slice(0, 2).toUpperCase()}</p>
                        </div>
                        <div className='Carditem'>
                            <h2>{contact.name}</h2>
                            <p><PhoneIcon size={10} /> {contact.phone || contact.Phone}</p>
                            <p><Mail size={10} /> {contact.email || contact.Email}</p>
                            <p className="group">{contact.group || contact.Group}</p>
                            <div>
                                <button onClick={() => Edit(contact)}><Pencil size={10} /> Edit</button>
                                <button className='delete-contact' onClick={() => Deletecontact(contact.id || contact._id)}><Trash size={10} /> Delete</button>
                            </div>
                        </div>
                        <div>
                            <button
                                className='favorite-toggle'
                                type='button'
                                aria-label={contact.isFavorite ? "Remove from favourites" : "Add to favourites"}
                                onClick={() => onToggleFavorite(contact)}
                            >
                                <Star size={14} fill={contact.isFavorite === true || contact.isFavorite === "true" ? 'currentColor' : 'none'} />
                            </button>
                        </div>
                    </div>
                ))}

                {contacts.length === 0 && <p className="empty-contacts">No contacts.</p>}
            </div>
    )
}

export default ConatactCard