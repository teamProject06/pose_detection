import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Main from './pages/Main';
import RoutineCam from './pages/RoutineCam';
import PoseCam from './pages/PoseCam';
import Feedback from './pages/Feedback';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import SocialSignUp from './components/user/SocialSignUp';
import KakaoCallback from './components/user/kakao/KakaoCallback';
import MyPage from './pages/MyPage';
import Routine from './pages/Routine';
import Header from './components/Header';
import FindPW from './pages/FindPW';

// test 용
import AtomTest from './AtomTest';
import Posture from './pages/Posture';

function App() {
    return (
        <RecoilRoot>
            <BrowserRouter>
                {/* <AtomTest/> 테스트용 */}
                <Header />
                <Routes>
                    <Route path="/" element={<Main />}></Route>
                    <Route path="/signin" element={<SignIn />}></Route>
                    <Route path="/signup" element={<SignUp />}></Route>
                    <Route path="oauth">
                        <Route path="kakao/callback" element={<KakaoCallback />} />
                        <Route path="socialsignup" element={<SocialSignUp />}/>
                    </Route>
                    <Route path="/findpw" element={<FindPW />}></Route>
                    <Route path="/posture" element={<Posture />}></Route>
                    <Route path="/routine">
                        <Route path="routinecam" element={<RoutineCam />}></Route>
                        <Route path="routinecreate" element={<Routine />}></Route>
                    </Route>
                    <Route path="/:id">
                        <Route path="mypage" element={<MyPage />}></Route>
                    </Route>
                    <Route path="/posedetection" >
                        <Route path="posecam" element={<PoseCam />}></Route>
                        <Route path="feedback" element={<Feedback />}></Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </RecoilRoot>
    );
}

export default App;
