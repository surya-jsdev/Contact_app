import { PhoneIcon, Mail, Pencil, Star, Trash } from 'lucide-react';
import SearchBar from './SearchBar';

function ContactCard({ item, handleDelete, handleEdit, handleToggleFavorite }) {
    return (
        <div className={`Card${item.isFavorite ? ' favorite-card' : ''}`}>
            <div className='avatar' style={{ backgroundColor: item.color }}>
                <p>{item.name.slice(0, 2).toUpperCase()}</p>
            </div>
            <div className='Carditem'>
                <h2>{item.name}</h2>
                <p><PhoneIcon size={10} /> {item.Phone}</p>
                <p><Mail size={10} /> {item.Email}</p>
                <p className="group" style ={{backgroundColor:item.color,color:'white'}}>{item.Group}</p>
                <div>

                    <button onClick={() => handleEdit(item)}><Pencil size={10} /> Edit</button>
                    <button className='delete-contact' onClick={() => handleDelete(item.id)}><Trash size={10} /> Delete</button>
                </div>

            </div>
                    <div>
                    <button
                        className='favorite-toggle'
                        type='button'
                        onClick={() => handleToggleFavorite(item.id)}
                    >
                        <Star size={10} fill={item.isFavorite ? 'currentColor' : 'none'} />

                    </button>
                </div>
        </div>
    )
}

function Cards({ Data, handleDelete, handleEdit, handleToggleFavorite }) {
    const favoriteContacts = Data.filter((contact) => contact.isFavorite)
    const otherContacts = Data.filter((contact) => !contact.isFavorite)

    return (
        <div className='contact-list'>
           <SearchBar contacts={Data}/>
            <section className='favorite-section'>
                <h2>⭐ Favourites</h2>
                <div className='Cards'>
                    {favoriteContacts.map((item) => (
                        <ContactCard key={item.id} item={item} handleDelete={handleDelete} handleEdit={handleEdit} handleToggleFavorite={handleToggleFavorite} />
                    ))}
                </div>
            </section>
            <section className='all-contacts'>
                <h2>All contacts</h2>
                <div className='Cards'>
                    {otherContacts.map((item) => (
                        <ContactCard key={item.id} item={item} handleDelete={handleDelete} handleEdit={handleEdit} handleToggleFavorite={handleToggleFavorite} />
                    ))}
                </div>
            </section>
        </div>
    );

}

export default Cards