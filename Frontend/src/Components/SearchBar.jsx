import { useState } from 'react'
import { Search } from 'lucide-react'
import { Link } from 'react-router-dom'

function SearchBar({ contacts }) {

  const [search, setSearch] = useState('')

  const searchValue = search.toLowerCase() ? contacts.filter((contact) =>
    contact.name.toLowerCase().includes(search.toLowerCase()) ||
    (contact.phone || contact.Phone || '').toLowerCase().includes(search.toLowerCase())
  ) : null


  return (
    <div className='search-container'>
      <div className='contact-search'>
        <span><Search size={16} /></span>
        <input
          type='search'
          placeholder='Search by name or phone'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {search && (
        <div className='search-results'>
          {searchValue.length > 0 ? searchValue.map((contact) => (
            <Link
              className='search-result'
              key={contact.id || contact._id}
              to={`/contact/${contact.id ?? contact._id}`}
            >
              <h3>{contact.name}</h3>
              <p>{contact.phone || contact.Phone}</p>
            </Link>
          )) : <p className='search-result'>No contacts found.</p>}
        </div>
      )}
    </div>
  )
}

export default SearchBar