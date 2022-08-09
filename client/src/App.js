
import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'; 
import Main from './pages/Main';
import RoutineCam from './pages/RoutineCam';
import PoseCam from './pages/PoseCam';
import Feedback from './pages/Feedback';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import MyPage from './pages/MyPage'
import Routine from './pages/Routine'
import Header from "./components/Header";


function App() {
  return (
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path='/' element={<Main />}></Route>
          <Route path='/signin' element={<SignIn />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/routine' element={<Routine />}>
            <Route path='routinecam' element={<RoutineCam />}></Route>
          </Route>
          <Route path='/:id'>
            <Route path='mypage' element={<MyPage />}></Route>
          </Route>
          <Route path='/posecam' element={<PoseCam />}>
            <Route path='feedback' element={<Feedback />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
