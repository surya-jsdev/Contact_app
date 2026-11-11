
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    addContact,
    selectContacts,
    updateContact,
} from "../features/contacts/contactsSlice";
import { useToast } from "../hooks/useToast";

function ContactForm({editingContact}) 
{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const contacts = useSelector(selectContacts);
    const showToast = useToast();
    const [submitError, setSubmitError] = useState("");
    const [validationErrors, setValidationErrors] = useState({});
    const [formData, setFormData] = useState(() => ({
        name: editingContact?.name || "",
        phone: editingContact?.phone || editingContact?.Phone || "",
        email: editingContact?.email || editingContact?.Email || "",
        group: editingContact?.group || editingContact?.Group || "Friends"
    }));

    const handleInput = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
        setValidationErrors((prev) => ({
            ...prev,
            [name]: ""
        }));
    };

    const validateForm = () => {
        const errors = {};
        const name = formData.name.trim();
        const phone = formData.phone.trim();
        const email = formData.email.trim();

        if (!name) {
            errors.name = "Name is required";
        } else if (name.length < 2) {
            errors.name = "Name must be at least 2 characters";
        }

        if (!/^\d{10}$/.test(phone)) {
            errors.phone = "Phone must contain exactly 10 digits";
        } else if (contacts.some((contact) => {
            const contactId = contact.id || contact._id;
            const editingId = editingContact?.id || editingContact?._id;
            const contactPhone = String(contact.phone || contact.Phone || "").trim();
            const isEditingContact =
                editingContact && String(contactId) === String(editingId);

            return !isEditingContact && contactPhone === phone;
        })) {
            errors.phone = "This phone number is already in use";
        }

        if (!email) {
            errors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.email = "Enter a valid email";
        }

        if (!formData.group.trim()) {
            errors.group = "Group is required";
        }

        return errors;
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSubmitError("");
        const errors = validateForm();
        setValidationErrors(errors);
        if (Object.keys(errors).length > 0) {
            return;
        }
        const contact = {
            ...formData,
            name: formData.name.trim(),
            phone: formData.phone.trim(),
            email: formData.email.trim(),
            color: editingContact?.color || "#60a772",
            isFavorite: editingContact?.isFavorite || false
        };

        try {
            if (editingContact) {
                const id = editingContact.id || editingContact._id;
                await dispatch(updateContact({ id, contact })).unwrap();
                showToast("Contact updated successfully.");
                navigate(`/contact/${id}`);
            } else {
                await dispatch(addContact(contact)).unwrap();
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
            <div className="rounded-xl border border-[#e0e7f1] bg-white p-[18px_16px] shadow-[0_2px_8px_rgb(23_36_59_/_5%)]">
                <form className="flex flex-col gap-3" onSubmit={handleSave} noValidate>

                    <p className="mb-[2px] text-base font-bold">
                        {editingContact ? "Edit Contact" : "Add Contact"}
                    </p>
                    {submitError && <p className="mb-[2px] text-red-700" role="alert">{submitError}</p>}

                    <div className="flex flex-col gap-[6px]">
                        <label className="text-[0.85rem] text-[#56647a]" htmlFor="name">Name</label>
                        <input
                            id="name"
                            type="text"
                            className={`min-h-[34px] w-full rounded-[7px] border bg-white px-[11px] py-[9px] text-[#17243b] placeholder:text-[#8a95a6] focus:outline-[3px] focus:outline-[#2861e8]/15 ${validationErrors.name ? "border-red-500 focus:border-red-500" : "border-[#d6deeb] focus:border-[#2861e8]"}`}
                            placeholder="Fullname"
                            name="name"
                            value={formData.name}
                            onChange={handleInput}

                            minLength={2}

                        />
                        {validationErrors.name && <p id="name-error" className="text-sm text-red-700" role="alert">{validationErrors.name}</p>}
                    </div>

                    <div className="flex flex-col gap-[6px]">
                        <label className="text-[0.85rem] text-[#56647a]" htmlFor="phone">Phone</label>
                        <input
                            id="phone"
                            type="tel"
                            className={`min-h-[34px] w-full rounded-[7px] border bg-white px-[11px] py-[9px] text-[#17243b] placeholder:text-[#8a95a6] focus:outline-[3px] focus:outline-[#2861e8]/15 ${validationErrors.phone ? "border-red-500 focus:border-red-500" : "border-[#d6deeb] focus:border-[#2861e8]"}`}
                            placeholder="+91"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInput}


                            inputMode="numeric"

                        />
                        {validationErrors.phone && <p id="phone-error" className="text-sm text-red-700" role="alert">{validationErrors.phone}</p>}
                    </div>

                    <div className="flex flex-col gap-[6px]">
                        <label className="text-[0.85rem] text-[#56647a]" htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            className={`min-h-[34px] w-full rounded-[7px] border bg-white px-[11px] py-[9px] text-[#17243b] placeholder:text-[#8a95a6] focus:outline-[3px] focus:outline-[#2861e8]/15 ${validationErrors.email ? "border-red-500 focus:border-red-500" : "border-[#d6deeb] focus:border-[#2861e8]"}`}
                            placeholder="name@gmail.com"
                            name="email"
                            value={formData.email}
                            onChange={handleInput}


                        />
                        {validationErrors.email && <p id="email-error" className="text-sm text-red-700" role="alert">{validationErrors.email}</p>}
                    </div>

                    <div className="flex flex-col gap-[6px]">
                        <label className="text-[0.85rem] text-[#56647a]" htmlFor="group">Group</label>
                        <select
                            className={`min-h-[34px] w-full rounded-[7px] border bg-white px-[11px] py-[9px] text-[#17243b] focus:outline-[3px] focus:outline-[#2861e8]/15 ${validationErrors.group ? "border-red-500 focus:border-red-500" : "border-[#d6deeb] focus:border-[#2861e8]"}`}
                            id="group"
                            name="group"
                            value={formData.group}
                            onChange={handleInput}


                        >
                            <option value="Friends">Friends</option>
                            <option value="Family">Family</option>
                            <option value="Work">Work</option>
                        </select>
                        {validationErrors.group && <p id="group-error" className="text-sm text-red-700" role="alert">{validationErrors.group}</p>}
                    </div>

                    <div className="flex flex-col gap-[6px]">
                        <button className="min-h-[34px] cursor-pointer rounded-[5px] border-0 bg-[#2861e8] p-[6px] text-white" type="submit">
                            {editingContact
                                ? "Update Contact"
                                : "Save Contact"}
                        </button>

                        {editingContact && (
                            <button
                                className="min-h-[34px] cursor-pointer rounded-[5px] border-0 bg-[#2861e8] p-[6px] text-white"
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
