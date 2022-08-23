import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Main from './pages/Main';
import Home from './pages/Home';
import RoutineCam from './pages/RoutineCam';
import PoseCam from './pages/PoseCam';
import Feedback from './pages/Feedback';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import MyPage from './pages/MyPage';
import Routine from './pages/Routine';
import Header from './components/Header';
import Footer from './pages/Footer';
import FindPW from './pages/FindPW';
import Posture from './pages/Posture';
import NaverLoginCallback from './components/user/socialLogin/NaverLoginCallback';
import SocialSignUp from './components/user/socialLogin/SocialSignUp';
import PoseCamGuide from './components/poseCam/PoseCamGuide';


function App() {

    return (
        <RecoilRoot>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path ="/oauth">
                        <Route path="naver" element={<NaverLoginCallback/>}></Route>
                        <Route path="signup"element={<SocialSignUp/>}></Route>
                    </Route>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/home" element={<Main />}></Route>
                    <Route path="/signin" element={<SignIn />}></Route>
                    <Route path="/signup" element={<SignUp />}></Route>
                    <Route path="/findpw" element={<FindPW />}></Route>
                    <Route path="/routine">
                        <Route path="routinecam" element={<RoutineCam />}></Route>
                        <Route path="routinecreate" element={<Routine />}></Route>
                    </Route>
                    <Route path="/:id">
                        <Route path="mypage" element={<MyPage />}></Route>
                    </Route>
                    <Route path="/posture" element={<Posture />}></Route>
                    <Route path="/posedetection" >
                        <Route path="posecam" element={<PoseCam />}></Route>
                        <Route path="posecamguide" element={<PoseCamGuide />}></Route>
                        <Route path="feedback" element={<Feedback />}></Route>
                    </Route>
                </Routes>
                <Footer />
            </BrowserRouter>
        </RecoilRoot>
    );
}

export default App;
