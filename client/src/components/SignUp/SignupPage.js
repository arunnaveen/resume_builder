import React, { useState, useEffect } from 'react';
import './SignUp.css'; 
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { reset, register } from '../../features/auth/authSlice';
import Spinner from './Spinner';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [check, setCheck] = useState(false);
  const [passType, setPassType] = useState('password');

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

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

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

    if (!validateEmail(formData.email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    if (!validatePassword(formData.password)) {
      toast.error('Password must contain at least one capital letter and one special character.');
      return;
    }

    dispatch(register(formData));
  };

  useEffect(() => {
    setPassType(check ? 'text' : 'password');
  }, [check]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center dark-mode">
      <div className="card p-4 shadow-lg signup-card">
        <h2 className="text-center mb-4">Sign Up</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input type="text" className="form-control" onChange={onChange} value={formData.name} placeholder="Enter Name" id="name" required />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" onChange={onChange} value={formData.email} placeholder="Enter Email" id="email" required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type={passType} className="form-control" onChange={onChange} value={formData.password} placeholder="Enter Password" id="password" required />
          </div>
          <div className="mb-3">
            <input type="checkbox" id="showbtn" onChange={() => setCheck(!check)} className="p-2 me-2" />
            <label htmlFor="showbtn" className="form-label">Show Password</label>
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
