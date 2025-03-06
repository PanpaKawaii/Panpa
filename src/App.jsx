import { Route, Routes } from 'react-router-dom'
import './App.css'

import GuestHeader from './UserComponent/HeaderFooter/Header/GuestHeader.jsx'
import Footer from './UserComponent/HeaderFooter/Footer/Footer.jsx'

import ListGame from './UserComponent/Game/ListGame'
import TypePi from './UserComponent/Game/TypePi'

import ListJapanese from './UserComponent/Japanese/ListJapanese.jsx'
import JapaneseKanji from './UserComponent/Japanese/JapaneseKanji.jsx'
import JapaneseVerb from './UserComponent/Japanese/JapaneseVerb.jsx'
import HomeContent from './UserComponent/Home/HomeContent.jsx'

function App() {

  return (
    <>
      <GuestHeader />
      <Routes>

        <Route path='/' element={<HomeContent />} />
        <Route path='game' element={<ListGame />} />
        <Route path='game/typepi' element={<TypePi />} />

        <Route path='japanese' element={<ListJapanese />} >
          <Route path='kanji' element={<JapaneseKanji />} />
          <Route path='verb' element={<JapaneseVerb />} />
        </Route>

      </Routes>
      <Footer />
    </>
  )
}

export default App
