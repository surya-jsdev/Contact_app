import { Link } from "react-router-dom";
import ContactForm from "../Components/ContactForm";
import { ArrowLeft } from "lucide-react";

function AddContact() {
  return (
    <main className="AddNew contact">
      <section className="form-page">
        <button className="Back btn">
          <Link to="/" className="link"  >
          <ArrowLeft size={18} style={{marginRight:'4px'}}/>Back to contacts
          </Link>
        </button>
        {/* ConatctForm Component */}
        <ContactForm />
      </section>
    </main>
  );
}

export default AddContact;
