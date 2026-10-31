import React from 'react'

function ContactForm() {
    return (
        <>
            <div className='contact'>
                <form>
                    <p>Add Contact</p>
                    <div className='formlabel'>
                        <label htmlFor="name">Name</label>
                        <input type='text' placeholder='Fullname' />
                    </div>
                    <div className='formlabel'>
                        <label htmlFor="phone">Phone</label>
                        <input type='text' placeholder='+91' />
                    </div>
                    <div className='formlabel'>
                        <label htmlFor="email">Email</label>
                        <input type='email' placeholder='name@gmail.com' />
                    </div>
                    <div className='formlabel'>
                        <label htmlFor="group">Group</label>
                        <select name="group" >
                            <option value="Friend">
                                Friends
                            </option>
                            <option value="Friend">
                                Family
                            </option>
                            <option value="Friend">
                                Work
                            </option>
                        </select>
                    </div>
                    <div className="formlabel">
                        <button className='btn'>Save Contact</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ContactForm