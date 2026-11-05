
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContacts } from "../hooks/useContacts";
import { useToast } from "../context/ToastContext";

function ContactForm({
    editingContact
}) {
    const navigate = useNavigate();
    const { addContact, updateContact } = useContacts();
    const showToast = useToast();
    const [submitError, setSubmitError] = useState("");
    const [formData, setFormData] = useState(() => ({
        name: editingContact?.name || "",
        phone: editingContact?.phone || editingContact?.Phone || "",
        email: editingContact?.email || editingContact?.Email || "",
        group: editingContact?.group || editingContact?.Group || "Friends"
    }));

    // Handle input changes
    const handleInput = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle save and update
    const handleSave = async (e) => {
        e.preventDefault();
        setSubmitError("");

        const contact = {
            ...formData,
            color: editingContact?.color || "#60a772",
            isFavorite: editingContact?.isFavorite || false
        };

        try {
            if (editingContact) {
                const id = editingContact.id || editingContact._id;
                await updateContact(id, contact);
                showToast("Contact updated successfully.");
                navigate(`/contact/${id}`);
            } else {
                await addContact(contact);
                showToast("Contact added successfully.");
                navigate("/");
            }

            setFormData({
                name: "",
                phone: "",
                email: "",
                group: "Friends"
            });

        } catch (error) {
            console.error("Contact save error:", error);
            setSubmitError(error.message || "Failed to save contact.");
        }
    };

    return (
        <>
            <div className="contact">
                <form onSubmit={handleSave}>

                    <p>
                        {editingContact ? "Edit Contact" : "Add Contact"}
                    </p>
                    {submitError && <p role="alert">{submitError}</p>}

                    <div className="formlabel">
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Fullname"
                            name="name"
                            value={formData.name}
                            onChange={handleInput}
                            required
                        />
                    </div>

                    <div className="formlabel">
                        <label htmlFor="phone">Phone</label>
                        <input
                            id="phone"
                            type="tel"
                            placeholder="+91"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInput}
                            required
                        />
                    </div>

                    <div className="formlabel">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="name@gmail.com"
                            name="email"
                            value={formData.email}
                            onChange={handleInput}
                        />
                    </div>

                    <div className="formlabel">
                        <label htmlFor="group">Group</label>
                        <select
                            id="group"
                            name="group"
                            value={formData.group}
                            onChange={handleInput}
                        >
                            <option value="Friends">Friends</option>
                            <option value="Family">Family</option>
                            <option value="Work">Work</option>
                        </select>
                    </div>

                    <div className="formlabel">
                        <button className="btn" type="submit">
                            {editingContact
                                ? "Update Contact"
                                : "Save Contact"}
                        </button>

                        {editingContact && (
                            <button
                                className="btn"
                                type="button"
                                onClick={() =>
                                    navigate(
                                        `/contact/${editingContact.id ?? editingContact._id}`
                                    )
                                }
                            >
                                Cancel
                            </button>
                        )}
                    </div>

                </form>
            </div>
        </>
    );
}

export default ContactForm;
