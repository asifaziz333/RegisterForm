import logo from './logo.svg';
import './App.css';
import Register from './component/Register';
import Login from './component/Login';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './component/Home';
import Navbar from './component/Navbar';
import Logout from './component/Logout';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Home/>} />
        <Route path='/logout' element={<Logout/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
