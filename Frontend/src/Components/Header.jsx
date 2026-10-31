import React from 'react'


function Header({Data}) {
  return (

   <>
   <div className='header'>
        <h2>Contact Book</h2>
        <p>{Data.length} Contacts</p>
   </div>
   </>
  )
}

export default Header