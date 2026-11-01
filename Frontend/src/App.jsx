
import Header from './Components/Header'
import ContactForm from './Components/ContactForm'
import Cards from './Components/Cards'
import Data from './data/db.json'


function App() {
  return (
  <>
  <Header Data={Data}/>
  <section className='Home'>
  <ContactForm/>
  <Cards Data={Data}/>
  </section>
  </>
  )
}

export default App