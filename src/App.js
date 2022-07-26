import {Routes, Route} from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import './App.css';
import MainPage from './pages/MainPage.js';
import LoginPage from './pages/LoginPage.js';
import SignupPage from './pages/SignupPage.js';
import MyPage from './pages/MyPage.js';
import BoardPage from './pages/BoardPage';
import BoardDetailPage from './pages/BoardDetailPage';
import BoardWritePage from './pages/BoardWritePage';
import BookmarkPage from './pages/BookmarkPage';

function App() {
  const showDevice = useMediaQuery({
    query : "(min-width:270px)"
  });

  return (
    <div className="App">
      {showDevice
      ?
      <Routes>
        <Route exact path="/" element={<MainPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/bookmark" element={<BookmarkPage/>}/>
        <Route path="/board" element={<BoardPage/>}/>
        <Route path="/board/:id" element={<BoardDetailPage/>}/>
        <Route path="/board/write" element={<BoardWritePage/>}/>
        <Route path="/my" element={<MyPage/>}/>
        <Route path="*" element={<div>404</div>}/>
      </Routes>
      :
      <div>해상도를 높여주세요.</div>
      }
    </div>
  );
}

export default App;