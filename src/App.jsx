import { useState } from 'react'
import { Route, Routes, Outlet } from 'react-router-dom'
import './App.css'

import GuestHeader from './HeaderFooter/Header/GuestHeader.jsx'
import Footer from './HeaderFooter/Footer/Footer.jsx'

import ListGame from './UserComponent/Game/ListGame'
import TypePi from './UserComponent/Game/TypePi'

import ListJapanese from './UserComponent/Japanese/ListJapanese.jsx'
import JapaneseKanji from './UserComponent/Japanese/JapaneseKanji.jsx'
import JapaneseVerb from './UserComponent/Japanese/JapaneseVerb.jsx'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<GuestHeader />} >

          <Route path='game' element={<ListGame />} />
          <Route path='game/typepi' element={<TypePi />} />

          <Route path='japanese' element={<ListJapanese />} >
            <Route path='kanji' element={<JapaneseKanji />} />
            <Route path='verb' element={<JapaneseVerb />} />
          </Route>

        </Route>
      </Routes>
      <Footer />
    </>
  )
}

export default App
