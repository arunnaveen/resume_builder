import React,{useState, useEffect} from 'react';
import './SignUp.css';


const LoginPage = () => {
  const [check, setCheck] = useState(false);
  const [passType, setPassType] = useState('password');

  useEffect(()=>{
    setPassType(check ? 'text':'password')
  },[check]);
  
    return(<>
     <div className={`container-fluid min-vh-100 d-flex justify-content-center align-items-center dark-mode`}>
      <div className="card p-4 shadow-lg" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Sign Up</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" placeholder='Enter Email' id="email" required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type={passType} className="form-control" placeholder='Enter Password' id="password" required />
          </div>
          <div className="mb-3">
            <input type="checkbox"  id="showbtn" onClick={()=>setCheck(!check)} className='p-2 me-2' />
            <label htmlFor="showbtn" className="form-label">Show Password</label>
          </div>
          <div className="d-grid mt-2">
            <button type="submit" className="btn btn-primary">Sign Up</button>
          </div>
        </form>
        
      </div>
    </div> 
    </>);
}

export default LoginPage;