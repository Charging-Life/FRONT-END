import './App.css';
import MainPage from './pages/MainPage.js';
import LoginPage from './pages/LoginPage.js';
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<MainPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="*" element={<div>404</div>}/>
      </Routes>
    </div>
  );
}

export default App;