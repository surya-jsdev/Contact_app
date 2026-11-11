import { Mail, Pencil, PhoneIcon, Star, Trash } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteContact,
  selectContacts,
  selectFavourites,
  toggleFavourite,
} from "../features/contacts/contactsSlice";

function ConatactCard({ favoritesOnly = false }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const contacts = useSelector(favoritesOnly ? selectFavourites : selectContacts);
  const displayedContacts = contacts.filter(
    (contact) =>
      (contact.isFavorite === true || contact.isFavorite === "true") ===
      favoritesOnly
  );

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteContact(id)).unwrap();
    } catch (error) {
      console.error("Failed to delete contact:", error);
    }
  };

  const handleToggleFavourite = async (contact) => {
    try {
      await dispatch(toggleFavourite(contact)).unwrap();
    } catch (error) {
      console.error("Failed to update favourite:", error);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-2.5 max-[480px]:grid-cols-1">
      {displayedContacts.map((contact) => (
        <div
          className={`grid min-h-37.5 w-full max-w-87.5 grid-cols-[34px_minmax(0,1fr)_auto] grid-rows-[minmax(0,1fr)_auto] items-start gap-x-2.5 gap-y-2 rounded-[9px] border border-[#e0e7f1] bg-white p-3 shadow-[0_1px_3px_rgb(23_36_59_/_3%)]${contact.isFavorite === true || contact.isFavorite === "true" ? " border-[#ffd471] bg-[#fffdf6]" : ""}`}
          key={contact.id || contact._id}
        >
          <Link
            className="col-span-full row-start-1 flex min-w-0 gap-2.5 text-inherit no-underline [&:hover_h2]:underline"
            to={`/contact/${contact.id || contact._id}`}
          >
            <div className="flex h-[34px] w-[34px] flex-[0_0_34px] items-center justify-center rounded-full bg-[mediumvioletred] text-center font-bold" style={{ backgroundColor: contact.color }}>
              <p className="text-[0.8rem] text-white">{contact.name.slice(0, 2).toUpperCase()}</p>
            </div>
            <div className="col-[2/-1] row-start-1 flex min-w-0 flex-1 flex-col gap-1">
              <h2 className="flex items-center justify-between gap-2 text-[0.8125rem] font-bold">{contact.name}</h2>
              <p className="text-[0.6875rem]  text-[#59677d] flex items-center gap-[6px]">
                <PhoneIcon size={10} className=""/>+91 {contact.phone || contact.Phone}
              </p>
              <p className="text-[0.6875rem]  text-[#59677d] flex items-center gap-[6px]">
                <Mail size={10} /> {contact.email || contact.Email}
              </p>
              <p
                className="mt-[2px] self-start rounded-full px-2 py-[3px] text-[0.625rem] font-semibold"
                style={{ backgroundColor: contact.color, color: "white" }}
              >
                {contact.group || contact.Group}
              </p>
            </div>
          </Link>
          <div className="col-[2] row-[2] mt-[2px] flex gap-[6px]">
            <button
              className="inline-flex items-center gap-[3px] rounded-[5px] border-0 bg-[#edf2ff] px-2 py-[5px] text-[0.625rem] font-normal text-[#064df3] hover:brightness-[0.96]"
              onClick={() =>
                navigate(`/edit/${contact.id || contact._id}`)
              }
            >
              <Pencil size={10} /> Edit
            </button>
            <button
              className="inline-flex items-center gap-[3px] rounded-[5px] border-0 bg-[#fff0f0] px-2 py-[5px] text-[0.625rem] font-bold text-[#eb040c] hover:brightness-[0.96]"
              onClick={() => handleDelete(contact.id || contact._id)}
            >
              <Trash size={10} /> Delete
            </button>
          </div>
          <div className="col-[3] row-[2] flex gap-[6px]">
            <button
              className={`inline-flex items-center gap-[3px] rounded-[5px] border-0 px-2 py-[5px] text-[0.625rem] font-normal hover:brightness-[0.96] ${contact.isFavorite === true || contact.isFavorite === "true" ? "bg-[#ffe9a8] text-[#805900]" : "bg-[#fff8df] text-[#9a6b00]"}`}
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
        <p className="col-span-full">No contacts.</p>
      )}
    </div>
  );
}

export default ConatactCard;
