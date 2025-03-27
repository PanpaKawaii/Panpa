import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import ScrollToTop from '../hooks/ScrollToTop/useScrollToTop.jsx'

import Footer from '../layouts/Footer/Footer.jsx'
import GuestHeader from '../layouts/Header/GuestHeader.jsx'

import HomeContent from '../pages/Home/HomeContent.jsx'

import ListGame from '../pages/Game/ListGame.jsx'

import Caro from '../pages/Game/Caro.jsx'
import Chess from '../pages/Game/Chess.jsx'
import Minesweeper from '../pages/Game/Minesweeper.jsx'
import Tetris from '../pages/Game/Tetris.jsx'
import RandomCard from '../pages/Study/RandomCard.jsx'

import WhatIsThePassword from '../pages/Game/WhatIsThePassword.jsx'
import GenerateMaze from '../pages/Study/GenerateMaze.jsx'
import Object from '../pages/Study/Object.jsx'
import SolveTheMaze from '../pages/Study/SolveTheMaze.jsx'
import ToDoList from '../pages/Study/ToDoList.jsx'
import TypePi from '../pages/Study/TypePi.jsx'

import Space from '../pages/Space/Space.jsx'

import JapaneseKanji from '../pages/Japanese/JapaneseKanji.jsx'
import JapaneseVerb from '../pages/Japanese/JapaneseVerb.jsx'
import ListJapanese from '../pages/Japanese/ListJapanese.jsx'

import SignInSignUp from '../pages/SignInSignUp/SignInSignUp.jsx'

export default function MainRoutes() {
    return (
        <BrowserRouter>
            <ScrollToTop />
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
                <Route path='game/object' element={<Object />} />

                <Route path='space' element={<Space />} />

                <Route path='japanese' element={<ListJapanese />} >
                    <Route path='kanji' element={<JapaneseKanji />} />
                    <Route path='verb' element={<JapaneseVerb />} />
                </Route>

                <Route path='signinsignup' element={<SignInSignUp />} />

            </Routes>
            <Footer />
        </BrowserRouter>
    )
}
