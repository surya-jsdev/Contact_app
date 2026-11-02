import { useState } from 'react'

function ContactForm({ AddContact, editingContact, UpdateContact, onCancelEdit }) {

    const [formData, setFormData] = useState(() => ({
        name: editingContact?.name ?? '',
        phone: editingContact?.Phone ?? '',
        email: editingContact?.Email ?? '',
        group: editingContact?.Group ?? 'Friends'
    }))

    // handleForm Data
    const handleInput = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

// handle Savedata
    const handleSave = (e) => {
        e.preventDefault()

        const contact = {
            id: editingContact?.id ?? Date.now(),
            name: formData.name,
            Phone: formData.phone,
            Email: formData.email,
            Group: formData.group,
            color: editingContact?.color ?? '#60a772',
            isFavorite: editingContact?.isFavorite ?? false
        }

        if (editingContact) {
            UpdateContact(contact)
            onCancelEdit()
        } else {
            AddContact(contact)
        }

        setFormData({
            name: '',
            phone: '',
            email: '',
            group: 'Friends'
        })
    }

    return (
        <>
            <div className='contact'>
                <form onSubmit={handleSave}>
                    <p>{editingContact ? 'Edit Contact' : 'Add Contact'}</p>
                    <div className='formlabel'>
                        <label htmlFor="name">Name</label>
                        <input id="name" type='text' placeholder='Fullname' name='name' value={formData.name} onChange={handleInput} required />
                    </div>
                    <div className='formlabel'>
                        <label htmlFor="phone">Phone</label>
                        <input id="phone" type='tel' placeholder='+91' name="phone" value={formData.phone} onChange={handleInput} required />
                    </div>
                    <div className='formlabel'>
                        <label htmlFor="email">Email</label>
                        <input id="email" type='email' placeholder='name@gmail.com' name="email" value={formData.email} onChange={handleInput}/>
                    </div>
                    <div className='formlabel'>
                        <label htmlFor="group">Group</label>
                        <select id="group" name="group" value={formData.group} onChange={handleInput}>
                            <option value="Friends">
                                Friends
                            </option>
                            <option value="Family">
                                Family
                            </option>
                            <option value="Work">
                                Work
                            </option>
                        </select>
                    </div>
                    <div className="formlabel">
                        <button className='btn' type="submit">
                            {editingContact ? 'Update Contact' : 'Save Contact'}
                        </button>
                        {editingContact && (
                            <button className='btn' type="button" onClick={onCancelEdit}>
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </>
    )
}

export default ContactForm