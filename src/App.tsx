import './styles.css'
import { Logo } from './components/Logo/Logo'
import { Profile } from './components/Profile/Profile'
import { RestaurantView } from './components/RestaurantView/RestaurantView'

function App() {
  return (
    <>
      <header>
        <Logo/>
        <Profile/>
      </header>
      <main>
        <div className='app'>
          <section>
            <RestaurantView/>
          </section>
        </div>
      </main>
      <footer>
        <p>Privacy Policy</p>
        <p className="corporation">2022 Eats</p>
        <p>Terms Of Service</p>
      </footer>
    </>
  )
}

export default App
