import { Link, useNavigate } from "react-router-dom";
import { addContact } from "../Api/contact";
import ContactForm from "../Components/ContactForm";

function AddContact() {
  const navigate = useNavigate();

  const handleAddContact = async (contact) => {
    await addContact(contact);
    navigate("/");
  };

  return (
    <main className="AddNew contact">
      <section className="form-page">
        <button className="Back btn">
          <Link to="/" className="link">
            Back to contacts
          </Link>
        </button>
        <ContactForm AddContact={handleAddContact} />
      </section>
    </main>
  );
}

export default AddContact;
