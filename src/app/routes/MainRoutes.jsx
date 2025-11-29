import { BrowserRouter, Route, Routes } from 'react-router-dom'

import ScrollToTop from '../hooks/ScrollToTop/useScrollToTop.jsx'

import Footer from '../layouts/Footer/Footer.jsx'
import GuestHeader from '../layouts/Header/GuestHeader.jsx'

import HomeContent from '../pages/Home/HomeContent.jsx'

import ListGame from '../pages/Game/ListGame.jsx'

import Caro from '../pages/Game/Caro.jsx'
import Chess from '../pages/Game/Chess.jsx'
import Dice from '../pages/Game/Dice.jsx'
import Go from '../pages/Game/Go.jsx'
import Minesweeper from '../pages/Game/Minesweeper.jsx'
import Tetris from '../pages/Game/Tetris.jsx'
import WhatIsThePassword from '../pages/Game/WhatIsThePassword.jsx'

import GenerateMaze from '../pages/Study/GenerateMaze.jsx'
import RandomCard from '../pages/Study/RandomCard.jsx'
import SolveTheMaze from '../pages/Study/SolveTheMaze.jsx'
import ToDoList from '../pages/Study/ToDoList.jsx'
import TypePi from '../pages/Study/TypePi.jsx'

import Object from '../pages/Object/Object.jsx'
import TestCube from '../pages/Object/TestCube.jsx'
import Cube3D from '../pages/Object/Cube3D.jsx'

import Space from '../pages/Space/Space.jsx'


import PaginationComponent from '../components/Pagination/PaginationComponent.jsx'

import ConnectCard from '../pages/Japanese/ConnectCard.jsx'
import JapaneseForm from '../pages/Japanese/JapaneseForm.jsx'
import JapaneseGrammar from '../pages/Japanese/JapaneseGrammar.jsx'
import JapaneseKanji from '../pages/Japanese/JapaneseKanji.jsx'
import JapaneseRadical from '../pages/Japanese/JapaneseRadical.jsx'
import JapaneseVerb from '../pages/Japanese/JapaneseVerb.jsx'
import { Kanji, Radical } from '../pages/Japanese/list_japanese'
import ListJapanese from '../pages/Japanese/ListJapanese.jsx'
import RotateCard from '../pages/Japanese/RotateCard.jsx'


import SignInSignUp from '../pages/SignInSignUp/SignInSignUp.jsx'

import Account from '../pages/User/Account.jsx'
import AccountInformation from '../pages/User/AccountInformation/AccountInformation.jsx'
import HelpCenter from '../pages/User/HelpCenter/HelpCenter.jsx'
import Notification from '../pages/User/Notification/Notification.jsx'
import OrderManagement from '../pages/User/OrderManagement/OrderManagement.jsx'

import InterestingComponent from '../pages/InterestingComponent/InterestingComponent.jsx'

import ListMouse from '../pages/Mouse/ListMouse.jsx'
import MouseTracker from '../pages/Mouse/MouseTracker.jsx'
import MouseDragTracker from '../pages/Mouse/MouseDragTracker.jsx'
import MouseDragRotate from '../pages/Mouse/MouseDragRotate.jsx'

import GenerateObjectController from '../pages/GenerateObject/GenerateObjectController.jsx'

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
                <Route path='game/luckydice' element={<Dice />} />
                <Route path='game/go' element={<Go />} />
                <Route path='game/tetris' element={<Tetris />} />
                <Route path='game/solvethemaze' element={<SolveTheMaze />} />
                <Route path='game/generatemaze' element={<GenerateMaze />} />
                <Route path='game/typepi' element={<TypePi />} />
                <Route path='game/randomcard' element={<RandomCard />} />
                <Route path='game/todolist' element={<ToDoList />} />

                <Route path='object' element={<Object />} />
                <Route path='testcube' element={<TestCube />} />
                <Route path='cube3d' element={<Cube3D />} />

                <Route path='generate-object' element={<GenerateObjectController />} />

                <Route path='space' element={<Space />} />

                <Route path='mouse' element={<ListMouse />} />
                <Route path='mouse/mouse-tracker' element={<MouseTracker />} />
                <Route path='mouse/mouse-drag-tracker' element={<MouseDragTracker />} />
                <Route path='mouse/mouse-drag-rotate' element={<MouseDragRotate />} />

                <Route path='japanese' element={<ListJapanese />} >
                    <Route path='kanji' element={<PaginationComponent items={[...Kanji].reverse()} pageSize={24} Component={JapaneseKanji} />} />
                    {/* <Route path='kanji' element={<PaginationComponent items={Kanji} pageSize={24}><JapaneseKanji /></PaginationComponent>} /> */}
                    <Route path='verb' element={<JapaneseVerb />} />
                    <Route path='radical' element={<PaginationComponent items={Radical} pageSize={24} Component={JapaneseRadical} />} />
                    <Route path='grammar' element={<JapaneseGrammar />} />
                    <Route path='form' element={<JapaneseForm />} />
                    <Route path='rotatecard' element={<PaginationComponent items={Kanji} pageSize={24} Component={RotateCard} />} />
                    <Route path='connectcard' element={<ConnectCard />} />
                </Route>

                <Route path='signinsignup' element={<SignInSignUp />} />

                <Route path='account' element={<Account />} >
                    <Route path='information' element={<AccountInformation />} />
                    <Route path='order' element={<OrderManagement />} />
                    <Route path='help-center' element={<HelpCenter />} />
                    <Route path='notification' element={<Notification />} />
                </Route>

                <Route path='interesting-component' element={<InterestingComponent />} />

            </Routes>
            <Footer />
        </BrowserRouter>
    )
}
