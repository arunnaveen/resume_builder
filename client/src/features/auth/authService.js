import axios from 'axios';

const API_URL = 'http://localhost:8001/api/user';

const register = async (userData) => {
    const response = await axios.post(API_URL+'/signup',userData);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }

    return response.data;
}

const login = async (userData) => {
  const response = await axios.post(API_URL+'/login',userData);

  if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }

  return response.data;
}

const authServices = {register, login};

export default authServices;