import './App.css';
import MainPage from './pages/MainPage.js';
import LoginPage from './pages/LoginPage.js';
import MyPage from './pages/MyPage.js';
import {Routes, Route} from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

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