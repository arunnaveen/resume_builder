import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FrontPage from "./components/SignUp/FrontPage";
import SignUp from './components/SignUp/SignupPage';
import LoginPage from './components/SignUp/LoginPage';


function App() {
  return (
    <BrowserRouter>
     <Routes>
          <Route path='/' element={<FrontPage />}></Route>
           <Route path='/signup' element={<SignUp />}></Route>
           <Route path='/login' element={<LoginPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
