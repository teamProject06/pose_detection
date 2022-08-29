import React, { useState, lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Main from './pages/Main';
import Home from './pages/Home';
import RoutineCam from './pages/RoutineCam';
import Feedback from './pages/Feedback';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import MyPage from './pages/MyPage';
import MyCalendar from './pages/MyCalendar';
import MyFeedback from './pages/MyFeedback';
import Routine from './pages/Routine';
import Header from './components/Header';
import Footer from './pages/Footer';
import FindPW from './pages/FindPW';
import Posture from './pages/Posture';
import NaverLoginCallback from './components/user/socialLogin/NaverLoginCallback';
import KakaoLoginCallback from './components/user/socialLogin/KakaoLoginCallback';
import SocialSignUp from './components/user/socialLogin/SocialSignUp';
import PoseCamGuide from './components/poseCam/PoseCamGuide';
import Loader from './components/Loader';
import ErrPage from './pages/ErrPage';

function App() {
    const [pathname, setPathname] = useState(true)
    const recordedChunks = [];
    const PoseCam = lazy(()=> import('./pages/PoseCam'))
    
    const videoConstraints = {
        width: 760,
        height: 600,
        facingMode: "user"
      };

    return (
        <RecoilRoot>
            <BrowserRouter>
            <Suspense fallback={<Loader />}>
                <Header isPath={pathname} setIsPath={setPathname} />
                <Routes>
                    <Route path ="/oauth">
                        <Route path="naver/callback" element={<NaverLoginCallback/>}></Route>
                        <Route path="kakao/callback" element={<KakaoLoginCallback/>}></Route>
                        <Route path="signup"element={<SocialSignUp/>}></Route>
                    </Route>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/home" element={<Main />}></Route>
                    <Route path="/mycalendar" element={<MyCalendar />}></Route>
                    <Route path="/myfeedback" element={<MyFeedback />}></Route>
                    <Route path="/signin" element={<SignIn />}></Route>
                    <Route path="/signup" element={<SignUp />}></Route>
                    <Route path="/findpw" element={<FindPW />}></Route>
                    <Route path="/not" element={<ErrPage setIsPath={setPathname} />}></Route>
                    <Route path="/routine">
                        <Route path="routinecam" element={<RoutineCam />}></Route>
                        <Route path="routinecreate" element={<Routine />}></Route>
                    </Route>
                    <Route path="/:id">
                        <Route path="mypage" element={<MyPage />}></Route>
                    </Route>
                    <Route path="/posture" element={<Posture />}></Route>
                    <Route path="/posedetection" >
                        <Route path="posecam" element={<PoseCam video={recordedChunks} videoConstraints={videoConstraints} />}></Route>
                        <Route path="posecamguide" element={<PoseCamGuide videoConstraints={videoConstraints}/>}></Route>
                        <Route path="feedback" element={<Feedback />}></Route>
                    </Route>
                </Routes>
                <Footer />
                </Suspense>
            </BrowserRouter>
        </RecoilRoot>
    );
}

export default App;
// {
//     "url" : "http://118.67.128.231:5500"
// }
