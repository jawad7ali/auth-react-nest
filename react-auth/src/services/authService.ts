import axios from 'axios';
import { SignInFormData, SignUpFormData } from '../utils/userTypes';

const API_URL = 'http://localhost:8000/auth';

const login = ({ email, password }: SignInFormData) : Promise<any> => {
  return axios.post(`${API_URL}/login`, { email, password })
};

const register = (payload: SignUpFormData) : Promise<any> => {
    return axios.post(`${API_URL}/register`, payload);
}
    
const logout = () => {
  localStorage.removeItem('auth');
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('auth') || '{}');
};

export default {
  login,
  register,
  logout,
  getCurrentUser
};