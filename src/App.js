import Home from './components/Home';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.css';
import NavBar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Create from './components/Create';
import Post from './components/post';
import Page404 from './components/page404';
import { AuthContextProvider } from './components/contexts/authContext';


function App() {
  return (
  <AuthContextProvider>
   <Router>
    <div className="container-fluid">
      <NavBar/>
    <Routes >
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/create' element={<Create/>}/>
      <Route path='/blogs/:id' element={<Post/>}/>
      <Route path='*' element={<Page404/>}/>

    </Routes>
    </div>
   </Router>
   </AuthContextProvider>
  );
}

export default App;
