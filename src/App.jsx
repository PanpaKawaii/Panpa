import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, Routes } from 'react-router-dom'
import './App.css'

import Footer from './UserComponent/HeaderFooter/Footer/Footer.jsx'
import GuestHeader from './UserComponent/HeaderFooter/Header/GuestHeader.jsx'

import HomeContent from './UserComponent/Home/HomeContent.jsx'

import ListGame from './UserComponent/Game/ListGame.jsx'
import Minesweeper from './UserComponent/Game/Minesweeper'
import WhatIsThePassword from './UserComponent/Game/WhatIsThePassword'
import Caro from './UserComponent/Game/Caro'
import Chess from './UserComponent/Game/Chess'
import Tetris from './UserComponent/Game/Tetris'
import SolveTheMaze from './UserComponent/Game/SolveTheMaze'
import GenerateMaze from './UserComponent/Game/GenerateMaze'
import TypePi from './UserComponent/Game/TypePi'
import RandomCard from './UserComponent/Game/RandomCard'
import ToDoList from './UserComponent/Game/ToDoList'
import TestObject from './UserComponent/Game/TestObject'

import JapaneseKanji from './UserComponent/Japanese/JapaneseKanji.jsx'
import JapaneseVerb from './UserComponent/Japanese/JapaneseVerb.jsx'
import ListJapanese from './UserComponent/Japanese/ListJapanese.jsx'

function App() {

  return (
    <>
      <GuestHeader />
      <Routes>
        <Route path='/' element={<HomeContent />} />

        <Route path='game' element={<ListGame />} />
        <Route path='game/minesweeper' element={<Minesweeper />} />
        <Route path='game/whatisthepassword' element={<WhatIsThePassword />} />
        <Route path='game/caro' element={<Caro />} />
        <Route path='game/chess' element={<Chess />} />
        <Route path='game/tetris' element={<Tetris />} />
        <Route path='game/solvethemaze' element={<SolveTheMaze />} />
        <Route path='game/generatemaze' element={<GenerateMaze />} />
        <Route path='game/typepi' element={<TypePi />} />
        <Route path='game/randomcard' element={<RandomCard />} />
        <Route path='game/todolist' element={<ToDoList />} />
        <Route path='game/object' element={<TestObject />} />

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
