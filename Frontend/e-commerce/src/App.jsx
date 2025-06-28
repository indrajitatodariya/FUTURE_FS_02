import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar'
import Categories from './components/categories'
import Offers from './components/offers'
import Contentr1 from './components/contentr1'
import Contentr2 from './components/contentr2'
import Contentr3 from './components/contentr3'
import Footer from './components/footer'
import Firstpage from './components/firstpage'

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Firstpage />} />
      <Route path="/main" element={
        <>
      <Navbar />
      <Categories />
      <Offers />
      <Contentr1 />
      <Contentr2 />
      <Contentr3 />
      <Footer />
      </>} />
    </Routes>
     
    </>
  )
}

export default App
