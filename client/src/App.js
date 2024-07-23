import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FrontPage from "./components/SignUp/FrontPage";
import SignUp from './components/SignUp/SignupPage';
import LoginPage from './components/SignUp/LoginPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './components/resume/Dashboard';
import ResumeMaker from './components/resume/Resume_maker';
import Template1 from './components/resume/templates/temp1';
import Template2 from './components/resume/templates/temp2';
import Template3 from './components/resume/templates/temp3';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<FrontPage />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/resume-maker/:id' element={<ResumeMaker />} />
          <Route path='/template/1' element={<Template1 />} />
          <Route path='/template/2' element={<Template2 />} />
          <Route path='/template/3' element={<Template3 />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
