import axios from 'axios';
import { Button } from '../button/Button';
import './Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Login() {
 
 const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [error, seterror] = useState({});
  const navigate = useNavigate();

  const loginnedvalues = async (e) => {
    e.preventDefault();

    // --- Validation ---
    let newerror = {};

    // Email validation
    if (!email.trim()) {
      newerror.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newerror.email = 'Invalid email format';
      }
    }

    // Password validation
    if (!password.trim()) {
      newerror.password = 'Password is required';
    } else if (password.length < 6) {
      newerror.password = 'Password must be at least 6 characters';
    }

    // Set error messages
    seterror(newerror);

    // If any errors, stop here
    if (Object.keys(newerror).length > 0) {
      return;
    }

    // --- Backend Request ---
    try {
      const res = await axios.post('http://localhost:5000/userlogin', {
        email,
        password,
      });

      console.log(res.data, '///////');

      if (res.data.status === true) {
        const data = res.data.data; // make sure your backend returns user data inside "data"
        localStorage.setItem('adminId', data._id);
        navigate('/');
      } else {
        alert('Invalid email or password');
      }
    } catch (err) {
      console.error(err, 'Login Error');
      alert('Something went wrong with login');
    }
  };

  return (
    <div className="loginmaindiv">
      <h1>Login</h1>
      <br />

      {/* Email Field */}
      <label>Email</label>
      <input
        className="logindivmaininput"
        type="text"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setemail(e.target.value)}
      />
      {error.email && <small className="error">{error.email}</small>}
      <br />

      {/* Password Field */}
      <label>Password</label>
      <input
        className="logindivmaininput"
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
      />
      {error.password && <small className="error">{error.password}</small>}

      <Button text="Login" onClick={loginnedvalues} />
    </div>
  );
}