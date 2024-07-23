import React, { useState, useEffect } from 'react';
import './SignUp.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { reset, login } from '../../features/auth/authSlice';
import Spinner from './Spinner';

const LoginPage = () => {
  const [check, setCheck] = useState(false);
  const [passType, setPassType] = useState('password');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);
  
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess && user) {
      navigate('/dashboard');
    }
    dispatch(reset());
  }, [user, isLoading, isError, isSuccess, message, navigate, dispatch]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])/;
    return passwordRegex.test(password);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    if (!validatePassword(password)) {
      toast.error('Password must contain at least one capital letter and one special character.');
      return;
    }

    const userData = {
      email, password
    };
    dispatch(login(userData));
  }

  useEffect(() => {
    setPassType(check ? 'text' : 'password');
  }, [check]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center dark-mode">
      <div className="card p-4 shadow-lg signup-card">
        <h2 className="text-center mb-4">Log In</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Enter Email" id="email" required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type={passType} onChange={(e) => setPassword(e.target.value)} name="password" className="form-control" placeholder="Enter Password" id="password" required />
          </div>
          <div className="mb-3">
            <input type="checkbox" id="showbtn" onClick={() => setCheck(!check)} className="p-2 me-2" />
            <label htmlFor="showbtn" className="form-label">Show Password</label>
          </div>
          <div className="d-grid mt-2">
            <button type="submit" className="btn btn-primary">Log In</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
