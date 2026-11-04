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

      <Link to="/">Back to contacts</Link>
      <ContactForm AddContact={handleAddContact} />
        </section>
    </main>
  );
}

export default AddContact;
