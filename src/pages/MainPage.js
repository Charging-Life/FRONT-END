import '../styles/pages/MainPage.css';
import Manager_main from '../components/Manager_main';
import User_main from '../components/User_main';
import Header from '../components/Header';
import Bottombar from '../components/Bottombar';

const MainPage = () => {

    const isManager = localStorage.getItem('CL_auth') && localStorage.getItem('CL_auth') === 'MANAGER' ? true : false;

    return (
        <div className='MainPage'>
            <div className='mainpage_header'>
                <Header page={"main"}/>
            </div> 
            { isManager ? <Manager_main/> : <User_main/> }
            { isManager ? '' : <Bottombar value={1}/> }
        </div>
    );
};

export default MainPage;