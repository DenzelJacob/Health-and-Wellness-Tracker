import  { Routes,Route} from "react-router-dom";
import Navbar from './components/NavigationMenu.js';
import Home from './pages/Home.js';
import Create from './pages/Create.js';
import NoPage from './pages/NoPageFound.js';
import History from './pages/History.js';
import Profile from './pages/Profile.js';

function NavigationRouter() {

  return (
    

      <Routes>
        
        <Route path='/' element={<Navbar/>} >

          <Route index element={<Home/>} />
          <Route path='create' element={<Create/>} />
          <Route path='history' element={<History/>} />
          <Route path='profile' element={<Profile/>} />
          <Route path='*' element={<NoPage/>} />

        </Route>

      </Routes>

    
  
  );
}

export default NavigationRouter;
