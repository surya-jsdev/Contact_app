
import { Search, PhoneIcon, Mail,Pencil, Trash } from 'lucide-react';

function ContactCard({ item, favorite = false }) {
    return (
        <div key={item.id} className={`Card${favorite ? ' favorite-card' : ''}`}>
            <div className='avatar' style={{ backgroundColor: item.color }}>
                <p>{item.name.slice(0, 2).toUpperCase()}</p>
            </div>
            <div className='Carditem'>
                <h2>{item.name}</h2>
                <p><PhoneIcon size={10} /> {item.Phone}</p>
                <p><Mail size={10} /> {item.Email}</p>
                <p className="group" style ={{backgroundColor:item.color,color:'white'}}>{item.Group}</p>
                <div>
                    <button><Pencil size={10} /> Edit</button>
                    <button><Trash size={10} /> Delete</button>
                </div>
            </div>
        </div>
    )
}

function Cards({ Data }) {
    return (
        <div className='contact-list'>
            <div className='contact-search'>
                <span><Search size={16} /></span>
                <input type='search' placeholder='Search by name or phone' />
            </div>
            <section className='favorite-section'>
                <h2>⭐ Favourites</h2>
                <div className='Cards'>
                    {Data.slice(0, 2).map((item) => (
                        <ContactCard key={item.id} item={item} favorite />
                    ))}
                </div>
            </section>
            <section className='all-contacts'>
                <h2>All contacts</h2>
                <div className='Cards'>
                    {Data.slice(2, 7).map((item) => (
                        <ContactCard key={item.id} item={item} />
                    ))}
                </div>
            </section>
        </div>
    );

}

export default Cards